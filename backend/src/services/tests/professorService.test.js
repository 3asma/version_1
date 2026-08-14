import { describe, it, expect } from 'vitest';
import professorService from '../professorService.js';

describe('ProfessorService - normalizeData', () => {
    it('should filter out disallowed keys and normalize data fields correctly', () => {
        const input = {
            firstName: ' Jean-Pierre ',
            lastName: ' dupont ',
            email: ' DUPONT@Example.COM  ',
            phone: ' 0612345678 ',
            address: ' 123 Rue de la Paix ',
            type: ' vacataire ',
            dayOff: ' Friday ',
            maxSessions: '15',
            invalidKey: 'shouldToBeRemoved'
        };

        const normalized = professorService.normalizeData(input);
        expect(normalized).toEqual({
            prenom: 'Jean-Pierre',
            nom: 'dupont',
            email: 'dupont@example.com',
            telephone: '0612345678',
            adresse: '123 Rue de la Paix',
            type: 'vacataire',
            dayOff: 'Friday',
            maxSessions: 15
        });
    });

    it('should handle French keys (nom, prenom, telephone, adresse) properly', () => {
        const input = {
            nom: ' Durand ',
            prenom: ' Marc ',
            telephone: ' 0712345678 ',
            adresse: ' 456 Avenue des Champs '
        };

        const normalized = professorService.normalizeData(input);
        expect(normalized).toEqual({
            nom: 'Durand',
            prenom: 'Marc',
            telephone: '0712345678',
            adresse: '456 Avenue des Champs'
        });
    });
});

describe('ProfessorService - validateData', () => {
    describe('creation mode (isUpdate = false)', () => {
        it('should validate successfully with correct fields', () => {
            const valid = { nom: 'Durand', prenom: 'Marc', email: 'd.marc@test.com' };
            expect(() => professorService.validateData(valid, false)).not.toThrow();
        });

        it('should throw NOM_REQUIRED if nom is missing or empty', () => {
            expect(() => professorService.validateData({ prenom: 'Marc' }, false)).toThrow('NOM_REQUIRED');
            expect(() => professorService.validateData({ nom: '', prenom: 'Marc' }, false)).toThrow('NOM_REQUIRED');
        });

        it('should throw PRENOM_REQUIRED if prenom is missing or empty', () => {
            expect(() => professorService.validateData({ nom: 'Durand' }, false)).toThrow('PRENOM_REQUIRED');
            expect(() => professorService.validateData({ nom: 'Durand', prenom: '' }, false)).toThrow('PRENOM_REQUIRED');
        });
    });

    describe('update mode (isUpdate = true)', () => {
        it('should pass with missing name/prenom', () => {
            expect(() => professorService.validateData({ email: 'marc@example.com' }, true)).not.toThrow();
        });

        it('should throw NOM_REQUIRED if updated to empty', () => {
            expect(() => professorService.validateData({ nom: '' }, true)).toThrow('NOM_REQUIRED');
        });

        it('should throw PRENOM_REQUIRED if updated to empty', () => {
            expect(() => professorService.validateData({ prenom: '' }, true)).toThrow('PRENOM_REQUIRED');
        });
    });

    describe('email validation rules', () => {
        it('should throw INVALID_EMAIL if email is not properly formatted', () => {
            expect(() => professorService.validateData({ nom: 'A', prenom: 'B', email: 'bad-email' }, false)).toThrow('INVALID_EMAIL');
            expect(() => professorService.validateData({ nom: 'A', prenom: 'B', email: '@bad' }, false)).toThrow('INVALID_EMAIL');
            expect(() => professorService.validateData({ nom: 'A', prenom: 'B', email: 'bad@' }, false)).toThrow('INVALID_EMAIL');
        });

        it('should not throw if email is valid or omitted entirely', () => {
            expect(() => professorService.validateData({ nom: 'A', prenom: 'B' }, false)).not.toThrow();
            expect(() => professorService.validateData({ nom: 'A', prenom: 'B', email: 'valid@example.com' }, false)).not.toThrow();
        });
    });
});
