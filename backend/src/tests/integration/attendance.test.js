import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../app.js';
import prisma from '../../config/prisma.js';

describe('Attendance Integration Tests (PostgreSQL Test DB)', () => {
    let adminToken = '';
    let receptionToken = ''; // Lacks permission manage_attendance
    let profToken = '';      // Has role PROFESSOR and is assigned to the seeded reservation
    let otherProfToken = ''; // Has role PROFESSOR but is NOT assigned to the reservation

    let assignedProfId = '';
    let otherProfId = '';
    let seededCandidateId = '';
    let otherCandidateId = '';
    let seededReservationId = '';
    let seededAttendanceId = '';

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
        await prisma.attendance.deleteMany({
            where: {
                OR: [
                    { reservation: { reservationCode: { startsWith: 'RES-ATT-' } } },
                    { candidate: { candidateCode: { startsWith: 'CAN-ATT-' } } }
                ]
            }
        });
        await prisma.reservation.deleteMany({
            where: { reservationCode: { startsWith: 'RES-ATT-' } }
        });
        await prisma.inscription.deleteMany({
            where: {
                candidate: { candidateCode: { startsWith: 'CAN-ATT-' } }
            }
        });
        await prisma.candidate.deleteMany({
            where: { candidateCode: { startsWith: 'CAN-ATT-' } }
        });
        await prisma.professor.deleteMany({
            where: {
                email: { in: ['prof@formation.com', 'khadija.yousfi@demo.com'] }
            }
        });
        await prisma.user.deleteMany({
            where: {
                email: { in: ['prof@formation.com', 'khadija.yousfi@demo.com'] }
            }
        });
        await prisma.room.deleteMany({
            where: { numero: { startsWith: 'RM-ATT-' } }
        });
        await prisma.formation.deleteMany({
            where: { matiere: { startsWith: 'FOR-ATT-' } }
        });

        // 3. Create Professors
        const assignedProf = await prisma.professor.create({
            data: {
                nom: 'TEST-Prof-Assigned',
                prenom: 'TEST-Att',
                email: 'prof@formation.com' // prof@formation.com is matched in users_metadata.json as role professor
            }
        });
        assignedProfId = assignedProf.id;

        const otherProf = await prisma.professor.create({
            data: {
                nom: 'TEST-Prof-Other',
                prenom: 'TEST-Att',
                email: 'khadija.yousfi@demo.com' // khadija.yousfi@demo.com is matched in users_metadata.json as role professor
            }
        });
        otherProfId = otherProf.id;

        // 4. Create User records in database so they can log in
        const hashedPassword = await bcrypt.hash('demo', 10);
        await prisma.user.create({
            data: {
                email: 'prof@formation.com',
                password: hashedPassword,
                role: 'USER'
            }
        });

        await prisma.user.create({
            data: {
                email: 'khadija.yousfi@demo.com',
                password: hashedPassword,
                role: 'USER'
            }
        });

        // 5. Authenticate professors
        const profLogin = await request(app)
            .post('/auth/login')
            .send({ email: 'prof@formation.com', password: 'demo' });
        profToken = profLogin.body.token;

        const otherProfLogin = await request(app)
            .post('/auth/login')
            .send({ email: 'khadija.yousfi@demo.com', password: 'demo' });
        otherProfToken = otherProfLogin.body.token;

        // 6. Create static room & formation for reservation
        const room = await prisma.room.create({
            data: {
                numero: 'RM-ATT-1',
                capacite: 10
            }
        });

        const formation = await prisma.formation.create({
            data: {
                matiere: 'FOR-ATT-MATH',
                niveau: 'FOR-ATT-NIV'
            }
        });

        // 7. Seed active candidates
        const candidate = await prisma.candidate.create({
            data: {
                candidateCode: 'CAN-ATT-MAIN',
                firstName: 'Att',
                lastName: 'Candidate1',
                age: 20,
                occupation: 'STUDENT',
                observation: 'ALONE',
                status: 'ACTIVE'
            }
        });
        seededCandidateId = candidate.id;

        const otherCand = await prisma.candidate.create({
            data: {
                candidateCode: 'CAN-ATT-OTHER',
                firstName: 'Att',
                lastName: 'Candidate2',
                age: 21,
                occupation: 'STUDENT',
                observation: 'ALONE',
                status: 'ACTIVE'
            }
        });
        otherCandidateId = otherCand.id;

        // 8. Create Inscriptions
        const inscription = await prisma.inscription.create({
            data: {
                candidateId: candidate.id,
                formationId: formation.id,
                professorId: assignedProf.id,
                status: 'ACTIVE'
            }
        });

        // 9. Create Reservation linked to Inscription and assigned professor
        const reservation = await prisma.reservation.create({
            data: {
                reservationCode: 'RES-ATT-CODE',
                reservationDate: new Date('2026-09-01T10:00:00Z'),
                startTime: new Date('2026-09-01T10:00:00Z'),
                endTime: new Date('2026-09-01T11:00:00Z'),
                status: 'PENDING',
                inscriptionId: inscription.id,
                professorId: assignedProf.id,
                roomId: room.id
            }
        });
        seededReservationId = reservation.id;

        // 10. Seed a single recorded attendance record for PATCH testing
        const attendance = await prisma.attendance.create({
            data: {
                reservationId: reservation.id,
                candidateId: candidate.id,
                status: 'PRESENT',
                note: 'Initial attendance note'
            }
        });
        seededAttendanceId = attendance.id;
    });

    afterAll(async () => {
        // Clean up everything
        await prisma.attendance.deleteMany({
            where: {
                OR: [
                    { reservation: { reservationCode: { startsWith: 'RES-ATT-' } } },
                    { candidate: { candidateCode: { startsWith: 'CAN-ATT-' } } }
                ]
            }
        });
        await prisma.reservation.deleteMany({
            where: { reservationCode: { startsWith: 'RES-ATT-' } }
        });
        await prisma.inscription.deleteMany({
            where: {
                candidate: { candidateCode: { startsWith: 'CAN-ATT-' } }
            }
        });
        await prisma.candidate.deleteMany({
            where: { candidateCode: { startsWith: 'CAN-ATT-' } }
        });
        await prisma.professor.deleteMany({
            where: {
                email: { in: ['prof@formation.com', 'khadija.yousfi@demo.com'] }
            }
        });
        await prisma.user.deleteMany({
            where: {
                email: { in: ['prof@formation.com', 'khadija.yousfi@demo.com'] }
            }
        });
        await prisma.room.deleteMany({
            where: { numero: { startsWith: 'RM-ATT-' } }
        });
        await prisma.formation.deleteMany({
            where: { matiere: { startsWith: 'FOR-ATT-' } }
        });
    });

    describe('GET /attendances/reservation/:reservationId (Consultation)', () => {
        it('should successfully get attendance list for the assigned Professor', async () => {
            const response = await request(app)
                .get(`/attendances/reservation/${seededReservationId}`)
                .set('Authorization', `Bearer ${profToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body.data).toHaveProperty('reservation');
            expect(response.body.data.reservation.id).toBe(seededReservationId);
            expect(Array.isArray(response.body.data.students)).toBe(true);
            expect(response.body.data.students.length).toBeGreaterThanOrEqual(1);

            // The overlay logic should match our seeded attendance record
            const mainStudent = response.body.data.students.find(s => s.candidateId === seededCandidateId);
            expect(mainStudent).toBeDefined();
            expect(mainStudent.status).toBe('PRESENT');
            expect(mainStudent.attendanceId).toBe(seededAttendanceId);
        });

        it('should return 403 Forbidden for a Professor not assigned to the reservation', async () => {
            const response = await request(app)
                .get(`/attendances/reservation/${seededReservationId}`)
                .set('Authorization', `Bearer ${otherProfToken}`);

            expect(response.status).toBe(403);
            expect(response.body.error).toBe('FORBIDDEN');
        });

        it('should successfully get attendance list for an Admin (ignores professorId check)', async () => {
            const response = await request(app)
                .get(`/attendances/reservation/${seededReservationId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
        });

        it('should return 403 Forbidden for reception user lacking manage_attendance', async () => {
            const response = await request(app)
                .get(`/attendances/reservation/${seededReservationId}`)
                .set('Authorization', `Bearer ${receptionToken}`);

            expect(response.status).toBe(403);
            expect(response.body.error).toContain('Access denied. Insufficient permissions');
        });

        it('should return 404 when reservation is not found', async () => {
            const response = await request(app)
                .get('/attendances/reservation/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${profToken}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('RESERVATION_NOT_FOUND');
        });
    });

    describe('POST /attendances/reservation/:reservationId (Soumission)', () => {
        it('should successfully submit attendance list, save records, and update reservation status to COMPLETED', async () => {
            const payload = {
                attendances: [
                    {
                        candidateId: seededCandidateId,
                        status: 'ABSENT',
                        note: 'Absence test record'
                    }
                ]
            };

            const response = await request(app)
                .post(`/attendances/reservation/${seededReservationId}`)
                .set('Authorization', `Bearer ${profToken}`)
                .send(payload);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');

            // Verify records in DB
            const dbAttendance = await prisma.attendance.findUnique({
                where: {
                    reservationId_candidateId: {
                        reservationId: seededReservationId,
                        candidateId: seededCandidateId
                    }
                }
            });
            expect(dbAttendance).toBeDefined();
            expect(dbAttendance.status).toBe('ABSENT');
            expect(dbAttendance.note).toBe('Absence test record');

            // Verify reservation status basculé à COMPLETED
            const dbReservation = await prisma.reservation.findUnique({
                where: { id: seededReservationId }
            });
            expect(dbReservation.status).toBe('COMPLETED');
        });

        it('should return 403 Forbidden when an Admin tries to submit (strictly PROFESSOR only)', async () => {
            const payload = {
                attendances: [{ candidateId: seededCandidateId, status: 'PRESENT' }]
            };

            const response = await request(app)
                .post(`/attendances/reservation/${seededReservationId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(payload);

            expect(response.status).toBe(403);
            expect(response.body.error).toBe('FORBIDDEN');
        });

        it('should return 403 Forbidden when a non-assigned Professor tries to submit', async () => {
            const payload = {
                attendances: [{ candidateId: seededCandidateId, status: 'PRESENT' }]
            };

            const response = await request(app)
                .post(`/attendances/reservation/${seededReservationId}`)
                .set('Authorization', `Bearer ${otherProfToken}`)
                .send(payload);

            expect(response.status).toBe(403);
            expect(response.body.error).toBe('FORBIDDEN');
        });

        it('should return 400 when body does not contain an attendances array', async () => {
            const response = await request(app)
                .post(`/attendances/reservation/${seededReservationId}`)
                .set('Authorization', `Bearer ${profToken}`)
                .send({ attendances: 'not_an_array' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('INVALID_ATTENDANCES_FORMAT');
        });

        it('should return 400 when candidateId is missing in record', async () => {
            const payload = {
                attendances: [{ status: 'ABSENT' }]
            };

            const response = await request(app)
                .post(`/attendances/reservation/${seededReservationId}`)
                .set('Authorization', `Bearer ${profToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('CANDIDATE_ID_REQUIRED');
        });

        it('should return 400 when candidate is not registered for the reservation', async () => {
            const payload = {
                attendances: [{ candidateId: otherCandidateId, status: 'PRESENT' }]
            };

            const response = await request(app)
                .post(`/attendances/reservation/${seededReservationId}`)
                .set('Authorization', `Bearer ${profToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('CANDIDATE_NOT_IN_RESERVATION');
            expect(response.body.candidateId).toBe(otherCandidateId);
        });

        it('should return 400 when status is invalid', async () => {
            const payload = {
                attendances: [{ candidateId: seededCandidateId, status: 'EXCUSED' }]
            };

            const response = await request(app)
                .post(`/attendances/reservation/${seededReservationId}`)
                .set('Authorization', `Bearer ${profToken}`)
                .send(payload);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('INVALID_STATUS');
        });

        it('should return 404 when reservation is not found on submit', async () => {
            const payload = {
                attendances: [{ candidateId: seededCandidateId, status: 'PRESENT' }]
            };

            const response = await request(app)
                .post('/attendances/reservation/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${profToken}`)
                .send(payload);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('RESERVATION_NOT_FOUND');
        });
    });

    describe('PATCH /attendances/:attendanceId (Modification)', () => {
        it('should successfully update attendance status or note by the assigned Professor', async () => {
            const updatePayload = {
                status: 'ABSENT',
                note: 'Late updated note'
            };

            const response = await request(app)
                .patch(`/attendances/${seededAttendanceId}`)
                .set('Authorization', `Bearer ${profToken}`)
                .send(updatePayload);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body.data.status).toBe('ABSENT');
            expect(response.body.data.note).toBe('Late updated note');

            const dbAttendance = await prisma.attendance.findUnique({ where: { id: seededAttendanceId } });
            expect(dbAttendance.status).toBe('ABSENT');
            expect(dbAttendance.note).toBe('Late updated note');
        });

        it('should return 403 Forbidden when a non-assigned Professor updates the attendance record', async () => {
            const response = await request(app)
                .patch(`/attendances/${seededAttendanceId}`)
                .set('Authorization', `Bearer ${otherProfToken}`)
                .send({ status: 'PRESENT' });

            expect(response.status).toBe(403);
            expect(response.body.error).toBe('FORBIDDEN');
        });

        it('should return 400 when status in update is invalid', async () => {
            const response = await request(app)
                .patch(`/attendances/${seededAttendanceId}`)
                .set('Authorization', `Bearer ${profToken}`)
                .send({ status: 'LATE' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('INVALID_STATUS');
        });

        it('should return 404 when attendance record is not found', async () => {
            const response = await request(app)
                .patch('/attendances/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${profToken}`)
                .send({ status: 'PRESENT' });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('ATTENDANCE_NOT_FOUND');
        });
    });
});
