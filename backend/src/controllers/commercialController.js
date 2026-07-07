import commercialService from '../services/commercialService.js';

export const getAllCommercials = async (req, res) => {
    try {
        const commercials = await commercialService.getAllCommercials();
        res.json({ message: 'success', data: commercials });
    } catch (error) {
        console.error('Error in getAllCommercials:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getCommercialById = async (req, res) => {
    try {
        const commercial = await commercialService.getCommercialById(req.params.id);
        res.json({ message: 'success', data: commercial });
    } catch (error) {
        console.error('Error in getCommercialById:', error);
        const status = error.message === 'COMMERCIAL_NOT_FOUND' ? 404 : 500;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

export const createCommercial = async (req, res) => {
    try {
        const commercial = await commercialService.createCommercial(req.body);
        res.status(201).json({ message: 'success', data: commercial });
    } catch (error) {
        console.error('Error in createCommercial:', error);
        if (error.code === 'P2002') {
            return res.status(400).json({
                message: 'error',
                error: 'Un commercial avec cet email existe déjà.'
            });
        }
        res.status(400).json({ message: 'error', error: error.message });
    }
};

export const updateCommercial = async (req, res) => {
    try {
        const commercial = await commercialService.updateCommercial(req.params.id, req.body);
        res.json({ message: 'success', data: commercial });
    } catch (error) {
        console.error('Error in updateCommercial:', error);
        const status = error.code === 'P2025' || error.message === 'COMMERCIAL_NOT_FOUND' ? 404 : 400;
        res.status(status).json({ message: 'error', error: error.message });
    }
};

export const deleteCommercial = async (req, res) => {
    try {
        await commercialService.deleteCommercial(req.params.id);
        res.json({ message: 'success' });
    } catch (error) {
        console.error('Error in deleteCommercial:', error);
        const status = error.code === 'P2025' ? 404 : 500;
        res.status(status).json({ message: 'error', error: error.message });
    }
};
