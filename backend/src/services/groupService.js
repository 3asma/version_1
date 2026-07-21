import prisma from '../config/prisma.js';

class GroupService {
    async getAllGroups() {
        return await prisma.group.findMany({
            include: {
                formation: true,
                professor: true,
                members: {
                    include: { candidate: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getGroupById(id) {
        const group = await prisma.group.findUnique({
            where: { id },
            include: {
                formation: true,
                professor: true,
                members: {
                    include: { candidate: true }
                }
            }
        });
        if (!group) throw new Error('GROUP_NOT_FOUND');
        return group;
    }

    async createGroup(data) {
        const { nom, type, formationId, professorId, candidateIds = [] } = data;

        if (!nom || nom.trim() === '') throw new Error('GROUP_NAME_REQUIRED');
        if (!type) throw new Error('GROUP_TYPE_REQUIRED');
        if (!['MONOME', 'BINOME', 'GROUPE', 'SPECIFIQUE'].includes(type)) {
            throw new Error('INVALID_GROUP_TYPE');
        }
        if (!formationId) throw new Error('FORMATION_ID_REQUIRED');

        // Verify Formation exists
        const formation = await prisma.formation.findUnique({ where: { id: formationId } });
        if (!formation) throw new Error('FORMATION_NOT_FOUND');

        // Verify Professor if provided
        if (professorId) {
            const professor = await prisma.professor.findUnique({ where: { id: professorId } });
            if (!professor) throw new Error('PROFESSOR_NOT_FOUND');
        }

        // Validate candidate list limits according to type
        if (type === 'MONOME' && candidateIds.length > 1) {
            throw new Error('MONOME_LIMIT_EXCEEDED');
        }
        if (type === 'BINOME' && candidateIds.length > 2) {
            throw new Error('BINOME_LIMIT_EXCEEDED');
        }

        // Validate each candidate
        for (const candidateId of candidateIds) {
            const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } });
            if (!candidate) throw new Error(`CANDIDATE_NOT_FOUND_${candidateId}`);

            // Validation 2: Verify candidate has a valid Inscription for the Group's Formation
            const inscription = await prisma.inscription.findFirst({
                where: {
                    formationId,
                    status: { in: ['WAITING', 'ASSIGNED', 'ACTIVE'] },
                    candidateId
                }
            });
            if (!inscription) {
                throw new Error(`CANDIDATE_NO_ACTIVE_INSCRIPTION_${candidateId}`);
            }
        }

        // Ensure array uniqueness
        const uniqueCandidateIds = [...new Set(candidateIds)];

        const group = await prisma.group.create({
            data: {
                nom: nom.trim(),
                type,
                formationId,
                professorId: professorId || null,
                effectif: uniqueCandidateIds.length,
                members: {
                    create: uniqueCandidateIds.map(id => ({ candidateId: id }))
                }
            },
            include: {
                formation: true,
                professor: true,
                members: { include: { candidate: true } }
            }
        });

        // After successfully creating the Affectation, automatically update the matching WAITING inscriptions: WAITING -> ASSIGNED
        for (const candidateId of uniqueCandidateIds) {
            const inscription = await prisma.inscription.findFirst({
                where: {
                    formationId,
                    status: 'WAITING',
                    candidateId
                }
            });
            if (inscription) {
                await prisma.inscription.update({
                    where: { id: inscription.id },
                    data: { status: 'ASSIGNED' }
                });
            }
        }

        return group;
    }

    async updateGroup(id, data) {
        const { nom, type, formationId, professorId } = data;

        // Verify group exists
        const group = await prisma.group.findUnique({
            where: { id },
            include: { members: true }
        });
        if (!group) throw new Error('GROUP_NOT_FOUND');

        const updateData = {};

        if (nom !== undefined) {
            if (nom.trim() === '') throw new Error('GROUP_NAME_REQUIRED');
            updateData.nom = nom.trim();
        }

        const newType = type !== undefined ? type : group.type;
        if (type !== undefined) {
            if (!['MONOME', 'BINOME', 'GROUPE', 'SPECIFIQUE'].includes(type)) {
                throw new Error('INVALID_GROUP_TYPE');
            }
            updateData.type = type;
        }

        const newFormationId = formationId !== undefined ? formationId : group.formationId;
        if (formationId !== undefined) {
            const formation = await prisma.formation.findUnique({ where: { id: formationId } });
            if (!formation) throw new Error('FORMATION_NOT_FOUND');
            updateData.formationId = formationId;
        }

        if (professorId !== undefined) {
            if (professorId) {
                const professor = await prisma.professor.findUnique({ where: { id: professorId } });
                if (!professor) throw new Error('PROFESSOR_NOT_FOUND');
                updateData.professorId = professorId;
            } else {
                updateData.professorId = null;
            }
        }

        // Capacity check: if type or formation changes, ensure current members still fit
        if (group.members.length > 0) {
            if (newType === 'MONOME' && group.members.length > 1) {
                throw new Error('MONOME_LIMIT_EXCEEDED');
            }
            if (newType === 'BINOME' && group.members.length > 2) {
                throw new Error('BINOME_LIMIT_EXCEEDED');
            }

            // If formation changed, check if existing candidates have active Inscription for the new Formation
            if (formationId !== undefined && formationId !== group.formationId) {
                for (const member of group.members) {
                    const inscription = await prisma.inscription.findFirst({
                        where: {
                            formationId: newFormationId,
                            status: { in: ['WAITING', 'ASSIGNED', 'ACTIVE'] },
                            candidateId: member.candidateId
                        }
                    });
                    if (!inscription) {
                        throw new Error(`CANDIDATE_NO_ACTIVE_INSCRIPTION_${member.candidateId}`);
                    }

                    if (inscription.status === 'WAITING') {
                        await prisma.inscription.update({
                            where: { id: inscription.id },
                            data: { status: 'ASSIGNED' }
                        });
                    }
                }
            }
        }

        return await prisma.group.update({
            where: { id },
            data: updateData,
            include: {
                formation: true,
                professor: true,
                members: { include: { candidate: true } }
            }
        });
    }

    async deleteGroup(id) {
        // Verify group exists
        const group = await prisma.group.findUnique({ where: { id } });
        if (!group) throw new Error('GROUP_NOT_FOUND');
        return await prisma.group.delete({ where: { id } });
    }

    async addCandidateToGroup(groupId, candidateId) {
        // 1. Verify group exists
        const group = await prisma.group.findUnique({
            where: { id: groupId },
            include: { members: true }
        });
        if (!group) throw new Error('GROUP_NOT_FOUND');

        // 2. Verify candidate exists
        const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } });
        if (!candidate) throw new Error('CANDIDATE_NOT_FOUND');

        // 3. Verify candidate has a valid Inscription for the Group's Formation
        const inscription = await prisma.inscription.findFirst({
            where: {
                formationId: group.formationId,
                status: { in: ['WAITING', 'ASSIGNED', 'ACTIVE'] },
                candidateId
            }
        });
        if (!inscription) throw new Error('CANDIDATE_NO_ACTIVE_INSCRIPTION');

        // 4. Prevent duplicate membership
        const isAlreadyMember = group.members.some(m => m.candidateId === candidateId);
        if (isAlreadyMember) throw new Error('CANDIDATE_ALREADY_IN_GROUP');

        // 5. Verify membership limits according to GroupType
        if (group.type === 'MONOME' && group.members.length >= 1) {
            throw new Error('MONOME_LIMIT_EXCEEDED');
        }
        if (group.type === 'BINOME' && group.members.length >= 2) {
            throw new Error('BINOME_LIMIT_EXCEEDED');
        }

        // Create membership and update effectif
        return await prisma.$transaction(async (tx) => {
            await tx.groupCandidate.create({
                data: { groupId, candidateId }
            });

            // Automatically update the corresponding inscription: WAITING -> ASSIGNED
            if (inscription.status === 'WAITING') {
                await tx.inscription.update({
                    where: { id: inscription.id },
                    data: { status: 'ASSIGNED' }
                });
            }

            return await tx.group.update({
                where: { id: groupId },
                data: { effectif: { increment: 1 } },
                include: {
                    formation: true,
                    professor: true,
                    members: { include: { candidate: true } }
                }
            });
        });
    }

