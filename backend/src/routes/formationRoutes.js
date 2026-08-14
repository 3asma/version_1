import express from 'express';
import { verifyToken, requirePermission } from '../middlewares/authMiddleware.js';
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

router.get('/export/pdf', requirePermission('view_formations'), exportFormationsPDF);
router.get('/', requirePermission('view_formations'), getAllFormations);
router.get('/:id', requirePermission('view_formations'), getFormationById);

router.post('/', requirePermission('manage_formations'), createFormation);
router.patch('/:id', requirePermission('manage_formations'), updateFormation);
router.delete('/:id', requirePermission('manage_formations'), deleteFormation);

export default router;
