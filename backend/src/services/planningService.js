import prisma from '../config/prisma.js';

class PlanningService {
    getDates(referenceDate, view) {
        const date = new Date(referenceDate);
        if (isNaN(date.getTime())) {
            throw new Error('INVALID_DATE');
        }

        if (view === 'day') {
            const start = new Date(date);
            start.setUTCHours(0, 0, 0, 0);
            const end = new Date(date);
            end.setUTCHours(23, 59, 59, 999);
            return { start, end };
        } else { // week
            // ISO-8601 week: Monday to Sunday in UTC
            const start = new Date(date);
            const day = start.getUTCDay();
            const diff = start.getUTCDate() - day + (day === 0 ? -6 : 1);
            start.setUTCDate(diff);
            start.setUTCHours(0, 0, 0, 0);

            const end = new Date(start);
            end.setUTCDate(start.getUTCDate() + 6);
            end.setUTCHours(23, 59, 59, 999);
            return { start, end };
        }
    }

    mapReservationToSession(r) {
        const date = new Date(r.reservationDate).toISOString().split('T')[0];
        const start = new Date(r.startTime);
        const end = new Date(r.endTime);
        const time = start.toISOString().split('T')[1].substring(0, 5);
        const duration = Math.round((end.getTime() - start.getTime()) / (60000));

        let status = 'scheduled';
        if (r.status === 'CANCELLED') status = 'cancelled';
        else if (r.status === 'COMPLETED') status = 'completed';

        return {
            id: r.id,
            candidateId: r.inscription.candidateId,
            professorId: r.professorId,
            roomId: r.roomId,
            formationId: r.inscription.formationId,
            date,
            time,
            duration,
            status,
            attendance: r.status === 'COMPLETED' ? 'present' : undefined,
            candidate: r.inscription.candidate ? {
                firstName: r.inscription.candidate.firstName,
                lastName: r.inscription.candidate.lastName
            } : null,
            inscriptionCode: r.inscription.inscriptionCode,
            reservationCode: r.reservationCode,
            formation: r.inscription.formation ? {
                subject: r.inscription.formation.matiere,
                level: r.inscription.formation.niveau
            } : null,
            professor: r.professor ? {
                firstName: r.professor.prenom,
                lastName: r.professor.nom
            } : (r.inscription.professor ? {
                firstName: r.inscription.professor.prenom,
                lastName: r.inscription.professor.nom
            } : null),
            room: r.room ? {
                roomNumber: r.room.numero
            } : null,
            startTimeText: time,
            endTimeText: end.toISOString().split('T')[1].substring(0, 5)
        };
    }

    async getWeeklyPlanning(referenceDate) {
        const { start, end } = this.getDates(referenceDate, 'week');
        const reservations = await prisma.reservation.findMany({
            where: {
                reservationDate: {
                    gte: start,
                    lte: end
                }
            },
            include: {
                inscription: {
                    include: {
                        candidate: true,
                        formation: true,
                        group: true,
                        professor: true
                    }
                },
                professor: true,
                room: true
            },
            orderBy: [
                { reservationDate: 'asc' },
                { startTime: 'asc' }
            ]
        });

        return reservations.map(r => this.mapReservationToSession(r));
    }

    async getDailyPlanning(referenceDate) {
        const { start, end } = this.getDates(referenceDate, 'day');
        const reservations = await prisma.reservation.findMany({
            where: {
                reservationDate: {
                    gte: start,
                    lte: end
                }
            },
            include: {
                inscription: {
                    include: {
                        candidate: true,
                        formation: true,
                        group: true,
                        professor: true
                    }
                },
                professor: true,
                room: true
            },
            orderBy: [
                { startTime: 'asc' }
            ]
        });

        return reservations.map(r => this.mapReservationToSession(r));
    }
}

export default new PlanningService();
