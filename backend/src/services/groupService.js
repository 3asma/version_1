import prisma from '../config/prisma.js';

const mapGroupFromDb = (dbGroup) => {
    if (!dbGroup) return null;
    const ins = dbGroup.inscription || {};

    const members = (ins.members || []).map(m => ({
        id: m.id,
        groupId: dbGroup.id,
        candidateId: m.candidateId,
        createdAt: m.createdAt,
        candidate: m.candidate
    }));

    return {
        id: dbGroup.id,
        nom: dbGroup.nom,
        type: ins.learningMode || 'GROUPE',
        formationId: ins.formationId || '',
        professorId: ins.professorId || null,
        effectif: members.length,
        createdAt: dbGroup.createdAt,
        updatedAt: dbGroup.updatedAt,
        formation: ins.formation || null,
        professor: ins.professor || null,
        members: members,
        inscriptionId: dbGroup.inscriptionId,
        inscription: {
            id: ins.id,
            status: ins.status,
            learningMode: ins.learningMode,
            members: ins.members || []
        }
    };
};

class GroupService {
    async getAllGroups() {
        const groups = await prisma.group.findMany({
            include: {
                inscription: {
                    include: {
                        formation: true,
                        professor: true,
                        members: {
                            include: { candidate: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return groups.map(mapGroupFromDb);
    }

    async getGroupById(id) {
        const group = await prisma.group.findUnique({
            where: { id },
            include: {
                inscription: {
                    include: {
                        formation: true,
                        professor: true,
                        members: {
                            include: { candidate: true }
                        }
                    }
                }
            }
        });
        if (!group) throw new Error('GROUP_NOT_FOUND');
        return mapGroupFromDb(group);
    }

    async createGroup(data) {
        const { nom, type, formationId, professorId, candidateIds = [] } = data;

        if (!nom || nom.trim() === '') throw new Error('GROUP_NAME_REQUIRED');
        if (!type) throw new Error('GROUP_TYPE_REQUIRED');
        if (!['MONOME', 'BINOME', 'GROUPE', 'SPECIFIQUE'].includes(type)) {
            throw new Error('INVALID_GROUP_TYPE');
        }
        if (!formationId) throw new Error('FORMATION_ID_REQUIRED');

        if (candidateIds.length === 0) {
            throw new Error('CANDIDATE_IDS_REQUIRED');
        }
        const mainCandidateId = candidateIds[0];

        // Verify Formation exists
        const formation = await prisma.formation.findUnique({ where: { id: formationId } });
        if (!formation) throw new Error('FORMATION_NOT_FOUND');

        // Verify Professor if provided
        if (professorId) {
            const professor = await prisma.professor.findUnique({ where: { id: professorId } });
            if (!professor) throw new Error('PROFESSOR_NOT_FOUND');
        }

        // Validate limits
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

        const uniqueCandidateIds = [...new Set(candidateIds)];

        return await prisma.$transaction(async (tx) => {
            const inscription = await tx.inscription.create({
                data: {
                    candidateId: mainCandidateId,
                    formationId,
                    professorId: professorId || null,
                    learningMode: type === 'SPECIFIQUE' ? 'GROUPE' : type,
                    status: 'ASSIGNED'
                }
            });

            await tx.inscriptionCandidate.createMany({
                data: uniqueCandidateIds.map(cid => ({
                    inscriptionId: inscription.id,
                    candidateId: cid
                }))
            });

            const dbGroup = await tx.group.create({
                data: {
                    nom: nom.trim(),
                    inscriptionId: inscription.id
                },
                include: {
                    inscription: {
                        include: {
                            formation: true,
                            professor: true,
                            members: { include: { candidate: true } }
                        }
                    }
                }
            });

            // After successfully creating the Group, automatically update the matching WAITING inscriptions: WAITING -> ASSIGNED
            for (const candidateId of uniqueCandidateIds) {
                const pendingInscription = await tx.inscription.findFirst({
                    where: {
                        formationId,
                        status: 'WAITING',
                        candidateId
                    }
                });
                if (pendingInscription) {
                    await tx.inscription.update({
                        where: { id: pendingInscription.id },
                        data: { status: 'ASSIGNED' }
                    });
                }
            }

            return mapGroupFromDb(dbGroup);
        });
    }

    async updateGroup(id, data) {
        const { nom, type, formationId, professorId } = data;

        const group = await prisma.group.findUnique({
            where: { id },
            include: {
                inscription: {
                    include: {
                        members: true
                    }
                }
            }
        });
        if (!group) throw new Error('GROUP_NOT_FOUND');

        const updateData = {};
        if (nom !== undefined) {
            if (nom.trim() === '') throw new Error('GROUP_NAME_REQUIRED');
            updateData.nom = nom.trim();
        }

        const insUpdateData = {};
        const newType = type !== undefined ? type : (group.inscription?.learningMode || 'GROUPE');
        if (type !== undefined) {
            if (!['MONOME', 'BINOME', 'GROUPE', 'SPECIFIQUE'].includes(type)) {
                throw new Error('INVALID_GROUP_TYPE');
            }
            insUpdateData.learningMode = type === 'SPECIFIQUE' ? 'GROUPE' : type;
        }

        const newFormationId = formationId !== undefined ? formationId : (group.inscription?.formationId);
        if (formationId !== undefined) {
            const formation = await prisma.formation.findUnique({ where: { id: formationId } });
            if (!formation) throw new Error('FORMATION_NOT_FOUND');
            insUpdateData.formationId = formationId;
        }

        if (professorId !== undefined) {
            if (professorId) {
                const professor = await prisma.professor.findUnique({ where: { id: professorId } });
                if (!professor) throw new Error('PROFESSOR_NOT_FOUND');
                insUpdateData.professorId = professorId;
            } else {
                insUpdateData.professorId = null;
            }
        }

        const currentMembers = group.inscription?.members || [];
        if (currentMembers.length > 0) {
            if (newType === 'MONOME' && currentMembers.length > 1) {
                throw new Error('MONOME_LIMIT_EXCEEDED');
            }
            if (newType === 'BINOME' && currentMembers.length > 2) {
                throw new Error('BINOME_LIMIT_EXCEEDED');
            }

            if (formationId !== undefined && formationId !== group.inscription?.formationId) {
                for (const member of currentMembers) {
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

        return await prisma.$transaction(async (tx) => {
            const updated = await tx.group.update({
                where: { id },
                data: updateData
            });

            if (Object.keys(insUpdateData).length > 0) {
                await tx.inscription.update({
                    where: { id: group.inscriptionId },
                    data: insUpdateData
                });
            }

            const dbGroup = await tx.group.findUnique({
                where: { id },
                include: {
                    inscription: {
                        include: {
                            formation: true,
                            professor: true,
                            members: {
                                include: { candidate: true }
                            }
                        }
                    }
                }
            });
            return mapGroupFromDb(dbGroup);
        });
    }

    async deleteGroup(id) {
        const group = await prisma.group.findUnique({ where: { id } });
        if (!group) throw new Error('GROUP_NOT_FOUND');
        return await prisma.group.delete({ where: { id } });
    }

    async addCandidateToGroup(groupId, candidateId) {
        const group = await prisma.group.findUnique({
            where: { id: groupId },
            include: {
                inscription: {
                    include: {
                        members: true
                    }
                }
            }
        });
        if (!group) throw new Error('GROUP_NOT_FOUND');

        const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } });
        if (!candidate) throw new Error('CANDIDATE_NOT_FOUND');

        const groupIns = group.inscription;
        if (!groupIns) throw new Error('GROUP_INSCRIPTION_NOT_FOUND');

        const inscription = await prisma.inscription.findFirst({
            where: {
                formationId: groupIns.formationId,
                status: { in: ['WAITING', 'ASSIGNED', 'ACTIVE'] },
                candidateId
            }
        });
        if (!inscription) throw new Error('CANDIDATE_NO_ACTIVE_INSCRIPTION');

        const isAlreadyMember = groupIns.members.some(m => m.candidateId === candidateId);
        if (isAlreadyMember) throw new Error('CANDIDATE_ALREADY_IN_GROUP');

        if (groupIns.learningMode === 'MONOME' && groupIns.members.length >= 1) {
            throw new Error('MONOME_LIMIT_EXCEEDED');
        }
        if (groupIns.learningMode === 'BINOME' && groupIns.members.length >= 2) {
            throw new Error('BINOME_LIMIT_EXCEEDED');
        }

        return await prisma.$transaction(async (tx) => {
            await tx.inscriptionCandidate.create({
                data: {
                    inscriptionId: groupIns.id,
                    candidateId
                }
            });

            if (inscription.status === 'WAITING') {
                await tx.inscription.update({
                    where: { id: inscription.id },
                    data: { status: 'ASSIGNED' }
                });
            }

            const dbGroup = await tx.group.findUnique({
                where: { id: groupId },
                include: {
                    inscription: {
                        include: {
                            formation: true,
                            professor: true,
                            members: { include: { candidate: true } }
                        }
                    }
                }
            });
            return mapGroupFromDb(dbGroup);
        });
    }

    async removeCandidateFromGroup(groupId, candidateId) {
        const group = await prisma.group.findUnique({
            where: { id: groupId }
        });
        if (!group) throw new Error('GROUP_NOT_FOUND');

        const membership = await prisma.inscriptionCandidate.findFirst({
            where: {
                inscriptionId: group.inscriptionId,
                candidateId
            }
        });
        if (!membership) throw new Error('MEMBERSHIP_NOT_FOUND');

        return await prisma.$transaction(async (tx) => {
            await tx.inscriptionCandidate.delete({
                where: { id: membership.id }
            });

            const dbGroup = await tx.group.findUnique({
                where: { id: groupId },
                include: {
                    inscription: {
                        include: {
                            formation: true,
                            professor: true,
                            members: { include: { candidate: true } }
                        }
                    }
                }
            });
            return mapGroupFromDb(dbGroup);
        });
    }

    async assignProfessorToGroup(groupId, professorId) {
        const group = await prisma.group.findUnique({ where: { id: groupId } });
        if (!group) throw new Error('GROUP_NOT_FOUND');

        const professor = await prisma.professor.findUnique({ where: { id: professorId } });
        if (!professor) throw new Error('PROFESSOR_NOT_FOUND');

        return await prisma.$transaction(async (tx) => {
            await tx.inscription.update({
                where: { id: group.inscriptionId },
                data: { professorId }
            });

            const dbGroup = await tx.group.findUnique({
                where: { id: groupId },
                include: {
                    inscription: {
                        include: {
                            formation: true,
                            professor: true,
                            members: { include: { candidate: true } }
                        }
                    }
                }
            });
            return mapGroupFromDb(dbGroup);
        });
    }

    async removeProfessorFromGroup(groupId) {
        const group = await prisma.group.findUnique({ where: { id: groupId } });
        if (!group) throw new Error('GROUP_NOT_FOUND');

        return await prisma.$transaction(async (tx) => {
            await tx.inscription.update({
                where: { id: group.inscriptionId },
                data: { professorId: null }
            });

            const dbGroup = await tx.group.findUnique({
                where: { id: groupId },
                include: {
                    inscription: {
                        include: {
                            formation: true,
                            professor: true,
                            members: { include: { candidate: true } }
                        }
                    }
                }
            });
            return mapGroupFromDb(dbGroup);
        });
    }
}

export default new GroupService();
