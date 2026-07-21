import paymentService from '../services/paymentService.js';

export const getAllPayments = async (req, res) => {
    try {
        const payments = await paymentService.getAllPayments();
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
    const { candidateId, formationId, amount, paymentMethod, status, paymentDate, note } = req.body;

    if (!candidateId || !formationId || amount === undefined || !paymentMethod || !status) {
        return res.status(400).json({
            message: 'error',
            error: 'Missing required fields: candidateId, formationId, amount, paymentMethod, status'
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

    const pst = status.toUpperCase();
    if (!['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'].includes(pst)) {
        return res.status(400).json({
            message: 'error',
            error: 'Invalid status. Use PENDING, COMPLETED, FAILED, or REFUNDED'
        });
    }

    try {
        const payment = await paymentService.createPayment({
            candidateId,
            formationId,
            amount,
            paymentMethod: pm,
            status: pst,
            paymentDate,
            note
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
