import prisma from '../config/prisma.js';

async function generatePaymentCode() {
    const year = new Date().getFullYear();
    const prefix = `PAY-${year}-`;

    // Find the latest payment code for the current year
    const lastPayment = await prisma.payment.findFirst({
        where: {
            paymentCode: {
                startsWith: prefix
            }
        },
        orderBy: {
            paymentCode: 'desc'
        }
    });

    let nextNumber = 1;
    if (lastPayment && lastPayment.paymentCode) {
        const parts = lastPayment.paymentCode.split('-');
        if (parts.length === 3) {
            const num = parseInt(parts[2], 10);
            if (!isNaN(num)) {
                nextNumber = num + 1;
            }
        }
    }

    const paddedNum = String(nextNumber).padStart(4, '0');
    return `${prefix}${paddedNum}`;
}

class PaymentService {
    async getAllPayments() {
        return await prisma.payment.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                candidate: true,
                formation: true
            }
        });
    }

    async getPaymentById(id) {
        return await prisma.payment.findUnique({
            where: { id },
            include: {
                candidate: true,
                formation: true
            }
        });
    }

    async createPayment(data) {
        // Enforce candidate existence
        if (!data.candidateId) throw new Error('CANDIDATE_NOT_FOUND');
        const candidate = await prisma.candidate.findUnique({ where: { id: data.candidateId } });
        if (!candidate) throw new Error('CANDIDATE_NOT_FOUND');

        // Enforce formation existence
        if (!data.formationId) throw new Error('FORMATION_NOT_FOUND');
        const formation = await prisma.formation.findUnique({ where: { id: data.formationId } });
        if (!formation) throw new Error('FORMATION_NOT_FOUND');

        // Validation for amount
        if (data.amount === undefined || data.amount === null || typeof data.amount !== 'number' || data.amount <= 0) {
            throw new Error('INVALID_AMOUNT');
        }

        // Validation for enums
        const paymentMethod = data.paymentMethod?.toUpperCase();
        if (!['CASH', 'CARD', 'BANK_TRANSFER', 'CHEQUE'].includes(paymentMethod)) {
            throw new Error('INVALID_PAYMENT_METHOD');
        }

        const status = data.status?.toUpperCase();
        if (!['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'].includes(status)) {
            throw new Error('INVALID_PAYMENT_STATUS');
        }

        let paymentCode;
        let payment;
        let attempts = 0;
        while (attempts < 5) {
            try {
                paymentCode = await generatePaymentCode();
                payment = await prisma.payment.create({
                    data: {
                        paymentCode,
                        candidateId: data.candidateId,
                        formationId: data.formationId,
                        amount: data.amount,
                        paymentMethod,
                        status,
                        paymentDate: data.paymentDate ? new Date(data.paymentDate) : new Date(),
                        note: data.note || null
                    },
                    include: {
                        candidate: true,
                        formation: true
                    }
                });
                break;
            } catch (error) {
                // Unique constraint failed on paymentCode, retry with next code
                if (error.code === 'P2002' && error.meta?.target?.includes('paymentCode')) {
                    attempts++;
                    continue;
                }
                throw error;
            }
        }
        if (!payment) throw new Error('CODE_GENERATION_FAILED');
        return payment;
    }

    async updatePayment(id, data) {
        // Enforce validations if fields are present in data
        if (data.candidateId !== undefined) {
            if (!data.candidateId) throw new Error('CANDIDATE_NOT_FOUND');
            const candidate = await prisma.candidate.findUnique({ where: { id: data.candidateId } });
            if (!candidate) throw new Error('CANDIDATE_NOT_FOUND');
        }

        if (data.formationId !== undefined) {
            if (!data.formationId) throw new Error('FORMATION_NOT_FOUND');
            const formation = await prisma.formation.findUnique({ where: { id: data.formationId } });
            if (!formation) throw new Error('FORMATION_NOT_FOUND');
        }

        if (data.amount !== undefined) {
            if (data.amount === null || typeof data.amount !== 'number' || data.amount <= 0) {
                throw new Error('INVALID_AMOUNT');
            }
        }

        let paymentMethod;
        if (data.paymentMethod !== undefined) {
            paymentMethod = data.paymentMethod?.toUpperCase();
            if (!['CASH', 'CARD', 'BANK_TRANSFER', 'CHEQUE'].includes(paymentMethod)) {
                throw new Error('INVALID_PAYMENT_METHOD');
            }
        }

        let status;
        if (data.status !== undefined) {
            status = data.status?.toUpperCase();
            if (!['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'].includes(status)) {
                throw new Error('INVALID_PAYMENT_STATUS');
            }
        }

        const updateData = {};
        if (data.candidateId !== undefined) updateData.candidateId = data.candidateId;
        if (data.formationId !== undefined) updateData.formationId = data.formationId;
        if (data.amount !== undefined) updateData.amount = data.amount;
        if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;
        if (status !== undefined) updateData.status = status;
        if (data.paymentDate !== undefined) updateData.paymentDate = data.paymentDate ? new Date(data.paymentDate) : null;
        if (data.note !== undefined) updateData.note = data.note;

        return await prisma.payment.update({
            where: { id },
            data: updateData,
            include: {
                candidate: true,
                formation: true
            }
        });
    }

    async deletePayment(id) {
        return await prisma.payment.delete({
            where: { id }
        });
    }
}

export default new PaymentService();
