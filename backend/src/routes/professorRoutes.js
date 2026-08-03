import express from 'express';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';
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
router.use(requireRole(['admin']));

router.get('/export/pdf', exportProfessorsPDF);
router.get('/', getAllProfessors);
router.get('/:id', getProfessorById);

router.post('/', createProfessor);
router.patch('/:id', updateProfessor);
router.delete('/:id', deleteProfessor);

export default router;
