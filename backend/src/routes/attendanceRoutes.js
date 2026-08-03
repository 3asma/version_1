import express from 'express';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';
import {
    getAttendanceForReservation,
    saveAttendance,
    updateAttendance
} from '../controllers/attendanceController.js';

const router = express.Router();

// Apply auth middleware to all attendance routes
router.use(verifyToken);
router.use(requireRole(['admin', 'professor']));

router.get('/reservation/:reservationId', getAttendanceForReservation);
router.post('/reservation/:reservationId', saveAttendance);
router.patch('/:attendanceId', updateAttendance);

export default router;
