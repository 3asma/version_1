import planningService from '../services/planningService.js';

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
