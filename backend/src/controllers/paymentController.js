import paymentService from '../services/paymentService.js';

export const getAllPayments = async (req, res) => {
    try {
        const { candidateId } = req.query;
        const payments = await paymentService.getAllPayments(candidateId);
        res.status(200).json({ message: 'success', data: payments });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getPaymentById = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'error', error: 'Payment not found' });
        }
        res.status(200).json({ message: 'success', data: payment });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const createPayment = async (req, res) => {
    const { candidateId, formationId, amount, paymentMethod, status, paymentDate, note, totalAmount, checkDueDate } = req.body;

    if (!candidateId || !formationId || amount === undefined || !paymentMethod) {
        return res.status(400).json({
            message: 'error',
            error: 'Missing required fields: candidateId, formationId, amount, paymentMethod'
        });
    }

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({
            message: 'error',
            error: 'Amount must be a positive number'
        });
    }

    const pm = paymentMethod.toUpperCase();
    if (!['CASH', 'CARD', 'BANK_TRANSFER', 'CHEQUE'].includes(pm)) {
        return res.status(400).json({
            message: 'error',
            error: 'Invalid paymentMethod. Use CASH, CARD, BANK_TRANSFER, or CHEQUE'
        });
    }

    const defaultStatus = pm === 'CHEQUE' ? 'PENDING' : 'COMPLETED';
    const pst = (status || defaultStatus).toUpperCase();
    if (!['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'].includes(pst)) {
        return res.status(400).json({
            message: 'error',
            error: 'Invalid status. Use PENDING, COMPLETED, FAILED, or REFUNDED'
        });
    }

    let resolvedPaymentDate = paymentDate ? new Date(paymentDate).toISOString() : new Date().toISOString();
    if (pm === 'CHEQUE') {
        const checkDueDateValue = checkDueDate || req.body.dueDate;
        if (!checkDueDateValue) {
            return res.status(400).json({
                message: 'error',
                error: 'Missing cheque due date'
            });
        }

        const payDateObj = new Date(paymentDate || new Date());
        const dueDateObj = new Date(checkDueDateValue);

        payDateObj.setHours(0, 0, 0, 0);
        dueDateObj.setHours(0, 0, 0, 0);

        if (dueDateObj.getTime() < payDateObj.getTime()) {
            return res.status(400).json({
                message: 'error',
                error: 'Cheque due date cannot be before payment date'
            });
        }

        resolvedPaymentDate = dueDateObj.toISOString();
    }

    try {
        const payment = await paymentService.createPayment({
            candidateId,
            formationId,
            amount,
            paymentMethod: pm,
            status: pst,
            paymentDate: resolvedPaymentDate,
            note,
            totalAmount
        });
        res.status(201).json({ message: 'success', data: payment });
    } catch (error) {
        let statusCode = 500;
        let errorMessage = error.message;

        if (error.message === 'CANDIDATE_NOT_FOUND') {
            statusCode = 404;
            errorMessage = 'Candidate not found';
        } else if (error.message === 'FORMATION_NOT_FOUND') {
            statusCode = 404;
            errorMessage = 'Formation not found';
        } else if (error.message === 'INVALID_AMOUNT') {
            statusCode = 400;
            errorMessage = 'Amount must be a positive number';
        } else if (error.message === 'INVALID_TOTAL_AMOUNT') {
            statusCode = 400;
            errorMessage = 'Total amount must be a positive number';
        } else if (error.message === 'INVALID_PAYMENT_METHOD') {
            statusCode = 400;
            errorMessage = 'Invalid paymentMethod';
        } else if (error.message === 'INVALID_PAYMENT_STATUS') {
            statusCode = 400;
            errorMessage = 'Invalid status';
        } else if (error.code === 'P2002') {
            statusCode = 409;
            errorMessage = 'Payment code already exists';
        }

        res.status(statusCode).json({ message: 'error', error: errorMessage });
    }
};

export const updatePayment = async (req, res) => {
    const { candidateId, formationId, amount, paymentMethod, status } = req.body;

    if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
        return res.status(400).json({
            message: 'error',
            error: 'Amount must be a positive number'
        });
    }

    if (paymentMethod !== undefined) {
        if (!paymentMethod) {
            return res.status(400).json({ message: 'error', error: 'Invalid paymentMethod' });
        }
        const pm = paymentMethod.toUpperCase();
        if (!['CASH', 'CARD', 'BANK_TRANSFER', 'CHEQUE'].includes(pm)) {
            return res.status(400).json({
                message: 'error',
                error: 'Invalid paymentMethod. Use CASH, CARD, BANK_TRANSFER, or CHEQUE'
            });
        }
    }

    if (status !== undefined) {
        if (!status) {
            return res.status(400).json({ message: 'error', error: 'Invalid status' });
        }
        const pst = status.toUpperCase();
        if (!['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'].includes(pst)) {
            return res.status(400).json({
                message: 'error',
                error: 'Invalid status. Use PENDING, COMPLETED, FAILED, or REFUNDED'
            });
        }
    }

    try {
        const payment = await paymentService.updatePayment(req.params.id, req.body);
        res.status(200).json({ message: 'success', data: payment });
    } catch (error) {
        let statusCode = 500;
        let errorMessage = error.message;

        if (error.message === 'CANDIDATE_NOT_FOUND') {
            statusCode = 404;
            errorMessage = 'Candidate not found';
        } else if (error.message === 'FORMATION_NOT_FOUND') {
            statusCode = 404;
            errorMessage = 'Formation not found';
        } else if (error.message === 'INVALID_AMOUNT') {
            statusCode = 400;
            errorMessage = 'Amount must be a positive number';
        } else if (error.message === 'INVALID_PAYMENT_METHOD') {
            statusCode = 400;
            errorMessage = 'Invalid paymentMethod';
        } else if (error.message === 'INVALID_PAYMENT_STATUS') {
            statusCode = 400;
            errorMessage = 'Invalid status';
        } else if (error.code === 'P2025') {
            statusCode = 404;
            errorMessage = 'Payment not found';
        }

        res.status(statusCode).json({ message: 'error', error: errorMessage });
    }
};

