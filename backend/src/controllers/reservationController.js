import reservationService from '../services/reservationService.js';

export const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.json({ message: 'success', data: reservations });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getReservationById = async (req, res) => {
    try {
        const reservation = await reservationService.getReservationById(req.params.id);
        res.json({ message: 'success', data: reservation });
    } catch (error) {
        const status = error.message === 'RESERVATION_NOT_FOUND' ? 404 : 500;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

export const createReservation = async (req, res) => {
    const {
        reservationCode,
        reservationDate,
        startTime,
        endTime,
        inscriptionId,
        professorId,
        roomId
    } = req.body;

    if (!reservationCode || typeof reservationCode !== 'string' || reservationCode.trim() === '') {
        return res.status(400).json({ message: 'error', error: 'RESERVATION_CODE_REQUIRED' });
    }
    if (!reservationDate || isNaN(Date.parse(reservationDate))) {
        return res.status(400).json({ message: 'error', error: 'INVALID_RESERVATION_DATE' });
    }
    if (!startTime || isNaN(Date.parse(startTime))) {
        return res.status(400).json({ message: 'error', error: 'INVALID_START_TIME' });
    }
    if (!endTime || isNaN(Date.parse(endTime))) {
        return res.status(400).json({ message: 'error', error: 'INVALID_END_TIME' });
    }
    if (new Date(startTime) >= new Date(endTime)) {
        return res.status(400).json({ message: 'error', error: 'START_TIME_MUST_BE_BEFORE_END_TIME' });
    }
    if (!inscriptionId || typeof inscriptionId !== 'string' || inscriptionId.trim() === '') {
        return res.status(400).json({ message: 'error', error: 'INSCRIPTION_ID_REQUIRED' });
    }
    if (!professorId || typeof professorId !== 'string' || professorId.trim() === '') {
        return res.status(400).json({ message: 'error', error: 'PROFESSOR_ID_REQUIRED' });
    }
    if (!roomId || typeof roomId !== 'string' || roomId.trim() === '') {
        return res.status(400).json({ message: 'error', error: 'ROOM_ID_REQUIRED' });
    }

    try {
        const reservation = await reservationService.createReservation(req.body);
        res.status(201).json({ message: 'success', data: reservation });
    } catch (error) {
        let status = 400;
        let msg = error.message;

        if (error.message === 'RESERVATION_CODE_EXISTS') {
            status = 409;
        } else if (
            error.message === 'INSCRIPTION_NOT_FOUND' ||
            error.message === 'PROFESSOR_NOT_FOUND' ||
            error.message === 'ROOM_NOT_FOUND'
        ) {
            status = 404;
        } else if (
            error.message.includes('REQUIRED') ||
            error.message.includes('INVALID')
        ) {
            status = 400;
        } else {
            status = 500;
        }

        res.status(status).json({ message: 'error', error: msg });
    }
};

export const updateReservation = async (req, res) => {
    const {
        reservationCode,
        reservationDate,
        startTime,
        endTime,
        inscriptionId,
        professorId,
        roomId
    } = req.body;

    if (reservationCode !== undefined && (typeof reservationCode !== 'string' || reservationCode.trim() === '')) {
        return res.status(400).json({ message: 'error', error: 'INVALID_RESERVATION_CODE' });
    }
    if (reservationDate !== undefined && (reservationDate === null || isNaN(Date.parse(reservationDate)))) {
        return res.status(400).json({ message: 'error', error: 'INVALID_RESERVATION_DATE' });
    }
    if (startTime !== undefined && (startTime === null || isNaN(Date.parse(startTime)))) {
        return res.status(400).json({ message: 'error', error: 'INVALID_START_TIME' });
    }
    if (endTime !== undefined && (endTime === null || isNaN(Date.parse(endTime)))) {
        return res.status(400).json({ message: 'error', error: 'INVALID_END_TIME' });
    }

    try {
        const reservation = await reservationService.updateReservation(req.params.id, req.body);
        res.json({ message: 'success', data: reservation });
    } catch (error) {
        let status = 400;
        let msg = error.message;

        if (error.message === 'RESERVATION_CODE_EXISTS') {
            status = 409;
        } else if (
            error.message === 'INSCRIPTION_NOT_FOUND' ||
            error.message === 'PROFESSOR_NOT_FOUND' ||
            error.message === 'ROOM_NOT_FOUND' ||
            error.message === 'RESERVATION_NOT_FOUND'
        ) {
            status = 404;
        } else if (
            error.message.includes('REQUIRED') ||
            error.message.includes('INVALID')
        ) {
            status = 400;
        } else {
            status = 500;
        }

        res.status(status).json({ message: 'error', error: msg });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        await reservationService.deleteReservation(req.params.id);
        res.json({ message: 'success' });
    } catch (error) {
        const status = (error.message === 'RESERVATION_NOT_FOUND' || error.code === 'P2025') ? 404 : 500;
        const msg = (error.message === 'RESERVATION_NOT_FOUND' || error.code === 'P2025') ? 'Reservation not found' : error.message;
        res.status(status).json({ message: 'error', error: msg });
    }
};

export const searchByCode = async (req, res) => {
    const { code } = req.query;

    if (!code || typeof code !== 'string' || code.trim() === '') {
        return res.status(400).json({ message: 'error', error: 'CODE_REQUIRED' });
    }

    try {
        const result = await reservationService.searchByCode(code);
        res.json({ message: 'success', data: result });
    } catch (error) {
        let status = 500;
        let msg = error.message;

        if (error.message === 'NOT_FOUND') {
            status = 404;
            msg = 'No candidate or inscription matches the entered code';
        } else if (error.message === 'CODE_REQUIRED') {
            status = 400;
        }

        res.status(status).json({ message: 'error', error: msg });
    }
};

export const checkAvailability = async (req, res) => {
    const {
        reservationDate,
        startTime,
        endTime,
        professorId,
        roomId,
        candidateId
    } = req.body;

    if (!reservationDate || !startTime || !endTime || !professorId || !candidateId) {
        return res.status(400).json({ message: 'error', error: 'MISSING_REQUIRED_FIELDS' });
    }

    try {
        const result = await reservationService.checkAvailability(req.body);
        res.json({ message: 'success', data: result });
    } catch (error) {
        let status = 400;
        let msg = error.message;

        if (
            error.message.includes('REQUIRED') ||
            error.message.includes('INVALID') ||
            error.message.includes('MUST_BE')
        ) {
            status = 400;
        } else {
            status = 500;
        }

        res.status(status).json({ message: 'error', error: msg });
    }
};
