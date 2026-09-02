import prisma from '../config/prisma.js';

class RoomService {
    normalizeData(data) {
        const n = {};

        let rawNumero = data.numero || data.roomNumber;
        let rawCapacite = data.capacite !== undefined ? data.capacite : data.capacity;

        if (rawNumero !== undefined && rawNumero !== null) {
            n.numero = String(rawNumero).trim();
        }
        if (rawCapacite !== undefined && rawCapacite !== null) {
            n.capacite = parseInt(rawCapacite);
        }
        return n;
    }

    validateData(data, isUpdate = false) {
        const { numero, capacite } = data;

        if (!isUpdate) {
            if (!numero || numero.trim() === '') throw new Error('NUMERO_REQUIRED');
            if (capacite === undefined || capacite === null) throw new Error('CAPACITE_REQUIRED');
        } else {
            if (numero !== undefined && numero.trim() === '') throw new Error('NUMERO_REQUIRED');
        }

        if (capacite !== undefined) {
            if (isNaN(capacite) || capacite <= 0) {
                throw new Error('INVALID_CAPACITE');
            }
        }
    }

    async getAllRooms() {
        return await prisma.room.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getRoomById(id) {
        return await prisma.room.findUnique({ where: { id } });
    }

    async createRoom(data) {
        const normalized = this.normalizeData(data);
        this.validateData(normalized);

        // Check for duplicate room number
        const existing = await prisma.room.findUnique({ where: { numero: normalized.numero } });
        if (existing) throw new Error('DUPLICATE_ROOM_NUMBER');

        return await prisma.room.create({
            data: normalized
        });
    }

    async updateRoom(id, data) {
        const normalized = this.normalizeData(data);
        this.validateData(normalized, true);

        if (normalized.numero) {
            const existing = await prisma.room.findUnique({ where: { numero: normalized.numero } });
            if (existing && existing.id !== id) throw new Error('DUPLICATE_ROOM_NUMBER');
        }

        return await prisma.room.update({
            where: { id },
            data: normalized
        });
    }

    async deleteRoom(id) {
        return await prisma.room.delete({ where: { id } });
    }
}

export default new RoomService();
