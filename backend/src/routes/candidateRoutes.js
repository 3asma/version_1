import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
    exportCandidatesPDF,
    getAllCandidates,
    getCandidateById,
    createCandidate,
    updateCandidate,
    deleteCandidate
} from '../controllers/candidateController.js';

const router = express.Router();

// All routes protected by JWT
router.use(verifyToken);

router.get('/export/pdf', exportCandidatesPDF);
router.get('/', getAllCandidates);
router.get('/:id', getCandidateById);

router.post('/', createCandidate);
router.patch('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);

export default router;
