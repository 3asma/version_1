import express from 'express';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';
import userController from '../controllers/userController.js';

const router = express.Router();

// Apply auth middlewares to protect all user management endpoints
router.use(verifyToken);
router.use(requireRole(['admin']));

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
