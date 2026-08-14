import express from 'express';
import { verifyToken, requirePermission } from '../middlewares/authMiddleware.js';
import { deleteLearningGroup } from '../controllers/inscriptionController.js';

const router = express.Router();

// All routes protected by JWT
router.use(verifyToken);
router.use(requirePermission('manage_candidates'));

router.delete('/:id', deleteLearningGroup);

export default router;
