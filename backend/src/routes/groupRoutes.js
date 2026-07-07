import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
    exportGroupsPDF,
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    addCandidate,
    removeCandidate,
    assignProfessor,
    removeProfessor
} from '../controllers/groupController.js';

const router = express.Router();

// All routes protected by JWT
router.use(verifyToken);

router.get('/export/pdf', exportGroupsPDF);
router.get('/', getAllGroups);
router.get('/:id', getGroupById);

router.post('/', createGroup);
router.patch('/:id', updateGroup);
router.delete('/:id', deleteGroup);

// Membership routes
router.post('/:id/add-candidate', addCandidate);
router.delete('/:id/candidate/:candidateId', removeCandidate);

// Professor assignment routes
router.post('/:id/assign-professor', assignProfessor);
router.delete('/:id/remove-professor', removeProfessor);

export default router;
