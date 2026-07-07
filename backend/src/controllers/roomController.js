import roomService from '../services/roomService.js';
import { streamPDF } from '../services/pdfService.js';

export const exportRoomsPDF = async (req, res) => {
    try {
        const data = await roomService.getAllRooms();
        const headers = [
            { label: 'Nom de Salle', key: 'nom', width: 250 },
            { label: 'Capacité', key: 'capacite', width: 245 }
        ];
        const rows = data.map(r => ({
            nom: r.nom || '',
            capacite: r.capacite !== undefined && r.capacite !== null ? String(r.capacite) : ''
        }));
        streamPDF(res, 'Rooms', headers, rows);
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getAllRooms = async (req, res) => {

    try {
        const rooms = await roomService.getAllRooms();
        res.json({ message: 'success', data: rooms });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        if (!room) return res.status(404).json({ message: 'error', error: 'Room not found' });
        res.json({ message: 'success', data: room });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const createRoom = async (req, res) => {
    try {
        const room = await roomService.createRoom(req.body);
        res.status(201).json({ message: 'success', data: room });
    } catch (error) {
        let status = 400;
        let msg = error.message;

        if (error.message === 'DUPLICATE_ROOM_NUMBER') {
            status = 409;
            msg = 'Room number already exists';
        }

        res.status(status).json({ message: 'error', error: msg });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const room = await roomService.updateRoom(req.params.id, req.body);
        res.json({ message: 'success', data: room });
    } catch (error) {
        let status = 400;
        let msg = error.message;

        if (error.code === 'P2025') {
            status = 404;
            msg = 'Room not found';
        } else if (error.message === 'DUPLICATE_ROOM_NUMBER') {
            status = 409;
            msg = 'Room number already exists';
        }

        res.status(status).json({ message: 'error', error: msg });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        await roomService.deleteRoom(req.params.id);
        res.json({ message: 'success' });
    } catch (error) {
        const status = error.code === 'P2025' ? 404 : 500;
        const msg = error.code === 'P2025' ? 'Room not found' : error.message;
        res.status(status).json({ message: 'error', error: msg });
    }
};
