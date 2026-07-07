import professorService from '../services/professorService.js';
import { streamPDF } from '../services/pdfService.js';

export const exportProfessorsPDF = async (req, res) => {
    try {
        const data = await professorService.getAllProfessors();
        const headers = [
            { label: 'Nom', key: 'nom', width: 90 },
            { label: 'Prénom', key: 'prenom', width: 90 },
            { label: 'E-mail', key: 'email', width: 130 },
            { label: 'Téléphone', key: 'telephone', width: 95 },
            { label: 'Spécialité', key: 'specialite', width: 90 }
        ];
        const rows = data.map(p => ({
            nom: p.nom || '',
            prenom: p.prenom || '',
            email: p.email || '',
            telephone: p.telephone || '',
            specialite: p.specialite || ''
        }));
        streamPDF(res, 'Professors', headers, rows);
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getAllProfessors = async (req, res) => {

    try {
        const professors = await professorService.getAllProfessors();
        res.json({ message: 'success', data: professors });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getProfessorById = async (req, res) => {
    try {
        const professor = await professorService.getProfessorById(req.params.id);
        if (!professor) return res.status(404).json({ message: 'error', error: 'Professor not found' });
        res.json({ message: 'success', data: professor });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const createProfessor = async (req, res) => {
    try {
        const professor = await professorService.createProfessor(req.body);
        res.status(201).json({ message: 'success', data: professor });
    } catch (error) {
        let status = 400;
        let msg = error.message;

        if (error.message === 'DUPLICATE_EMAIL') {
            status = 409;
            msg = 'Email already exists';
        }

        res.status(status).json({ message: 'error', error: msg });
    }
};

export const updateProfessor = async (req, res) => {
    try {
        const professor = await professorService.updateProfessor(req.params.id, req.body);
        res.json({ message: 'success', data: professor });
    } catch (error) {
        let status = 400;
        let msg = error.message;

        if (error.code === 'P2025') {
            status = 404;
            msg = 'Professor not found';
        } else if (error.message === 'DUPLICATE_EMAIL') {
            status = 409;
            msg = 'Email already exists';
        }

        res.status(status).json({ message: 'error', error: msg });
    }
};

export const deleteProfessor = async (req, res) => {
    try {
        await professorService.deleteProfessor(req.params.id);
        res.json({ message: 'success' });
    } catch (error) {
        const status = error.code === 'P2025' ? 404 : 500;
        const msg = error.code === 'P2025' ? 'Professor not found' : error.message;
        res.status(status).json({ message: 'error', error: msg });
    }
};
