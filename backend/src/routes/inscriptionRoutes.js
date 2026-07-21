import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
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

router.get('/export/pdf', exportInscriptionsPDF);
router.get('/', getAllInscriptions);
router.get('/:id', getInscriptionById);

router.put('/groups/:id', updateLearningGroup);
router.post('/', createInscription);
router.patch('/:id', updateInscription);
router.delete('/:id', deleteInscription);
router.post('/:id/deduct-hours', deductHours);

export default router;
