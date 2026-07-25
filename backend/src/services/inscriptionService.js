import prisma from '../config/prisma.js';

const extractInscriptionCode = (groupNom) => {
    if (!groupNom) return '';
    const parts = groupNom.split(' - ');
    if (parts.length > 1) {
        return parts[parts.length - 1];
    }
    return groupNom;
};

const mapInscriptionToFrontend = (ins) => {
    if (!ins) return null;
    const mapped = { ...ins };
    mapped.learningGroupId = ins.group?.id || null;

    let codeVal = '';
    if (ins.group) {
        codeVal = extractInscriptionCode(ins.group.nom);
    }
    mapped.inscriptionCode = codeVal;

    if (ins.group) {
        const mappedGroupInscriptions = (ins.members || []).map(m => ({
            id: m.id,
            candidateId: m.candidateId,
            candidate: m.candidate,
            formationId: ins.formationId,
            professorId: ins.professorId,
            status: ins.status,
            learningGroupId: ins.group.id,
            inscriptionCode: codeVal
        }));

        mapped.learningGroup = {
            id: ins.group.id,
            groupName: ins.group.nom,
            inscriptionCode: codeVal,
            learningMode: ins.learningMode || 'GROUPE',
            dateInscription: ins.dateInscription || ins.group.createdAt,
            note: ins.note || null,
            formation: ins.formation || null,
            professor: ins.professor || null,
            inscriptions: mappedGroupInscriptions
        };
    } else {
        mapped.learningGroup = null;
    }
    return mapped;
};

class InscriptionService {
    normalizeData(data) {
        const allowedKeys = [
            'id',
            'inscriptionCode',
            'dateInscription',
            'status',
            'note',
            'duration',
            'price',
            'volumeHoraire',
            'remainingHours',
            'learningMode',
            'candidateId',
            'candidateIds',
            'formationId',
            'professorId',
            'groupId'
        ];

        const raw = {};
        for (const key of allowedKeys) {
            if (key in data) {
                raw[key] = data[key];
            }
        }

        const n = {};
        if (raw.id !== undefined) n.id = String(raw.id).trim();
        if (raw.inscriptionCode !== undefined && raw.inscriptionCode !== null) {
            n.inscriptionCode = String(raw.inscriptionCode).trim();
        }
        if (raw.candidateId !== undefined) n.candidateId = String(raw.candidateId).trim();
        if (raw.candidateIds !== undefined && Array.isArray(raw.candidateIds)) {
            n.candidateIds = raw.candidateIds.map(x => String(x).trim());
        }
        if (raw.formationId !== undefined) n.formationId = String(raw.formationId).trim();
        if (raw.groupId !== undefined) n.groupId = raw.groupId ? String(raw.groupId).trim() : null;
        if (raw.professorId !== undefined && raw.professorId !== null) {
            n.professorId = String(raw.professorId).trim();
        } else if (raw.professorId === null) {
            n.professorId = null;
        }

        if (raw.learningMode !== undefined && raw.learningMode !== null) {
            n.learningMode = String(raw.learningMode).trim();
        }
        if (raw.status !== undefined && raw.status !== null) {
            n.status = String(raw.status).trim();
        }
        if (raw.note !== undefined && raw.note !== null) {
            n.note = String(raw.note).trim();
        } else if (raw.note === null) {
            n.note = null;
        }

        if (raw.duration !== undefined && raw.duration !== null) {
            n.duration = parseInt(raw.duration);
        } else if (raw.duration === null) {
            n.duration = null;
        }

        if (raw.price !== undefined && raw.price !== null) {
            n.price = parseFloat(raw.price);
        } else if (raw.price === null) {
            n.price = null;
        }

        if (raw.volumeHoraire !== undefined && raw.volumeHoraire !== null) {
            n.volumeHoraire = parseInt(raw.volumeHoraire);
        } else if (raw.volumeHoraire === null) {
            n.volumeHoraire = null;
        }

        if (raw.remainingHours !== undefined && raw.remainingHours !== null) {
            n.remainingHours = parseFloat(raw.remainingHours);
        } else if (raw.remainingHours === null) {
            n.remainingHours = 0;
        }

        if (raw.dateInscription !== undefined && raw.dateInscription !== null) {
            n.dateInscription = new Date(raw.dateInscription);
        }

        return n;
    }

