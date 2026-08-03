import attendanceService from '../services/attendanceService.js';

export const getAttendanceForReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;

        const reservation = await attendanceService.getReservationWithDetails(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: 'error', error: 'RESERVATION_NOT_FOUND' });
        }

        if (req.user && req.user.role === 'PROFESSOR') {
            if (reservation.professorId !== req.user.professorId) {
                return res.status(403).json({ message: 'error', error: 'FORBIDDEN' });
            }
        }

        const data = await attendanceService.getAttendanceForReservation(reservationId);
        res.json({ message: 'success', data });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const saveAttendance = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const { attendances } = req.body;

        if (!Array.isArray(attendances)) {
            return res.status(400).json({ message: 'error', error: 'INVALID_ATTENDANCES_FORMAT' });
        }

        const reservation = await attendanceService.getReservationWithDetails(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: 'error', error: 'RESERVATION_NOT_FOUND' });
        }

        if (!req.user || req.user.role !== 'PROFESSOR') {
            return res.status(403).json({ message: 'error', error: 'FORBIDDEN' });
        }

        if (reservation.professorId !== req.user.professorId) {
            return res.status(403).json({ message: 'error', error: 'FORBIDDEN' });
        }

        const validCandidateIds = new Set();
        if (reservation.inscription.candidateId) {
            validCandidateIds.add(reservation.inscription.candidateId);
        }
        if (reservation.inscription.members) {
            for (const m of reservation.inscription.members) {
                validCandidateIds.add(m.candidateId);
            }
        }

        for (const record of attendances) {
            if (!record.candidateId) {
                return res.status(400).json({ message: 'error', error: 'CANDIDATE_ID_REQUIRED' });
            }
            if (!validCandidateIds.has(record.candidateId)) {
                return res.status(400).json({
                    message: 'error',
                    error: `CANDIDATE_NOT_IN_RESERVATION`,
                    candidateId: record.candidateId
                });
            }
            if (!record.status || !['PRESENT', 'ABSENT'].includes(record.status)) {
                return res.status(400).json({ message: 'error', error: 'INVALID_STATUS' });
            }
        }

        const data = await attendanceService.saveAttendance(reservationId, attendances);
        res.json({ message: 'success', data });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const updateAttendance = async (req, res) => {
    try {
        const { attendanceId } = req.params;
        const { status, note } = req.body;

        const attendance = await attendanceService.getAttendanceById(attendanceId);
        if (!attendance) {
            return res.status(404).json({ message: 'error', error: 'ATTENDANCE_NOT_FOUND' });
        }

        if (!req.user || req.user.role !== 'PROFESSOR') {
            return res.status(403).json({ message: 'error', error: 'FORBIDDEN' });
        }

        if (attendance.reservation && attendance.reservation.professorId !== req.user.professorId) {
            return res.status(403).json({ message: 'error', error: 'FORBIDDEN' });
        }

        if (status && !['PRESENT', 'ABSENT'].includes(status)) {
            return res.status(400).json({ message: 'error', error: 'INVALID_STATUS' });
        }

        const updated = await attendanceService.updateAttendance(attendanceId, { status, note });
        res.json({ message: 'success', data: updated });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};
