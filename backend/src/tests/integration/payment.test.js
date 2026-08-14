import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import prisma from '../../config/prisma.js';
import fs from 'fs';
import path from 'path';

describe('Payment Integration Tests (PostgreSQL Test DB)', () => {
    let adminToken = '';
    let receptionToken = ''; // No manage_payments permission

    let candidateId = '';
    let formationId = '';

    // Paths to dummy assets for file upload
    const dummyPdfPath = path.resolve('src/tests/integration/test-dummy.pdf');
    const dummyTxtPath = path.resolve('src/tests/integration/test-dummy.txt');

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
        await prisma.payment.deleteMany({
            where: {
                candidate: {
                    email: 'pay-candidate@formation-test.com'
                }
            }
        });
        await prisma.candidate.deleteMany({
            where: {
                email: 'pay-candidate@formation-test.com'
            }
        });
        await prisma.formation.deleteMany({
            where: {
                matiere: { startsWith: 'TEST_' }
            }
        });

        // 4. Seed clean dependencies
        const candidate = await prisma.candidate.create({
            data: {
                candidateCode: 'CAN-PAY-99',
                firstName: 'TEST_CandidateName',
                lastName: 'TEST_CandidateLastName',
                email: 'pay-candidate@formation-test.com',
                age: 26,
                occupation: 'STUDENT',
                observation: 'ALONE'
            }
        });
        candidateId = candidate.id;

        const formation = await prisma.formation.create({
            data: {
                matiere: 'TEST_PayScience',
                niveau: 'TEST_Moyen'
            }
        });
        formationId = formation.id;

        // Create dummy files for tests
        fs.writeFileSync(dummyPdfPath, '%PDF-1.4 ... dummy contents ...');
        fs.writeFileSync(dummyTxtPath, 'dummy txt content');
    });

    afterAll(async () => {
        // Clean up mock tables
        await prisma.payment.deleteMany({
            where: {
                candidate: {
                    email: 'pay-candidate@formation-test.com'
                }
            }
        });
        await prisma.candidate.deleteMany({
            where: {
                email: 'pay-candidate@formation-test.com'
            }
        });
        await prisma.formation.deleteMany({
            where: {
                matiere: { startsWith: 'TEST_' }
            }
        });

        // Delete test files
        try { fs.unlinkSync(dummyPdfPath); } catch (e) { }
        try { fs.unlinkSync(dummyTxtPath); } catch (e) { }

        // In addition, clear uploaded test files from uploads/cheques
        const uploadDir = './uploads/cheques';
        if (fs.existsSync(uploadDir)) {
            const files = fs.readdirSync(uploadDir);
            for (const file of files) {
                if (file.startsWith('CHEQUE_') && file.endsWith('.pdf')) {
                    // Check if file is still there and delete
                    try { fs.unlinkSync(path.join(uploadDir, file)); } catch (e) { }
                }
            }
        }
    });

    describe('POST /payments (Valid Nominal Cases - CASH, CARD, CHEQUE)', () => {
        it('should successfully create a CASH payment', async () => {
            const payload = {
                candidateId,
                formationId,
                amount: 350.5,
                paymentMethod: 'CASH',
                status: 'COMPLETED',
                note: 'TEST_CashPayment'
            };

            const response = await request(app)
                .post('/payments')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('success');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.amount).toBe(payload.amount);
            expect(response.body.data.paymentMethod).toBe('CASH');

            // Verify in DB
            const dbPayment = await prisma.payment.findUnique({
                where: { id: response.body.data.id }
            });
            expect(dbPayment).toBeDefined();
            expect(dbPayment.status).toBe('COMPLETED');
            expect(dbPayment.candidateId).toBe(candidateId);
            expect(dbPayment.formationId).toBe(formationId);
        });

        it('should successfully create a CARD payment', async () => {
            const payload = {
                candidateId,
                formationId,
                amount: 1500,
                paymentMethod: 'CARD',
                status: 'COMPLETED'
            };

            const response = await request(app)
                .post('/payments')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body.data.paymentMethod).toBe('CARD');
        });

        it('should successfully create a CHEQUE payment with attachment and valid checkDueDate', async () => {
            const checkDueDate = '2026-10-20T00:00:00.000Z';

            const response = await request(app)
                .post('/payments')
                .set('Authorization', `Bearer ${adminToken}`)
                .field('candidateId', candidateId)
                .field('formationId', formationId)
                .field('amount', 700)
                .field('paymentMethod', 'CHEQUE')
                .field('status', 'PENDING')
                .field('checkDueDate', checkDueDate)
                .attach('chequeFile', dummyPdfPath);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('success');
            expect(response.body.data.paymentMethod).toBe('CHEQUE');
            expect(response.body.data.status).toBe('PENDING');
            expect(response.body.data.chequeFile).toBeDefined();
            expect(response.body.data.chequeFile).toContain('uploads/cheques/CHEQUE_');

            // Verify checkDueDate conversion and persistence
            const dbPayment = await prisma.payment.findUnique({
                where: { id: response.body.data.id }
            });
            expect(dbPayment.chequeFile).toBe(response.body.data.chequeFile);

            // Check that the payment date is set to cheque due date
            const payTime = new Date(dbPayment.paymentDate).getTime();
            const expectedDate = new Date(checkDueDate);
            expectedDate.setHours(0, 0, 0, 0);
            expect(payTime).toBe(expectedDate.getTime());
        });
    });

    describe('POST /payments (Cheque Validations & Errors)', () => {
        it('should return 400 when CHEQUE is submitted without a chequeFile', async () => {
            const response = await request(app)
                .post('/payments')
                .set('Authorization', `Bearer ${adminToken}`)
                .field('candidateId', candidateId)
                .field('formationId', formationId)
                .field('amount', 300)
                .field('paymentMethod', 'CHEQUE')
                .field('checkDueDate', '2026-10-10T00:00:00.000Z');

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Cheque PDF file is required');
        });

        it('should return 400 when CHEQUE is submitted with an invalid file mimetype (e.g. txt)', async () => {
            const response = await request(app)
                .post('/payments')
                .set('Authorization', `Bearer ${adminToken}`)
                .field('candidateId', candidateId)
                .field('formationId', formationId)
                .field('amount', 300)
                .field('paymentMethod', 'CHEQUE')
                .field('checkDueDate', '2026-10-10T00:00:00.000Z')
                .attach('chequeFile', dummyTxtPath);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('INVALID_FILE_TYPE');
        });

        it('should return 400 when CHEQUE has file but checkDueDate is missing', async () => {
            const response = await request(app)
                .post('/payments')
                .set('Authorization', `Bearer ${adminToken}`)
                .field('candidateId', candidateId)
                .field('formationId', formationId)
                .field('amount', 300)
                .field('paymentMethod', 'CHEQUE')
                .attach('chequeFile', dummyPdfPath);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Missing cheque due date');
        });

        it('should return 400 when checkDueDate is before payment date (now)', async () => {
            const pastDate = '2025-01-01T00:00:00.000Z'; // anterior checkDueDate

            const response = await request(app)
                .post('/payments')
                .set('Authorization', `Bearer ${adminToken}`)
                .field('candidateId', candidateId)
                .field('formationId', formationId)
                .field('amount', 400)
                .field('paymentMethod', 'CHEQUE')
                .field('checkDueDate', pastDate)
                .field('paymentDate', '2026-08-01T00:00:00.000Z')
                .attach('chequeFile', dummyPdfPath);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Cheque due date cannot be before payment date');
        });
    });

    describe('POST /payments (General Input Validations)', () => {
        it('should return 400 when missing candidateId', async () => {
            const payload = {
                formationId,
                amount: 100,
                paymentMethod: 'CASH'
            };

            const response = await request(app)
                .post('/payments')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toContain('Missing required fields');
        });

        it('should return 400 when amount is negative', async () => {
            const payload = {
                candidateId,
                formationId,
                amount: -50,
                paymentMethod: 'CASH'
            };

            const response = await request(app)
                .post('/payments')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Amount must be a positive number');
        });

        it('should return 400 when paymentMethod is invalid', async () => {
            const payload = {
                candidateId,
                formationId,
                amount: 100,
                paymentMethod: 'BITCOIN'
            };

            const response = await request(app)
                .post('/payments')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toContain('Invalid paymentMethod');
        });

        it('should return 404 when candidate does not exist', async () => {
            const payload = {
                candidateId: '00000000-0000-0000-0000-000000000000',
                formationId,
                amount: 100,
                paymentMethod: 'CASH'
            };

            const response = await request(app)
                .post('/payments')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Candidate not found');
        });
    });

    describe('POST /payments (Permissions)', () => {
        it('should return 403 Forbidden when user lacks manage_payments permission', async () => {
            const payload = {
                candidateId,
                formationId,
                amount: 500,
                paymentMethod: 'CASH'
            };

            const response = await request(app)
                .post('/payments')
                .set('Authorization', `Bearer ${receptionToken}`)
                .send(payload);

            expect(response.status).toBe(403);
        });
    });
});
