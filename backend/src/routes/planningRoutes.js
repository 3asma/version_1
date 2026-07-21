import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getWeeklyPlanning, getDailyPlanning } from '../controllers/planningController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/week', getWeeklyPlanning);
router.get('/day', getDailyPlanning);

export default router;
