import express from 'express';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';
import roleController from '../controllers/roleController.js';

const router = express.Router();

// Apply auth middlewares to protect all role management endpoints
router.use(verifyToken);
router.use(requireRole(['admin']));

router.get('/', roleController.getAll);
router.patch('/:roleId', roleController.update);
router.delete('/:roleId', roleController.delete);

export default router;
