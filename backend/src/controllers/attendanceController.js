import attendanceService from '../services/attendanceService.js';
import { streamPDF } from '../services/pdfService.js';

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

export const exportAttendancePDF = async (req, res) => {
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
        const { students, formation, room, professor } = data;

        // Formulate header metadata
        const startD = new Date(reservation.startTime);
        const dateStr = !isNaN(startD.getTime())
            ? startD.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
            : reservation.reservationDate;

        const formatTimeStr = (isoString) => {
            const d = new Date(isoString);
            if (isNaN(d.getTime())) return '';
            return d.toISOString().split('T')[1].substring(0, 5);
        };
        const timeStart = formatTimeStr(reservation.startTime);
        const timeEnd = formatTimeStr(reservation.endTime);

        const formationName = formation
            ? `${formation.matiere} - ${formation.niveau}`
            : 'Formation non spécifiée';

        const rawGroupMode = reservation.inscription?.learningMode || 'GROUPE';
        let learningModeText = 'Groupe';
        if (rawGroupMode === 'MONOME') learningModeText = 'Individuel (Monôme)';
        if (rawGroupMode === 'BINOME') learningModeText = 'Binôme';
        const groupInfo = `${learningModeText} (${reservation.inscription?.inscriptionCode || ''})`;

        const profName = professor
            ? `${professor.prenom} ${professor.nom}`
            : 'Professeur non spécifié';

        const roomName = room
            ? `Salle ${room.numero}`
            : 'Salle non spécifiée';

        // Details block displayed below title (2 columns/lines format)
        const detailsLines = [
            `Formation : ${formationName}  |  Groupe / Inscription : ${groupInfo}`,
            `Professeur : ${profName}  |  Salle : ${roomName}`,
            `Séance du : ${dateStr} de ${timeStart} à ${timeEnd}`
        ];
        const subtitle = detailsLines.join('\n');

        // Formulate rows for the table
        const headers = [
            { label: 'N°', key: 'idx', width: 35 },
            { label: 'Candidat', key: 'candName', width: 200 },
            { label: 'Code candidat', key: 'candCode', width: 160 },
            { label: 'Statut', key: 'statusStr', width: 100 }
        ];

        const rows = students.map((std, i) => {
            const candName = `${std.firstName} ${std.lastName}`;
            const candCode = std.candidateCode || '—';

            let statusStr = '—';
            if (std.status === 'PRESENT') statusStr = 'PRÉSENT';
            if (std.status === 'ABSENT') statusStr = 'ABSENT';

            return {
                idx: String(i + 1),
                candName,
                candCode,
                statusStr
            };
        });

        // Use custom filename formatted to: presence_<reference>_YYYY-MM-DD.pdf or presence_YYYY-MM-DD.pdf
        const formattedDateISO = !isNaN(startD.getTime()) ? startD.toISOString().split('T')[0] : reservation.reservationDate;
        const refSuffix = reservation.reservationCode ? `${reservation.reservationCode}_` : '';
        const filename = `presence_${refSuffix}${formattedDateISO}.pdf`;

        const options = {
            layout: 'portrait',
            emptyMessage: 'Aucune donnée de présence disponible',
            subtitle: subtitle,
            filename: filename
        };

        streamPDF(res, 'Feuille de présence', headers, rows, options);

    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};
