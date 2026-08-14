import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import prisma from '../../config/prisma.js';

describe('Inscription Integration Tests (PostgreSQL Test DB)', () => {
    let adminToken = '';
    let receptionToken = ''; // No manage_candidates permission

    // IDs for seeding
    let candidateMonoId = '';
    let candidateBi1Id = '';
    let candidateBi2Id = '';
    let candidateGrp1Id = '';
    let candidateGrp2Id = '';
    let formationAId = '';
    let formationBId = '';

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

        // 3. Clear existing test data to avoid overlap
        await prisma.inscription.deleteMany({
            where: {
                formation: {
                    matiere: { startsWith: 'TEST_' }
                }
            }
        });
        await prisma.candidate.deleteMany({
            where: {
                email: {
                    in: [
                        'mono@formation-test.com',
                        'bi1@formation-test.com',
                        'bi2@formation-test.com',
                        'grp1@formation-test.com',
                        'grp2@formation-test.com'
                    ]
                }
            }
        });
        await prisma.formation.deleteMany({
            where: {
                matiere: { startsWith: 'TEST_' }
            }
        });

        // 4. Seed clean Candidates
        const candMono = await prisma.candidate.create({
            data: {
                candidateCode: 'CAN-TEST-1',
                firstName: 'TEST_Mono',
                lastName: 'TEST_LastName',
                email: 'mono@formation-test.com',
                age: 20,
                occupation: 'STUDENT',
                observation: 'ALONE'
            }
        });
        candidateMonoId = candMono.id;

        const candBi1 = await prisma.candidate.create({
            data: {
                candidateCode: 'CAN-TEST-2',
                firstName: 'TEST_BiOne',
                lastName: 'TEST_LastName',
                email: 'bi1@formation-test.com',
                age: 21,
                occupation: 'STUDENT',
                observation: 'ALONE'
            }
        });
        candidateBi1Id = candBi1.id;

        const candBi2 = await prisma.candidate.create({
            data: {
                candidateCode: 'CAN-TEST-3',
                firstName: 'TEST_BiTwo',
                lastName: 'TEST_LastName',
                email: 'bi2@formation-test.com',
                age: 22,
                occupation: 'STUDENT',
                observation: 'ALONE'
            }
        });
        candidateBi2Id = candBi2.id;

        const candGrp1 = await prisma.candidate.create({
            data: {
                candidateCode: 'CAN-TEST-4',
                firstName: 'TEST_GrpOne',
                lastName: 'TEST_LastName',
                email: 'grp1@formation-test.com',
                age: 23,
                occupation: 'STUDENT',
                observation: 'ALONE'
            }
        });
        candidateGrp1Id = candGrp1.id;

        const candGrp2 = await prisma.candidate.create({
            data: {
                candidateCode: 'CAN-TEST-5',
                firstName: 'TEST_GrpTwo',
                lastName: 'TEST_LastName',
                email: 'grp2@formation-test.com',
                age: 24,
                occupation: 'STUDENT',
                observation: 'ALONE'
            }
        });
        candidateGrp2Id = candGrp2.id;

        // 5. Seed clean Formations
        const formA = await prisma.formation.create({
            data: {
                matiere: 'TEST_Math',
                niveau: 'TEST_Terminale'
            }
        });
        formationAId = formA.id;

        const formB = await prisma.formation.create({
            data: {
                matiere: 'TEST_Physique',
                niveau: 'TEST_Seconde'
            }
        });
        formationBId = formB.id;
    });

    afterAll(async () => {
        // Clean up everything we created
        await prisma.inscription.deleteMany({
            where: {
                formation: {
                    matiere: { startsWith: 'TEST_' }
                }
            }
        });
        await prisma.candidate.deleteMany({
            where: {
                email: {
                    in: [
                        'mono@formation-test.com',
                        'bi1@formation-test.com',
                        'bi2@formation-test.com',
                        'grp1@formation-test.com',
                        'grp2@formation-test.com'
                    ]
                }
            }
        });
        await prisma.formation.deleteMany({
            where: {
                matiere: { startsWith: 'TEST_' }
            }
        });
    });

    describe('POST /inscriptions (Creation & Persistence)', () => {
        it('should successfully create a new MONOME inscription and match default group name', async () => {
            const payload = {
                inscriptionCode: 'INS-MONO-99',
                candidateId: candidateMonoId,
                formationId: formationAId,
                learningMode: 'MONOME',
                status: 'WAITING',
                volumeHoraire: 30,
                price: 1500
            };

            const response = await request(app)
                .post('/inscriptions')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('success');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.learningMode).toBe('MONOME');
            expect(response.body.data.status).toBe('WAITING');
            expect(response.body.data.price).toBe(payload.price);
            expect(response.body.data.volumeHoraire).toBe(payload.volumeHoraire);

            // Verify group creation in database model
            const dbGroup = await prisma.group.findUnique({
                where: { inscriptionId: response.body.data.id }
            });
            expect(dbGroup).toBeDefined();
            // In MONOME, group name should be: `Monôme ${candidate.firstName} ${candidate.lastName}`
            // candidateMono matches input formatting logic
            expect(dbGroup.nom).toBe('Monôme TEST_Mono TEST_LastName');

            // Verify Inscription relation in DB
            const dbInscription = await prisma.inscription.findUnique({
                where: { id: response.body.data.id },
                include: { members: true }
            });
            expect(dbInscription).toBeDefined();
            expect(dbInscription.formationId).toBe(formationAId);
            expect(dbInscription.members.length).toBe(1);
            expect(dbInscription.members[0].candidateId).toBe(candidateMonoId);
        });

        it('should successfully create a BINOME inscription with two candidateIds', async () => {
            const payload = {
                inscriptionCode: 'INS-BI-99',
                candidateIds: [candidateBi1Id, candidateBi2Id],
                formationId: formationAId,
                learningMode: 'BINOME',
                status: 'WAITING'
            };

            const response = await request(app)
                .post('/inscriptions')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('success');

            const dbGroup = await prisma.group.findUnique({
                where: { inscriptionId: response.body.data.id }
            });
            expect(dbGroup.nom).toBe(`Binôme - ${payload.inscriptionCode}`);

            const dbInscription = await prisma.inscription.findUnique({
                where: { id: response.body.data.id },
                include: { members: true }
            });
            expect(dbInscription.members.length).toBe(2);
            const memberIds = dbInscription.members.map(m => m.candidateId);
            expect(memberIds).toContain(candidateBi1Id);
            expect(memberIds).toContain(candidateBi2Id);
        });

        it('should successfully create a GROUPE inscription', async () => {
            const payload = {
                inscriptionCode: 'INS-GRP-99',
                candidateIds: [candidateGrp1Id, candidateGrp2Id],
                formationId: formationAId,
                learningMode: 'GROUPE',
                status: 'WAITING'
            };

            const response = await request(app)
                .post('/inscriptions')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('success');

            const dbGroup = await prisma.group.findUnique({
                where: { inscriptionId: response.body.data.id }
            });
            // Group GROUPE has name: `Groupe ${formation.matiere} - ${inscriptionCode}`
            // formationA.matiere is TEST_Math
            expect(dbGroup.nom).toBe(`Groupe TEST_Math - ${payload.inscriptionCode}`);

            const dbInscription = await prisma.inscription.findUnique({
                where: { id: response.body.data.id },
                include: { members: true }
            });
            expect(dbInscription.members.length).toBe(2);
        });
    });

    describe('POST /inscriptions (Validations)', () => {
        it('should return 400 when inscriptionCode is missing', async () => {
            const payload = {
                candidateId: candidateMonoId,
                formationId: formationAId
            };

            const response = await request(app)
                .post('/inscriptions')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('INSCRIPTION_CODE_REQUIRED');
        });

        it('should return 400 when candidateId and candidateIds are missing', async () => {
            const payload = {
                inscriptionCode: 'INS-VALID-99',
                formationId: formationAId
            };

            const response = await request(app)
                .post('/inscriptions')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('CANDIDATE_ID_REQUIRED');
        });

        it('should return 400 when formationId is missing', async () => {
            const payload = {
                inscriptionCode: 'INS-VALID-99',
                candidateId: candidateMonoId
            };

            const response = await request(app)
                .post('/inscriptions')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('FORMATION_ID_REQUIRED');
        });

        it('should return 404 when candidateId does not exist', async () => {
            const payload = {
                inscriptionCode: 'INS-VALID-99',
                candidateId: '00000000-0000-0000-0000-000000000000',
                formationId: formationAId
            };

            const response = await request(app)
                .post('/inscriptions')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(404);
            expect(response.body.error).toContain('CANDIDATE_NOT_FOUND');
        });

        it('should return 404 when formationId does not exist', async () => {
            const payload = {
                inscriptionCode: 'INS-VALID-99',
                candidateId: candidateMonoId,
                formationId: '00000000-0000-0000-0000-000000000000'
            };

            const response = await request(app)
                .post('/inscriptions')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(404);
            expect(response.body.error).toContain('FORMATION_NOT_FOUND');
        });
    });

    describe('POST /inscriptions (Duplicates)', () => {
        it('should return 409 when candidate already has an active inscription for the same formation', async () => {
            // First inscription created in the first test (candidateMonoId, formationAId).
            // Attempting to create duplicate active inscription on same candidate & formation.
            const payload = {
                inscriptionCode: 'INS-DUPL-99',
                candidateId: candidateMonoId,
                formationId: formationAId,
                learningMode: 'MONOME',
                status: 'ACTIVE'
            };

            const response = await request(app)
                .post('/inscriptions')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(409);
            expect(response.body.error).toBe('Candidate already has an ACTIVE inscription');
        });

        it('should return 409 when inscriptionCode already exists in db', async () => {
            // INS-BI-99 was created in the BINOME test.
            // Attempt to create another inscription with same inscriptionCode.
            // Since effectiveMode matches BINOME conflict rule in checkInscriptionCodeConflict.
            const payload = {
                inscriptionCode: 'INS-BI-99',
                candidateId: candidateBi1Id,
                formationId: formationBId,
                learningMode: 'BINOME'
            };

            const response = await request(app)
                .post('/inscriptions')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(409);
            expect(response.body.error).toBe("Le numéro d'inscription existe déjà.");
        });
    });

    describe('POST /inscriptions (Permissions)', () => {
        it('should return 403 Forbidden when role does not have manage_candidates permission', async () => {
            const payload = {
                inscriptionCode: 'INS-PERM-99',
                candidateId: candidateMonoId,
                formationId: formationAId
            };

            const response = await request(app)
                .post('/inscriptions')
                .set('Authorization', `Bearer ${receptionToken}`)
                .send(payload);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });
});
