import planningService from '../services/planningService.js';
import { streamPDF } from '../services/pdfService.js';

export const getWeeklyPlanning = async (req, res) => {
    const { date } = req.query;
    if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ message: 'error', error: 'DATE_REQUIRED' });
    }

    try {
        let professorId = req.query.professorId;
        if (req.user && req.user.role === 'PROFESSOR') {
            professorId = req.user.professorId;
        }
        const planning = await planningService.getWeeklyPlanning(date, professorId);
        res.status(200).json({ message: 'success', data: planning });
    } catch (error) {
        if (error.message === 'INVALID_DATE') {
            return res.status(400).json({ message: 'error', error: 'INVALID_DATE' });
        }
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getDailyPlanning = async (req, res) => {
    const { date } = req.query;
    if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ message: 'error', error: 'DATE_REQUIRED' });
    }

    try {
        let professorId = req.query.professorId;
        if (req.user && req.user.role === 'PROFESSOR') {
            professorId = req.user.professorId;
        }
        const planning = await planningService.getDailyPlanning(date, professorId);
        res.status(200).json({ message: 'success', data: planning });
    } catch (error) {
        if (error.message === 'INVALID_DATE') {
            return res.status(400).json({ message: 'error', error: 'INVALID_DATE' });
        }
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const exportPlanningPDF = async (req, res) => {
    const { date, viewMode, tab, professorId, roomId, candidateId, formationId } = req.query;
    if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ message: 'error', error: 'DATE_REQUIRED' });
    }

    try {
        let filteredProfId = professorId;
        if (req.user && req.user.role === 'PROFESSOR') {
            filteredProfId = req.user.professorId;
        }

        // 1. Fetch planning sessions based on viewMode
        let sessions = [];
        if (viewMode === 'daily') {
            sessions = await planningService.getDailyPlanning(date, filteredProfId);
        } else {
            sessions = await planningService.getWeeklyPlanning(date, filteredProfId);
        }

        // 2. Fetch specific tab filter from query parameters
        let filteredSessions = sessions;
        if (tab === 'formation' && formationId) {
            filteredSessions = filteredSessions.filter(s => s.formationId === formationId);
        } else if (tab === 'professor' && professorId) {
            filteredSessions = filteredSessions.filter(s => s.professorId === professorId);
        } else if (tab === 'room' && roomId) {
            filteredSessions = filteredSessions.filter(s => s.roomId === roomId);
        } else if (tab === 'candidate' && candidateId) {
            filteredSessions = filteredSessions.filter(s => s.candidateId === candidateId);
        }

        // 3. Map to PDF columns
        const headers = [
            { label: 'Date', key: 'dateStr', width: 75 },
            { label: 'Horaire', key: 'horaire', width: 85 },
            { label: 'Professeur', key: 'profName', width: 120 },
            { label: 'Candidat', key: 'candName', width: 140 },
            { label: 'Formation', key: 'formationName', width: 150 },
            { label: 'Salle', key: 'roomName', width: 80 },
            { label: 'Statut', key: 'statusStr', width: 90 }
        ];

        const rows = filteredSessions.map(s => {
            const dateObj = new Date(s.date);
            const dateStr = !isNaN(dateObj.getTime())
                ? dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
                : s.date;

            const timeStart = s.startTimeText || s.time;
            let timeEnd = s.endTimeText;
            if (!timeEnd) {
                const [h, m] = timeStart.split(':').map(Number);
                const endMin = (h * 60 + m + (s.duration || 60));
                const endH = Math.floor(endMin / 60) % 24;
                const endM = endMin % 60;
                timeEnd = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
            }
            const horaire = `${timeStart} - ${timeEnd}`;

            const profName = s.professor
                ? `${s.professor.firstName} ${s.professor.lastName}`
                : 'Professeur non assigné';

            const candName = s.candidate
                ? `${s.candidate.firstName} ${s.candidate.lastName}`
                : 'Candidat non assigné';

            const formationName = s.formation
                ? `${s.formation.subject} - ${s.formation.level}`
                : 'Formation non spécifiée';

            const roomName = s.room
                ? `Salle ${s.room.roomNumber}`
                : 'Salle non assignée';

            let statusStr = 'Programmée';
            if (s.status === 'completed') statusStr = 'Complétée';
            if (s.status === 'cancelled') statusStr = 'Annulée';

            return {
                dateStr,
                horaire,
                profName,
                candName,
                formationName,
                roomName,
                statusStr
            };
        });

        // 4. Generate subtitle showing active filters or range
        let subtitle = '';
        if (viewMode === 'daily') {
            const displayDate = new Date(date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            subtitle = `Journée du : ${displayDate}`;
        } else {
            const [y, m, d] = date.split('-').map(Number);
            const dateObj = new Date(Date.UTC(y, m - 1, d));
            const dayOfWeek = dateObj.getUTCDay();
            const sundayUTC = new Date(dateObj);
            sundayUTC.setUTCDate(dateObj.getUTCDate() - dayOfWeek);
            const saturdayUTC = new Date(sundayUTC);
            saturdayUTC.setUTCDate(sundayUTC.getUTCDate() + 6);

            const startStr = new Date(sundayUTC.getUTCFullYear(), sundayUTC.getUTCMonth(), sundayUTC.getUTCDate())
                .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
            const endStr = new Date(saturdayUTC.getUTCFullYear(), saturdayUTC.getUTCMonth(), saturdayUTC.getUTCDate())
                .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

            subtitle = `Semaine du : ${startStr} au ${endStr}`;
        }

        const options = {
            layout: 'landscape',
            emptyMessage: 'Aucune séance disponible',
            subtitle: subtitle,
            filename: `planning_${date}.pdf`
        };

        streamPDF(res, 'Planning des séances', headers, rows, options);

    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};
