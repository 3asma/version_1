import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import prisma from '../../config/prisma.js';

describe('Attendance Export PDF Integration Tests', () => {
    let adminToken = '';
    let reservationId = '';

    beforeAll(async () => {
        // Authenticate as Admin to run tests
        const adminLogin = await request(app)
            .post('/auth/login')
            .send({
                email: 'admin@formation.com',
                password: 'demo'
            });
        adminToken = adminLogin.body.token;

        // Fetch a reservation from the DB to test with
        const reservation = await prisma.reservation.findFirst();
        if (reservation) {
            reservationId = reservation.id;
        }
    });

    describe('GET /attendances/reservation/:reservationId/pdf', () => {
        it('should return 401 when unauthorized', async () => {
            const res = await request(app)
                .get(`/attendances/reservation/invalid-id/pdf`);

            expect(res.status).toBe(401);
        });

        it('should return 404 when reservation is not found', async () => {
            const res = await request(app)
                .get(`/attendances/reservation/00000000-0000-0000-0000-000000000000/pdf`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toBe(404);
            expect(res.body.error).toBe('RESERVATION_NOT_FOUND');
        });

        it('should return 200 and stream PDF when reservation is valid', async () => {
            if (!reservationId) {
                console.warn('Skipping test: No reservation found in database.');
                return;
            }

            const res = await request(app)
                .get(`/attendances/reservation/${reservationId}/pdf`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.header['content-type']).toBe('application/pdf');
            expect(res.header['content-disposition']).toContain('attachment; filename="presence_');
        });
    });
});
