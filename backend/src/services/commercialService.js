import prisma from '../config/prisma.js';

class CommercialService {
    async getAllCommercials() {
        return await prisma.commercial.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }

    async getCommercialById(id) {
        const commercial = await prisma.commercial.findUnique({ where: { id } });
        if (!commercial) throw new Error('COMMERCIAL_NOT_FOUND');
        return commercial;
    }

    async createCommercial(data) {
        const { firstName, lastName, phone, email, action } = data;
        return await prisma.commercial.create({
            data: {
                firstName,
                lastName,
                phone,
                email,
                action: action || null
            }
        });
    }

    async updateCommercial(id, data) {
        const { firstName, lastName, phone, email, action } = data;
        return await prisma.commercial.update({
            where: { id },
            data: {
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                phone: phone || undefined,
                email: email || undefined,
                action: action !== undefined ? action : undefined
            }
        });
    }

    async deleteCommercial(id) {
        return await prisma.commercial.delete({ where: { id } });
    }
}

export default new CommercialService();
