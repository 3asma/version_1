import express from 'express';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';
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
router.use(requireRole(['admin', 'agent_reservation']));

router.get('/', getAllReservations);
router.get('/search', searchByCode);
router.post('/availability', checkAvailability);
router.get('/:id', getReservationById);

router.post('/', createReservation);
router.patch('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router;
