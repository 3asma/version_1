import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import prisma from '../../config/prisma.js';

describe('Candidate Integration Tests (PostgreSQL Test DB)', () => {
    let adminToken = '';
    let receptionToken = ''; // No manage_candidates permission
    let createdCandidateId = '';

    beforeAll(async () => {
        // 1. Authenticate as Admin to get a token with full permissions
        const adminLogin = await request(app)
            .post('/auth/login')
            .send({
                email: 'admin@formation.com',
                password: 'demo'
            });
        adminToken = adminLogin.body.token;

        // 2. Authenticate as Agent Reception to get a token with limited permissions
        const receptionLogin = await request(app)
            .post('/auth/login')
            .send({
                email: 'reception@formation.com',
                password: 'demo'
            });
        receptionToken = receptionLogin.body.token;

        // Cleanup any leftovers before starting
        await prisma.candidate.deleteMany({
            where: {
                email: {
                    in: [
                        'test-jean.dupont@formation.com',
                        'test-invalid@formation.com',
                        'duplicate-candidate@formation.com'
                    ]
                }
            }
        });
    });

    afterAll(async () => {
        // Cleanup all candidates created during tests
        await prisma.candidate.deleteMany({
            where: {
                email: {
                    in: [
                        'test-jean.dupont@formation.com',
                        'test-invalid@formation.com',
                        'duplicate-candidate@formation.com'
                    ]
                }
            }
        });
    });

    describe('POST /candidates (Creation)', () => {
        it('should successfully create a helper candidate with valid payload when authorized', async () => {
            const payload = {
                firstName: 'TEST_Jean',
                lastName: 'TEST_Dupont',
                age: 28,
                occupation: 'STUDENT',
                observation: 'ALONE',
                email: 'test-jean.dupont@formation.com',
                phone: '123456789'
            };

            const response = await request(app)
                .post('/candidates')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('success');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.firstName).toBe('Test_jean');
            expect(response.body.data.lastName).toBe('TEST_DUPONT');
            expect(response.body.data.age).toBe(payload.age);
            expect(response.body.data.occupation).toBe(payload.occupation);

            createdCandidateId = response.body.data.id;

            // Verify in PostgreSQL isolated database schema directly
            const dbCandidate = await prisma.candidate.findUnique({
                where: { id: createdCandidateId }
            });
            expect(dbCandidate).toBeDefined();
            expect(dbCandidate.email).toBe(payload.email);
        });

        it('should fail with 400 when missing required fields', async () => {
            const incompletePayload = {
                firstName: 'TEST_Incomplete',
                // missing lastName, age, occupation, observation
            };

            const response = await request(app)
                .post('/candidates')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(incompletePayload);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('error');
            expect(response.body.error).toContain('Missing required fields');
        });

        it('should fail with 400 when age is negative or non-numeric', async () => {
            const invalidAgePayload = {
                firstName: 'TEST_InvalidBase',
                lastName: 'TEST_User',
                age: -5,
                occupation: 'EMPLOYEE',
                observation: 'ACCOMPANIED'
            };

            const response = await request(app)
                .post('/candidates')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(invalidAgePayload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Age must be a positive number');
        });

        it('should fail with 400 when occupation is invalid', async () => {
            const invalidOccupation = {
                firstName: 'TEST_InvalidBase',
                lastName: 'TEST_User',
                age: 22,
                occupation: 'DOCTOR', // Invalid (must be STUDENT or EMPLOYEE)
                observation: 'ACCOMPANIED'
            };

            const response = await request(app)
                .post('/candidates')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(invalidOccupation);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Occupation must be STUDENT or EMPLOYEE');
        });

        it('should fail with 400 when observation is invalid', async () => {
            const invalidObservation = {
                firstName: 'TEST_InvalidBase',
                lastName: 'TEST_User',
                age: 22,
                occupation: 'EMPLOYEE',
                observation: 'WITH_FRIENDS' // Invalid (must be ALONE or ACCOMPANIED)
            };

            const response = await request(app)
                .post('/candidates')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(invalidObservation);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Observation must be ALONE or ACCOMPANIED');
        });

        it('should fail with 400 when email format is invalid', async () => {
            const invalidEmail = {
                firstName: 'TEST_InvalidBase',
                lastName: 'TEST_User',
                age: 22,
                occupation: 'EMPLOYEE',
                observation: 'ALONE',
                email: 'invalid-email-address'
            };

            const response = await request(app)
                .post('/candidates')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(invalidEmail);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Invalid email format');
        });

        it('should fail with 409 Conflict when creating a candidate with a duplicate email', async () => {
            // First create a candidate with clean payload
            const payload = {
                firstName: 'TEST_First',
                lastName: 'TEST_User',
                age: 30,
                occupation: 'STUDENT',
                observation: 'ALONE',
                email: 'duplicate-candidate@formation.com'
            };

            const response1 = await request(app)
                .post('/candidates')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);
            expect(response1.status).toBe(201);

            // Attempt to create another candidate with same email
            const response2 = await request(app)
                .post('/candidates')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    ...payload,
                    firstName: 'TEST_Second'
                });

            expect(response2.status).toBe(409);
            expect(response2.body.error).toBe('Email already in use');
        });

        it('should fail with 403 Forbidden when user role lacks manage_candidates permission', async () => {
            const payload = {
                firstName: 'TEST_Jean',
                lastName: 'TEST_Dupont',
                age: 28,
                occupation: 'STUDENT',
                observation: 'ALONE',
                email: 'test-invalid@formation.com'
            };

            const response = await request(app)
                .post('/candidates')
                .set('Authorization', `Bearer ${receptionToken}`)
                .send(payload);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });

    describe('GET /candidates/:id', () => {
        it('should successfully get an existing candidate', async () => {
            const response = await request(app)
                .get(`/candidates/${createdCandidateId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body.data.id).toBe(createdCandidateId);
            expect(response.body.data.firstName).toBe('Test_jean');
        });

        it('should return 404 for a nonexistent candidate ID', async () => {
            const response = await request(app)
                .get('/candidates/nonexistent-candidate-uuid')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Candidate not found');
        });
    });

    describe('PATCH /candidates/:id', () => {
        it('should successfully modify candidate properties', async () => {
            const patchPayload = {
                firstName: 'TEST_Jean_Modified',
                age: 29
            };

            const response = await request(app)
                .patch(`/candidates/${createdCandidateId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(patchPayload);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body.data.firstName).toBe('Test_jean_modified');
            expect(response.body.data.age).toBe(patchPayload.age);

            // Double check inside DB directly
            const dbCandidate = await prisma.candidate.findUnique({
                where: { id: createdCandidateId }
            });
            expect(dbCandidate.firstName).toBe('Test_jean_modified');
            expect(dbCandidate.age).toBe(patchPayload.age);
        });
    });

    describe('DELETE /candidates/:id', () => {
        it('should successfully delete candidate and verify it no longer exists', async () => {
            const response = await request(app)
                .delete(`/candidates/${createdCandidateId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');

            // Verify inside database directly
            const dbCandidate = await prisma.candidate.findUnique({
                where: { id: createdCandidateId }
            });
            expect(dbCandidate).toBeNull();
        });
    });
});
