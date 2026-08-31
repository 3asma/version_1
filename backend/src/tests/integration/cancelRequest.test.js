import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../app.js';
import prisma from '../../config/prisma.js';

describe('CancelRequest Integration Tests (PostgreSQL Test DB)', () => {
    let adminToken = '';
    let receptionToken = '';  // Lacks manage_reservations permission
    let profToken = '';       // Has role PROFESSOR and owns the reservation
    let otherProfToken = '';  // Has role PROFESSOR but does NOT own the reservation

    let assignedProfId = '';
    let otherProfId = '';
    let seededCandidateId = '';
    let seededReservationId = '';      // Scheduled in 48 hours (valid)
    let seededReservationShortId = ''; // Scheduled in 10 hours (violates 24h rule)
    let seededReservationCancelledId = ''; // Already cancelled

    let PENDING_cancelRequestId = '';
    let APPROVED_cancelRequestId = '';

    beforeAll(async () => {
        // 1. Authenticate Admin and reception users (seeded by default seed.js)
        const adminLogin = await request(app)
            .post('/auth/login')
            .send({ email: 'admin@formation.com', password: 'demo' });
        adminToken = adminLogin.body.token;

        const receptionLogin = await request(app)
            .post('/auth/login')
            .send({ email: 'reception@formation.com', password: 'demo' });
        receptionToken = receptionLogin.body.token;

        // 2. Clean database of any preexisting records with test tags
        await prisma.cancelRequest.deleteMany({
            where: {
                OR: [
                    { reservation: { reservationCode: { startsWith: 'RES-CAN-' } } },
                    { professor: { email: { in: ['prof-cancel@formation.com', 'prof-cancel-other@formation.com'] } } }
                ]
            }
        });
        await prisma.reservation.deleteMany({
            where: { reservationCode: { startsWith: 'RES-CAN-' } }
        });
        await prisma.inscription.deleteMany({
            where: {
                candidate: { candidateCode: { startsWith: 'CAN-CAN-' } }
            }
        });
        await prisma.candidate.deleteMany({
            where: { candidateCode: { startsWith: 'CAN-CAN-' } }
        });
        await prisma.professor.deleteMany({
            where: { email: { in: ['prof-cancel@formation.com', 'prof-cancel-other@formation.com'] } }
        });
        await prisma.user.deleteMany({
            where: {
                email: { in: ['prof-cancel@formation.com', 'prof-cancel-other@formation.com'] }
            }
        });
        await prisma.room.deleteMany({
            where: { numero: { startsWith: 'RM-CAN-' } }
        });
        await prisma.formation.deleteMany({
            where: { matiere: { startsWith: 'FOR-CAN-' } }
        });

        // 3. Create Professors
        // Note: For users_metadata.json lookup, we need emails that match "role": "professor"
        // Let's use rachid.bouazza@demo.com and nora.belkhayat@demo.com from users_metadata.json
        const assignedProf = await prisma.professor.create({
            data: {
                nom: 'TEST-Rachid',
                prenom: 'TEST-Cancel',
                email: 'rachid.bouazza@demo.com'
            }
        });
        assignedProfId = assignedProf.id;

        const otherProf = await prisma.professor.create({
            data: {
                nom: 'TEST-Nora',
                prenom: 'TEST-Cancel',
                email: 'nora.belkhayat@demo.com'
            }
        });
        otherProfId = otherProf.id;

        // 4. Create User records in database so they can log in
        const hashedPassword = await bcrypt.hash('demo', 10);
        await prisma.user.create({
            data: {
                email: 'rachid.bouazza@demo.com',
                password: hashedPassword,
                role: 'USER'
            }
        });

        await prisma.user.create({
            data: {
                email: 'nora.belkhayat@demo.com',
                password: hashedPassword,
                role: 'USER'
            }
        });

        // 5. Authenticate professors
        const profLogin = await request(app)
            .post('/auth/login')
            .send({ email: 'rachid.bouazza@demo.com', password: 'demo' });
        profToken = profLogin.body.token;

        const otherProfLogin = await request(app)
            .post('/auth/login')
            .send({ email: 'nora.belkhayat@demo.com', password: 'demo' });
        otherProfToken = otherProfLogin.body.token;

        // 6. Create static room & formation for reservation
        const room = await prisma.room.create({
            data: {
                numero: 'RM-CAN-1',
                capacite: 10
            }
        });

        const formation = await prisma.formation.create({
            data: {
                matiere: 'FOR-CAN-MATH',
                niveau: 'FOR-CAN-NIV'
            }
        });

        // 7. Seed active candidates
        const candidate = await prisma.candidate.create({
            data: {
                candidateCode: 'CAN-CAN-MAIN',
                firstName: 'Cancel',
                lastName: 'Candidate1',
                age: 20,
                occupation: 'STUDENT',
                observation: 'ALONE',
                status: 'ACTIVE'
            }
        });
        seededCandidateId = candidate.id;

        // 8. Create Inscriptions
        const inscription = await prisma.inscription.create({
            data: {
                candidateId: candidate.id,
                formationId: formation.id,
                professorId: assignedProf.id,
                status: 'ACTIVE'
            }
        });

        // 9. Generate future timestamps relative to test runtime
        const now = new Date();
        const fortyEightHoursInFuture = new Date(now.getTime() + 48 * 60 * 60 * 1000);
        const tenHoursInFuture = new Date(now.getTime() + 10 * 60 * 60 * 1000);

        // 10. Create valid Reservation (48 hours in future, PENDING)
        const reservation = await prisma.reservation.create({
            data: {
                reservationCode: 'RES-CAN-VALID',
                reservationDate: fortyEightHoursInFuture,
                startTime: fortyEightHoursInFuture,
                endTime: new Date(fortyEightHoursInFuture.getTime() + 60 * 60 * 1000),
                status: 'PENDING',
                inscriptionId: inscription.id,
                professorId: assignedProf.id,
                roomId: room.id
            }
        });
        seededReservationId = reservation.id;

        // 11. Create violating Reservation (10 hours in future, PENDING)
        const reservationShort = await prisma.reservation.create({
            data: {
                reservationCode: 'RES-CAN-SHORT',
                reservationDate: tenHoursInFuture,
                startTime: tenHoursInFuture,
                endTime: new Date(tenHoursInFuture.getTime() + 60 * 60 * 1000),
                status: 'PENDING',
                inscriptionId: inscription.id,
                professorId: assignedProf.id,
                roomId: room.id
            }
        });
        seededReservationShortId = reservationShort.id;

        // 12. Create already CANCELLED reservation
        const dateCancelled = new Date(fortyEightHoursInFuture.getTime() + 2 * 60 * 60 * 1000);
        const reservationCancelled = await prisma.reservation.create({
            data: {
                reservationCode: 'RES-CAN-CANCELLED',
                reservationDate: dateCancelled,
                startTime: dateCancelled,
                endTime: new Date(dateCancelled.getTime() + 60 * 60 * 1000),
                status: 'CANCELLED',
                inscriptionId: inscription.id,
                professorId: assignedProf.id,
                roomId: room.id
            }
        });
        seededReservationCancelledId = reservationCancelled.id;

        // 13. Create a reservation that already has a PENDING cancel request
        const datePending = new Date(fortyEightHoursInFuture.getTime() + 4 * 60 * 60 * 1000);
        const reservationWithPending = await prisma.reservation.create({
            data: {
                reservationCode: 'RES-CAN-PENDREQ',
                reservationDate: datePending,
                startTime: datePending,
                endTime: new Date(datePending.getTime() + 60 * 60 * 1000),
                status: 'PENDING',
                inscriptionId: inscription.id,
                professorId: assignedProf.id,
                roomId: room.id
            }
        });
        const reqPending = await prisma.cancelRequest.create({
            data: {
                reservationId: reservationWithPending.id,
                professorId: assignedProf.id,
                reason: 'Wait for approval',
                status: 'PENDING'
            }
        });
        PENDING_cancelRequestId = reqPending.id;

        // 14. Create a processed cancel request (APPROVED)
        const dateApproved = new Date(fortyEightHoursInFuture.getTime() + 6 * 60 * 60 * 1000);
        const reservationWithApproved = await prisma.reservation.create({
            data: {
                reservationCode: 'RES-CAN-APPROVED',
                reservationDate: dateApproved,
                startTime: dateApproved,
                endTime: new Date(dateApproved.getTime() + 60 * 60 * 1000),
                status: 'CANCELLED',
                inscriptionId: inscription.id,
                professorId: assignedProf.id,
                roomId: room.id
            }
        });
        const reqApproved = await prisma.cancelRequest.create({
            data: {
                reservationId: reservationWithApproved.id,
                professorId: assignedProf.id,
                reason: 'Approved cancel reservation',
                status: 'APPROVED',
                processedAt: new Date(),
                processedBy: 'admin@formation.com'
            }
        });
        APPROVED_cancelRequestId = reqApproved.id;
    });

    afterAll(async () => {
        // Clean up everything
        await prisma.cancelRequest.deleteMany({
            where: {
                OR: [
                    { reservation: { reservationCode: { startsWith: 'RES-CAN-' } } },
                    { professor: { email: { in: ['rachid.bouazza@demo.com', 'nora.belkhayat@demo.com'] } } }
                ]
            }
        });
        await prisma.reservation.deleteMany({
            where: { reservationCode: { startsWith: 'RES-CAN-' } }
        });
        await prisma.inscription.deleteMany({
            where: {
                candidate: { candidateCode: { startsWith: 'CAN-CAN-' } }
            }
        });
        await prisma.candidate.deleteMany({
            where: { candidateCode: { startsWith: 'CAN-CAN-' } }
        });
        await prisma.professor.deleteMany({
            where: { email: { in: ['rachid.bouazza@demo.com', 'nora.belkhayat@demo.com'] } }
        });
        await prisma.user.deleteMany({
            where: {
                email: { in: ['rachid.bouazza@demo.com', 'nora.belkhayat@demo.com'] }
            }
        });
        await prisma.room.deleteMany({
            where: { numero: { startsWith: 'RM-CAN-' } }
        });
        await prisma.formation.deleteMany({
            where: { matiere: { startsWith: 'FOR-CAN-' } }
        });
    });

    describe('POST /cancel-requests (Création)', () => {
        it('should successfully create a cancel request when input is valid (nominal)', async () => {
            const payload = {
                reservationId: seededReservationId,
                reason: 'TEST-Cancel Reason'
            };

            const response = await request(app)
                .post('/cancel-requests')
                .set('Authorization', `Bearer ${profToken}`)
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('success');
            expect(response.body.data.status).toBe('PENDING');
            expect(response.body.data.reason).toBe('TEST-Cancel Reason');
            expect(response.body.data.reservationId).toBe(seededReservationId);

            // Clean up the created request so other tests are not affected
            await prisma.cancelRequest.delete({ where: { id: response.body.data.id } });
        });

        it('should return 400 when reservationId is missing', async () => {
            const response = await request(app)
                .post('/cancel-requests')
                .set('Authorization', `Bearer ${profToken}`)
                .send({ reason: 'No reservation ID' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('RESERVATION_ID_REQUIRED');
        });

        it('should return 400 when reason is missing', async () => {
            const response = await request(app)
                .post('/cancel-requests')
                .set('Authorization', `Bearer ${profToken}`)
                .send({ reservationId: seededReservationId });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('REASON_REQUIRED');
        });

        it('should return 403 Forbidden for a non-professor account (e.g. Admin)', async () => {
            const response = await request(app)
                .post('/cancel-requests')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ reservationId: seededReservationId, reason: 'Admin request' });

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });

        it('should return 404 when reservation is not found', async () => {
            const response = await request(app)
                .post('/cancel-requests')
                .set('Authorization', `Bearer ${profToken}`)
                .send({ reservationId: '00000000-0000-0000-0000-000000000000', reason: 'Not found' });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('RESERVATION_NOT_FOUND');
        });

        it('should return 403 when the professor is not assigned to the reservation', async () => {
            const response = await request(app)
                .post('/cancel-requests')
                .set('Authorization', `Bearer ${otherProfToken}`)
                .send({ reservationId: seededReservationId, reason: 'Not mine' });

            expect(response.status).toBe(403);
            expect(response.body.error).toBe('UNAUTHORIZED_RESERVATION_OWNERSHIP');
        });

        it('should return 400 when the reservation is already CANCELLED', async () => {
            const response = await request(app)
                .post('/cancel-requests')
                .set('Authorization', `Bearer ${profToken}`)
                .send({ reservationId: seededReservationCancelledId, reason: 'Already done' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('RESERVATION_ALREADY_CANCELLED');
        });

        it('should return 400 when a cancel request is already pending', async () => {
            // Finding the reservation that already has PENDING cancel request we seeded
            const reservationWithPending = await prisma.reservation.findFirst({
                where: { reservationCode: 'RES-CAN-PENDREQ' }
            });

            const response = await request(app)
                .post('/cancel-requests')
                .set('Authorization', `Bearer ${profToken}`)
                .send({ reservationId: reservationWithPending.id, reason: 'Second request attempt' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('CANCEL_REQUEST_ALREADY_PENDING');
        });

        it('should return 400 when attempting to cancel a session scheduled in less than 24 hours (24h rule)', async () => {
            const response = await request(app)
                .post('/cancel-requests')
                .set('Authorization', `Bearer ${profToken}`)
                .send({ reservationId: seededReservationShortId, reason: 'Short notice' });

            expect(response.status).toBe(400);
            expect(response.body.error).toContain("La demande d'annulation n'est possible que plus de 24 heures");
        });
    });

    describe('GET /cancel-requests (Consultation)', () => {
        it('should successfully return the list of cancel requests to an Admin', async () => {
            const response = await request(app)
                .get('/cancel-requests')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(Array.isArray(response.body.data)).toBe(true);

            // Locate our seeded PENDING request
            const pendingReq = response.body.data.find(r => r.id === PENDING_cancelRequestId);
            expect(pendingReq).toBeDefined();
            expect(pendingReq.status).toBe('PENDING');
            expect(pendingReq.professor.nom).toBe('TEST-Rachid');
            expect(pendingReq.reservation.reservationCode).toBe('RES-CAN-PENDREQ');
        });

        it('should return 403 Forbidden for a Professor account (lacks manage_reservations)', async () => {
            const response = await request(app)
                .get('/cancel-requests')
                .set('Authorization', `Bearer ${profToken}`);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });

        it('should return 403 Forbidden for an agent receptionist user (lacks manage_reservations)', async () => {
            const response = await request(app)
                .get('/cancel-requests')
                .set('Authorization', `Bearer ${receptionToken}`);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });

    describe('PATCH /cancel-requests/:id/approve (Traitement)', () => {
        it('should successfully approve a pending cancel request and mark reservation as CANCELLED', async () => {
            // Find a temporary reservation to approve
            const now = new Date();
            const fortyEightHoursInFuture = new Date(now.getTime() + 48 * 60 * 60 * 1000);
            const tempRes = await prisma.reservation.create({
                data: {
                    reservationCode: 'RES-CAN-TEMP-APP',
                    reservationDate: fortyEightHoursInFuture,
                    startTime: fortyEightHoursInFuture,
                    endTime: new Date(fortyEightHoursInFuture.getTime() + 60 * 60 * 1000),
                    status: 'PENDING',
                    inscriptionId: (await prisma.inscription.findFirst({
                        where: { candidate: { candidateCode: 'CAN-CAN-MAIN' } }
                    })).id,
                    professorId: assignedProfId,
                    roomId: (await prisma.room.findFirst({ where: { numero: 'RM-CAN-1' } })).id
                }
            });

            const tempReq = await prisma.cancelRequest.create({
                data: {
                    reservationId: tempRes.id,
                    professorId: assignedProfId,
                    reason: 'Apply approval',
                    status: 'PENDING'
                }
            });

            const response = await request(app)
                .patch(`/cancel-requests/${tempReq.id}/approve`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body.data.cancelRequest.status).toBe('APPROVED');
            expect(response.body.data.cancelRequest.processedBy).toBe('admin@formation.com');
            expect(response.body.data.reservation.status).toBe('CANCELLED');

            // Double check in DB
            const dbReservation = await prisma.reservation.findUnique({ where: { id: tempRes.id } });
            expect(dbReservation.status).toBe('CANCELLED');
        });

        it('should return 400 when the cancel request is already processed (e.g. APPROVED)', async () => {
            const response = await request(app)
                .patch(`/cancel-requests/${APPROVED_cancelRequestId}/approve`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send();

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('CANCEL_REQUEST_ALREADY_PROCESSED');
        });

        it('should return 404 when the cancel request is not found', async () => {
            const response = await request(app)
                .patch('/cancel-requests/00000000-0000-0000-0000-000000000000/approve')
                .set('Authorization', `Bearer ${adminToken}`)
                .send();

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('CANCEL_REQUEST_NOT_FOUND');
        });

        it('should return 403 Forbidden for professor trying to approve', async () => {
            const response = await request(app)
                .patch(`/cancel-requests/${PENDING_cancelRequestId}/approve`)
                .set('Authorization', `Bearer ${profToken}`)
                .send();

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });

    describe('PATCH /cancel-requests/:id/reject (Traitement)', () => {
        it('should successfully reject a pending cancel request and leave reservation untouched', async () => {
            // Find a temporary reservation to reject
            const now = new Date();
            const fortyEightHoursInFuture = new Date(now.getTime() + 48 * 60 * 60 * 1000);
            const tempRes = await prisma.reservation.create({
                data: {
                    reservationCode: 'RES-CAN-TEMP-REJ',
                    reservationDate: fortyEightHoursInFuture,
                    startTime: fortyEightHoursInFuture,
                    endTime: new Date(fortyEightHoursInFuture.getTime() + 60 * 60 * 1000),
                    status: 'PENDING',
                    inscriptionId: (await prisma.inscription.findFirst({
                        where: { candidate: { candidateCode: 'CAN-CAN-MAIN' } }
                    })).id,
                    professorId: assignedProfId,
                    roomId: (await prisma.room.findFirst({ where: { numero: 'RM-CAN-1' } })).id
                }
            });

            const tempReq = await prisma.cancelRequest.create({
                data: {
                    reservationId: tempRes.id,
                    professorId: assignedProfId,
                    reason: 'Apply rejection',
                    status: 'PENDING'
                }
            });

            const response = await request(app)
                .patch(`/cancel-requests/${tempReq.id}/reject`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body.data.cancelRequest.status).toBe('REJECTED');
            expect(response.body.data.cancelRequest.processedBy).toBe('admin@formation.com');

            // Double check in DB: reservation remains PENDING
            const dbReservation = await prisma.reservation.findUnique({ where: { id: tempRes.id } });
            expect(dbReservation.status).toBe('PENDING');
        });

        it('should return 400 when the cancel request is already processed (e.g. APPROVED)', async () => {
            const response = await request(app)
                .patch(`/cancel-requests/${APPROVED_cancelRequestId}/reject`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send();

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('CANCEL_REQUEST_ALREADY_PROCESSED');
        });

        it('should return 404 when the cancel request is not found', async () => {
            const response = await request(app)
                .patch('/cancel-requests/00000000-0000-0000-0000-000000000000/reject')
                .set('Authorization', `Bearer ${adminToken}`)
                .send();

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('CANCEL_REQUEST_NOT_FOUND');
        });

        it('should return 403 Forbidden for professor trying to reject', async () => {
            const response = await request(app)
                .patch(`/cancel-requests/${PENDING_cancelRequestId}/reject`)
                .set('Authorization', `Bearer ${profToken}`)
                .send();

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });
    });
});
