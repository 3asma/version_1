import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
    getPaymentPlan,
    createPaymentPlan,
    updatePaymentPlan,
    getPaymentPlanQuery
} from '../controllers/paymentController.js';

const router = express.Router();

// Protect all endpoints using verifyToken
router.use(verifyToken);

router.get('/plan', getPaymentPlanQuery);

// PaymentPlan routes
router.get('/payment-plan/:candidateId/:formationId', getPaymentPlan);
router.post('/payment-plan', createPaymentPlan);
router.put('/payment-plan/:candidateId/:formationId', updatePaymentPlan);

// Payment routes
router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.post('/', createPayment);
router.patch('/:id', updatePayment);
router.delete('/:id', deletePayment);

export default router;
