import prospectService from '../services/prospectService.js';
import { streamPDF } from '../services/pdfService.js';

class ProspectController {
    async exportPDF(req, res, next) {
        try {
            if (req.user && req.user.role === 'PROFESSOR') {
                return res.status(403).json({ message: 'error', error: 'Forbidden' });
            }
            const data = await prospectService.getAllProspects();
            const headers = [
                { label: 'Nom & Prénom', key: 'fullName', width: 140 },
                { label: 'E-mail', key: 'email', width: 150 },
                { label: 'Téléphone', key: 'phone', width: 100 },
                { label: 'Statut', key: 'status', width: 105 }
            ];
            const rows = data.map(p => ({
                fullName: `${p.lastName} ${p.firstName}`.trim(),
                email: p.email || '',
                phone: p.phone || '',
                status: p.status || ''
            }));
            streamPDF(res, 'Prospects', headers, rows);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            if (req.user && req.user.role === 'PROFESSOR') {
                return res.status(200).json({ message: 'success', data: [] });
            }
            const data = await prospectService.getAllProspects();
            res.status(200).json({ message: 'success', data });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await prospectService.getProspectById(id);
            if (!data) {
                return res.status(404).json({ message: 'error', error: 'Prospect not found' });
            }
            res.status(200).json({ message: 'success', data });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const { firstName, lastName, age, occupation, observation, gender, phone, email, registrationDate, firstContactId, secondContactId, action, membershipNumber, freeSessionsCompleted, absences, giftCode, status } = req.body;

            // Strict Validation
            if (!firstName || !lastName || !age || !occupation || !observation) {
                return res.status(400).json({
                    message: 'error',
                    error: 'Missing required fields: firstName, lastName, age, occupation, observation'
                });
            }

            if (isNaN(age) || age <= 0) {
                return res.status(400).json({ message: 'error', error: 'Age must be a positive number' });
            }

            const validOccupations = ['STUDENT', 'EMPLOYEE', 'student', 'employee'];
            if (!validOccupations.includes(occupation)) {
                return res.status(400).json({ message: 'error', error: 'Invalid occupation' });
            }

            const validObservations = ['ALONE', 'ACCOMPANIED', 'alone', 'accompanied'];
            if (!validObservations.includes(observation)) {
                return res.status(400).json({ message: 'error', error: 'Invalid observation' });
            }

            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({ message: 'error', error: 'Invalid email format' });
            }

            if (gender && !['MALE', 'FEMALE', 'male', 'female', ''].includes(gender)) {
                return res.status(400).json({ message: 'error', error: 'Invalid gender. Use MALE or FEMALE' });
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

            if (registrationDate && isNaN(Date.parse(registrationDate))) {
                return res.status(400).json({ message: 'error', error: 'Invalid registrationDate format' });
            }

            if (freeSessionsCompleted !== undefined && (isNaN(freeSessionsCompleted) || freeSessionsCompleted < 0)) {
                return res.status(400).json({ message: 'error', error: 'freeSessionsCompleted must be a non-negative number' });
            }
            if (absences !== undefined && (isNaN(absences) || absences < 0)) {
                return res.status(400).json({ message: 'error', error: 'absences must be a non-negative number' });
            }
            if (giftCode !== undefined && typeof giftCode !== 'string') {
                return res.status(400).json({ message: 'error', error: 'giftCode must be a string' });
            }
            if (status !== undefined && typeof status !== 'string') {
                return res.status(400).json({ message: 'error', error: 'status must be a string' });
            }

            const data = await prospectService.createProspect(req.body);
            res.status(201).json({ message: 'success', data });
        } catch (error) {
            if (error.message === 'MEMBERSHIP_NUMBER_TAKEN') {
                return res.status(409).json({ message: 'error', error: 'Membership number already in use' });
            }
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { age, occupation, observation, email, gender, registrationDate, firstContactId, secondContactId, action, membershipNumber, freeSessionsCompleted, absences, giftCode, status } = req.body;

            if (age !== undefined && (isNaN(age) || age <= 0)) {
                return res.status(400).json({ message: 'error', error: 'Age must be a positive number' });
            }

            if (occupation && !['STUDENT', 'EMPLOYEE', 'student', 'employee'].includes(occupation)) {
                return res.status(400).json({ message: 'error', error: 'Invalid occupation' });
            }

            if (observation && !['ALONE', 'ACCOMPANIED', 'alone', 'accompanied'].includes(observation)) {
                return res.status(400).json({ message: 'error', error: 'Invalid observation' });
            }

            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({ message: 'error', error: 'Invalid email format' });
            }

            if (gender && !['MALE', 'FEMALE', 'male', 'female', ''].includes(gender)) {
                return res.status(400).json({ message: 'error', error: 'Invalid gender. Use MALE or FEMALE' });
            }

            if (registrationDate && isNaN(Date.parse(registrationDate))) {
                return res.status(400).json({ message: 'error', error: 'Invalid registrationDate format' });
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

            if (freeSessionsCompleted !== undefined && (isNaN(freeSessionsCompleted) || freeSessionsCompleted < 0)) {
                return res.status(400).json({ message: 'error', error: 'freeSessionsCompleted must be a non-negative number' });
            }
            if (absences !== undefined && (isNaN(absences) || absences < 0)) {
                return res.status(400).json({ message: 'error', error: 'absences must be a non-negative number' });
            }
            if (giftCode !== undefined && typeof giftCode !== 'string') {
                return res.status(400).json({ message: 'error', error: 'giftCode must be a string' });
            }
            if (status !== undefined && typeof status !== 'string') {
                return res.status(400).json({ message: 'error', error: 'status must be a string' });
            }

            const data = await prospectService.updateProspect(id, req.body);
            res.status(200).json({ message: 'success', data });
        } catch (error) {
            if (error.message === 'MEMBERSHIP_NUMBER_TAKEN') {
                return res.status(409).json({ message: 'error', error: 'Membership number already in use' });
            }
            if (error.code === 'P2025') {
                return res.status(404).json({ message: 'error', error: 'Prospect not found' });
            }
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await prospectService.deleteProspect(id);
            res.status(200).json({ message: 'success' });
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ message: 'error', error: 'Prospect not found' });
            }
            next(error);
        }
    }
}

export default new ProspectController();
