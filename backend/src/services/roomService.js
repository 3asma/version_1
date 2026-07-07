import prisma from '../config/prisma.js';

class RoomService {
    normalizeData(data) {
        const n = { ...data };
        if (n.numero) n.numero = n.numero.trim().toUpperCase();
        if (n.roomNumber) {
            n.numero = n.roomNumber.trim().toUpperCase();
            delete n.roomNumber;
        }
        if (n.description) n.description = n.description.trim();
        if (n.type) n.type = n.type.trim();
        return n;
    }

    validateData(data, isUpdate = false) {
        const { numero, capacite, capacity } = data;

        const actualCapacite = capacite !== undefined ? capacite : capacity;

        if (!isUpdate) {
            if (!numero || numero.trim() === '') throw new Error('NUMERO_REQUIRED');
            if (actualCapacite === undefined || actualCapacite === null) throw new Error('CAPACITE_REQUIRED');
        } else {
            if (numero !== undefined && numero.trim() === '') throw new Error('NUMERO_REQUIRED');
        }

        if (actualCapacite !== undefined && parseInt(actualCapacite) <= 0) {
            throw new Error('INVALID_CAPACITE');
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

        const capacite = normalized.capacite !== undefined ? normalized.capacite : normalized.capacity;

        return await prisma.room.create({
            data: {
                numero: normalized.numero,
                capacite: parseInt(capacite),
                type: normalized.type || 'Individuel',
                available: normalized.available !== undefined ? normalized.available : true,
                description: normalized.description || ''
            }
        });
    }

    async updateRoom(id, data) {
        const normalized = this.normalizeData(data);
        this.validateData(normalized, true);

        if (normalized.numero) {
            const existing = await prisma.room.findUnique({ where: { numero: normalized.numero } });
            if (existing && existing.id !== id) throw new Error('DUPLICATE_ROOM_NUMBER');
        }

        const updateData = { ...normalized };
        if (updateData.capacite !== undefined) updateData.capacite = parseInt(updateData.capacite);
        if (updateData.capacity !== undefined) {
            updateData.capacite = parseInt(updateData.capacity);
            delete updateData.capacity;
        }

        return await prisma.room.update({
            where: { id },
            data: updateData
        });
    }

    async deleteRoom(id) {
        return await prisma.room.delete({ where: { id } });
    }
}

export default new RoomService();
