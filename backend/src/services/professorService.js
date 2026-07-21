import prisma from '../config/prisma.js';

class ProfessorService {
    normalizeData(data) {
        const allowedKeys = [
            'id',
            'nom',
            'prenom',
            'email',
            'telephone',
            'adresse',
            'type',
            'dayOff',
            'maxSessions',
            'firstName',
            'lastName',
            'phone',
            'address'
        ];

        const raw = {};
        for (const key of allowedKeys) {
            if (key in data) {
                raw[key] = data[key];
            }
        }

        const n = {};
        let prenom = raw.prenom !== undefined ? raw.prenom : raw.firstName;
        let nom = raw.nom !== undefined ? raw.nom : raw.lastName;
        let telephone = raw.telephone !== undefined ? raw.telephone : raw.phone;
        let adresse = raw.adresse !== undefined ? raw.adresse : raw.address;

        if (prenom !== undefined && prenom !== null) n.prenom = String(prenom).trim();
        if (nom !== undefined && nom !== null) n.nom = String(nom).trim();
        if (telephone !== undefined && telephone !== null) n.telephone = String(telephone).trim();
        if (adresse !== undefined && adresse !== null) n.adresse = String(adresse).trim();

        if (raw.email !== undefined && raw.email !== null) n.email = String(raw.email).trim().toLowerCase();
        if (raw.dayOff !== undefined && raw.dayOff !== null) n.dayOff = String(raw.dayOff).trim();
        if (raw.type !== undefined && raw.type !== null) n.type = String(raw.type).trim();
        if (raw.maxSessions !== undefined && raw.maxSessions !== null) n.maxSessions = parseInt(raw.maxSessions);

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
        return await prisma.professor.findMany({
            orderBy: { createdAt: 'desc' },
            include: { groups: true }
        });
    }

    async getProfessorById(id) {
        return await prisma.professor.findUnique({
            where: { id },
            include: { groups: true }
        });
    }

    async createProfessor(data) {
        const normalized = this.normalizeData(data);
        this.validateData(normalized);

        if (normalized.email) {
            const existing = await prisma.professor.findUnique({ where: { email: normalized.email } });
            if (existing) throw new Error('DUPLICATE_EMAIL');
        }

        const creationData = {
            email: null,
            telephone: null,
            adresse: null,
            type: 'permanent',
            dayOff: 'Sunday',
            maxSessions: 25,
            ...normalized
        };

        return await prisma.professor.create({
            data: creationData,
            include: { groups: true }
        });
    }

    async updateProfessor(id, data) {
        const normalized = this.normalizeData(data);
        this.validateData(normalized, true);

        if (normalized.email) {
            const existing = await prisma.professor.findUnique({ where: { email: normalized.email } });
            if (existing && existing.id !== id) throw new Error('DUPLICATE_EMAIL');
        }

        return await prisma.professor.update({
            where: { id },
            data: normalized,
            include: { groups: true }
        });
    }

    async deleteProfessor(id) {
        return await prisma.professor.delete({ where: { id } });
    }
}

export default new ProfessorService();
