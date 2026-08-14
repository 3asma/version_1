import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import prisma from '../../config/prisma.js';

describe('Room Integration Tests (PostgreSQL Test DB)', () => {
    let adminToken = '';
    let receptionToken = ''; // Lack view_formations / manage_formations

    let seededRoomId = '';
    const seededRoomNumero = 'TEST-R901';

    beforeAll(async () => {
        // 1. Authenticate users
        const adminLogin = await request(app)
            .post('/auth/login')
            .send({
                email: 'admin@formation.com',
                password: 'demo'
            });
        adminToken = adminLogin.body.token;

        const receptionLogin = await request(app)
            .post('/auth/login')
            .send({
                email: 'reception@formation.com',
                password: 'demo'
            });
        receptionToken = receptionLogin.body.token;

        // 2. Clean db from TEST_ records
        await prisma.reservation.deleteMany({
            where: {
                room: {
                    numero: { contains: 'test', mode: 'insensitive' }
                }
            }
        });
        await prisma.room.deleteMany({
            where: {
                numero: { contains: 'test', mode: 'insensitive' }
            }
        });

        // 3. Seed a room for testing retrieval and update collisions
        const seededRoom = await prisma.room.create({
            data: {
                numero: seededRoomNumero,
                capacite: 12,
                type: 'Individuel',
                available: true
            }
        });
        seededRoomId = seededRoom.id;
    });

    afterAll(async () => {
        // Cleanup after all tests
        await prisma.reservation.deleteMany({
            where: {
                room: {
                    numero: { contains: 'test', mode: 'insensitive' }
                }
            }
        });
        await prisma.room.deleteMany({
            where: {
                numero: { contains: 'test', mode: 'insensitive' }
            }
        });
    });

    describe('POST /rooms (Creation)', () => {
        it('should successfully create a new room and persist it', async () => {
            const payload = {
                numero: 'TEST-A101',
                capacite: 30,
                type: 'Groupe',
                available: true
            };

            const response = await request(app)
                .post('/rooms')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('success');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.numero).toBe('TEST-A101'); // normalized to uppercase

            const dbRoom = await prisma.room.findUnique({
                where: { id: response.body.data.id }
            });
            expect(dbRoom).toBeDefined();
            expect(dbRoom.numero).toBe('TEST-A101');
            expect(dbRoom.capacite).toBe(30);
        });

        it('should return 400 when numero/roomNumber is missing', async () => {
            const payload = {
                capacite: 15
            };

            const response = await request(app)
                .post('/rooms')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('NUMERO_REQUIRED');
        });

        it('should return 400 when capacite/capacity is missing', async () => {
            const payload = {
                numero: 'TEST-A102'
            };

            const response = await request(app)
                .post('/rooms')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('CAPACITE_REQUIRED');
        });

        it('should return 400 when capacite is 0 or negative', async () => {
            const payloadNull = {
                numero: 'TEST-A103',
                capacite: 0
            };

            const responseNull = await request(app)
                .post('/rooms')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payloadNull);

            expect(responseNull.status).toBe(400);
            expect(responseNull.body.error).toBe('INVALID_CAPACITE');

            const payloadNeg = {
                numero: 'TEST-A103',
                capacite: -10
            };

            const responseNeg = await request(app)
                .post('/rooms')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payloadNeg);

            expect(responseNeg.status).toBe(400);
            expect(responseNeg.body.error).toBe('INVALID_CAPACITE');
        });

        it('should return 400 when capacite is non-numeric', async () => {
            const payload = {
                numero: 'TEST-A104',
                capacite: 'abc'
            };

            const response = await request(app)
                .post('/rooms')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('INVALID_CAPACITE');
        });

        it('should return 409 when room number already exists', async () => {
            const payload = {
                numero: seededRoomNumero,
                capacite: 10
            };

            const response = await request(app)
                .post('/rooms')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(409);
            expect(response.body.error).toBe('Room number already exists');
        });

        it('should return 403 when user lacks manage_formations permission', async () => {
            const payload = {
                numero: 'TEST-A105',
                capacite: 10
            };

            const response = await request(app)
                .post('/rooms')
                .set('Authorization', `Bearer ${receptionToken}`)
                .send(payload);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });

    describe('GET /rooms (Consultation)', () => {
        it('should return all rooms for authorized Admin', async () => {
            const response = await request(app)
                .get('/rooms')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThanOrEqual(1);
        });

        it('should stream PDF of rooms for authorized Admin', async () => {
            const response = await request(app)
                .get('/rooms/export/pdf')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toBe('application/pdf');
        });

        it('should return a single room by ID', async () => {
            const response = await request(app)
                .get(`/rooms/${seededRoomId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body.data.id).toBe(seededRoomId);
            expect(response.body.data.numero).toBe(seededRoomNumero);
        });

        it('should return 404 when room is not found', async () => {
            const response = await request(app)
                .get('/rooms/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Room not found');
        });

        it('should return 403 when user lacks view_formations permission', async () => {
            const response = await request(app)
                .get('/rooms')
                .set('Authorization', `Bearer ${receptionToken}`);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });

    describe('PATCH /rooms/:id (Modification)', () => {
        it('should successfully update room attributes', async () => {
            const updates = {
                numero: 'TEST-NEW-NUM',
                capacite: 25
            };

            const response = await request(app)
                .patch(`/rooms/${seededRoomId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updates);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');

            const dbRoom = await prisma.room.findUnique({ where: { id: seededRoomId } });
            expect(dbRoom.numero).toBe('TEST-NEW-NUM');
            expect(dbRoom.capacite).toBe(25);
        });

        it('should return 409 Conflict when updating room number to an existing one', async () => {
            const otherRoom = await prisma.room.create({
                data: {
                    numero: 'TEST-OTHER-RM',
                    capacite: 8
                }
            });

            const response = await request(app)
                .patch(`/rooms/${seededRoomId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ numero: 'TEST-OTHER-RM' });

            await prisma.room.delete({ where: { id: otherRoom.id } });

            expect(response.status).toBe(409);
            expect(response.body.error).toBe('Room number already exists');
        });

        it('should return 400 when updating room number to empty string', async () => {
            const response = await request(app)
                .patch(`/rooms/${seededRoomId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ numero: '  ' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('INVALID_NUMERO');
        });

        it('should return 404 when updating non-existent room', async () => {
            const response = await request(app)
                .patch('/rooms/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ capacite: 5 });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Room not found');
        });

        it('should return 403 when user lacks manage_formations permission for update', async () => {
            const response = await request(app)
                .patch(`/rooms/${seededRoomId}`)
                .set('Authorization', `Bearer ${receptionToken}`)
                .send({ capacite: 5 });

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });

    describe('DELETE /rooms/:id (Deletion & Cascades)', () => {
        it('should successfully delete room and cascade delete reservations', async () => {
            // Seed a room to delete, a candidate, a formation, a professor, an inscription and a reservation
            const candidate = await prisma.candidate.create({
                data: {
                    candidateCode: 'CAN-RM-DEL',
                    firstName: 'TEST_RoomC',
                    lastName: 'TEST_RoomL',
                    age: 22,
                    occupation: 'STUDENT',
                    observation: 'ALONE'
                }
            });

            const formation = await prisma.formation.create({
                data: {
                    matiere: 'TEST_RoomMatiere',
                    niveau: 'TEST_RoomNiveau'
                }
            });

            const professor = await prisma.professor.create({
                data: {
                    nom: 'TEST_RoomProfNom',
                    prenom: 'TEST_RoomProfPrenom',
                    email: 'test-room-prof@formation-test.com'
                }
            });

            const inscription = await prisma.inscription.create({
                data: {
                    candidateId: candidate.id,
                    formationId: formation.id,
                    status: 'ACTIVE'
                }
            });

            const targetRoom = await prisma.room.create({
                data: {
                    numero: 'TEST-RM-TODEL',
                    capacite: 10
                }
            });

            const reservation = await prisma.reservation.create({
                data: {
                    reservationCode: 'TESTRES-RMDEL',
                    reservationDate: '2026-09-10T00:00:00.000Z',
                    startTime: '2026-09-10T14:00:00.000Z',
                    endTime: '2026-09-10T15:00:00.000Z',
                    inscriptionId: inscription.id,
                    professorId: professor.id,
                    roomId: targetRoom.id
                }
            });

            // Delete the room
            const response = await request(app)
                .delete(`/rooms/${targetRoom.id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);

            // 1. Verify Room is deleted
            const dbRoom = await prisma.room.findUnique({ where: { id: targetRoom.id } });
            expect(dbRoom).toBeNull();

            // 2. Verify Reservation is cascade deleted (since Room is deleted)
            const dbRes = await prisma.reservation.findUnique({ where: { id: reservation.id } });
            expect(dbRes).toBeNull();

            // Cleanup remaining entities
            await prisma.inscription.delete({ where: { id: inscription.id } });
            await prisma.candidate.delete({ where: { id: candidate.id } });
            await prisma.formation.delete({ where: { id: formation.id } });
            await prisma.professor.delete({ where: { id: professor.id } });
        });

        it('should return 404 when deleting non-existent room', async () => {
            const response = await request(app)
                .delete('/rooms/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Room not found');
        });

        it('should return 403 when user lacks manage_formations permission for delete', async () => {
            const response = await request(app)
                .delete(`/rooms/${seededRoomId}`)
                .set('Authorization', `Bearer ${receptionToken}`);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });
});