    validateInscriptionCode(code) {
        if (!code || typeof code !== 'string') {
            throw new Error('INSCRIPTION_CODE_REQUIRED');
        }
        const trimmed = code.trim();
        if (trimmed.length < 3 || trimmed.length > 50) {
            throw new Error('INVALID_INSCRIPTION_CODE_LENGTH');
        }
        const pattern = /^[a-zA-Z0-9\-_/]+$/;
        if (!pattern.test(trimmed)) {
            throw new Error('INVALID_INSCRIPTION_CODE_FORMAT');
        }
    }

    async checkInscriptionCodeConflict(id, inscriptionCode, learningMode, formationId) {
        this.validateInscriptionCode(inscriptionCode);

        const effectiveMode = (learningMode === 'SPECIFIQUE') ? 'GROUPE' : learningMode;

        const existingGroups = await prisma.group.findMany({
            where: {
                nom: { contains: inscriptionCode, mode: 'insensitive' }
            },
            include: {
                inscription: {
                    include: {
                        members: true
                    }
                }
            }
        });

        if (existingGroups.length > 0) {
            for (const group of existingGroups) {
                const insMode = group.inscription?.learningMode || 'GROUPE';
                const insFormationId = group.inscription?.formationId;

                if (effectiveMode === 'MONOME' || insMode === 'MONOME') {
                    throw new Error('INSCRIPTION_CODE_EXISTS');
                }

                if (effectiveMode === 'BINOME') {
                    if (insMode !== 'BINOME' || insFormationId !== formationId) {
                        throw new Error('INSCRIPTION_CODE_EXISTS');
                    }
                }

                if (effectiveMode === 'GROUPE') {
                    if (insMode !== 'GROUPE' || insFormationId !== formationId) {
                        throw new Error('INSCRIPTION_CODE_EXISTS');
                    }
                }
            }
        }
    }

    async createInscription(data) {
        const normalized = this.normalizeData(data);

        if (normalized.candidateIds && normalized.candidateIds.length > 0 && !normalized.candidateId) {
            normalized.candidateId = normalized.candidateIds[0];
        }

        if (!normalized.candidateId) throw new Error('CANDIDATE_ID_REQUIRED');
        if (!normalized.formationId) throw new Error('FORMATION_ID_REQUIRED');

        if (normalized.learningMode && !['MONOME', 'BINOME', 'GROUPE', 'SPECIFIQUE'].includes(normalized.learningMode)) {
            throw new Error('INVALID_LEARNING_MODE');
        }

        await this.checkInscriptionCodeConflict(null, normalized.inscriptionCode, normalized.learningMode, normalized.formationId);

        const candidateIdsToLink = (normalized.candidateIds && normalized.candidateIds.length > 0)
            ? normalized.candidateIds
            : [normalized.candidateId];

        for (const cid of candidateIdsToLink) {
            const cand = await prisma.candidate.findUnique({ where: { id: cid } });
            if (!cand) throw new Error('CANDIDATE_NOT_FOUND');
        }

        const candidate = await prisma.candidate.findUnique({ where: { id: normalized.candidateId } });

        const formation = await prisma.formation.findUnique({ where: { id: normalized.formationId } });
        if (!formation) throw new Error('FORMATION_NOT_FOUND');

        if (normalized.professorId) {
            const professor = await prisma.professor.findUnique({ where: { id: normalized.professorId } });
            if (!professor) throw new Error('PROFESSOR_NOT_FOUND');
        }

        const duplicateActive = await prisma.inscription.findFirst({
            where: {
                formationId: normalized.formationId,
                status: { in: ['WAITING', 'ASSIGNED', 'ACTIVE'] },
                candidateId: normalized.candidateId
            }
        });

        if (duplicateActive) {
            throw new Error('DUPLICATE_ACTIVE_INSCRIPTION');
        }

        const statusVal = normalized.status || 'WAITING';
        const volumeHoraireVal = normalized.volumeHoraire !== undefined ? normalized.volumeHoraire : null;
        const remainingHoursVal = normalized.remainingHours !== undefined ? normalized.remainingHours : (volumeHoraireVal !== null ? parseFloat(volumeHoraireVal) : 0);

        const groupMode = normalized.learningMode === 'SPECIFIQUE' ? 'GROUPE' : (normalized.learningMode || 'GROUPE');

        return await prisma.$transaction(async (tx) => {
            const created = await tx.inscription.create({
                data: {
                    candidateId: normalized.candidateId,
                    formationId: normalized.formationId,
                    professorId: normalized.professorId || null,
                    learningMode: groupMode,
                    status: statusVal,
                    note: normalized.note || null,
                    duration: normalized.duration !== undefined ? normalized.duration : null,
                    price: normalized.price !== undefined ? normalized.price : null,
                    volumeHoraire: volumeHoraireVal,
                    remainingHours: remainingHoursVal
                }
            });

            await tx.inscriptionCandidate.createMany({
                data: candidateIdsToLink.map(cid => ({
                    inscriptionId: created.id,
                    candidateId: cid
                }))
            });

            if (normalized.inscriptionCode) {
                let defaultGroupName = `Groupe - ${normalized.inscriptionCode}`;
                if (groupMode === 'MONOME') {
                    defaultGroupName = `Monôme ${candidate.firstName} ${candidate.lastName}`;
                } else if (groupMode === 'BINOME') {
                    defaultGroupName = `Binôme - ${normalized.inscriptionCode}`;
                } else if (normalized.learningMode === 'SPECIFIQUE') {
                    defaultGroupName = `Spécifique ${formation.matiere} - ${normalized.inscriptionCode}`;
                } else if (groupMode === 'GROUPE') {
                    defaultGroupName = `Groupe ${formation.matiere} - ${normalized.inscriptionCode}`;
                }

                const groupName = data.groupName || defaultGroupName;

                await tx.group.create({
                    data: {
                        nom: groupName,
                        inscriptionId: created.id
                    }
                });
            }

            const finalInscription = await tx.inscription.findUnique({
                where: { id: created.id },
                include: {
                    candidate: true,
                    formation: true,
                    professor: true,
                    group: true,
                    members: {
                        include: { candidate: true }
                    }
                }
            });

            return mapInscriptionToFrontend(finalInscription);
        });
    }

