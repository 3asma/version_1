import express from 'express';
import { verifyToken, requirePermission } from '../middlewares/authMiddleware.js';
import {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    searchByCode,
    checkAvailability
} from '../controllers/reservationController.js';

const router = express.Router();

// All routes protected by JWT
router.use(verifyToken);

router.get('/', requirePermission('view_reservations'), getAllReservations);
router.get('/search', requirePermission('view_reservations'), searchByCode);
router.post('/availability', requirePermission('view_reservations'), checkAvailability);
router.get('/:id', requirePermission('view_reservations'), getReservationById);

router.post('/', requirePermission('manage_reservations'), createReservation);
router.patch('/:id', requirePermission('manage_reservations'), updateReservation);
router.delete('/:id', requirePermission('manage_reservations'), deleteReservation);

export default router;