    async removeCandidateFromGroup(groupId, candidateId) {
        // Verify group exists
        const group = await prisma.group.findUnique({ where: { id: groupId } });
        if (!group) throw new Error('GROUP_NOT_FOUND');

        const membership = await prisma.groupCandidate.findUnique({
            where: {
                groupId_candidateId: { groupId, candidateId }
            }
        });
        if (!membership) throw new Error('MEMBERSHIP_NOT_FOUND');

        return await prisma.$transaction(async (tx) => {
            await tx.groupCandidate.delete({
                where: {
                    groupId_candidateId: { groupId, candidateId }
                }
            });

            return await tx.group.update({
                where: { id: groupId },
                data: { effectif: { decrement: 1 } },
                include: {
                    formation: true,
                    professor: true,
                    members: { include: { candidate: true } }
                }
            });
        });
    }

    async assignProfessorToGroup(groupId, professorId) {
        // 1. Verify group exists
        const group = await prisma.group.findUnique({ where: { id: groupId } });
        if (!group) throw new Error('GROUP_NOT_FOUND');

        // 2. Verify professor exists
        const professor = await prisma.professor.findUnique({ where: { id: professorId } });
        if (!professor) throw new Error('PROFESSOR_NOT_FOUND');

        return await prisma.group.update({
            where: { id: groupId },
            data: { professorId },
            include: {
                formation: true,
                professor: true,
                members: { include: { candidate: true } }
            }
        });
    }

    async removeProfessorFromGroup(groupId) {
        // Verify group exists
        const group = await prisma.group.findUnique({ where: { id: groupId } });
        if (!group) throw new Error('GROUP_NOT_FOUND');

        return await prisma.group.update({
            where: { id: groupId },
            data: { professorId: null },
            include: {
                formation: true,
                professor: true,
                members: { include: { candidate: true } }
            }
        });
    }
}

export default new GroupService();