    async getAllInscriptions() {
        const groups = await prisma.group.findMany({
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
            },
            orderBy: { createdAt: 'desc' }
        });

        return groups.map(g => {
            const ins = g.inscription || {};
            const codeVal = extractInscriptionCode(g.nom);

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
                learningGroupId: g.id
            }));

            return {
                id: g.id,
                groupName: g.nom,
                inscriptionCode: codeVal,
                learningMode: ins.learningMode || 'GROUPE',
                dateInscription: ins.dateInscription || g.createdAt,
                note: ins.note || null,
                formation: ins.formation || null,
                professor: ins.professor || null,
                inscriptions: mappedInscriptions,
                inscription: {
                    id: ins.id,
                    status: ins.status,
                    learningMode: ins.learningMode,
                    members: ins.members || []
                }
            };
        }).filter(g => g.inscriptions && g.inscriptions.length > 0);
    }

    async getInscriptionById(id) {
        const inscription = await prisma.inscription.findUnique({
            where: { id },
            include: {
                candidate: true,
                formation: true,
                professor: true,
                group: true,
                members: {
                    include: { candidate: true }
                }
            }
        });
        if (!inscription) throw new Error('INSCRIPTION_NOT_FOUND');
        return mapInscriptionToFrontend(inscription);
    }

    async updateInscription(id, data) {
        const normalized = this.normalizeData(data);

        if (normalized.learningMode && !['MONOME', 'BINOME', 'GROUPE', 'SPECIFIQUE'].includes(normalized.learningMode)) {
            throw new Error('INVALID_LEARNING_MODE');
        }

        const current = await this.getInscriptionById(id);
        const targetFormationId = normalized.formationId || current.formationId;
        const targetLearningMode = normalized.learningMode || current.learningMode;
        const targetInscriptionCode = normalized.inscriptionCode || current.inscriptionCode;

        if (normalized.inscriptionCode !== undefined || normalized.learningMode !== undefined || normalized.formationId !== undefined) {
            await this.checkInscriptionCodeConflict(id, targetInscriptionCode, targetLearningMode, targetFormationId);
        }

        if (normalized.learningMode === 'SPECIFIQUE') {
            normalized.learningMode = 'GROUPE';
        }

        if (normalized.status && !['WAITING', 'ASSIGNED', 'ACTIVE', 'CANCELLED', 'COMPLETED'].includes(normalized.status)) {
            throw new Error('INVALID_STATUS');
        }

        const targetCandidateId = normalized.candidateId || current.candidateId;
        const targetStatus = normalized.status || current.status;
        if (targetStatus === 'WAITING' || targetStatus === 'ASSIGNED' || targetStatus === 'ACTIVE') {
            const duplicateActive = await prisma.inscription.findFirst({
                where: {
                    formationId: targetFormationId,
                    status: { in: ['WAITING', 'ASSIGNED', 'ACTIVE'] },
                    id: { not: id },
                    candidateId: targetCandidateId
                }
            });
            if (duplicateActive) throw new Error('DUPLICATE_ACTIVE_INSCRIPTION');
        }

        if (normalized.professorId) {
            const professor = await prisma.professor.findUnique({ where: { id: normalized.professorId } });
            if (!professor) throw new Error('PROFESSOR_NOT_FOUND');
        }

        const dataToUpdate = { ...normalized };
        delete dataToUpdate.inscriptionCode;

        return await prisma.$transaction(async (tx) => {
            const updated = await tx.inscription.update({
                where: { id },
                data: dataToUpdate,
                include: {
                    candidate: true,
                    formation: true,
                    professor: true,
                    group: true,
                    members: {
                        include: { candidate: true }
                    }
                }
            });

            if (normalized.inscriptionCode && updated.group) {
                let defaultGroupName = `Groupe - ${normalized.inscriptionCode}`;
                const groupMode = updated.learningMode || 'GROUPE';
                const candidate = updated.candidate || {};
                const formation = updated.formation || {};

                if (groupMode === 'MONOME') {
                    defaultGroupName = `Monôme ${candidate.firstName} ${candidate.lastName}`;
                } else if (groupMode === 'BINOME') {
                    defaultGroupName = `Binôme - ${normalized.inscriptionCode}`;
                } else if (normalized.learningMode === 'SPECIFIQUE') {
                    defaultGroupName = `Spécifique ${formation.matiere} - ${normalized.inscriptionCode}`;
                } else if (groupMode === 'GROUPE') {
                    defaultGroupName = `Groupe ${formation.matiere} - ${normalized.inscriptionCode}`;
                }

                await tx.group.update({
                    where: { id: updated.group.id },
                    data: { nom: defaultGroupName }
                });
            } else if (normalized.inscriptionCode && !updated.group) {
                let defaultGroupName = `Groupe - ${normalized.inscriptionCode}`;
                const groupMode = updated.learningMode || 'GROUPE';
                const candidate = updated.candidate || {};
                const formation = updated.formation || {};

                if (groupMode === 'MONOME') {
                    defaultGroupName = `Monôme ${candidate.firstName} ${candidate.lastName}`;
                } else if (groupMode === 'BINOME') {
                    defaultGroupName = `Binôme - ${normalized.inscriptionCode}`;
                } else if (normalized.learningMode === 'SPECIFIQUE') {
                    defaultGroupName = `Spécifique ${formation.matiere} - ${normalized.inscriptionCode}`;
                } else if (groupMode === 'GROUPE') {
                    defaultGroupName = `Groupe ${formation.matiere} - ${normalized.inscriptionCode}`;
                }

                await tx.group.create({
                    data: {
                        nom: defaultGroupName,
                        inscriptionId: id
                    }
                });
            }

            const finalInscription = await tx.inscription.findUnique({
                where: { id },
                include: {
                    candidate: true,
                    formation: true,
                    professor: true,
                    group: true,
                    members: {
                        include: { candidate: true }
                    }
                }
            });
            return mapInscriptionToFrontend(finalInscription);
        });
    }

    async deleteInscription(id) {
        return await prisma.inscription.delete({ where: { id } });
    }

    async deleteLearningGroup(id) {
        const group = await prisma.group.findUnique({
            where: { id }
        });
        if (!group) throw new Error('LEARNING_GROUP_NOT_FOUND');

        await prisma.inscription.delete({
            where: { id: group.inscriptionId }
        });
        return true;
    }

    async deductHours(id, hours) {
        const inscription = await this.getInscriptionById(id);
        const newRemaining = Math.max(0, inscription.remainingHours - parseFloat(hours));

        const updated = await prisma.inscription.update({
            where: { id },
            data: { remainingHours: newRemaining },
            include: {
                candidate: true,
                formation: true,
                professor: true,
                group: true,
                members: {
                    include: { candidate: true }
                }
            }
        });
        return mapInscriptionToFrontend(updated);
    }

    async updateLearningGroup(groupId, data) {
        const { groupName, inscriptionCode, formationId, professorId, learningMode, dateInscription, note, candidateIds } = data;

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
        if (!group) throw new Error('LEARNING_GROUP_NOT_FOUND');

        const inscription = group.inscription;
        if (!inscription) throw new Error('ASSOCIATED_INSCRIPTION_NOT_FOUND');

        const dbLearningMode = learningMode === 'SPECIFIQUE' ? 'GROUPE' : (learningMode || 'GROUPE');

        const existingGroup = await prisma.group.findFirst({
            where: {
                id: { not: groupId },
                nom: { contains: inscriptionCode, mode: 'insensitive' }
            }
        });
        if (existingGroup) {
            throw new Error('INSCRIPTION_CODE_EXISTS');
        }

        if (dbLearningMode === 'MONOME' && candidateIds.length > 1) {
            throw new Error('MONOME_LIMIT_EXCEEDED');
        }
        if (dbLearningMode === 'BINOME' && candidateIds.length > 2) {
            throw new Error('BINOME_LIMIT_EXCEEDED');
        }

        return await prisma.$transaction(async (tx) => {
            await tx.group.update({
                where: { id: groupId },
                data: { nom: groupName }
            });

            await tx.inscription.update({
                where: { id: inscription.id },
                data: {
                    formationId,
                    professorId: professorId || null,
                    learningMode: dbLearningMode,
                    dateInscription: new Date(dateInscription),
                    note
                }
            });

            const currentMemberCandidateIds = inscription.members.map(m => m.candidateId);
            const candidatesToRemove = inscription.members.filter(m => !candidateIds.includes(m.candidateId));
            const candidateIdsToAdd = candidateIds.filter(cid => !currentMemberCandidateIds.includes(cid));

            for (const member of candidatesToRemove) {
                await tx.inscriptionCandidate.delete({ where: { id: member.id } });
            }

            if (candidateIdsToAdd.length > 0) {
                await tx.inscriptionCandidate.createMany({
                    data: candidateIdsToAdd.map(cid => ({
                        inscriptionId: inscription.id,
                        candidateId: cid
                    }))
                });
            }

            const updatedGroup = await tx.group.findUnique({
                where: { id: groupId },
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

            if (!updatedGroup) return null;

            const updatedIns = updatedGroup.inscription || {};
            const codeVal = extractInscriptionCode(updatedGroup.nom);

            const mappedInscriptions = (updatedIns.members || []).map(m => ({
                id: updatedIns.id,
                dateInscription: updatedIns.dateInscription,
                status: updatedIns.status,
                note: updatedIns.note,
                duration: updatedIns.duration,
                price: updatedIns.price,
                volumeHoraire: updatedIns.volumeHoraire,
                remainingHours: updatedIns.remainingHours,
                learningMode: updatedIns.learningMode,
                candidateId: m.candidateId,
                candidate: m.candidate,
                formationId: updatedIns.formationId,
                professorId: updatedIns.professorId,
                createdAt: updatedIns.createdAt,
                updatedAt: updatedIns.updatedAt,
                inscriptionCode: codeVal,
                learningGroupId: updatedGroup.id
            }));

            return {
                id: updatedGroup.id,
                groupName: updatedGroup.nom,
                inscriptionCode: codeVal,
                learningMode: updatedIns.learningMode || 'GROUPE',
                dateInscription: updatedIns.dateInscription || updatedGroup.createdAt,
                note: updatedIns.note || null,
                formation: updatedGroup.inscription?.formation || null,
                professor: updatedGroup.inscription?.professor || null,
                inscriptions: mappedInscriptions
            };
        });
    }
}

export default new InscriptionService();
