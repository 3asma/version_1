import prisma from '../config/prisma.js';

class ProspectService {
    /**
     * Normalize string data (trim, specific casing)
     */
    normalizeData(data) {
        const allowedKeys = [
            'firstName',
            'lastName',
            'age',
            'occupation',
            'giftCode',
            'observation',
            'contact',
            'action',
            'status',
            'freeSessionsCompleted',
            'absences'
        ];

        const normalized = {};
        for (const key of allowedKeys) {
            if (key in data) {
                normalized[key] = data[key];
            }
        }

        if (normalized.firstName) {
            normalized.firstName = normalized.firstName.trim();
            normalized.firstName = normalized.firstName.charAt(0).toUpperCase() + normalized.firstName.slice(1).toLowerCase();
        }
        if (normalized.lastName) {
            normalized.lastName = normalized.lastName.trim().toUpperCase();
        }
        if (normalized.giftCode) {
            normalized.giftCode = normalized.giftCode.trim();
        }

        // Normalize occupation and observation for Enum compatibility (UPPERCASE)
        if (normalized.occupation) normalized.occupation = normalized.occupation.toUpperCase();
        if (normalized.observation) normalized.observation = normalized.observation.toUpperCase();

        if ('action' in normalized) {
            normalized.action = (normalized.action && normalized.action.trim() !== '') ? normalized.action.trim() : null;
        }

        if ('age' in normalized && normalized.age !== undefined && normalized.age !== null) {
            normalized.age = parseInt(normalized.age);
        }
        if ('freeSessionsCompleted' in normalized && normalized.freeSessionsCompleted !== undefined && normalized.freeSessionsCompleted !== null) {
            normalized.freeSessionsCompleted = parseInt(normalized.freeSessionsCompleted);
        }
        if ('absences' in normalized && normalized.absences !== undefined && normalized.absences !== null) {
            normalized.absences = parseInt(normalized.absences);
        }

        return normalized;
    }

    async getAllProspects() {
        return await prisma.prospect.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }

    async getProspectById(id) {
        return await prisma.prospect.findUnique({
            where: { id }
        });
    }

    async createProspect(data) {
        const normalized = this.normalizeData(data);
        if (normalized.membershipNumber) {
            const existing = await prisma.prospect.findUnique({ where: { membershipNumber: normalized.membershipNumber } });
            if (existing) throw new Error('MEMBERSHIP_NUMBER_TAKEN');
        }
        return await prisma.prospect.create({
            data: normalized
        });
    }

    async updateProspect(id, data) {
        const normalized = this.normalizeData(data);
        if (normalized.membershipNumber) {
            const existing = await prisma.prospect.findUnique({ where: { membershipNumber: normalized.membershipNumber } });
            if (existing && existing.id !== id) throw new Error('MEMBERSHIP_NUMBER_TAKEN');
        }
        return await prisma.prospect.update({
            where: { id },
            data: normalized
        });
    }

    async deleteProspect(id) {
        return await prisma.prospect.delete({
            where: { id }
        });
    }
}

export default new ProspectService();
