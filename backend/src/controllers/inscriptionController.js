import inscriptionService from '../services/inscriptionService.js';
import { streamPDF } from '../services/pdfService.js';

export const exportInscriptionsPDF = async (req, res) => {
    try {
        const data = await inscriptionService.getAllInscriptions();
        const headers = [
            { label: 'N° Inscription', key: 'inscriptionCode', width: 100 },
            { label: 'Nom Groupe', key: 'groupName', width: 110 },
            { label: 'Formation', key: 'formation', width: 110 },
            { label: 'Professeur', key: 'professor', width: 100 },
            { label: 'Mode', key: 'learningMode', width: 70 },
            { label: 'Membres', key: 'membersCount', width: 65 },
            { label: 'Date', key: 'date', width: 70 }
        ];
        const rows = data.map(group => {
            const form = group.formation;
            const fm = form ? `${form.matiere} - ${form.niveau}` : 'Inconnue';
            const prof = group.professor;
            const pr = prof ? `${prof.nom} ${prof.prenom}` : 'Non affecté';
            return {
                inscriptionCode: group.inscriptionCode || '',
                groupName: group.groupName || '',
                formation: fm,
                professor: pr,
                learningMode: group.learningMode || '',
                membersCount: `${group.inscriptions ? group.inscriptions.length : 0} membres`,
                date: group.dateInscription ? new Date(group.dateInscription).toLocaleDateString('fr-FR') : '-'
            };
        });
        streamPDF(res, 'Inscriptions', headers, rows);
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getAllInscriptions = async (req, res) => {

    try {
        const inscriptions = await inscriptionService.getAllInscriptions();
        res.json({ message: 'success', data: inscriptions });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getInscriptionById = async (req, res) => {
    try {
        const inscription = await inscriptionService.getInscriptionById(req.params.id);
        res.json({ message: 'success', data: inscription });
    } catch (error) {
        const status = error.message === 'INSCRIPTION_NOT_FOUND' ? 404 : 500;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

export const createInscription = async (req, res) => {
    const { inscriptionCode, candidateId, formationId, professorId, learningMode, status, duration, price, volumeHoraire, remainingHours, note } = req.body;

    if (!inscriptionCode || typeof inscriptionCode !== 'string' || inscriptionCode.trim() === '') {
        return res.status(400).json({ message: 'error', error: 'INSCRIPTION_CODE_REQUIRED' });
    }
    if (!candidateId || typeof candidateId !== 'string' || candidateId.trim() === '') {
        return res.status(400).json({ message: 'error', error: 'CANDIDATE_ID_REQUIRED' });
    }
    if (!formationId || typeof formationId !== 'string' || formationId.trim() === '') {
        return res.status(400).json({ message: 'error', error: 'FORMATION_ID_REQUIRED' });
    }
    if (learningMode && !['MONOME', 'BINOME', 'GROUPE', 'SPECIFIQUE'].includes(learningMode)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_LEARNING_MODE' });
    }
    if (status && !['WAITING', 'ASSIGNED', 'ACTIVE', 'CANCELLED', 'COMPLETED'].includes(status)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_STATUS' });
    }
    if (professorId !== undefined && professorId !== null && (typeof professorId !== 'string' || professorId.trim() === '')) {
        return res.status(400).json({ message: 'error', error: 'INVALID_PROFESSOR_ID' });
    }
    if (duration !== undefined && duration !== null && (isNaN(duration) || Number(duration) < 0)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_DURATION' });
    }
    if (price !== undefined && price !== null && (isNaN(price) || Number(price) < 0)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_PRICE' });
    }
    if (volumeHoraire !== undefined && volumeHoraire !== null && (isNaN(volumeHoraire) || Number(volumeHoraire) < 0)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_VOLUME_HORAIRE' });
    }
    if (remainingHours !== undefined && remainingHours !== null && (isNaN(remainingHours) || Number(remainingHours) < 0)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_REMAINING_HOURS' });
    }

    try {
        const inscription = await inscriptionService.createInscription(req.body);
        res.status(201).json({ message: 'success', data: inscription });
    } catch (error) {
        let statusHttp = 400;
        let msg = error.message;

        if (error.message === 'DUPLICATE_ACTIVE_INSCRIPTION') {
            statusHttp = 409;
            msg = 'Candidate already has an ACTIVE inscription';
        } else if (error.message === 'INSCRIPTION_CODE_EXISTS') {
            statusHttp = 409;
            msg = "Le numéro d'inscription existe déjà.";
        } else if (error.message === 'INSCRIPTION_CODE_REQUIRED' || error.message === 'INVALID_INSCRIPTION_CODE_LENGTH' || error.message === 'INVALID_INSCRIPTION_CODE_FORMAT') {
            statusHttp = 400;
        } else if (error.message.includes('NOT_FOUND')) {
            statusHttp = 404;
        }

        res.status(statusHttp).json({ message: 'error', error: msg });
    }
};

export const updateInscription = async (req, res) => {
    const { inscriptionCode, candidateId, formationId, professorId, learningMode, status, duration, price, volumeHoraire, remainingHours, note } = req.body;

    if (inscriptionCode !== undefined && (typeof inscriptionCode !== 'string' || inscriptionCode.trim() === '')) {
        return res.status(400).json({ message: 'error', error: 'INVALID_INSCRIPTION_CODE' });
    }
    if (candidateId !== undefined && (typeof candidateId !== 'string' || candidateId.trim() === '')) {
        return res.status(400).json({ message: 'error', error: 'INVALID_CANDIDATE_ID' });
    }
    if (formationId !== undefined && (typeof formationId !== 'string' || formationId.trim() === '')) {
        return res.status(400).json({ message: 'error', error: 'INVALID_FORMATION_ID' });
    }
    if (learningMode && !['MONOME', 'BINOME', 'GROUPE', 'SPECIFIQUE'].includes(learningMode)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_LEARNING_MODE' });
    }
    if (status && !['WAITING', 'ASSIGNED', 'ACTIVE', 'CANCELLED', 'COMPLETED'].includes(status)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_STATUS' });
    }
    if (professorId !== undefined && professorId !== null && (typeof professorId !== 'string' || professorId.trim() === '')) {
        return res.status(400).json({ message: 'error', error: 'INVALID_PROFESSOR_ID' });
    }
    if (duration !== undefined && duration !== null && (isNaN(duration) || Number(duration) < 0)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_DURATION' });
    }
    if (price !== undefined && price !== null && (isNaN(price) || Number(price) < 0)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_PRICE' });
    }
    if (volumeHoraire !== undefined && volumeHoraire !== null && (isNaN(volumeHoraire) || Number(volumeHoraire) < 0)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_VOLUME_HORAIRE' });
    }
    if (remainingHours !== undefined && remainingHours !== null && (isNaN(remainingHours) || Number(remainingHours) < 0)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_REMAINING_HOURS' });
    }

    try {
        const inscription = await inscriptionService.updateInscription(req.params.id, req.body);
        res.json({ message: 'success', data: inscription });
    } catch (error) {
        let statusHttp = 400;
        let msg = error.message;

        if (error.code === 'P2025' || error.message === 'INSCRIPTION_NOT_FOUND') {
            statusHttp = 404;
            msg = 'Inscription not found';
        } else if (error.message === 'DUPLICATE_ACTIVE_INSCRIPTION') {
            statusHttp = 409;
            msg = 'Candidate already has an ACTIVE inscription';
        } else if (error.message === 'INSCRIPTION_CODE_EXISTS') {
            statusHttp = 409;
            msg = "Le numéro d'inscription existe déjà.";
        } else if (error.message === 'INSCRIPTION_CODE_REQUIRED' || error.message === 'INVALID_INSCRIPTION_CODE_LENGTH' || error.message === 'INVALID_INSCRIPTION_CODE_FORMAT') {
            statusHttp = 400;
        }

        res.status(statusHttp).json({ message: 'error', error: msg });
    }
};

export const deleteInscription = async (req, res) => {
    try {
        await inscriptionService.deleteInscription(req.params.id);
        res.json({ message: 'success' });
    } catch (error) {
        const status = error.code === 'P2025' ? 404 : 500;
        const msg = error.code === 'P2025' ? 'Inscription not found' : error.message;
        res.status(status).json({ message: 'error', error: msg });
    }
};

export const deductHours = async (req, res) => {
    try {
        const { hours } = req.body;
        if (hours === undefined || hours === null || isNaN(hours) || Number(hours) <= 0) {
            return res.status(400).json({ message: 'error', error: 'hours must be a positive number' });
        }
        const inscription = await inscriptionService.deductHours(req.params.id, hours);
        res.json({ message: 'success', data: inscription });
    } catch (error) {
        const status = error.message === 'INSCRIPTION_NOT_FOUND' ? 404 : 500;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

export const updateLearningGroup = async (req, res) => {
    try {
        const group = await inscriptionService.updateLearningGroup(req.params.id, req.body);
        res.json({ message: 'success', data: group });
    } catch (error) {
        let statusHttp = 400;
        let msg = error.message;

        if (error.message === 'LEARNING_GROUP_NOT_FOUND') {
            statusHttp = 404;
        } else if (error.message === 'INSCRIPTION_CODE_EXISTS') {
            statusHttp = 409;
            msg = "Le numéro d'inscription existe déjà.";
        }

        res.status(statusHttp).json({ message: 'error', error: msg });
    }
};

export const deleteLearningGroup = async (req, res) => {
    try {
        await inscriptionService.deleteLearningGroup(req.params.id);
        res.json({ message: 'success' });
    } catch (error) {
        const status = error.message === 'LEARNING_GROUP_NOT_FOUND' ? 404 : 500;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

