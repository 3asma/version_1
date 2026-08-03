import express from 'express';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';
import { deleteLearningGroup } from '../controllers/inscriptionController.js';

const router = express.Router();

// All routes protected by JWT
router.use(verifyToken);
router.use(requireRole(['admin', 'agent_reservation']));

router.delete('/:id', deleteLearningGroup);

export default router;
