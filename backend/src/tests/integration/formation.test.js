import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import prisma from '../../config/prisma.js';

describe('Formation Integration Tests (PostgreSQL Test DB)', () => {
    let adminToken = '';
    let receptionToken = ''; // Lack view_formations / manage_formations

    let seededFormationId = '';
    const seededFormationMatiere = 'TEST-MATIERE-INIT';
    const seededFormationNiveau = 'TEST-NIVEAU-INIT';

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

        // 2. Clean db from TEST- records. Note that we must drop relations first to satisfy other keys if any.
        await prisma.payment.deleteMany({
            where: {
                OR: [
                    { formation: { matiere: { contains: 'test', mode: 'insensitive' } } },
                    { candidate: { candidateCode: 'CAN-FORM-DEL' } }
                ]
            }
        });
        await prisma.paymentPlan.deleteMany({
            where: {
                OR: [
                    { formation: { matiere: { contains: 'test', mode: 'insensitive' } } },
                    { candidate: { candidateCode: 'CAN-FORM-DEL' } }
                ]
            }
        });
        await prisma.reservation.deleteMany({
            where: {
                inscription: {
                    OR: [
                        { formation: { matiere: { contains: 'test', mode: 'insensitive' } } },
                        { candidate: { candidateCode: 'CAN-FORM-DEL' } }
                    ]
                }
            }
        });
        await prisma.inscription.deleteMany({
            where: {
                OR: [
                    { formation: { matiere: { contains: 'test', mode: 'insensitive' } } },
                    { candidate: { candidateCode: 'CAN-FORM-DEL' } }
                ]
            }
        });
        await prisma.formation.deleteMany({
            where: {
                matiere: { contains: 'test', mode: 'insensitive' }
            }
        });
        await prisma.candidate.deleteMany({
            where: {
                candidateCode: 'CAN-FORM-DEL'
            }
        });
        await prisma.professor.deleteMany({
            where: {
                email: { contains: 'test', mode: 'insensitive' }
            }
        });

        // 3. Seed a formation for testing retrieval and update operations
        const seededForm = await prisma.formation.create({
            data: {
                matiere: seededFormationMatiere,
                niveau: seededFormationNiveau,
                prix: 150.00,
                volumeHoraire: 30
            }
        });
        seededFormationId = seededForm.id;
    });

    afterAll(async () => {
        // Cleanup after all tests
        await prisma.payment.deleteMany({
            where: {
                OR: [
                    { formation: { matiere: { contains: 'test', mode: 'insensitive' } } },
                    { candidate: { candidateCode: 'CAN-FORM-DEL' } }
                ]
            }
        });
        await prisma.paymentPlan.deleteMany({
            where: {
                OR: [
                    { formation: { matiere: { contains: 'test', mode: 'insensitive' } } },
                    { candidate: { candidateCode: 'CAN-FORM-DEL' } }
                ]
            }
        });
        await prisma.reservation.deleteMany({
            where: {
                inscription: {
                    OR: [
                        { formation: { matiere: { contains: 'test', mode: 'insensitive' } } },
                        { candidate: { candidateCode: 'CAN-FORM-DEL' } }
                    ]
                }
            }
        });
        await prisma.inscription.deleteMany({
            where: {
                OR: [
                    { formation: { matiere: { contains: 'test', mode: 'insensitive' } } },
                    { candidate: { candidateCode: 'CAN-FORM-DEL' } }
                ]
            }
        });
        await prisma.formation.deleteMany({
            where: {
                matiere: { contains: 'test', mode: 'insensitive' }
            }
        });
        await prisma.candidate.deleteMany({
            where: {
                candidateCode: 'CAN-FORM-DEL'
            }
        });
        await prisma.professor.deleteMany({
            where: {
                email: { contains: 'test', mode: 'insensitive' }
            }
        });
    });

    describe('POST /formations (Creation)', () => {
        it('should successfully create a new formation', async () => {
            const payload = {
                matiere: 'TEST-Physique',
                niveau: 'TEST-1ere'
            };

            const response = await request(app)
                .post('/formations')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('success');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.matiere).toBe('TEST-Physique');
            expect(response.body.data.niveau).toBe('TEST-1ere');

            const dbForm = await prisma.formation.findUnique({
                where: { id: response.body.data.id }
            });
            expect(dbForm).toBeDefined();
            expect(dbForm.matiere).toBe('TEST-Physique');
            expect(dbForm.niveau).toBe('TEST-1ere');
        });

        it('should return 400 when matiere/subject is missing', async () => {
            const payload = {
                niveau: 'TEST-Seconde'
            };

            const response = await request(app)
                .post('/formations')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('MATIERE_REQUIRED');
        });

        it('should return 400 when niveau/level is missing', async () => {
            const payload = {
                matiere: 'TEST-Chimie'
            };

            const response = await request(app)
                .post('/formations')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('NIVEAU_REQUIRED');
        });

        it('should return 403 when user lacks manage_formations permission', async () => {
            const response = await request(app)
                .post('/formations')
                .set('Authorization', `Bearer ${receptionToken}`)
                .send({
                    matiere: 'TEST-NoPerm',
                    niveau: 'TEST-NoPerm'
                });

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });

    describe('GET /formations (Consultation)', () => {
        it('should return all formations for authorized Admin', async () => {
            const response = await request(app)
                .get('/formations')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThanOrEqual(1);
        });

        it('should stream PDF of formations for authorized Admin', async () => {
            const response = await request(app)
                .get('/formations/export/pdf')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toBe('application/pdf');
        });

        it('should return a single formation by ID', async () => {
            const response = await request(app)
                .get(`/formations/${seededFormationId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body.data.id).toBe(seededFormationId);
            expect(response.body.data.matiere).toBe(seededFormationMatiere);
        });

        it('should return 404 when formation is not found', async () => {
            const response = await request(app)
                .get('/formations/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Formation not found');
        });

        it('should return 403 when user lacks view_formations permission', async () => {
            const response = await request(app)
                .get('/formations')
                .set('Authorization', `Bearer ${receptionToken}`);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });

    describe('PATCH /formations/:id (Modification)', () => {
        it('should successfully update formation attributes', async () => {
            const updates = {
                matiere: 'TEST-UpdatedMatiere',
                niveau: 'TEST-UpdatedNiveau'
            };

            const response = await request(app)
                .patch(`/formations/${seededFormationId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updates);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');

            const dbForm = await prisma.formation.findUnique({ where: { id: seededFormationId } });
            expect(dbForm.matiere).toBe('TEST-UpdatedMatiere');
            expect(dbForm.niveau).toBe('TEST-UpdatedNiveau');
        });

        it('should return 400 when updating matiere to empty string', async () => {
            const response = await request(app)
                .patch(`/formations/${seededFormationId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ matiere: '   ' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('MATIERE_REQUIRED');
        });

        it('should return 400 when updating niveau to empty string', async () => {
            const response = await request(app)
                .patch(`/formations/${seededFormationId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ niveau: '   ' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('NIVEAU_REQUIRED');
        });

        it('should return 404 when updating non-existent formation', async () => {
            const response = await request(app)
                .patch('/formations/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ matiere: 'TEST-Fail' });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Formation not found');
        });

        it('should return 403 when user lacks manage_formations permission for update', async () => {
            const response = await request(app)
                .patch(`/formations/${seededFormationId}`)
                .set('Authorization', `Bearer ${receptionToken}`)
                .send({ matiere: 'TEST-Fail' });

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });

    describe('DELETE /formations/:id (Deletion & Cascades)', () => {
        it('should successfully delete formation and cascade delete inscriptions, payments and paymentPlans', async () => {
            // Seed a temporary candidate, professor, formation to delete
            const candidate = await prisma.candidate.create({
                data: {
                    candidateCode: 'CAN-FORM-DEL',
                    firstName: 'TEST-FormC',
                    lastName: 'TEST-FormL',
                    age: 25,
                    occupation: 'EMPLOYEE',
                    observation: 'ALONE'
                }
            });

            const professor = await prisma.professor.create({
                data: {
                    nom: 'TEST-FormProfN',
                    prenom: 'TEST-FormProfP',
                    email: 'test-form-prof@formation-test.com'
                }
            });

            const tempFormation = await prisma.formation.create({
                data: {
                    matiere: 'TEST-TemporaryMatiere',
                    niveau: 'TEST-TemporaryNiveau'
                }
            });

            const inscription = await prisma.inscription.create({
                data: {
                    candidateId: candidate.id,
                    formationId: tempFormation.id,
                    professorId: professor.id,
                    status: 'ACTIVE'
                }
            });

            const paymentPlan = await prisma.paymentPlan.create({
                data: {
                    candidateId: candidate.id,
                    formationId: tempFormation.id,
                    totalAmount: 180.00
                }
            });

            const payment = await prisma.payment.create({
                data: {
                    paymentCode: 'PAY-FORM-DEL',
                    candidateId: candidate.id,
                    formationId: tempFormation.id,
                    amount: 90.00,
                    paymentMethod: 'CASH',
                    status: 'COMPLETED'
                }
            });

            // Delete the formation
            const response = await request(app)
                .delete(`/formations/${tempFormation.id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);

            // 1. Verify Formation itself is deleted
            const dbForm = await prisma.formation.findUnique({ where: { id: tempFormation.id } });
            expect(dbForm).toBeNull();

            // 2. Verify Inscription is cascade deleted
            const dbInscription = await prisma.inscription.findUnique({ where: { id: inscription.id } });
            expect(dbInscription).toBeNull();

            // 3. Verify PaymentPlan is cascade deleted
            const dbPlan = await prisma.paymentPlan.findUnique({ where: { id: paymentPlan.id } });
            expect(dbPlan).toBeNull();

            // 4. Verify Payment is cascade deleted
            const dbPayment = await prisma.payment.findUnique({ where: { id: payment.id } });
            expect(dbPayment).toBeNull();

            // Cleanup remaining entities
            await prisma.candidate.delete({ where: { id: candidate.id } });
            await prisma.professor.delete({ where: { id: professor.id } });
        });

        it('should return 404 when deleting non-existent formation', async () => {
            const response = await request(app)
                .delete('/formations/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Formation not found');
        });

        it('should return 403 when user lacks manage_formations permission for delete', async () => {
            const response = await request(app)
                .delete(`/formations/${seededFormationId}`)
                .set('Authorization', `Bearer ${receptionToken}`);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });
});
