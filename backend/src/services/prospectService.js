import prisma from '../config/prisma.js';

class ProspectService {
    /**
     * Normalize string data (trim, specific casing)
     */
    normalizeData(data) {
        const normalized = { ...data };
        if (normalized.firstName) {
            normalized.firstName = normalized.firstName.trim();
            normalized.firstName = normalized.firstName.charAt(0).toUpperCase() + normalized.firstName.slice(1).toLowerCase();
        }
        if (normalized.lastName) {
            normalized.lastName = normalized.lastName.trim().toUpperCase();
        }
        if (normalized.subject) normalized.subject = normalized.subject.trim();
        if (normalized.giftCode) normalized.giftCode = normalized.giftCode.trim();
        if (normalized.action) normalized.action = normalized.action.trim();

        // Normalize occupation and observation for Enum compatibility (UPPERCASE)
        if (normalized.occupation) normalized.occupation = normalized.occupation.toUpperCase();
        if (normalized.observation) normalized.observation = normalized.observation.toUpperCase();

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
        return await prisma.prospect.create({
            data: normalized
        });
    }

    async updateProspect(id, data) {
        const normalized = this.normalizeData(data);
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
