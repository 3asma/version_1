import candidateService from '../services/candidateService.js';
import { streamPDF } from '../services/pdfService.js';

export const exportCandidatesPDF = async (req, res) => {
    try {
        const data = await candidateService.getAllCandidates();
        const headers = [
            { label: 'Code', key: 'candidateCode', width: 80 },
            { label: 'Nom', key: 'lastName', width: 85 },
            { label: 'Prénom', key: 'firstName', width: 85 },
            { label: 'Statut', key: 'status', width: 80 },
            { label: 'Âge', key: 'age', width: 60 },
            { label: 'Métier', key: 'occupation', width: 105 }
        ];
        const rows = data.map(c => ({
            candidateCode: c.candidateCode || '',
            lastName: c.lastName || '',
            firstName: c.firstName || '',
            status: c.status || '',
            age: c.age !== undefined && c.age !== null ? String(c.age) : '',
            occupation: c.occupation || ''
        }));
        streamPDF(res, 'Candidates', headers, rows);
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getAllCandidates = async (req, res) => {

    try {
        const candidates = await candidateService.getAllCandidates();
        res.json({ message: 'success', data: candidates });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getCandidateById = async (req, res) => {
    try {
        const candidate = await candidateService.getCandidateById(req.params.id);
        if (!candidate) return res.status(404).json({ message: 'error', error: 'Candidate not found' });
        res.json({ message: 'success', data: candidate });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const createCandidate = async (req, res) => {
    const { firstName, lastName, age, occupation, observation, email, contact } = req.body;

    // Strict validation
    if (!firstName || !lastName || !age || !occupation || !observation) {
        return res.status(400).json({ message: 'error', error: 'Missing required fields: firstName, lastName, age, occupation, observation' });
    }
    if (typeof age !== 'number' || age <= 0) {
        return res.status(400).json({ message: 'error', error: 'Age must be a positive number' });
    }
    if (!['STUDENT', 'EMPLOYEE', 'student', 'employee'].includes(occupation)) {
        return res.status(400).json({ message: 'error', error: 'Occupation must be STUDENT or EMPLOYEE' });
    }
    if (!['ALONE', 'ACCOMPANIED', 'alone', 'accompanied'].includes(observation)) {
        return res.status(400).json({ message: 'error', error: 'Observation must be ALONE or ACCOMPANIED' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'error', error: 'Invalid email format' });
    }
    if (contact && !Array.isArray(contact)) {
        return res.status(400).json({ message: 'error', error: 'Contact must be an array of strings' });
    }

    try {
        const candidate = await candidateService.createCandidate(req.body);
        res.status(201).json({ message: 'success', data: candidate });
    } catch (error) {
        let status = 500;
        let msg = error.message;
        if (error.message === 'EMAIL_TAKEN') { status = 409; msg = 'Email already in use'; }
        if (error.message === 'CODE_GENERATION_FAILED') { status = 503; msg = 'Could not generate unique candidate code'; }
        res.status(status).json({ message: 'error', error: msg });
    }
};

export const updateCandidate = async (req, res) => {
    const { age, occupation, observation, email, contact, status } = req.body;

    // Partial validation for updates
    if (age !== undefined && (typeof age !== 'number' || age <= 0)) {
        return res.status(400).json({ message: 'error', error: 'Age must be a positive number' });
    }
    if (occupation && !['STUDENT', 'EMPLOYEE', 'student', 'employee'].includes(occupation)) {
        return res.status(400).json({ message: 'error', error: 'Occupation must be STUDENT or EMPLOYEE' });
    }
    if (observation && !['ALONE', 'ACCOMPANIED', 'alone', 'accompanied'].includes(observation)) {
        return res.status(400).json({ message: 'error', error: 'Observation must be ALONE or ACCOMPANIED' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'error', error: 'Invalid email format' });
    }
    if (status && !['ACTIVE', 'INACTIVE', 'PENDING', 'active', 'inactive', 'pending'].includes(status)) {
        return res.status(400).json({ message: 'error', error: 'Invalid status. Use ACTIVE, INACTIVE, or PENDING' });
    }
    if (contact && !Array.isArray(contact)) {
        return res.status(400).json({ message: 'error', error: 'Contact must be an array of strings' });
    }

    try {
        const candidate = await candidateService.updateCandidate(req.params.id, req.body);
        res.json({ message: 'success', data: candidate });
    } catch (error) {
        let statusCode = 400;
        let msg = error.message;
        if (error.message === 'EMAIL_TAKEN') { statusCode = 409; msg = 'Email already in use'; }
        if (error.message === 'INVALID_STATUS') { statusCode = 400; msg = 'Invalid status used'; }
        if (error.code === 'P2025') { statusCode = 404; msg = 'Candidate not found'; }
        res.status(statusCode).json({ message: 'error', error: msg });
    }
};

export const deleteCandidate = async (req, res) => {
    try {
        await candidateService.deleteCandidate(req.params.id);
        res.json({ message: 'success' });
    } catch (error) {
        const status = error.code === 'P2025' ? 404 : 500;
        const msg = error.code === 'P2025' ? 'Candidate not found' : error.message;
        res.status(status).json({ message: 'error', error: msg });
    }
};
