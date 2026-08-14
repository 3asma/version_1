import express from 'express';
import { verifyToken, requirePermission } from '../middlewares/authMiddleware.js';
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

router.get('/', requirePermission('view_prospects'), getAllCommercials);
router.get('/:id', requirePermission('view_prospects'), getCommercialById);
router.post('/', requirePermission('manage_prospects'), createCommercial);
router.patch('/:id', requirePermission('manage_prospects'), updateCommercial);
router.delete('/:id', requirePermission('manage_prospects'), deleteCommercial);

export default router;