export const deletePayment = async (req, res) => {
    try {
        await paymentService.deletePayment(req.params.id);
        res.status(204).end();
    } catch (error) {
        const status = error.code === 'P2025' ? 404 : 500;
        const msg = error.code === 'P2025' ? 'Payment not found' : error.message;
        res.status(status).json({ message: 'error', error: msg });
    }
};

export const getPaymentPlan = async (req, res) => {
    const { candidateId, formationId } = req.params;
    try {
        const remainingAmount = await paymentService.calculateRemainingAmount(candidateId, formationId);
        if (remainingAmount === null) {
            return res.status(404).json({ message: 'error', error: 'Payment plan not found' });
        }
        const plan = await paymentService.getPaymentPlan(candidateId, formationId);
        if (!plan) {
            return res.status(404).json({ message: 'error', error: 'Payment plan not found' });
        }
        const totalAmount = plan.totalAmount;
        const paidAmount = totalAmount - remainingAmount;
        res.status(200).json({
            message: 'success',
            data: {
                totalAmount,
                paidAmount,
                remainingAmount
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const createPaymentPlan = async (req, res) => {
    const { candidateId, formationId, totalAmount } = req.body;

    if (!candidateId || !formationId || totalAmount === undefined) {
        return res.status(400).json({
            message: 'error',
            error: 'Missing required fields: candidateId, formationId, totalAmount'
        });
    }

    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
        return res.status(400).json({
            message: 'error',
            error: 'totalAmount must be a positive number'
        });
    }

    try {
        // Enforce plan uniqueness manually to return standard error message if needed
        const existing = await paymentService.getPaymentPlan(candidateId, formationId);
        if (existing) {
            return res.status(409).json({
                message: 'error',
                error: 'Payment plan already exists for this candidate and formation'
            });
        }

        const plan = await paymentService.createPaymentPlan(candidateId, formationId, totalAmount);
        res.status(201).json({ message: 'success', data: plan });
    } catch (error) {
        let statusCode = 500;
        let errorMessage = error.message;

        if (error.message === 'CANDIDATE_NOT_FOUND') {
            statusCode = 404;
            errorMessage = 'Candidate not found';
        } else if (error.message === 'FORMATION_NOT_FOUND') {
            statusCode = 404;
            errorMessage = 'Formation not found';
        } else if (error.message === 'INVALID_TOTAL_AMOUNT') {
            statusCode = 400;
            errorMessage = 'totalAmount must be a positive number';
        }

        res.status(statusCode).json({ message: 'error', error: errorMessage });
    }
};

export const updatePaymentPlan = async (req, res) => {
    const { candidateId, formationId } = req.params;
    const { totalAmount } = req.body;

    if (totalAmount === undefined || typeof totalAmount !== 'number' || totalAmount <= 0) {
        return res.status(400).json({
            message: 'error',
            error: 'totalAmount must be a positive number'
        });
    }

    try {
        const plan = await paymentService.updatePaymentPlan(candidateId, formationId, totalAmount);
        res.status(200).json({ message: 'success', data: plan });
    } catch (error) {
        let statusCode = 500;
        let errorMessage = error.message;

        if (error.message === 'PAYMENT_PLAN_NOT_FOUND') {
            statusCode = 404;
            errorMessage = 'Payment plan not found';
        } else if (error.message === 'INVALID_TOTAL_AMOUNT') {
            statusCode = 400;
            errorMessage = 'totalAmount must be a positive number';
        }

        res.status(statusCode).json({ message: 'error', error: errorMessage });
    }
};

export const getPaymentPlanQuery = async (req, res) => {
    const { candidateId, formationId } = req.query;

    if (!candidateId || !formationId) {
        return res.status(400).json({
            message: 'error',
            error: 'Missing query parameters: candidateId, formationId'
        });
    }

    try {
        const plan = await paymentService.getPaymentPlan(candidateId, formationId);
        if (!plan) {
            return res.status(200).json({ exists: false });
        }

        const remainingAmount = await paymentService.calculateRemainingAmount(candidateId, formationId);
        const totalAmount = plan.totalAmount;
        const paidAmount = totalAmount - remainingAmount;

        return res.status(200).json({
            exists: true,
            plan: {
                totalAmount,
                paidAmount,
                remainingAmount
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'error', error: error.message });
    }
};
