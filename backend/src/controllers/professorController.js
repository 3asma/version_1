import professorService from '../services/professorService.js';
import { streamPDF } from '../services/pdfService.js';
import prisma from '../config/prisma.js';

export const exportProfessorsPDF = async (req, res) => {
    try {
        if (req.user && req.user.role === 'PROFESSOR') {
            return res.status(403).json({ message: 'error', error: 'Forbidden' });
        }
        const data = await professorService.getAllProfessors();
        const headers = [
            { label: 'Nom', key: 'nom', width: 110 },
            { label: 'Prénom', key: 'prenom', width: 110 },
            { label: 'E-mail', key: 'email', width: 160 },
            { label: 'Téléphone', key: 'telephone', width: 115 }
        ];
        const rows = data.map(p => ({
            nom: p.nom || '',
            prenom: p.prenom || '',
            email: p.email || '',
            telephone: p.telephone || ''
        }));
        streamPDF(res, 'Professors', headers, rows);
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getAllProfessors = async (req, res) => {

    try {
        let professors;
        if (req.user && req.user.role === 'PROFESSOR') {
            const prof = await prisma.professor.findUnique({
                where: { id: req.user.professorId }
            });
            professors = prof ? [prof] : [];
        } else {
            professors = await professorService.getAllProfessors();
        }
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
        res.status(505).json({ message: 'error', error: error.message });
    }
};

export const createProfessor = async (req, res) => {
    const { nom, firstName, prenom, lastName, email, telephone, phone, adresse, address, type, dayOff, maxSessions } = req.body;
    const finalNom = nom || lastName;
    const finalPrenom = prenom || firstName;
    const finalTelephone = telephone || phone;
    const finalAdresse = adresse || address;

    if (!finalNom || typeof finalNom !== 'string' || finalNom.trim() === '') {
        return res.status(400).json({ message: 'error', error: 'NOM_REQUIRED' });
    }
    if (!finalPrenom || typeof finalPrenom !== 'string' || finalPrenom.trim() === '') {
        return res.status(400).json({ message: 'error', error: 'PRENOM_REQUIRED' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_EMAIL' });
    }
    if (finalTelephone && typeof finalTelephone !== 'string') {
        return res.status(400).json({ message: 'error', error: 'telephone must be a string' });
    }
    if (finalAdresse && typeof finalAdresse !== 'string') {
        return res.status(400).json({ message: 'error', error: 'adresse must be a string' });
    }
    if (type && typeof type !== 'string') {
        return res.status(400).json({ message: 'error', error: 'type must be a string' });
    }
    if (dayOff && typeof dayOff !== 'string') {
        return res.status(400).json({ message: 'error', error: 'dayOff must be a string' });
    }
    if (maxSessions !== undefined && (isNaN(maxSessions) || parseInt(maxSessions) <= 0)) {
        return res.status(400).json({ message: 'error', error: 'maxSessions must be a positive number' });
    }

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
    const { nom, firstName, prenom, lastName, email, telephone, phone, adresse, address, type, dayOff, maxSessions } = req.body;
    const finalNom = nom || lastName;
    const finalPrenom = prenom || firstName;
    const finalTelephone = telephone || phone;
    const finalAdresse = adresse || address;

    if (finalNom !== undefined && (typeof finalNom !== 'string' || finalNom.trim() === '')) {
        return res.status(400).json({ message: 'error', error: 'NOM_REQUIRED' });
    }
    if (finalPrenom !== undefined && (typeof finalPrenom !== 'string' || finalPrenom.trim() === '')) {
        return res.status(400).json({ message: 'error', error: 'PRENOM_REQUIRED' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'error', error: 'INVALID_EMAIL' });
    }
    if (finalTelephone !== undefined && typeof finalTelephone !== 'string') {
        return res.status(400).json({ message: 'error', error: 'telephone must be a string' });
    }
    if (finalAdresse !== undefined && typeof finalAdresse !== 'string') {
        return res.status(400).json({ message: 'error', error: 'adresse must be a string' });
    }
    if (type !== undefined && typeof type !== 'string') {
        return res.status(400).json({ message: 'error', error: 'type must be a string' });
    }
    if (dayOff !== undefined && typeof dayOff !== 'string') {
        return res.status(400).json({ message: 'error', error: 'dayOff must be a string' });
    }
    if (maxSessions !== undefined && (isNaN(maxSessions) || parseInt(maxSessions) <= 0)) {
        return res.status(400).json({ message: 'error', error: 'maxSessions must be a positive number' });
    }

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
