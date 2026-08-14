import { describe, it, expect } from 'vitest';
import formationService from '../formationService.js';

describe('FormationService - normalizeData', () => {
    it('should normalize inputs correctly with French fields', () => {
        const input = { matiere: ' Mathématiques ', niveau: ' Terminale ' };
        const normalized = formationService.normalizeData(input);
        expect(normalized).toEqual({ matiere: 'Mathématiques', niveau: 'Terminale' });
    });

    it('should normalize inputs correctly with English fields', () => {
        const input = { subject: ' Science ', level: ' Grade 10 ' };
        const normalized = formationService.normalizeData(input);
        expect(normalized).toEqual({ matiere: 'Science', niveau: 'Grade 10' });
    });

    it('should return empty object if values are null or undefined', () => {
        const input = { matiere: null, level: undefined };
        const normalized = formationService.normalizeData(input);
        expect(normalized).toEqual({});
    });
});

describe('FormationService - validateData', () => {
    describe('creation mode (isUpdate = false)', () => {
        it('should pass with valid data', () => {
            const valid = { matiere: 'Physique', niveau: 'Première' };
            expect(() => formationService.validateData(valid, false)).not.toThrow();
        });

        it('should throw MATIERE_REQUIRED if subject is empty or missing', () => {
            expect(() => formationService.validateData({ niveau: 'Première' }, false)).toThrow('MATIERE_REQUIRED');
            expect(() => formationService.validateData({ matiere: '  ', niveau: 'Première' }, false)).toThrow('MATIERE_REQUIRED');
        });

        it('should throw NIVEAU_REQUIRED if level is empty or missing', () => {
            expect(() => formationService.validateData({ matiere: 'Physique' }, false)).toThrow('NIVEAU_REQUIRED');
            expect(() => formationService.validateData({ matiere: 'Physique', niveau: ' ' }, false)).toThrow('NIVEAU_REQUIRED');
        });
    });

    describe('update mode (isUpdate = true)', () => {
        it('should pass with partial inputs', () => {
            expect(() => formationService.validateData({ matiere: 'Physique' }, true)).not.toThrow();
            expect(() => formationService.validateData({ niveau: 'Terminale' }, true)).not.toThrow();
        });

        it('should throw MATIERE_REQUIRED if matter is empty', () => {
            expect(() => formationService.validateData({ matiere: '' }, true)).toThrow('MATIERE_REQUIRED');
        });

        it('should throw NIVEAU_REQUIRED if level is empty', () => {
            expect(() => formationService.validateData({ niveau: '' }, true)).toThrow('NIVEAU_REQUIRED');
        });
    });
});
