import prisma from '../config/prisma.js';

const extractInscriptionCode = (groupNom) => {
    if (!groupNom) return '';
    const parts = groupNom.split(' - ');
    if (parts.length > 1) {
        return parts[parts.length - 1];
    }
    return groupNom;
};

class ReservationService {
    normalizeData(data) {
        const allowedKeys = [
            'id',
            'reservationCode',
            'reservationDate',
            'startTime',
            'endTime',
            'status',
            'inscriptionId',
            'professorId',
            'roomId'
        ];

        const raw = {};
        for (const key of allowedKeys) {
            if (key in data) {
                raw[key] = data[key];
            }
        }

        const n = {};
        if (raw.id !== undefined) n.id = String(raw.id).trim();
        if (raw.reservationCode !== undefined && raw.reservationCode !== null) {
            n.reservationCode = String(raw.reservationCode).trim();
        }
        if (raw.inscriptionId !== undefined) n.inscriptionId = String(raw.inscriptionId).trim();
        if (raw.professorId !== undefined) n.professorId = String(raw.professorId).trim();
        if (raw.roomId !== undefined) n.roomId = String(raw.roomId).trim();

        if (raw.status !== undefined && raw.status !== null) {
            n.status = String(raw.status).trim().toUpperCase();
        }

        if (raw.reservationDate !== undefined && raw.reservationDate !== null) {
            n.reservationDate = new Date(raw.reservationDate);
        }
        if (raw.startTime !== undefined && raw.startTime !== null) {
            n.startTime = new Date(raw.startTime);
        }
        if (raw.endTime !== undefined && raw.endTime !== null) {
            n.endTime = new Date(raw.endTime);
        }

        return n;
    }

    async validateRelations(data) {
        if (data.inscriptionId) {
            const inscription = await prisma.inscription.findUnique({ where: { id: data.inscriptionId } });
            if (!inscription) throw new Error('INSCRIPTION_NOT_FOUND');
        }
        if (data.professorId) {
            const professor = await prisma.professor.findUnique({ where: { id: data.professorId } });
            if (!professor) throw new Error('PROFESSOR_NOT_FOUND');
        }
        if (data.roomId) {
            const room = await prisma.room.findUnique({ where: { id: data.roomId } });
            if (!room) throw new Error('ROOM_NOT_FOUND');
        }
    }

