import express from 'express';
import { verifyToken, requirePermission } from '../middlewares/authMiddleware.js';
import {
    exportInscriptionsPDF,
    getAllInscriptions,
    getInscriptionById,
    createInscription,
    updateInscription,
    deleteInscription,
    deductHours,
    updateLearningGroup
} from '../controllers/inscriptionController.js';

const router = express.Router();

// All routes protected by JWT
router.use(verifyToken);

router.get('/export/pdf', requirePermission('view_candidates'), exportInscriptionsPDF);
router.get('/', requirePermission('view_candidates'), getAllInscriptions);
router.get('/:id', requirePermission('view_candidates'), getInscriptionById);

router.put('/groups/:id', requirePermission('manage_candidates'), updateLearningGroup);
router.post('/', requirePermission('manage_candidates'), createInscription);
router.patch('/:id', requirePermission('manage_candidates'), updateInscription);
router.delete('/:id', requirePermission('manage_candidates'), deleteInscription);
router.post('/:id/deduct-hours', requirePermission('manage_candidates'), deductHours);

export default router;
