import express from 'express';
import prospectController from '../controllers/prospectController.js';
import { verifyToken, requirePermission } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply verifyToken to all routes
router.use(verifyToken);

router.get('/export/pdf', requirePermission('view_prospects'), prospectController.exportPDF);
router.get('/', requirePermission('view_prospects'), prospectController.getAll);
router.get('/:id', requirePermission('view_prospects'), prospectController.getById);

router.post('/', requirePermission('manage_prospects'), prospectController.create);
router.patch('/:id', requirePermission('manage_prospects'), prospectController.update);
router.delete('/:id', requirePermission('manage_prospects'), prospectController.delete);

export default router;
