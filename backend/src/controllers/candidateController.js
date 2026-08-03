import candidateService from '../services/candidateService.js';
import { streamPDF } from '../services/pdfService.js';
import prisma from '../config/prisma.js';

export const exportCandidatesPDF = async (req, res) => {
    try {
        let data;
        if (req.user && req.user.role === 'PROFESSOR') {
            data = await prisma.candidate.findMany({
                where: {
                    inscriptionCandidates: {
                        some: {
                            inscription: {
                                professorId: req.user.professorId
                            }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
        } else {
            data = await candidateService.getAllCandidates();
        }
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
        let candidates;
        if (req.user && req.user.role === 'PROFESSOR') {
            candidates = await prisma.candidate.findMany({
                where: {
                    inscriptionCandidates: {
                        some: {
                            inscription: {
                                professorId: req.user.professorId
                            }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                include: {
                    inscriptions: {
                        include: {
                            formation: true
                        }
                    }
                }
            });
        } else {
            candidates = await candidateService.getAllCandidates();
        }
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
    const { firstName, lastName, age, occupation, observation, email, phone, firstContactId, secondContactId, action, membershipNumber, gender, registrationDate, status } = req.body;

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
    if (phone && typeof phone !== 'string') {
        return res.status(400).json({ message: 'error', error: 'phone must be a string' });
    }
    if (firstContactId && typeof firstContactId !== 'string') {
        return res.status(400).json({ message: 'error', error: 'firstContactId must be a string' });
    }
    if (secondContactId && typeof secondContactId !== 'string') {
        return res.status(400).json({ message: 'error', error: 'secondContactId must be a string' });
    }
    if (action && typeof action !== 'string') {
        return res.status(400).json({ message: 'error', error: 'action must be a string' });
    }
    if (membershipNumber && typeof membershipNumber !== 'string') {
        return res.status(400).json({ message: 'error', error: 'membershipNumber must be a string' });
    }
    if (gender && !['MALE', 'FEMALE', 'male', 'female', ''].includes(gender)) {
        return res.status(400).json({ message: 'error', error: 'Invalid gender. Use MALE or FEMALE' });
    }
    if (registrationDate && isNaN(Date.parse(registrationDate))) {
        return res.status(400).json({ message: 'error', error: 'Invalid registrationDate format' });
    }
    if (status && !['ACTIVE', 'INACTIVE', 'PENDING', 'active', 'inactive', 'pending'].includes(status)) {
        return res.status(400).json({ message: 'error', error: 'Invalid status. Use ACTIVE, INACTIVE, or PENDING' });
    }

    try {
        const candidate = await candidateService.createCandidate(req.body);
        res.status(201).json({ message: 'success', data: candidate });
    } catch (error) {
        let status = 500;
        let msg = error.message;
        if (error.message === 'EMAIL_TAKEN') { status = 409; msg = 'Email already in use'; }
        if (error.message === 'MEMBERSHIP_NUMBER_TAKEN') { status = 409; msg = 'Membership number already in use'; }
        if (error.message === 'CODE_GENERATION_FAILED') { status = 503; msg = 'Could not generate unique candidate code'; }
        res.status(status).json({ message: 'error', error: msg });
    }
};

export const updateCandidate = async (req, res) => {
    const { firstName, lastName, age, occupation, observation, email, phone, firstContactId, secondContactId, action, status, gender, registrationDate, membershipNumber } = req.body;

    // Partial validation for updates
    if (firstName && typeof firstName !== 'string') {
        return res.status(400).json({ message: 'error', error: 'firstName must be a string' });
    }
    if (lastName && typeof lastName !== 'string') {
        return res.status(400).json({ message: 'error', error: 'lastName must be a string' });
    }
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
    if (phone && typeof phone !== 'string') {
        return res.status(400).json({ message: 'error', error: 'phone must be a string' });
    }
    if (status && !['ACTIVE', 'INACTIVE', 'PENDING', 'active', 'inactive', 'pending'].includes(status)) {
        return res.status(400).json({ message: 'error', error: 'Invalid status. Use ACTIVE, INACTIVE, or PENDING' });
    }
    if (firstContactId && typeof firstContactId !== 'string') {
        return res.status(400).json({ message: 'error', error: 'firstContactId must be a string' });
    }
    if (secondContactId && typeof secondContactId !== 'string') {
        return res.status(400).json({ message: 'error', error: 'secondContactId must be a string' });
    }
    if (action && typeof action !== 'string') {
        return res.status(400).json({ message: 'error', error: 'action must be a string' });
    }
    if (membershipNumber && typeof membershipNumber !== 'string') {
        return res.status(400).json({ message: 'error', error: 'membershipNumber must be a string' });
    }
    if (gender && !['MALE', 'FEMALE', 'male', 'female', ''].includes(gender)) {
        return res.status(400).json({ message: 'error', error: 'Invalid gender. Use MALE or FEMALE' });
    }
    if (registrationDate && isNaN(Date.parse(registrationDate))) {
        return res.status(400).json({ message: 'error', error: 'Invalid registrationDate format' });
    }

    try {
        const candidate = await candidateService.updateCandidate(req.params.id, req.body);
        res.json({ message: 'success', data: candidate });
    } catch (error) {
        let statusCode = 400;
        let msg = error.message;
        if (error.message === 'EMAIL_TAKEN') { statusCode = 409; msg = 'Email already in use'; }
        if (error.message === 'MEMBERSHIP_NUMBER_TAKEN') { statusCode = 409; msg = 'Membership number already in use'; }
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

export const getCandidateFormations = async (req, res) => {
    try {
        const formations = await candidateService.getCandidateFormations(req.params.id);
        res.json({ message: 'success', data: formations });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

