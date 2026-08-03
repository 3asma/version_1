import prisma from '../config/prisma.js';

class AttendanceService {
    async getReservationWithDetails(reservationId) {
        return await prisma.reservation.findUnique({
            where: { id: reservationId },
            include: {
                inscription: {
                    include: {
                        candidate: true,
                        formation: true,
                        members: {
                            include: {
                                candidate: true
                            }
                        }
                    }
                },
                room: true,
                professor: true
            }
        });
    }

    async getAttendanceForReservation(reservationId) {
        const reservation = await prisma.reservation.findUnique({
            where: { id: reservationId },
            include: {
                inscription: {
                    include: {
                        candidate: true,
                        formation: true,
                        members: {
                            include: {
                                candidate: true
                            }
                        }
                    }
                },
                room: true,
                professor: true,
                attendances: true
            }
        });

        if (!reservation) {
            throw new Error('RESERVATION_NOT_FOUND');
        }

        const studentMap = new Map();

        // 1. Primary candidate
        if (reservation.inscription.candidate) {
            const cand = reservation.inscription.candidate;
            studentMap.set(cand.id, {
                candidateId: cand.id,
                candidateCode: cand.candidateCode,
                firstName: cand.firstName,
                lastName: cand.lastName,
                status: null,
                attendanceId: null,
                note: null
            });
        }

        // 2. Group members
        if (reservation.inscription.members) {
            for (const member of reservation.inscription.members) {
                if (member.candidate) {
                    const cand = member.candidate;
                    studentMap.set(cand.id, {
                        candidateId: cand.id,
                        candidateCode: cand.candidateCode,
                        firstName: cand.firstName,
                        lastName: cand.lastName,
                        status: null,
                        attendanceId: null,
                        note: null
                    });
                }
            }
        }

        // 3. Overlay attendance status if already recorded
        if (reservation.attendances) {
            for (const attendance of reservation.attendances) {
                if (studentMap.has(attendance.candidateId)) {
                    const student = studentMap.get(attendance.candidateId);
                    student.status = attendance.status;
                    student.attendanceId = attendance.id;
                    student.note = attendance.note;
                }
            }
        }

        return {
            reservation: {
                id: reservation.id,
                reservationCode: reservation.reservationCode,
                reservationDate: reservation.reservationDate,
                startTime: reservation.startTime,
                endTime: reservation.endTime,
                status: reservation.status
            },
            formation: reservation.inscription.formation,
            room: reservation.room,
            professor: reservation.professor,
            students: Array.from(studentMap.values())
        };
    }

    async saveAttendance(reservationId, attendancesData) {
        const reservation = await prisma.reservation.findUnique({
            where: { id: reservationId },
            include: {
                inscription: {
                    include: {
                        members: true
                    }
                }
            }
        });

        if (!reservation) {
            throw new Error('RESERVATION_NOT_FOUND');
        }

        const validCandidateIds = new Set();
        if (reservation.inscription.candidateId) {
            validCandidateIds.add(reservation.inscription.candidateId);
        }
        if (reservation.inscription.members) {
            for (const m of reservation.inscription.members) {
                validCandidateIds.add(m.candidateId);
            }
        }

        // Validation checks
        for (const record of attendancesData) {
            if (!validCandidateIds.has(record.candidateId)) {
                throw new Error(`CANDIDATE_NOT_IN_RESERVATION_${record.candidateId}`);
            }
            if (!['PRESENT', 'ABSENT'].includes(record.status)) {
                throw new Error('INVALID_STATUS');
            }
        }

        // Save or update all attendances and set reservation status to COMPLETED
        await prisma.$transaction([
            prisma.reservation.update({
                where: { id: reservationId },
                data: { status: 'COMPLETED' }
            }),
            ...attendancesData.map(record => {
                return prisma.attendance.upsert({
                    where: {
                        reservationId_candidateId: {
                            reservationId,
                            candidateId: record.candidateId
                        }
                    },
                    update: {
                        status: record.status,
                        note: record.note !== undefined ? record.note : null
                    },
                    create: {
                        reservationId,
                        candidateId: record.candidateId,
                        status: record.status,
                        note: record.note !== undefined ? record.note : null
                    }
                });
            })
        ]);

        return await this.getAttendanceForReservation(reservationId);
    }

    async updateAttendance(attendanceId, data) {
        if (data.status && !['PRESENT', 'ABSENT'].includes(data.status)) {
            throw new Error('INVALID_STATUS');
        }

        const existing = await prisma.attendance.findUnique({
            where: { id: attendanceId }
        });
        if (!existing) {
            throw new Error('ATTENDANCE_NOT_FOUND');
        }

        const updateData = {};
        if (data.status) updateData.status = data.status;
        if (data.note !== undefined) updateData.note = data.note;

        return await prisma.attendance.update({
            where: { id: attendanceId },
            data: updateData
        });
    }

    async getAttendanceById(id) {
        return await prisma.attendance.findUnique({
            where: { id },
            include: {
                reservation: true
            }
        });
    }
}

export default new AttendanceService();
