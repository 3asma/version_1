import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import app from '../../app.js';
import prisma from '../../config/prisma.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Authentication Integration Tests (PostgreSQL Test DB)', () => {
    const metadataPath = path.resolve(__dirname, '../../config/users_metadata.json');
    let originalMetadataContent = '';
    const inactiveUserEmail = 'inactive-test@formation.com';

    beforeAll(async () => {
        // 1. Back up users_metadata.json and inject an inactive user metadata entry
        if (fs.existsSync(metadataPath)) {
            originalMetadataContent = fs.readFileSync(metadataPath, 'utf-8');
            const metadata = JSON.parse(originalMetadataContent);
            metadata[inactiveUserEmail] = {
                name: 'Test Inactif',
                status: 'inactive',
                role: 'candidate'
            };
            fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
        }

        // 2. Create the inactive user in the isolated PostgreSQL test database
        const hashedPassword = await bcrypt.hash('demo', 10);
        await prisma.user.upsert({
            where: { email: inactiveUserEmail },
            update: { password: hashedPassword },
            create: {
                email: inactiveUserEmail,
                password: hashedPassword,
                role: 'USER'
            }
        });
    });

    afterAll(async () => {
        // 1. Restore the original users_metadata.json
        if (originalMetadataContent) {
            fs.writeFileSync(metadataPath, originalMetadataContent, 'utf-8');
        }

        // 2. Cleanup the test user from local schema db
        try {
            await prisma.user.delete({ where: { email: inactiveUserEmail } });
        } catch (e) {
            // Ignore if deleted or database is unreachable
        }
    });

    describe('POST /auth/login', () => {
        it('should successfully log in with valid credentials and return a JWT token', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'admin@formation.com',
                    password: 'demo'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body).toHaveProperty('token');
            expect(typeof response.body.token).toBe('string');
            expect(response.body.user).toBeDefined();
            expect(response.body.user.email).toBe('admin@formation.com');
            expect(response.body.user.role).toBe('admin');
        });

        it('should fail with 401 when the email is not registered', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'nonexistent-user-auth-test@formation.com',
                    password: 'demo'
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('error');
            expect(response.body.error).toBe('User not found.');
        });

        it('should fail with 401 when the password is incorrect', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'admin@formation.com',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('error');
            expect(response.body.error).toBe('Invalid credentials.');
        });

        it('should fail with 400 when email or password is missing', async () => {
            const response1 = await request(app)
                .post('/auth/login')
                .send({
                    email: 'admin@formation.com'
                });

            expect(response1.status).toBe(400);
            expect(response1.body.message).toBe('error');
            expect(response1.body.error).toBe('Email and password are required.');

            const response2 = await request(app)
                .post('/auth/login')
                .send({
                    password: 'demo'
                });

            expect(response2.status).toBe(400);
            expect(response2.body.message).toBe('error');
            expect(response2.body.error).toBe('Email and password are required.');
        });

        it('should fail with 403 when the account is deactivated', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: inactiveUserEmail,
                    password: 'demo'
                });

            expect(response.status).toBe(403);
            expect(response.body.message).toBe('error');
            expect(response.body.error).toContain('Account disabled');
        });
    });
});
