import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
} from '../controllers/paymentController.js';

const router = express.Router();

// Protect all endpoints using verifyToken
router.use(verifyToken);

router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.post('/', createPayment);
router.patch('/:id', updatePayment);
router.delete('/:id', deletePayment);

export default router;
