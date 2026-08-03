import express from 'express';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';
import {
    getAllCommercials,
    getCommercialById,
    createCommercial,
    updateCommercial,
    deleteCommercial
} from '../controllers/commercialController.js';

const router = express.Router();

// All routes protected by JWT
router.use(verifyToken);
router.use(requireRole(['admin', 'agent_reception']));

router.get('/', getAllCommercials);
router.get('/:id', getCommercialById);
router.post('/', createCommercial);
router.patch('/:id', updateCommercial);
router.delete('/:id', deleteCommercial);

export default router;
