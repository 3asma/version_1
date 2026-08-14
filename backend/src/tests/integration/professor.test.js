import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import prisma from '../../config/prisma.js';

describe('Professor Integration Tests (PostgreSQL Test DB)', () => {
    let adminToken = '';
    let receptionToken = ''; // No view_professors / manage_professors permissions
    let professorToken = ''; // Can view_reservations, but NOT view_professors (except own) / manage_professors

    let seededProfId = '';
    let seededProfEmail = 'seeded-prof@formation-test.com';

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
                professor: {
                    email: { contains: 'test', mode: 'insensitive' }
                }
            }
        });
        await prisma.inscription.deleteMany({
            where: {
                professor: {
                    email: { contains: 'test', mode: 'insensitive' }
                }
            }
        });
        await prisma.cancelRequest.deleteMany({
            where: {
                professor: {
                    email: { contains: 'test', mode: 'insensitive' }
                }
            }
        });
        await prisma.professor.deleteMany({
            where: {
                OR: [
                    { email: { contains: 'test', mode: 'insensitive' } },
                    { email: seededProfEmail }
                ]
            }
        });

        // 3. Seed a starting professor for consultation / duplication testing
        const seededProf = await prisma.professor.create({
            data: {
                nom: 'TEST_SeededNom',
                prenom: 'TEST_SeededPrenom',
                email: seededProfEmail,
                type: 'permanent',
                dayOff: 'Monday',
                maxSessions: 30
            }
        });
        seededProfId = seededProf.id;

        // Obtain token for a professor user.
        // Wait! In the seed.js, there is "prof@formation.com" who is a PROFESSOR. Let's see if we can log in as them.
        // Let's log in as prof@formation.com (password demo).
        const profLogin = await request(app)
            .post('/auth/login')
            .send({
                email: 'prof@formation.com',
                password: 'demo'
            });
        professorToken = profLogin.body.token;

        // Associate the prof@formation.com user user session if needed, but our authMiddleware uses:
        // req.user.professorId which is decoded from JWT. In JWT generated for prof@formation.com,
        // it carries professorId. Let's check in authMiddleware.js or seed.js if prof has a professorId.
        // Yes, in seed.js the user for prof@formation.com is created, and it links to the Professor table.
    });

    afterAll(async () => {
        // Safe cascade deletions and clean up
        await prisma.reservation.deleteMany({
            where: {
                professor: {
                    email: { contains: 'test', mode: 'insensitive' }
                }
            }
        });
        await prisma.inscription.deleteMany({
            where: {
                professor: {
                    email: { contains: 'test', mode: 'insensitive' }
                }
            }
        });
        await prisma.cancelRequest.deleteMany({
            where: {
                professor: {
                    email: { contains: 'test', mode: 'insensitive' }
                }
            }
        });
        await prisma.professor.deleteMany({
            where: {
                OR: [
                    { email: { contains: 'test', mode: 'insensitive' } },
                    { email: seededProfEmail }
                ]
            }
        });
    });

    describe('POST /professors (Creation)', () => {
        it('should successfully create a new professor and persist in DB', async () => {
            const payload = {
                nom: 'TEST_NewProf',
                prenom: 'TEST_NewPrenom',
                email: 'TEST_new-email@formation-test.com',
                telephone: '12345678',
                adresse: 'TEST_Addr',
                type: 'vacataire',
                dayOff: 'Tuesday',
                maxSessions: 15
            };

            const response = await request(app)
                .post('/professors')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('success');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.nom).toBe('TEST_NewProf');
            expect(response.body.data.prenom).toBe('TEST_NewPrenom');

            // Verify in DB directly
            const dbProf = await prisma.professor.findUnique({
                where: { id: response.body.data.id }
            });
            expect(dbProf).toBeDefined();
            expect(dbProf.email).toBe('test_new-email@formation-test.com'); // trimmed and lowercased by service
            expect(dbProf.type).toBe('vacataire');
            expect(dbProf.dayOff).toBe('Tuesday');
            expect(dbProf.maxSessions).toBe(15);
        });

        it('should return 400 when nom is missing', async () => {
            const payload = {
                prenom: 'TEST_NoNom',
                email: 'TEST_no-nom@formation-test.com'
            };

            const response = await request(app)
                .post('/professors')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('NOM_REQUIRED');
        });

        it('should return 400 when prenom is missing', async () => {
            const payload = {
                nom: 'TEST_NoPrenom',
                email: 'TEST_no-prenom@formation-test.com'
            };

            const response = await request(app)
                .post('/professors')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('PRENOM_REQUIRED');
        });

        it('should return 400 for invalid email format', async () => {
            const payload = {
                nom: 'TEST_BadEmail',
                prenom: 'TEST_BadEmail',
                email: 'not-an-email'
            };

            const response = await request(app)
                .post('/professors')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('INVALID_EMAIL');
        });

        it('should return 409 when email already exists', async () => {
            const payload = {
                nom: 'TEST_DuplicateEmail',
                prenom: 'TEST_DuplicateEmail',
                email: seededProfEmail
            };

            const response = await request(app)
                .post('/professors')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(409);
            expect(response.body.error).toBe('Email already exists');
        });

        it('should return 400 when maxSessions <= 0', async () => {
            const payload = {
                nom: 'TEST_BadSessions',
                prenom: 'TEST_BadSessions',
                maxSessions: -2
            };

            const response = await request(app)
                .post('/professors')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('maxSessions must be a positive number');
        });

        it('should return 403 when user lacks manage_professors permission', async () => {
            const payload = {
                nom: 'TEST_NoPermission',
                prenom: 'TEST_NoPermission',
                email: 'TEST_noperm@formation-test.com'
            };

            const response = await request(app)
                .post('/professors')
                .set('Authorization', `Bearer ${receptionToken}`)
                .send(payload);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /professors (Consultation)', () => {
        it('should return all professors for authorized Admin', async () => {
            const response = await request(app)
                .get('/professors')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThanOrEqual(1);
        });

        it('should return 403 Forbidden for a Professor role trying to get all professors', async () => {
            const response = await request(app)
                .get('/professors')
                .set('Authorization', `Bearer ${professorToken}`);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });

        it('should stream PDF of professors for authorized Admin', async () => {
            const response = await request(app)
                .get('/professors/export/pdf')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toBe('application/pdf');
        });

        it('should return 403 Forbidden for export PDF requested by a Professor role', async () => {
            const response = await request(app)
                .get('/professors/export/pdf')
                .set('Authorization', `Bearer ${professorToken}`);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });

        it('should return a single professor by ID', async () => {
            const response = await request(app)
                .get(`/professors/${seededProfId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body.data.id).toBe(seededProfId);
        });

        it('should return 404 when professor is not found', async () => {
            const response = await request(app)
                .get('/professors/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Professor not found');
        });
    });

    describe('PATCH /professors/:id (Modification)', () => {
        it('should successfully update professor fields', async () => {
            const updates = {
                telephone: '98765432',
                adresse: 'TEST_NewAddress',
                dayOff: 'Friday'
            };

            const response = await request(app)
                .patch(`/professors/${seededProfId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updates);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');

            // Verify database update
            const dbProf = await prisma.professor.findUnique({ where: { id: seededProfId } });
            expect(dbProf.telephone).toBe('98765432');
            expect(dbProf.adresse).toBe('TEST_NewAddress');
            expect(dbProf.dayOff).toBe('Friday');
        });

        it('should return 409 Conflict when updating email to an existing email', async () => {
            // First create another professor
            const otherProf = await prisma.professor.create({
                data: {
                    nom: 'TEST_OtherProf',
                    prenom: 'TEST_OtherPrenom',
                    email: 'test_other-email@formation-test.com'
                }
            });

            // Try to set seededProf's email to otherProf's email
            const response = await request(app)
                .patch(`/professors/${seededProfId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ email: 'test_other-email@formation-test.com' });

            await prisma.professor.delete({ where: { id: otherProf.id } });

            expect(response.status).toBe(409);
            expect(response.body.error).toBe('Email already exists');
        });

        it('should return 404 when updating non-existent professor', async () => {
            const response = await request(app)
                .patch('/professors/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ nom: 'TEST_Fail' });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Professor not found');
        });
    });

    describe('DELETE /professors/:id (Deletion & Cascades)', () => {
        it('should successfully delete professor and handle SetNull / Cascade rules', async () => {
            // Create a Candidate & Formation & Inscription & Reservation to test cascade
            const candidate = await prisma.candidate.create({
                data: {
                    candidateCode: 'CAN-PROF-DEL',
                    firstName: 'TEST_C',
                    lastName: 'TEST_L',
                    age: 20,
                    occupation: 'STUDENT',
                    observation: 'ALONE'
                }
            });

            const formation = await prisma.formation.create({
                data: {
                    matiere: 'TEST_MatiereDel',
                    niveau: 'TEST_Nouveau'
                }
            });

            const room = await prisma.room.create({
                data: {
                    numero: 'TEST-R-DEL',
                    capacite: 5
                }
            });

            // Create a dedicated professor to delete
            const targetProf = await prisma.professor.create({
                data: {
                    nom: 'TEST_ToDeleteNom',
                    prenom: 'TEST_ToDeletePrenom',
                    email: 'TEST_todel@formation-test.com'
                }
            });

            const inscription = await prisma.inscription.create({
                data: {
                    candidateId: candidate.id,
                    formationId: formation.id,
                    professorId: targetProf.id, // linked prof
                    status: 'ACTIVE'
                }
            });

            const reservation = await prisma.reservation.create({
                data: {
                    reservationCode: 'TESTRES-DEL',
                    reservationDate: '2026-09-09T00:00:00.000Z',
                    startTime: '2026-09-09T18:00:00.000Z',
                    endTime: '2026-09-09T20:00:00.000Z',
                    inscriptionId: inscription.id,
                    professorId: targetProf.id, // linked prof
                    roomId: room.id
                }
            });

            // Trigger delete request
            const response = await request(app)
                .delete(`/professors/${targetProf.id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);

            // 1. Verify professor is deleted
            const dbProfExists = await prisma.professor.findUnique({ where: { id: targetProf.id } });
            expect(dbProfExists).toBeNull();

            // 2. Verify settings: Inscription.professorId must be SetNull
            const dbInscription = await prisma.inscription.findUnique({ where: { id: inscription.id } });
            expect(dbInscription).toBeDefined();
            expect(dbInscription.professorId).toBeNull(); // successfully set null by DB schema constraint!

            // 3. Verify settings: Reservation linked to deleted professor must be Cascade deleted
            const dbReservation = await prisma.reservation.findUnique({ where: { id: reservation.id } });
            expect(dbReservation).toBeNull(); // successfully cascade deleted!

            // Clean up other resources
            await prisma.inscription.delete({ where: { id: inscription.id } });
            await prisma.candidate.delete({ where: { id: candidate.id } });
            await prisma.formation.delete({ where: { id: formation.id } });
            await prisma.room.delete({ where: { id: room.id } });
        });

        it('should return 404 when deleting non-existent professor', async () => {
            const response = await request(app)
                .delete('/professors/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Professor not found');
        });
    });
});
