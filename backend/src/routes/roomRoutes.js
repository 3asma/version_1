import express from 'express';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';
import {
    exportRoomsPDF,
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
} from '../controllers/roomController.js';

const router = express.Router();

// All routes protected by JWT
router.use(verifyToken);
router.use(requireRole(['admin']));

router.get('/export/pdf', exportRoomsPDF);
router.get('/', getAllRooms);
router.get('/:id', getRoomById);

router.post('/', createRoom);
router.patch('/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;
