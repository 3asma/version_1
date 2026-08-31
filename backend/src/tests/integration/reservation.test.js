import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import prisma from '../../config/prisma.js';

describe('Reservation Integration Tests (PostgreSQL Test DB)', () => {
    let adminToken = '';
    let receptionToken = ''; // No manage_reservations / view_reservations permission

    let candidateId = '';
    let formationId = '';
    let inscriptionId = '';
    let roomId = '';
    let professorId = '';

    beforeAll(async () => {
        // 1. Authenticate as Admin
        const adminLogin = await request(app)
            .post('/auth/login')
            .send({
                email: 'admin@formation.com',
                password: 'demo'
            });
        adminToken = adminLogin.body.token;

        // 2. Authenticate as Agent Reception
        const receptionLogin = await request(app)
            .post('/auth/login')
            .send({
                email: 'reception@formation.com',
                password: 'demo'
            });
        receptionToken = receptionLogin.body.token;

        // 3. Clear existing test data
        await prisma.reservation.deleteMany({
            where: {
                inscription: {
                    formation: {
                        matiere: { startsWith: 'TEST_' }
                    }
                }
            }
        });
        await prisma.inscription.deleteMany({
            where: {
                formation: {
                    matiere: { startsWith: 'TEST_' }
                }
            }
        });
        await prisma.candidate.deleteMany({
            where: {
                email: 'res-candidate@formation-test.com'
            }
        });
        await prisma.formation.deleteMany({
            where: {
                matiere: { startsWith: 'TEST_' }
            }
        });
        await prisma.room.deleteMany({
            where: {
                numero: { startsWith: 'TEST-' }
            }
        });
        await prisma.professor.deleteMany({
            where: {
                email: 'prof-res@formation-test.com'
            }
        });

        // 4. Seed clean dependencies
        const candidate = await prisma.candidate.create({
            data: {
                candidateCode: 'CAN-RES-99',
                firstName: 'TEST_CandidateName',
                lastName: 'TEST_CandidateLastName',
                email: 'res-candidate@formation-test.com',
                age: 25,
                occupation: 'STUDENT',
                observation: 'ALONE'
            }
        });
        candidateId = candidate.id;

        const formation = await prisma.formation.create({
            data: {
                matiere: 'TEST_Science',
                niveau: 'TEST_Moyen'
            }
        });
        formationId = formation.id;

        const inscription = await prisma.inscription.create({
            data: {
                candidateId: candidateId,
                formationId: formationId,
                learningMode: 'MONOME',
                status: 'ACTIVE'
            }
        });
        inscriptionId = inscription.id;

        // Also associate inscription group and candidates to match checkAvailability logic
        await prisma.inscriptionCandidate.create({
            data: {
                inscriptionId: inscriptionId,
                candidateId: candidateId
            }
        });

        await prisma.group.create({
            data: {
                nom: `Monôme ${candidate.firstName} ${candidate.lastName}`,
                inscriptionId: inscriptionId
            }
        });

        const room = await prisma.room.create({
            data: {
                numero: 'TEST-R202',
                capacite: 15,
                type: 'Individuel',
                available: true
            }
        });
        roomId = room.id;

        const professor = await prisma.professor.create({
            data: {
                nom: 'TEST_ProfName',
                prenom: 'TEST_ProfFirstName',
                email: 'prof-res@formation-test.com',
                type: 'permanent',
                dayOff: 'Sunday' // Not Sunday for our test slots which will be weekdays (e.g. Wednesday)
            }
        });
        professorId = professor.id;
    });

    afterAll(async () => {
        // Safe cascaded deletions
        await prisma.reservation.deleteMany({
            where: {
                inscription: {
                    formation: {
                        matiere: { startsWith: 'TEST_' }
                    }
                }
            }
        });
        await prisma.inscription.deleteMany({
            where: {
                formation: {
                    matiere: { startsWith: 'TEST_' }
                }
            }
        });
        await prisma.candidate.deleteMany({
            where: {
                email: 'res-candidate@formation-test.com'
            }
        });
        await prisma.formation.deleteMany({
            where: {
                matiere: { startsWith: 'TEST_' }
            }
        });
        await prisma.room.deleteMany({
            where: {
                numero: { startsWith: 'TEST-' }
            }
        });
        await prisma.professor.deleteMany({
            where: {
                email: 'prof-res@formation-test.com'
            }
        });
    });

    describe('POST /reservations (Creation & Persistence)', () => {
        it('should successfully create a valid reservation and persist it', async () => {
            const payload = {
                reservationCode: 'TESTRES001',
                reservationDate: '2026-09-09T00:00:00.000Z', // Wednesday
                startTime: '2026-09-09T10:00:00.000Z',
                endTime: '2026-09-09T12:00:00.000Z',
                inscriptionId,
                professorId,
                roomId
            };

            const response = await request(app)
                .post('/reservations')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('success');
            expect(response.body.data).toHaveProperty('id');

            // Verify in PostgreSQL isolated schema
            const dbReservation = await prisma.reservation.findUnique({
                where: { id: response.body.data.id },
                include: {
                    room: true,
                    professor: true,
                    inscription: true
                }
            });

            expect(dbReservation).toBeDefined();
            expect(dbReservation.inscriptionId).toBe(inscriptionId);
            expect(dbReservation.professorId).toBe(professorId);
            expect(dbReservation.roomId).toBe(roomId);

            // Check formatted date objects match
            expect(new Date(dbReservation.startTime).toISOString()).toBe(payload.startTime);
            expect(new Date(dbReservation.endTime).toISOString()).toBe(payload.endTime);

            // Verify via GET request that group and members relations are included
            const getResponse = await request(app)
                .get('/reservations')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(getResponse.status).toBe(200);
            const found = getResponse.body.data.find(r => r.id === response.body.data.id);
            expect(found).toBeDefined();
            expect(found.inscription).toBeDefined();
            expect(found.inscription.group).toBeDefined();
            expect(found.inscription.group.nom).toContain('Monôme');
            expect(found.inscription.members).toBeDefined();
            expect(Array.isArray(found.inscription.members)).toBe(true);
            expect(found.inscription.members.length).toBeGreaterThan(0);
        });
    });

    describe('POST /reservations (Validations)', () => {
        it('should return 400 when reservationCode is missing', async () => {
            const payload = {
                reservationDate: '2026-09-09T00:00:00.000Z',
                startTime: '2026-09-09T14:00:00.000Z',
                endTime: '2026-09-09T16:00:00.000Z',
                inscriptionId,
                professorId,
                roomId
            };

            const response = await request(app)
                .post('/reservations')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('RESERVATION_CODE_REQUIRED');
        });

        it('should return 400 when start time >= end time', async () => {
            const payload = {
                reservationCode: 'TESTRES002',
                reservationDate: '2026-09-09T00:00:00.000Z',
                startTime: '2026-09-09T16:00:00.000Z',
                endTime: '2026-09-09T14:00:00.000Z',
                inscriptionId,
                professorId,
                roomId
            };

            const response = await request(app)
                .post('/reservations')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('START_TIME_MUST_BE_BEFORE_END_TIME');
        });

        it('should return 404 when inscription does not exist', async () => {
            const payload = {
                reservationCode: 'TESTRES003',
                reservationDate: '2026-09-09T00:00:00.000Z',
                startTime: '2026-09-09T14:00:00.000Z',
                endTime: '2026-09-09T16:00:00.000Z',
                inscriptionId: '00000000-0000-0000-0000-000000000000',
                professorId,
                roomId
            };

            const response = await request(app)
                .post('/reservations')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('INSCRIPTION_NOT_FOUND');
        });
    });

    describe('POST /reservations (Conflicts)', () => {
        // Let's test the database reservation conflict logic.
        // There is already a reservation on 2026-09-09 from 10:00 to 12:00.

        it('should return 500 RESERVATION_CONFLICT when creating another reservation on the same inscription/slot', async () => {
            const payload = {
                reservationCode: 'TESTRES004',
                reservationDate: '2026-09-09T00:00:00.000Z',
                startTime: '2026-09-09T10:00:00.000Z', // overlap
                endTime: '2026-09-09T12:00:00.000Z',
                inscriptionId,
                professorId,
                roomId
            };

            const response = await request(app)
                .post('/reservations')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('RESERVATION_CONFLICT');
        });

        it('should return 500 ROOM_CONFLICT when room is busy under overlapping timeslot', async () => {
            // Room is used from 10:00 to 12:00. Let's try 11:00 to 13:00.
            // Using a new clean Inscription to avoid RESERVATION_CONFLICT
            const otherInscription = await prisma.inscription.create({
                data: {
                    candidateId: candidateId,
                    formationId: formationId,
                    learningMode: 'BINOME',
                    status: 'WAITING'
                }
            });

            // Use a different professor to avoid PROFESSOR_CONFLICT
            const otherProf = await prisma.professor.create({
                data: {
                    nom: 'TEST_Prof2',
                    prenom: 'TEST_ProfFirstName2',
                    email: 'prof-res-other@formation-test.com',
                    type: 'permanent',
                    dayOff: 'Sunday'
                }
            });

            const payload = {
                reservationCode: 'TESTRES005',
                reservationDate: '2026-09-09T00:00:00.000Z',
                startTime: '2026-09-09T11:00:00.000Z', // overlaps 10:00-12:00
                endTime: '2026-09-09T13:00:00.000Z',
                inscriptionId: otherInscription.id,
                professorId: otherProf.id,
                roomId // target same room
            };

            const response = await request(app)
                .post('/reservations')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            await prisma.inscription.delete({ where: { id: otherInscription.id } });
            await prisma.professor.delete({ where: { id: otherProf.id } });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('ROOM_CONFLICT');
        });

        it('should return 500 PROFESSOR_CONFLICT when professor is busy under overlapping timeslot', async () => {
            // Professor is assigned from 10:00 to 12:00. Let's try 11:00-13:00.
            // Using different inscription and different room to isolate professor conflict check.
            const otherInscription = await prisma.inscription.create({
                data: {
                    candidateId: candidateId,
                    formationId: formationId,
                    learningMode: 'GROUPE',
                    status: 'ACTIVE'
                }
            });

            const otherRoom = await prisma.room.create({
                data: {
                    numero: 'TEST-R203',
                    capacite: 20,
                    available: true
                }
            });

            const payload = {
                reservationCode: 'TESTRES006',
                reservationDate: '2026-09-09T00:00:00.000Z',
                startTime: '2026-09-09T11:00:00.000Z', // overlaps 10:00-12:00
                endTime: '2026-09-09T13:00:00.000Z',
                inscriptionId: otherInscription.id,
                professorId, // target same prof
                roomId: otherRoom.id
            };

            const response = await request(app)
                .post('/reservations')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            await prisma.inscription.delete({ where: { id: otherInscription.id } });
            await prisma.room.delete({ where: { id: otherRoom.id } });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('PROFESSOR_CONFLICT');
        });
    });

    describe('POST /reservations/availability (Availability Verification)', () => {
        it('should return check availability information for given elements', async () => {
            const payload = {
                reservationDate: '2026-09-09T00:00:00.000Z',
                startTime: '2026-09-09T15:00:00.000Z', // free slot
                endTime: '2026-09-09T17:00:00.000Z',
                professorId,
                candidateId
            };

            const response = await request(app)
                .post('/reservations/availability')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body.data.professorAvailable).toBe(true);
            expect(response.body.data.candidateAvailable).toBe(true);
            expect(response.body.data).toHaveProperty('availableRooms');
        });

        it('should return professorAvailable: false when professor is busy', async () => {
            const payload = {
                reservationDate: '2026-09-09T00:00:00.000Z',
                startTime: '2026-09-09T11:00:00.000Z', // busy slot (10:00-12:00)
                endTime: '2026-09-09T13:00:00.000Z',
                professorId,
                candidateId: '00000000-0000-0000-0000-000000000000' // dummy candidate to isolate prof check
            };

            const response = await request(app)
                .post('/reservations/availability')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(200);
            expect(response.body.data.professorAvailable).toBe(false);
        });

        it('should return candidateAvailable: false when candidate is busy', async () => {
            const payload = {
                reservationDate: '2026-09-09T00:00:00.000Z',
                startTime: '2026-09-09T11:00:00.000Z', // busy slot (10:00-12:00)
                endTime: '2026-09-09T13:00:00.000Z',
                professorId: '00000000-0000-0000-0000-000000000000', // dummy prof
                candidateId
            };

            const response = await request(app)
                .post('/reservations/availability')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(200);
            expect(response.body.data.candidateAvailable).toBe(false);
        });
    });

    describe('POST /reservations (Permissions)', () => {
        it('should return 403 when user lacks manage_reservations permission', async () => {
            const payload = {
                reservationCode: 'TESTRES007',
                reservationDate: '2026-09-09T00:00:00.000Z',
                startTime: '2026-09-09T15:00:00.000Z',
                endTime: '2026-09-09T17:00:00.000Z',
                inscriptionId,
                professorId,
                roomId
            };

            const response = await request(app)
                .post('/reservations')
                .set('Authorization', `Bearer ${receptionToken}`)
                .send(payload);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });
});
