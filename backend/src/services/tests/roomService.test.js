import { describe, it, expect } from 'vitest';
import roomService from '../roomService.js';

describe('RoomService - normalizeData', () => {
    it('should normalize room number and capacity correctly with French fields', () => {
        const input = { numero: '  a101 ', capacite: '30' };
        const normalized = roomService.normalizeData(input);
        expect(normalized).toEqual({ numero: 'A101', capacite: 30 });
    });

    it('should normalize room number and capacity correctly with English fields', () => {
        const input = { roomNumber: '  b202 ', capacity: 15 };
        const normalized = roomService.normalizeData(input);
        expect(normalized).toEqual({ numero: 'B202', capacite: 15 });
    });

    it('should ignore undefined and null values but process valid keys', () => {
        const input = { numero: null, capacite: undefined };
        const normalized = roomService.normalizeData(input);
        expect(normalized).toEqual({});
    });
});

describe('RoomService - validateData', () => {
    describe('creation mode (isUpdate = false)', () => {
        it('should pass with valid object', () => {
            const valid = { numero: 'A101', capacite: 20 };
            expect(() => roomService.validateData(valid, false)).not.toThrow();
        });

        it('should throw NUMERO_REQUIRED if room number is missing or empty', () => {
            expect(() => roomService.validateData({ capacite: 20 }, false)).toThrow('NUMERO_REQUIRED');
            expect(() => roomService.validateData({ numero: '   ', capacite: 20 }, false)).toThrow('NUMERO_REQUIRED');
        });

        it('should throw CAPACITE_REQUIRED if capacity is missing', () => {
            expect(() => roomService.validateData({ numero: 'A101' }, false)).toThrow('CAPACITE_REQUIRED');
        });
    });

    describe('update mode (isUpdate = true)', () => {
        it('should pass with partial valid fields', () => {
            expect(() => roomService.validateData({ numero: 'A102' }, true)).not.toThrow();
            expect(() => roomService.validateData({ capacite: 25 }, true)).not.toThrow();
        });

        it('should throw NUMERO_REQUIRED if room number is empty string', () => {
            expect(() => roomService.validateData({ numero: '' }, true)).toThrow('NUMERO_REQUIRED');
        });
    });

    describe('capacity validation common rules', () => {
        it('should throw INVALID_CAPACITE if capacity is non-numeric or <= 0', () => {
            expect(() => roomService.validateData({ numero: 'A101', capacite: 0 }, false)).toThrow('INVALID_CAPACITE');
            expect(() => roomService.validateData({ numero: 'A101', capacite: -5 }, false)).toThrow('INVALID_CAPACITE');
            expect(() => roomService.validateData({ numero: 'A101', capacite: NaN }, false)).toThrow('INVALID_CAPACITE');
        });
    });
});
