import prisma from '../config/prisma.js';

class InscriptionService {
    async createInscription(data) {
        const { candidateId, formationId, note } = data;
        const learningMode = data.learningMode || 'GROUPE';

        if (!candidateId) throw new Error('CANDIDATE_ID_REQUIRED');
        if (!formationId) throw new Error('FORMATION_ID_REQUIRED');
        if (!['MONOME', 'BINOME', 'GROUPE'].includes(learningMode)) {
            throw new Error('INVALID_LEARNING_MODE');
        }

        // 1. Verify candidate exists
        const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } });
        if (!candidate) throw new Error('CANDIDATE_NOT_FOUND');

        // 2. Verify formation exists
        const formation = await prisma.formation.findUnique({ where: { id: formationId } });
        if (!formation) throw new Error('FORMATION_NOT_FOUND');

        // 3. Prevent duplicate ACTIVE/WAITING/ASSIGNED inscriptions
        const duplicateActive = await prisma.inscription.findFirst({
            where: {
                candidateId,
                formationId,
                status: { in: ['WAITING', 'ASSIGNED', 'ACTIVE'] }
            }
        });

        if (duplicateActive) {
            throw new Error('DUPLICATE_ACTIVE_INSCRIPTION');
        }

        let status = 'WAITING';
        let groupId = null;

        // If MONOME: immediately create a Group and assign Candidate
        if (learningMode === 'MONOME') {
            const groupName = `Monôme ${candidate.firstName} ${candidate.lastName}`.trim();
            const groupCreated = await prisma.group.create({
                data: {
                    nom: groupName,
                    type: 'MONOME',
                    formationId,
                    professorId: data.professorId || null,
                    effectif: 1,
                    members: {
                        create: { candidateId }
                    }
                }
            });
            groupId = groupCreated.id;
            status = 'ASSIGNED';
        }

        return await prisma.inscription.create({
            data: {
                candidateId,
                formationId,
                note: note || null,
                status,
                learningMode,
                groupId,
                duration: data.duration !== undefined ? parseInt(data.duration) : null,
                price: data.price !== undefined ? parseFloat(data.price) : null,
                volumeHoraire: data.volumeHoraire !== undefined ? parseInt(data.volumeHoraire) : null,
                remainingHours: data.volumeHoraire !== undefined ? parseFloat(data.volumeHoraire) : 0
            },
            include: {
                candidate: true,
                formation: true,
                group: true
            }
        });
    }

    async getAllInscriptions() {
        return await prisma.inscription.findMany({
            include: {
                candidate: true,
                formation: true,
                group: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getInscriptionById(id) {
        const inscription = await prisma.inscription.findUnique({
            where: { id },
            include: {
                candidate: true,
                formation: true,
                group: true
            }
        });
        if (!inscription) throw new Error('INSCRIPTION_NOT_FOUND');
        return inscription;
    }

    async updateInscription(id, data) {
        const { status, note, formationId, learningMode, groupId } = data;

        if (status && !['WAITING', 'ASSIGNED', 'ACTIVE', 'CANCELLED', 'COMPLETED'].includes(status)) {
            throw new Error('INVALID_STATUS');
        }
        if (learningMode && !['MONOME', 'BINOME', 'GROUPE'].includes(learningMode)) {
            throw new Error('INVALID_LEARNING_MODE');
        }

        const current = await this.getInscriptionById(id);
        const targetFormationId = formationId || current.formationId;

        if (status === 'WAITING' || status === 'ASSIGNED' || status === 'ACTIVE') {
            const duplicateActive = await prisma.inscription.findFirst({
                where: {
                    candidateId: current.candidateId,
                    formationId: targetFormationId,
                    status: { in: ['WAITING', 'ASSIGNED', 'ACTIVE'] },
                    id: { not: id }
                }
            });
            if (duplicateActive) throw new Error('DUPLICATE_ACTIVE_INSCRIPTION');
        }

        let targetStatus = status;
        if (status === 'ACTIVE') {
            targetStatus = 'WAITING'; // compatibility fallback
        }

        return await prisma.inscription.update({
            where: { id },
            data: {
                status: targetStatus || undefined,
                learningMode: learningMode || undefined,
                groupId: groupId !== undefined ? groupId : undefined,
                note: note !== undefined ? note : undefined,
                formationId: formationId || undefined,
                duration: data.duration !== undefined ? parseInt(data.duration) : undefined,
                price: data.price !== undefined ? parseFloat(data.price) : undefined,
                volumeHoraire: data.volumeHoraire !== undefined ? parseInt(data.volumeHoraire) : undefined
            },
            include: {
                candidate: true,
                formation: true,
                group: true
            }
        });
    }

    async deleteInscription(id) {
        return await prisma.inscription.delete({ where: { id } });
    }

    async deductHours(id, hours) {
        const inscription = await this.getInscriptionById(id);
        const newRemaining = Math.max(0, inscription.remainingHours - hours);

        return await prisma.inscription.update({
            where: { id },
            data: { remainingHours: newRemaining },
            include: {
                candidate: true,
                formation: true,
                group: true
            }
        });
    }
}

export default new InscriptionService();

