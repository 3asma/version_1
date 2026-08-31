import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';

describe('Planning Export PDF Integration Tests', () => {
    let adminToken = '';

    beforeAll(async () => {
        // Authenticate as Admin to run tests
        const adminLogin = await request(app)
            .post('/auth/login')
            .send({
                email: 'admin@formation.com',
                password: 'demo'
            });
        adminToken = adminLogin.body.token;
    });

    describe('GET /planning/export/pdf', () => {
        it('should return 400 when date is missing or invalid', async () => {
            const res = await request(app)
                .get('/planning/export/pdf')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toBe(400);
            expect(res.body.error).toBe('DATE_REQUIRED');
        });

        it('should return 200 and stream PDF when request parameters are valid', async () => {
            const res = await request(app)
                .get('/planning/export/pdf?date=2026-08-16&viewMode=weekly')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.header['content-type']).toBe('application/pdf');
            expect(res.header['content-disposition']).toContain('attachment; filename="planning_2026-08-16.pdf"');
        });

        it('should handle filters and stream PDF correctly', async () => {
            const res = await request(app)
                .get('/planning/export/pdf?date=2026-08-16&viewMode=daily&tab=weekly')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.header['content-type']).toBe('application/pdf');
        });
    });
});
