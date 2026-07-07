import groupService from '../services/groupService.js';
import { streamPDF } from '../services/pdfService.js';

export const exportGroupsPDF = async (req, res) => {
    try {
        const data = await groupService.getAllGroups();
        const headers = [
            { label: 'Groupe', key: 'nom', width: 110 },
            { label: 'Format', key: 'type', width: 90 },
            { label: 'Formation', key: 'formation.matiere', width: 120 },
            { label: 'Effectif', key: 'effectif', width: 70 },
            { label: 'Enseignant', key: 'professorName', width: 105 }
        ];
        const rows = data.map(grp => ({
            nom: grp.nom || '',
            type: grp.type || '',
            'formation.matiere': grp.formation ? grp.formation.matiere : '',
            effectif: grp.effectif !== undefined && grp.effectif !== null ? String(grp.effectif) : '0',
            professorName: grp.professor ? `${grp.professor.nom} ${grp.professor.prenom}`.trim() : ''
        }));
        streamPDF(res, 'Groups', headers, rows);
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getAllGroups = async (req, res) => {

    try {
        const groups = await groupService.getAllGroups();
        res.json({ message: 'success', data: groups });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getGroupById = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        res.json({ message: 'success', data: group });
    } catch (error) {
        const status = error.message === 'GROUP_NOT_FOUND' ? 404 : 500;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

export const createGroup = async (req, res) => {
    try {
        const group = await groupService.createGroup(req.body);
        res.status(201).json({ message: 'success', data: group });
    } catch (error) {
        let status = 400;
        if (error.message.includes('NOT_FOUND')) status = 404;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

export const updateGroup = async (req, res) => {
    try {
        const group = await groupService.updateGroup(req.params.id, req.body);
        res.json({ message: 'success', data: group });
    } catch (error) {
        let status = 400;
        if (error.message.includes('NOT_FOUND') || error.code === 'P2025') status = 404;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

export const deleteGroup = async (req, res) => {
    try {
        await groupService.deleteGroup(req.params.id);
        res.json({ message: 'success' });
    } catch (error) {
        const status = error.message === 'GROUP_NOT_FOUND' || error.code === 'P2025' ? 404 : 500;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

export const addCandidate = async (req, res) => {
    try {
        const { candidateId } = req.body;
        if (!candidateId) throw new Error('CANDIDATE_ID_REQUIRED');
        const group = await groupService.addCandidateToGroup(req.params.id, candidateId);
        res.json({ message: 'success', data: group });
    } catch (error) {
        let status = 400;
        if (error.message.includes('NOT_FOUND')) status = 404;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

export const removeCandidate = async (req, res) => {
    try {
        const { id, candidateId } = req.params;
        const group = await groupService.removeCandidateFromGroup(id, candidateId);
        res.json({ message: 'success', data: group });
    } catch (error) {
        let status = 400;
        if (error.message.includes('NOT_FOUND') || error.message.includes('MEMBERSHIP_NOT_FOUND')) status = 404;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

export const assignProfessor = async (req, res) => {
    try {
        const { professorId } = req.body;
        if (!professorId) throw new Error('PROFESSOR_ID_REQUIRED');
        const group = await groupService.assignProfessorToGroup(req.params.id, professorId);
        res.json({ message: 'success', data: group });
    } catch (error) {
        let status = 400;
        if (error.message.includes('NOT_FOUND')) status = 404;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

export const removeProfessor = async (req, res) => {
    try {
        const group = await groupService.removeProfessorFromGroup(req.params.id);
        res.json({ message: 'success', data: group });
    } catch (error) {
        let status = 400;
        if (error.message.includes('NOT_FOUND')) status = 404;
        res.status(status).json({ message: 'error', error: error.message });
    }
};
