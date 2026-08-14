import express from 'express';
import { verifyToken, requirePermission } from '../middlewares/authMiddleware.js';
import {
    exportProfessorsPDF,
    getAllProfessors,
    getProfessorById,
    createProfessor,
    updateProfessor,
    deleteProfessor
} from '../controllers/professorController.js';

const router = express.Router();

// All routes protected by JWT
router.use(verifyToken);

router.get('/export/pdf', requirePermission('view_professors'), exportProfessorsPDF);
router.get('/', requirePermission('view_professors'), getAllProfessors);
router.get('/:id', requirePermission('view_professors'), getProfessorById);

router.post('/', requirePermission('manage_professors'), createProfessor);
router.patch('/:id', requirePermission('manage_professors'), updateProfessor);
router.delete('/:id', requirePermission('manage_professors'), deleteProfessor);

export default router;
