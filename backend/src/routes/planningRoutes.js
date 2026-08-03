import express from 'express';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';
import { getWeeklyPlanning, getDailyPlanning } from '../controllers/planningController.js';

const router = express.Router();

router.use(verifyToken);
router.use(requireRole(['admin', 'agent_reservation', 'professor'], { allowOwnPlanning: true }));

router.get('/week', getWeeklyPlanning);
router.get('/day', getDailyPlanning);

export default router;
