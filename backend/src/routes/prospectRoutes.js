import express from 'express';
import prospectController from '../controllers/prospectController.js';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply verifyToken to all routes
router.use(verifyToken);
router.use(requireRole(['admin', 'agent_reception']));

router.get('/export/pdf', prospectController.exportPDF);
router.get('/', prospectController.getAll);
router.get('/:id', prospectController.getById);

router.post('/', prospectController.create);
router.patch('/:id', prospectController.update);
router.delete('/:id', prospectController.delete);

export default router;
