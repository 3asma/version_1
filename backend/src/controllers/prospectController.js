import prospectService from '../services/prospectService.js';
import { streamPDF } from '../services/pdfService.js';

class ProspectController {
    async exportPDF(req, res, next) {
        try {
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
            const { firstName, lastName, age, occupation, subject, observation } = req.body;

            // Strict Validation
            if (!firstName || !lastName || !age || !occupation || !subject || !observation) {
                return res.status(400).json({
                    message: 'error',
                    error: 'Missing required fields: firstName, lastName, age, occupation, subject, observation'
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

            const data = await prospectService.createProspect(req.body);
            res.status(201).json({ message: 'success', data });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = await prospectService.updateProspect(id, req.body);
            res.status(200).json({ message: 'success', data });
        } catch (error) {
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
