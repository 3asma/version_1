import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { deleteLearningGroup } from '../controllers/inscriptionController.js';

const router = express.Router();

// All routes protected by JWT
router.use(verifyToken);

router.delete('/:id', deleteLearningGroup);

export default router;
