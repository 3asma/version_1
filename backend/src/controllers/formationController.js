import formationService from '../services/formationService.js';
import { streamPDF } from '../services/pdfService.js';

export const exportFormationsPDF = async (req, res) => {
    try {
        const data = await formationService.getAllFormations();
        const headers = [
            { label: 'Matière', key: 'matiere', width: 250 },
            { label: 'Niveau', key: 'niveau', width: 245 }
        ];
        const rows = data.map(f => ({
            matiere: f.matiere || '',
            niveau: f.niveau || ''
        }));
        streamPDF(res, 'Formations', headers, rows);
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getAllFormations = async (req, res) => {

    try {
        const formations = await formationService.getAllFormations();
        res.json({ message: 'success', data: formations });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getFormationById = async (req, res) => {
    try {
        const formation = await formationService.getFormationById(req.params.id);
        if (!formation) return res.status(404).json({ message: 'error', error: 'Formation not found' });
        res.json({ message: 'success', data: formation });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const createFormation = async (req, res) => {
    const { matiere, subject, niveau, level } = req.body;
    const finalMatiere = matiere || subject;
    const finalNiveau = niveau || level;

    if (!finalMatiere || String(finalMatiere).trim() === '') {
        return res.status(400).json({ message: 'error', error: 'MATIERE_REQUIRED' });
    }
    if (!finalNiveau || String(finalNiveau).trim() === '') {
        return res.status(400).json({ message: 'error', error: 'NIVEAU_REQUIRED' });
    }

    try {
        const formation = await formationService.createFormation(req.body);
        res.status(201).json({ message: 'success', data: formation });
    } catch (error) {
        let status = 400;
        let msg = error.message;

        if (error.code === 'P2002') {
            status = 409;
            msg = 'Unique constraint failed';
        }

        res.status(status).json({ message: 'error', error: msg });
    }
};

export const updateFormation = async (req, res) => {
    const { matiere, subject, niveau, level } = req.body;
    const finalMatiere = matiere || subject;
    const finalNiveau = niveau || level;

    if (finalMatiere !== undefined && String(finalMatiere).trim() === '') {
        return res.status(400).json({ message: 'error', error: 'MATIERE_REQUIRED' });
    }
    if (finalNiveau !== undefined && String(finalNiveau).trim() === '') {
        return res.status(400).json({ message: 'error', error: 'NIVEAU_REQUIRED' });
    }

    try {
        const formation = await formationService.updateFormation(req.params.id, req.body);
        res.json({ message: 'success', data: formation });
    } catch (error) {
        let status = 400;
        let msg = error.message;

        if (error.code === 'P2025') {
            status = 404;
            msg = 'Formation not found';
        } else if (error.code === 'P2002') {
            status = 409;
            msg = 'Unique constraint failed';
        }

        res.status(status).json({ message: 'error', error: msg });
    }
};

export const deleteFormation = async (req, res) => {
    try {
        await formationService.deleteFormation(req.params.id);
        res.json({ message: 'success' });
    } catch (error) {
        let status = 400;
        let msg = error.message;

        if (error.code === 'P2025') {
            status = 404;
            msg = 'Formation not found';
        }

        res.status(status).json({ message: 'error', error: msg });
    }
};
