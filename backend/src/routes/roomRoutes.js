import express from 'express';
import { verifyToken, requirePermission } from '../middlewares/authMiddleware.js';
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

router.get('/export/pdf', requirePermission('view_formations'), exportRoomsPDF);
router.get('/', requirePermission('view_formations'), getAllRooms);
router.get('/:id', requirePermission('view_formations'), getRoomById);

router.post('/', requirePermission('manage_formations'), createRoom);
router.patch('/:id', requirePermission('manage_formations'), updateRoom);
router.delete('/:id', requirePermission('manage_formations'), deleteRoom);

export default router;
