import express from 'express';
import { verifyToken, requirePermission } from '../middlewares/authMiddleware.js';
import {
    getAttendanceForReservation,
    saveAttendance,
    updateAttendance,
    exportAttendancePDF
} from '../controllers/attendanceController.js';

const router = express.Router();

// Apply auth middleware to all attendance routes
router.use(verifyToken);

router.get('/reservation/:reservationId', requirePermission('manage_attendance'), getAttendanceForReservation);
router.get('/reservation/:reservationId/pdf', requirePermission('manage_attendance'), exportAttendancePDF);
router.post('/reservation/:reservationId', requirePermission('manage_attendance'), saveAttendance);
router.patch('/:attendanceId', requirePermission('manage_attendance'), updateAttendance);

export default router;
