import express from 'express';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';
import {
    exportFormationsPDF,
    getAllFormations,
    getFormationById,
    createFormation,
    updateFormation,
    deleteFormation
} from '../controllers/formationController.js';

const router = express.Router();

// All routes protected by JWT
router.use(verifyToken);
router.use(requireRole(['admin']));

router.get('/export/pdf', exportFormationsPDF);
router.get('/', getAllFormations);
router.get('/:id', getFormationById);

router.post('/', createFormation);
router.patch('/:id', updateFormation);
router.delete('/:id', deleteFormation);

export default router;
