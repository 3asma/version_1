import express from 'express';
import { verifyToken, requirePermission } from '../middlewares/authMiddleware.js';
import {
    exportCandidatesPDF,
    getAllCandidates,
    getCandidateById,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidateFormations
} from '../controllers/candidateController.js';

const router = express.Router();

// All routes protected by JWT
router.use(verifyToken);

router.get('/export/pdf', requirePermission('view_candidates'), exportCandidatesPDF);
router.get('/', requirePermission('view_candidates'), getAllCandidates);
router.get('/:id', requirePermission('view_candidates', { allowOwnCandidate: true }), getCandidateById);
router.get('/:id/formations', requirePermission('view_candidates', { allowOwnCandidate: true }), getCandidateFormations);

router.post('/', requirePermission('manage_candidates'), createCandidate);
router.patch('/:id', requirePermission('manage_candidates'), updateCandidate);
router.delete('/:id', requirePermission('manage_candidates'), deleteCandidate);

export default router;

