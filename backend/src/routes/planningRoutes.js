import express from 'express';
import { verifyToken, requirePermission } from '../middlewares/authMiddleware.js';
import { getWeeklyPlanning, getDailyPlanning } from '../controllers/planningController.js';

const router = express.Router();

router.use(verifyToken);
router.use(requirePermission('view_reservations', { allowOwnPlanning: true }));

router.get('/week', getWeeklyPlanning);
router.get('/day', getDailyPlanning);

export default router;
