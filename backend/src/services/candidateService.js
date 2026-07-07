import prisma from '../config/prisma.js';

async function generateCandidateCode() {
    const year = new Date().getFullYear();
    let code;
    let exists = true;
    let attempts = 0;
    while (exists && attempts < 10) {
        const random = Math.floor(1000 + Math.random() * 9000);
        code = `CAN-${year}-${random}`;
        const found = await prisma.candidate.findUnique({ where: { candidateCode: code } });
        exists = !!found;
        attempts++;
    }
    if (exists) throw new Error('CODE_GENERATION_FAILED');
    return code;
}

class CandidateService {
    normalizeData(data) {
        const n = { ...data };
        delete n.formationId; // Candidate model no longer has this field
        if (n.firstName) n.firstName = n.firstName.trim().charAt(0).toUpperCase() + n.firstName.trim().slice(1).toLowerCase();
        if (n.lastName) n.lastName = n.lastName.trim().toUpperCase();
        if (n.email) n.email = n.email.trim().toLowerCase();
        if (n.action) n.action = n.action.trim();
        if (n.occupation) n.occupation = n.occupation.toUpperCase();
        if (n.observation) n.observation = n.observation.toUpperCase();
        if (n.status) n.status = n.status.toUpperCase();
        return n;
    }

    async getAllCandidates() {
        return await prisma.candidate.findMany({
            orderBy: { createdAt: 'desc' },
            include: { inscriptions: true }
        });
    }

    async getCandidateById(id) {
        return await prisma.candidate.findUnique({
            where: { id },
            include: { inscriptions: true }
        });
    }

    async createCandidate(data) {
        const normalized = this.normalizeData(data);

        if (normalized.email) {
            const existing = await prisma.candidate.findUnique({ where: { email: normalized.email } });
            if (existing) throw new Error('EMAIL_TAKEN');
        }

        const candidateCode = await generateCandidateCode();

        return await prisma.candidate.create({
            data: { ...normalized, candidateCode }
        });
    }

    async updateCandidate(id, data) {
        const normalized = this.normalizeData(data);

        if (normalized.email) {
            const existing = await prisma.candidate.findUnique({ where: { email: normalized.email } });
            if (existing && existing.id !== id) throw new Error('EMAIL_TAKEN');
        }

        if (normalized.status && !['ACTIVE', 'INACTIVE', 'PENDING'].includes(normalized.status)) {
            throw new Error('INVALID_STATUS');
        }

        return await prisma.candidate.update({ where: { id }, data: normalized });
    }

    async deleteCandidate(id) {
        return await prisma.candidate.delete({ where: { id } });
    }
}

export default new CandidateService();
