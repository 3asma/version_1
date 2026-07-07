import inscriptionService from '../services/inscriptionService.js';
import { streamPDF } from '../services/pdfService.js';

export const exportInscriptionsPDF = async (req, res) => {
    try {
        const data = await inscriptionService.getAllInscriptions();
        const headers = [
            { label: 'Candidat', key: 'candidateName', width: 110 },
            { label: 'Formation', key: 'formation.matiere', width: 130 },
            { label: 'Mode', key: 'learningMode', width: 90 },
            { label: 'Statut', key: 'status', width: 90 },
            { label: 'Hrs Restantes', key: 'remainingHours', width: 75 }
        ];
        const rows = data.map(ins => ({
            candidateName: ins.candidate ? `${ins.candidate.lastName} ${ins.candidate.firstName}`.trim() : '',
            'formation.matiere': ins.formation ? ins.formation.matiere : '',
            learningMode: ins.learningMode || '',
            status: ins.status || '',
            remainingHours: ins.remainingHours !== undefined && ins.remainingHours !== null ? String(ins.remainingHours) : '0'
        }));
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
    try {
        const inscription = await inscriptionService.createInscription(req.body);
        res.status(201).json({ message: 'success', data: inscription });
    } catch (error) {
        let status = 400;
        let msg = error.message;

        if (error.message === 'DUPLICATE_ACTIVE_INSCRIPTION') {
            status = 409;
            msg = 'Candidate already has an ACTIVE inscription';
        } else if (error.message.includes('NOT_FOUND')) {
            status = 404;
        }

        res.status(status).json({ message: 'error', error: msg });
    }
};

export const updateInscription = async (req, res) => {
    try {
        const inscription = await inscriptionService.updateInscription(req.params.id, req.body);
        res.json({ message: 'success', data: inscription });
    } catch (error) {
        let status = 400;
        let msg = error.message;

        if (error.code === 'P2025' || error.message === 'INSCRIPTION_NOT_FOUND') {
            status = 404;
            msg = 'Inscription not found';
        } else if (error.message === 'DUPLICATE_ACTIVE_INSCRIPTION') {
            status = 409;
            msg = 'Candidate already has an ACTIVE inscription';
        }

        res.status(status).json({ message: 'error', error: msg });
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
        const inscription = await inscriptionService.deductHours(req.params.id, hours);
        res.json({ message: 'success', data: inscription });
    } catch (error) {
        const status = error.message === 'INSCRIPTION_NOT_FOUND' ? 404 : 500;
        res.status(status).json({ message: 'error', error: error.message });
    }
};
