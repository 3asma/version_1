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
        const allowedKeys = [
            'candidateCode',
            'membershipNumber',
            'firstName',
            'lastName',
            'gender',
            'age',
            'occupation',
            'phone',
            'email',
            'registrationDate',
            'giftCode',
            'observation',
            'contact',
            'action',
            'firstContactId',
            'secondContactId',
            'status'
        ];

        const n = {};
        for (const key of allowedKeys) {
            if (key in data) {
                n[key] = data[key];
            }
        }

        if (n.firstName) n.firstName = n.firstName.trim().charAt(0).toUpperCase() + n.firstName.trim().slice(1).toLowerCase();
        if (n.lastName) n.lastName = n.lastName.trim().toUpperCase();
        if (n.email) n.email = n.email.trim().toLowerCase();
        if (n.occupation) n.occupation = n.occupation.toUpperCase();
        if (n.observation) n.observation = n.observation.toUpperCase();
        if (n.status) n.status = n.status.toUpperCase();

        if ('action' in n) {
            n.action = (n.action && n.action.trim() !== '') ? n.action.trim() : null;
        }

        if ('age' in n && n.age !== undefined && n.age !== null) {
            n.age = parseInt(n.age);
        }
        return n;
    }

    async getAllCandidates() {
        return await prisma.candidate.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                inscriptions: {
                    include: {
                        formation: true
                    }
                }
            }
        });
    }

    async getCandidateById(id) {
        return await prisma.candidate.findUnique({
            where: { id },
            include: {
                inscriptions: {
                    include: {
                        formation: true
                    }
                }
            }
        });
    }

    async createCandidate(data) {
        const normalized = this.normalizeData(data);

        if (normalized.email) {
            const existing = await prisma.candidate.findUnique({ where: { email: normalized.email } });
            if (existing) throw new Error('EMAIL_TAKEN');
        }

        if (normalized.membershipNumber) {
            const existing = await prisma.candidate.findFirst({ where: { membershipNumber: normalized.membershipNumber } });
            if (existing) throw new Error('MEMBERSHIP_NUMBER_TAKEN');
        }

        const candidateCode = await generateCandidateCode();

        return await prisma.candidate.create({
            data: { ...normalized, candidateCode },
            include: {
                inscriptions: {
                    include: {
                        formation: true
                    }
                }
            }
        });
    }

    async updateCandidate(id, data) {
        const normalized = this.normalizeData(data);

        if (normalized.email) {
            const existing = await prisma.candidate.findUnique({ where: { email: normalized.email } });
            if (existing && existing.id !== id) throw new Error('EMAIL_TAKEN');
        }

        if (normalized.membershipNumber) {
            const existing = await prisma.candidate.findFirst({ where: { membershipNumber: normalized.membershipNumber } });
            if (existing && existing.id !== id) throw new Error('MEMBERSHIP_NUMBER_TAKEN');
        }

        if (normalized.status && !['ACTIVE', 'INACTIVE', 'PENDING'].includes(normalized.status)) {
            throw new Error('INVALID_STATUS');
        }

        return await prisma.candidate.update({
            where: { id },
            data: normalized,
            include: {
                inscriptions: {
                    include: {
                        formation: true
                    }
                }
            }
        });
    }

    async deleteCandidate(id) {
        return await prisma.candidate.delete({ where: { id } });
    }

    async getCandidateFormations(candidateId) {
        const inscriptions = await prisma.inscription.findMany({
            where: {
                members: {
                    some: {
                        candidateId
                    }
                },
                status: { in: ['ACTIVE', 'ASSIGNED', 'WAITING'] }
            },
            include: {
                formation: true
            }
        });

        const uniqueFormations = [];
        const seenIds = new Set();
        for (const ins of inscriptions) {
            if (ins.formation && !seenIds.has(ins.formation.id)) {
                seenIds.add(ins.formation.id);
                uniqueFormations.push({
                    id: ins.formation.id,
                    subject: ins.formation.matiere,
                    level: ins.formation.niveau
                });
            }
        }

        return uniqueFormations;
    }
}

export default new CandidateService();

