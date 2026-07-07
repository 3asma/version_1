import prisma from '../config/prisma.js';

class FormationService {
    normalizeData(data) {
        const n = { ...data };
        if (n.matiere) n.matiere = n.matiere.trim();
        if (n.subject) {
            n.matiere = n.subject.trim();
            delete n.subject;
        }
        if (n.niveau) n.niveau = n.niveau.trim();
        if (n.level) {
            n.niveau = n.level.trim();
            delete n.level;
        }
        if (n.description) n.description = n.description.trim();
        if (n.type) n.type = n.type.trim();
        return n;
    }

    validateData(data, isUpdate = false) {
        const { matiere, niveau, prix, volumeHoraire, duration, totalSessions, type } = data;

        if (!isUpdate) {
            if (!matiere || matiere.trim() === '') throw new Error('MATIERE_REQUIRED');
            if (!niveau || niveau.trim() === '') throw new Error('NIVEAU_REQUIRED');
        } else {
            if (matiere !== undefined && matiere.trim() === '') throw new Error('MATIERE_REQUIRED');
            if (niveau !== undefined && niveau.trim() === '') throw new Error('NIVEAU_REQUIRED');
        }

        if (prix !== undefined && Number(prix) < 0) throw new Error('INVALID_PRIX');
        if (volumeHoraire !== undefined && parseInt(volumeHoraire) < 0) throw new Error('INVALID_VOLUME');
        if (duration !== undefined && parseInt(duration) <= 0) throw new Error('INVALID_DURATION');
        if (totalSessions !== undefined && parseInt(totalSessions) <= 0) throw new Error('INVALID_TOTAL_SESSIONS');
    }

    async getAllFormations() {
        return await prisma.formation.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getFormationById(id) {
        return await prisma.formation.findUnique({ where: { id } });
    }

    async createFormation(data) {
        const normalized = this.normalizeData(data);
        this.validateData(normalized);

        return await prisma.formation.create({
            data: {
                matiere: normalized.matiere,
                niveau: normalized.niveau,
                type: normalized.type || 'individual',
                duration: normalized.duration ? parseInt(normalized.duration) : 60,
                totalSessions: normalized.totalSessions ? parseInt(normalized.totalSessions) : 1,
                prix: normalized.prix ? parseFloat(normalized.prix) : 0,
                volumeHoraire: normalized.volumeHoraire ? parseInt(normalized.volumeHoraire) : (normalized.duration && normalized.totalSessions ? Math.ceil(parseInt(normalized.duration) * parseInt(normalized.totalSessions) / 60) : 0),
                description: normalized.description || ''
            }
        });
    }

    async updateFormation(id, data) {
        const normalized = this.normalizeData(data);
        this.validateData(normalized, true);

        const updateData = { ...normalized };
        if (updateData.prix !== undefined) updateData.prix = parseFloat(updateData.prix);
        if (updateData.volumeHoraire !== undefined) updateData.volumeHoraire = parseInt(updateData.volumeHoraire);
        if (updateData.duration !== undefined) updateData.duration = parseInt(updateData.duration);
        if (updateData.totalSessions !== undefined) updateData.totalSessions = parseInt(updateData.totalSessions);

        return await prisma.formation.update({
            where: { id },
            data: updateData
        });
    }

    async deleteFormation(id) {
        return await prisma.formation.delete({ where: { id } });
    }
}

export default new FormationService();