    async searchByCode(code) {
        if (!code || typeof code !== 'string') {
            throw new Error('CODE_REQUIRED');
        }
        const val = code.trim();
        const upperVal = val.toUpperCase();
        const lowerVal = val.toLowerCase();

        // 1. Search by Candidate Code (case-insensitive fallback via OR)
        const candidate = await prisma.candidate.findFirst({
            where: {
                OR: [
                    { candidateCode: val },
                    { candidateCode: upperVal },
                    { candidateCode: lowerVal }
                ]
            },
            include: {
                inscriptions: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (candidate && candidate.inscriptions && candidate.inscriptions.length > 0) {
            let inscription = candidate.inscriptions.find(ins => ['ACTIVE', 'ASSIGNED', 'WAITING'].includes(ins.status));
            if (!inscription) {
                inscription = candidate.inscriptions[0];
            }

            let group = null;
            const dbGroup = await prisma.group.findUnique({
                where: { inscriptionId: inscription.id },
                include: {
                    inscription: {
                        include: {
                            formation: true,
                            professor: true,
                            members: {
                                include: {
                                    candidate: true
                                }
                            }
                        }
                    }
                }
            });
            if (dbGroup && dbGroup.inscription) {
                const ins = dbGroup.inscription;
                const codeVal = extractInscriptionCode(dbGroup.nom);
                const mappedInscriptions = (ins.members || []).map(m => ({
                    id: ins.id,
                    dateInscription: ins.dateInscription,
                    status: ins.status,
                    note: ins.note,
                    duration: ins.duration,
                    price: ins.price,
                    volumeHoraire: ins.volumeHoraire,
                    remainingHours: ins.remainingHours,
                    learningMode: ins.learningMode,
                    candidateId: m.candidateId,
                    candidate: m.candidate,
                    formationId: ins.formationId,
                    professorId: ins.professorId,
                    createdAt: ins.createdAt,
                    updatedAt: ins.updatedAt,
                    inscriptionCode: codeVal,
                    learningGroupId: dbGroup.id
                }));
                group = {
                    id: dbGroup.id,
                    groupName: dbGroup.nom,
                    inscriptionCode: codeVal,
                    learningMode: ins.learningMode || 'GROUPE',
                    dateInscription: ins.dateInscription || dbGroup.createdAt,
                    note: ins.note || null,
                    formation: ins.formation || null,
                    professor: ins.professor || null,
                    inscriptions: mappedInscriptions,
                    inscription: {
                        id: ins.id,
                        status: ins.status,
                        learningMode: ins.learningMode,
                        members: ins.members
                    }
                };
            }

            return {
                exists: true,
                inscriptionId: inscription.id,
                candidateId: candidate.id,
                formationId: inscription.formationId,
                professorId: inscription.professorId || null,
                roomId: null,
                learningGroup: group
            };
        }

        // 2. Search by Inscription Code (via Group Name contains)
        const inscription = await prisma.inscription.findFirst({
            where: {
                group: {
                    nom: { contains: val, mode: 'insensitive' }
                }
            }
        });

        if (inscription) {
            let group = null;
            const dbGroup = await prisma.group.findUnique({
                where: { inscriptionId: inscription.id },
                include: {
                    inscription: {
                        include: {
                            formation: true,
                            professor: true,
                            members: {
                                include: {
                                    candidate: true
                                }
                            }
                        }
                    }
                }
            });
            if (dbGroup && dbGroup.inscription) {
                const ins = dbGroup.inscription;
                const codeVal = extractInscriptionCode(dbGroup.nom);
                const mappedInscriptions = (ins.members || []).map(m => ({
                    id: ins.id,
                    dateInscription: ins.dateInscription,
                    status: ins.status,
                    note: ins.note,
                    duration: ins.duration,
                    price: ins.price,
                    volumeHoraire: ins.volumeHoraire,
                    remainingHours: ins.remainingHours,
                    learningMode: ins.learningMode,
                    candidateId: m.candidateId,
                    candidate: m.candidate,
                    formationId: ins.formationId,
                    professorId: ins.professorId,
                    createdAt: ins.createdAt,
                    updatedAt: ins.updatedAt,
                    inscriptionCode: codeVal,
                    learningGroupId: dbGroup.id
                }));
                group = {
                    id: dbGroup.id,
                    groupName: dbGroup.nom,
                    inscriptionCode: codeVal,
                    learningMode: ins.learningMode || 'GROUPE',
                    dateInscription: ins.dateInscription || dbGroup.createdAt,
                    note: ins.note || null,
                    formation: ins.formation || null,
                    professor: ins.professor || null,
                    inscriptions: mappedInscriptions,
                    inscription: {
                        id: ins.id,
                        status: ins.status,
                        learningMode: ins.learningMode,
                        members: ins.members
                    }
                };
            }

            return {
                exists: true,
                inscriptionId: inscription.id,
                candidateId: inscription.candidateId,
                formationId: inscription.formationId,
                professorId: inscription.professorId || null,
                roomId: null,
                learningGroup: group
            };
        }

        // 3. Search directly by LearningGroup Inscription Code (case-insensitive fallback via OR)
        const directIns = await prisma.inscription.findFirst({
            where: {
                group: {
                    nom: { contains: val, mode: 'insensitive' }
                }
            },
            include: {
                group: {
                    include: {
                        inscription: {
                            include: {
                                formation: true,
                                professor: true,
                                members: {
                                    include: {
                                        candidate: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (directIns && directIns.group && directIns.group.inscription) {
            const dbGroup = directIns.group;
            const ins = dbGroup.inscription;
            const codeVal = extractInscriptionCode(dbGroup.nom);
            const mappedInscriptions = (ins.members || []).map(m => ({
                id: ins.id,
                dateInscription: ins.dateInscription,
                status: ins.status,
                note: ins.note,
                duration: ins.duration,
                price: ins.price,
                volumeHoraire: ins.volumeHoraire,
                remainingHours: ins.remainingHours,
                learningMode: ins.learningMode,
                candidateId: m.candidateId,
                candidate: m.candidate,
                formationId: ins.formationId,
                professorId: ins.professorId,
                createdAt: ins.createdAt,
                updatedAt: ins.updatedAt,
                inscriptionCode: codeVal,
                learningGroupId: dbGroup.id
            }));
            const group = {
                id: dbGroup.id,
                groupName: dbGroup.nom,
                inscriptionCode: codeVal,
                learningMode: ins.learningMode || 'GROUPE',
                dateInscription: ins.dateInscription || dbGroup.createdAt,
                note: ins.note || null,
                formation: ins.formation || null,
                professor: ins.professor || null,
                inscriptions: mappedInscriptions,
                inscription: {
                    id: ins.id,
                    status: ins.status,
                    learningMode: ins.learningMode,
                    members: ins.members
                }
            };

            return {
                exists: true,
                inscriptionId: directIns.id,
                candidateId: directIns.candidateId,
                formationId: directIns.formationId,
                professorId: dbGroup.professorId || null,
                roomId: null,
                learningGroup: group
            };
        }

        return { exists: false };
    }

    async getAllReservations() {
        return await prisma.reservation.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                inscription: {
                    include: {
                        candidate: true,
                        formation: true,
                        group: true,
                        members: {
                            include: {
                                candidate: true
                            }
                        }
                    }
                },
                room: true,
                professor: true,
                cancelRequests: true
            }
        });
    }

    async getReservationById(id) {
        return await prisma.reservation.findUnique({
            where: { id },
            include: {
                inscription: {
                    include: {
                        candidate: true,
                        formation: true,
                        group: true,
                        members: {
                            include: {
                                candidate: true
                            }
                        }
                    }
                },
                room: true,
                professor: true,
                cancelRequests: true
            }
        });
    }

    async createReservation(data) {
        const normalized = this.normalizeData(data);
        await this.validateRelations(normalized);

        const checkConflict = await prisma.reservation.findFirst({
            where: {
                inscriptionId: normalized.inscriptionId,
                reservationDate: normalized.reservationDate,
                startTime: normalized.startTime,
                status: { not: 'CANCELLED' }
            }
        });
        if (checkConflict) {
            throw new Error('RESERVATION_CONFLICT');
        }

        const roomConflict = await prisma.reservation.findFirst({
            where: {
                roomId: normalized.roomId,
                reservationDate: normalized.reservationDate,
                status: { not: 'CANCELLED' },
                OR: [
                    {
                        startTime: { gte: normalized.startTime, lt: normalized.endTime }
                    },
                    {
                        endTime: { gt: normalized.startTime, lte: normalized.endTime }
                    }
                ]
            }
        });
        if (roomConflict) {
            throw new Error('ROOM_CONFLICT');
        }

        const professorConflict = await prisma.reservation.findFirst({
            where: {
                professorId: normalized.professorId,
                reservationDate: normalized.reservationDate,
                status: { not: 'CANCELLED' },
                OR: [
                    {
                        startTime: { gte: normalized.startTime, lt: normalized.endTime }
                    },
                    {
                        endTime: { gt: normalized.startTime, lte: normalized.endTime }
                    }
                ]
            }
        });
        if (professorConflict) {
            throw new Error('PROFESSOR_CONFLICT');
        }

        const count = await prisma.reservation.count();
        const code = `RES-${String(count + 1).padStart(5, '0')}`;

        return await prisma.reservation.create({
            data: {
                ...normalized,
                reservationCode: code
            },
            include: {
                inscription: {
                    include: {
                        candidate: true,
                        formation: true
                    }
                },
                room: true,
                professor: true
            }
        });
    }

    async updateReservation(id, data) {
        const normalized = this.normalizeData(data);
        await this.validateRelations(normalized);

        const current = await prisma.reservation.findUnique({
            where: { id }
        });
        if (!current) throw new Error('RESERVATION_NOT_FOUND');

        const testDate = normalized.reservationDate || current.reservationDate;
        const testStart = normalized.startTime || current.startTime;
        const testEnd = normalized.endTime || current.endTime;
        const testInscription = normalized.inscriptionId || current.inscriptionId;
        const testRoom = normalized.roomId || current.roomId;
        const testProfessor = normalized.professorId || current.professorId;

        const checkConflict = await prisma.reservation.findFirst({
            where: {
                id: { not: id },
                inscriptionId: testInscription,
                reservationDate: testDate,
                startTime: testStart,
                status: { not: 'CANCELLED' }
            }
        });
        if (checkConflict) {
            throw new Error('RESERVATION_CONFLICT');
        }

        const roomConflict = await prisma.reservation.findFirst({
            where: {
                id: { not: id },
                roomId: testRoom,
                reservationDate: testDate,
                status: { not: 'CANCELLED' },
                OR: [
                    {
                        startTime: { gte: testStart, lt: testEnd }
                    },
                    {
                        endTime: { gt: testStart, lte: testEnd }
                    }
                ]
            }
        });
        if (roomConflict) {
            throw new Error('ROOM_CONFLICT');
        }

        const professorConflict = await prisma.reservation.findFirst({
            where: {
                id: { not: id },
                professorId: testProfessor,
                reservationDate: testDate,
                status: { not: 'CANCELLED' },
                OR: [
                    {
                        startTime: { gte: testStart, lt: testEnd }
                    },
                    {
                        endTime: { gt: testStart, lte: testEnd }
                    }
                ]
            }
        });
        if (professorConflict) {
            throw new Error('PROFESSOR_CONFLICT');
        }

        return await prisma.reservation.update({
            where: { id },
            data: normalized,
            include: {
                inscription: {
                    include: {
                        candidate: true,
                        formation: true
                    }
                },
                room: true,
                professor: true
            }
        });
    }

    async deleteReservation(id) {
        return await prisma.reservation.delete({
            where: { id }
        });
    }

    async checkAvailability(data) {
        const startTime = new Date(data.startTime);
        const endTime = new Date(data.endTime);
        const { professorId, candidateId } = data;

        // 1. Candidate Availability
        const candidateInscriptions = await prisma.inscription.findMany({
            where: { candidateId }
        });
        const memberInscriptions = await prisma.inscriptionCandidate.findMany({
            where: { candidateId },
            select: { inscriptionId: true }
        });
        const inscriptionIds = [
            ...candidateInscriptions.map(ins => ins.id),
            ...memberInscriptions.map(m => m.inscriptionId)
        ];

        const candidateConflict = await prisma.reservation.findFirst({
            where: {
                inscriptionId: { in: inscriptionIds },
                status: { not: 'CANCELLED' },
                startTime: { lt: endTime },
                endTime: { gt: startTime }
            }
        });
        const candidateAvailable = !candidateConflict;

        // 2. Professor Availability
        const professorConflict = await prisma.reservation.findFirst({
            where: {
                professorId,
                status: { not: 'CANCELLED' },
                startTime: { lt: endTime },
                endTime: { gt: startTime }
            }
        });

        const profObj = await prisma.professor.findUnique({
            where: { id: professorId }
        });
        const dateDay = startTime.getDay();
        const weekdays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        const currentDayName = weekdays[dateDay];
        const isDayOff = Boolean(profObj && profObj.dayOff && profObj.dayOff.toUpperCase() === currentDayName);

        const professorAvailable = !professorConflict;

        // 3. Room Availability
        const allRooms = await prisma.room.findMany();
        const activeReservations = await prisma.reservation.findMany({
            where: {
                status: { not: 'CANCELLED' },
                startTime: { lt: endTime },
                endTime: { gt: startTime }
            }
        });
        const reservedRoomIds = activeReservations.map(r => r.roomId).filter(Boolean);
        const availableRooms = allRooms.filter(room => !reservedRoomIds.includes(room.id) && room.available !== false);

        return {
            professorAvailable,
            candidateAvailable,
            isDayOff,
            availableRooms
        };
    }
}

export default new ReservationService();
