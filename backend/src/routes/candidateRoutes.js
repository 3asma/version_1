import express from 'express';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';
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

router.get('/export/pdf', requireRole(['admin', 'agent_reception']), exportCandidatesPDF);
router.get('/', requireRole(['admin', 'agent_reception']), getAllCandidates);
router.get('/:id', requireRole(['admin', 'agent_reception', 'candidate'], { allowOwnCandidate: true }), getCandidateById);
router.get('/:id/formations', requireRole(['admin', 'agent_reception', 'candidate'], { allowOwnCandidate: true }), getCandidateFormations);

router.post('/', requireRole(['admin', 'agent_reception']), createCandidate);
router.patch('/:id', requireRole(['admin', 'agent_reception']), updateCandidate);
router.delete('/:id', requireRole(['admin', 'agent_reception']), deleteCandidate);

export default router;

