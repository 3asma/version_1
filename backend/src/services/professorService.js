import prisma from '../config/prisma.js';

class ProfessorService {
    normalizeData(data) {
        const n = { ...data };

        // Mapping from frontend
        if (n.firstName) { n.prenom = n.firstName.trim(); delete n.firstName; }
        if (n.lastName) { n.nom = n.lastName.trim(); delete n.lastName; }
        if (n.phone) { n.telephone = n.phone.trim(); delete n.phone; }
        if (n.address) { n.adresse = n.address.trim(); delete n.address; }
        if (n.subjects) {
            n.specialite = Array.isArray(n.subjects) ? n.subjects.join(', ') : n.subjects.trim();
            delete n.subjects;
        }

        if (n.nom) n.nom = n.nom.trim();
        if (n.prenom) n.prenom = n.prenom.trim();
        if (n.email) n.email = n.email.trim().toLowerCase();
        if (n.telephone) n.telephone = n.telephone.trim();
        if (n.adresse) n.adresse = n.adresse.trim();
        if (n.specialite) n.specialite = n.specialite.trim();
        if (n.dayOff) n.dayOff = n.dayOff.trim();
        if (n.type) n.type = n.type.trim();

        return n;
    }

    validateData(data, isUpdate = false) {
        const { nom, prenom, email } = data;

        if (!isUpdate) {
            if (!nom || nom === '') throw new Error('NOM_REQUIRED');
            if (!prenom || prenom === '') throw new Error('PRENOM_REQUIRED');
        } else {
            if (nom !== undefined && nom === '') throw new Error('NOM_REQUIRED');
            if (prenom !== undefined && prenom === '') throw new Error('PRENOM_REQUIRED');
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('INVALID_EMAIL');
        }
    }

    async getAllProfessors() {
        return await prisma.professor.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getProfessorById(id) {
        return await prisma.professor.findUnique({ where: { id } });
    }

    async createProfessor(data) {
        const normalized = this.normalizeData(data);
        this.validateData(normalized);

        if (normalized.email) {
            const existing = await prisma.professor.findUnique({ where: { email: normalized.email } });
            if (existing) throw new Error('DUPLICATE_EMAIL');
        }

        return await prisma.professor.create({
            data: {
                nom: normalized.nom,
                prenom: normalized.prenom,
                email: normalized.email || null,
                telephone: normalized.telephone || null,
                adresse: normalized.adresse || null,
                specialite: normalized.specialite || null,
                type: normalized.type || 'permanent',
                dayOff: normalized.dayOff || 'Sunday',
                maxSessions: normalized.maxSessions ? parseInt(normalized.maxSessions) : 25
            }
        });
    }

    async updateProfessor(id, data) {
        const normalized = this.normalizeData(data);
        this.validateData(normalized, true);

        if (normalized.email) {
            const existing = await prisma.professor.findUnique({ where: { email: normalized.email } });
            if (existing && existing.id !== id) throw new Error('DUPLICATE_EMAIL');
        }

        const updateData = { ...normalized };
        if (updateData.maxSessions !== undefined) updateData.maxSessions = parseInt(updateData.maxSessions);

        return await prisma.professor.update({
            where: { id },
            data: updateData
        });
    }

    async deleteProfessor(id) {
        return await prisma.professor.delete({ where: { id } });
    }
}

export default new ProfessorService();
