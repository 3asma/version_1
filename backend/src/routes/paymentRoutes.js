import express from 'express';
import { verifyToken, requirePermission } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
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

router.get('/plan', requirePermission('view_payments'), getPaymentPlanQuery);

// PaymentPlan routes
router.get('/payment-plan/:candidateId/:formationId', requirePermission('view_payments'), getPaymentPlan);
router.post('/payment-plan', requirePermission('manage_payments'), createPaymentPlan);
router.put('/payment-plan/:candidateId/:formationId', requirePermission('manage_payments'), updatePaymentPlan);

// Helper middleware for upload parsing and errors
const handleUpload = (req, res, next) => {
    upload.single('chequeFile')(req, res, (err) => {
        if (err) {
            let errorMsg = err.message;
            if (err.code === 'LIMIT_FILE_SIZE') {
                errorMsg = 'File too large. Maximum size allowed is 10 MB.';
            }
            return res.status(400).json({
                message: 'error',
                error: errorMsg
            });
        }
        next();
    });
};

// Payment routes
router.get('/', requirePermission('view_payments'), getAllPayments);
router.get('/:id', requirePermission('view_payments'), getPaymentById);
router.post('/', requirePermission('manage_payments'), handleUpload, createPayment);
router.patch('/:id', requirePermission('manage_payments'), updatePayment);
router.delete('/:id', requirePermission('manage_payments'), deletePayment);

export default router;
