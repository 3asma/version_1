import express from 'express';
import { verifyToken, requirePermission, requireRole } from '../middlewares/authMiddleware.js';
import {
    createCancelRequest,
    getCancelRequests,
    approveCancelRequest,
    rejectCancelRequest
} from '../controllers/cancelRequestController.js';

const router = express.Router();

// All routes require token verification
router.use(verifyToken);

// Create request - only Professor role is allowed
router.post('/', requireRole(['professor']), createCancelRequest);

// Manage requests - requires manage_reservations permission (admin and agent_reservation roles)
router.get('/', requirePermission('manage_reservations'), getCancelRequests);
router.patch('/:id/approve', requirePermission('manage_reservations'), approveCancelRequest);
router.patch('/:id/reject', requirePermission('manage_reservations'), rejectCancelRequest);

export default router;
