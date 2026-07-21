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
    mapped.learningGroupId = ins.groupId;

    let codeVal = '';
    if (ins.group) {
        codeVal = extractInscriptionCode(ins.group.nom);
    }
    mapped.inscriptionCode = codeVal;

    if (ins.group) {
        mapped.learningGroup = {
            id: ins.group.id,
            groupName: ins.group.nom,
            inscriptionCode: codeVal,
            learningMode: ins.group.type,
            dateInscription: ins.dateInscription || ins.group.createdAt,
            note: ins.note || null,
            formation: ins.group.formation || ins.formation,
            professor: ins.group.professor || ins.professor,
            inscriptions: ins.group.inscriptions || []
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
                inscriptions: true
            }
        });

        if (existingGroups.length > 0) {
            for (const group of existingGroups) {
                if (effectiveMode === 'MONOME' || group.type === 'MONOME') {
                    throw new Error('INSCRIPTION_CODE_EXISTS');
                }

                if (effectiveMode === 'BINOME') {
                    if (group.type !== 'BINOME' || group.formationId !== formationId) {
                        throw new Error('INSCRIPTION_CODE_EXISTS');
                    }
                }

                if (effectiveMode === 'GROUPE') {
                    if (group.type !== 'GROUPE' || group.formationId !== formationId) {
                        throw new Error('INSCRIPTION_CODE_EXISTS');
                    }
                }
            }
        }
    }

    async createInscription(data) {
        const normalized = this.normalizeData(data);

        if (!normalized.candidateId) throw new Error('CANDIDATE_ID_REQUIRED');
        if (!normalized.formationId) throw new Error('FORMATION_ID_REQUIRED');

        if (normalized.learningMode && !['MONOME', 'BINOME', 'GROUPE', 'SPECIFIQUE'].includes(normalized.learningMode)) {
            throw new Error('INVALID_LEARNING_MODE');
        }

        await this.checkInscriptionCodeConflict(null, normalized.inscriptionCode, normalized.learningMode, normalized.formationId);

        const candidate = await prisma.candidate.findUnique({ where: { id: normalized.candidateId } });
        if (!candidate) throw new Error('CANDIDATE_NOT_FOUND');

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

        let groupId = null;
        if (normalized.inscriptionCode) {
            const groupMode = normalized.learningMode === 'SPECIFIQUE' ? 'GROUPE' : (normalized.learningMode || 'GROUPE');
            if (groupMode !== 'MONOME') {
                const existingGroup = await prisma.group.findFirst({
                    where: {
                        nom: { contains: normalized.inscriptionCode, mode: 'insensitive' },
                        formationId: normalized.formationId
                    }
                });
                if (existingGroup) {
                    groupId = existingGroup.id;
                }
            }

            if (!groupId) {
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

                const newGroup = await prisma.group.create({
                    data: {
                        nom: groupName,
                        type: groupMode,
                        formationId: normalized.formationId,
                        professorId: normalized.professorId || null
                    }
                });
                groupId = newGroup.id;
            }
        }

        const creationData = {
            candidateId: normalized.candidateId,
            formationId: normalized.formationId,
            learningMode: normalized.learningMode === 'SPECIFIQUE' ? 'GROUPE' : (normalized.learningMode || 'GROUPE'),
            status: statusVal,
            note: normalized.note || null,
            duration: normalized.duration !== undefined ? normalized.duration : null,
            price: normalized.price !== undefined ? normalized.price : null,
            volumeHoraire: volumeHoraireVal,
            remainingHours: remainingHoursVal,
            groupId: groupId
        };

        const created = await prisma.inscription.create({
            data: creationData,
            include: {
                candidate: true,
                formation: true,
                group: {
                    include: {
                        formation: true,
                        professor: true,
                        inscriptions: {
                            include: { candidate: true }
                        }
                    }
                }
            }
        });
        return mapInscriptionToFrontend(created);
    }

    async getAllInscriptions() {
        const groups = await prisma.group.findMany({
            include: {
                formation: true,
                professor: true,
                inscriptions: {
                    include: {
                        candidate: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return groups.map(g => {
            const firstInscription = g.inscriptions[0] || {};
            const codeVal = extractInscriptionCode(g.nom);
            return {
                id: g.id,
                groupName: g.nom,
                inscriptionCode: codeVal,
                learningMode: g.type,
                dateInscription: firstInscription.dateInscription || g.createdAt,
                note: firstInscription.note || null,
                formation: g.formation,
                professor: g.professor,
                inscriptions: g.inscriptions.map(ins => ({
                    ...ins,
                    inscriptionCode: codeVal,
                    learningGroupId: g.id
                }))
            };
        }).filter(g => g.inscriptions && g.inscriptions.length > 0);
    }

    async getInscriptionById(id) {
        const inscription = await prisma.inscription.findUnique({
            where: { id },
            include: {
                candidate: true,
                formation: true,
                group: {
                    include: {
                        formation: true,
                        professor: true,
                        inscriptions: {
                            include: { candidate: true }
                        }
                    }
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
        delete dataToUpdate.inscriptionCode; // do not try to write non-existent column

        const updated = await prisma.inscription.update({
            where: { id },
            data: dataToUpdate,
            include: {
                candidate: true,
                formation: true,
                group: {
                    include: {
                        formation: true,
                        professor: true,
                        inscriptions: {
                            include: { candidate: true }
                        }
                    }
                }
            }
        });
        return mapInscriptionToFrontend(updated);
    }

    async deleteInscription(id) {
        return await prisma.inscription.delete({ where: { id } });
    }

    async deleteLearningGroup(id) {
        const group = await prisma.group.findUnique({
            where: { id },
            include: { inscriptions: true }
        });
        if (!group) throw new Error('LEARNING_GROUP_NOT_FOUND');

        const inscriptionIds = group.inscriptions.map(ins => ins.id);

        await prisma.$transaction([
            prisma.inscription.deleteMany({
                where: { id: { in: inscriptionIds } }
            }),
            prisma.group.delete({
                where: { id }
            })
        ]);
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
                group: {
                    include: {
                        formation: true,
                        professor: true,
                        inscriptions: {
                            include: { candidate: true }
                        }
                    }
                }
            }
        });
        return mapInscriptionToFrontend(updated);
    }

    async updateLearningGroup(groupId, data) {
        const { groupName, inscriptionCode, formationId, professorId, learningMode, dateInscription, note, candidateIds } = data;

        const group = await prisma.group.findUnique({
            where: { id: groupId },
            include: { inscriptions: true }
        });
        if (!group) throw new Error('LEARNING_GROUP_NOT_FOUND');

        const dbLearningMode = learningMode === 'SPECIFIQUE' ? 'GROUPE' : (learningMode || 'GROUPE');

        const existingGroupIns = await prisma.inscription.findFirst({
            where: {
                groupId: { not: groupId, not: null },
                group: {
                    nom: { contains: inscriptionCode, mode: 'insensitive' }
                }
            }
        });
        if (existingGroupIns) {
            throw new Error('INSCRIPTION_CODE_EXISTS');
        }

        await prisma.group.update({
            where: { id: groupId },
            data: {
                nom: groupName,
                type: dbLearningMode,
                formationId,
                professorId: professorId || null
            }
        });

        const currentMemberCandidateIds = group.inscriptions.map(ins => ins.candidateId);

        const candidatesToRemove = group.inscriptions.filter(ins => !candidateIds.includes(ins.candidateId));
        const candidateIdsToAdd = candidateIds.filter(cid => !currentMemberCandidateIds.includes(cid));
        const inscriptionsToUpdate = group.inscriptions.filter(ins => candidateIds.includes(ins.candidateId));

        for (const ins of candidatesToRemove) {
            await prisma.inscription.delete({ where: { id: ins.id } });
        }

        for (const ins of inscriptionsToUpdate) {
            await prisma.inscription.update({
                where: { id: ins.id },
                data: {
                    formationId,
                    professorId: professorId || null,
                    learningMode: dbLearningMode,
                    dateInscription: new Date(dateInscription),
                    note
                }
            });
        }

        const baseIns = group.inscriptions[0] || {};
        const basePrice = baseIns.price || 0;
        const baseVolume = baseIns.volumeHoraire || 72;
        const baseDuration = baseIns.duration || 6;

        for (const cid of candidateIdsToAdd) {
            await prisma.inscription.create({
                data: {
                    candidateId: cid,
                    formationId,
                    professorId: professorId || null,
                    learningMode: dbLearningMode,
                    dateInscription: new Date(dateInscription),
                    note,
                    status: 'ACTIVE',
                    price: basePrice,
                    duration: baseDuration,
                    volumeHoraire: baseVolume,
                    remainingHours: baseVolume,
                    groupId: groupId
                }
            });
        }

        const updatedGroup = await prisma.group.findUnique({
            where: { id: groupId },
            include: {
                formation: true,
                professor: true,
                inscriptions: {
                    include: { candidate: true }
                }
            }
        });

        if (!updatedGroup) return null;

        const firstInscription = updatedGroup.inscriptions[0] || {};
        const codeVal = extractInscriptionCode(updatedGroup.nom);
        return {
            id: updatedGroup.id,
            groupName: updatedGroup.nom,
            inscriptionCode: codeVal,
            learningMode: updatedGroup.type,
            dateInscription: firstInscription.dateInscription || updatedGroup.createdAt,
            note: firstInscription.note || null,
            formation: updatedGroup.formation,
            professor: updatedGroup.professor,
            inscriptions: updatedGroup.inscriptions.map(ins => ({
                ...ins,
                inscriptionCode: codeVal,
                learningGroupId: updatedGroup.id
            }))
        };
    }
}

export default new InscriptionService();
