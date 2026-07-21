import prisma from '../config/prisma.js';

class FormationService {
    normalizeData(data) {
        const n = {};

        let rawMatiere = data.matiere || data.subject;
        let rawNiveau = data.niveau || data.level;

        if (rawMatiere !== undefined && rawMatiere !== null) {
            n.matiere = String(rawMatiere).trim();
        }
        if (rawNiveau !== undefined && rawNiveau !== null) {
            n.niveau = String(rawNiveau).trim();
        }
        return n;
    }

    validateData(data, isUpdate = false) {
        const { matiere, niveau } = data;

        if (!isUpdate) {
            if (!matiere || matiere.trim() === '') throw new Error('MATIERE_REQUIRED');
            if (!niveau || niveau.trim() === '') throw new Error('NIVEAU_REQUIRED');
        } else {
            if (matiere !== undefined && matiere.trim() === '') throw new Error('MATIERE_REQUIRED');
            if (niveau !== undefined && niveau.trim() === '') throw new Error('NIVEAU_REQUIRED');
        }
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
                niveau: normalized.niveau
            }
        });
    }

    async updateFormation(id, data) {
        const normalized = this.normalizeData(data);
        this.validateData(normalized, true);

        const updateData = {
            matiere: normalized.matiere,
            niveau: normalized.niveau
        };

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
