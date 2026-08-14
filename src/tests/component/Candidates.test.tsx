import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Candidates from '../../app/pages/Candidates';

// Dummy implementation of exportPDF to prevent failures during import
vi.mock('../../app/services/api', () => ({
    exportPDF: vi.fn(),
}));

const mockCandidates = [
    {
        id: 'c1',
        candidateCode: 'CAND001',
        firstName: 'Tariq',
        lastName: 'Ait',
        age: 23,
        occupation: 'student',
        observation: 'alone',
        status: 'ACTIVE',
        membershipNumber: 'ADH-101',
        gender: 'MALE',
        registrationDate: '2026-01-01',
        formationId: 'f1',
    },
    {
        id: 'c2',
        candidateCode: 'CAND002',
        firstName: 'Fatima',
        lastName: 'Zahra',
        age: 26,
        occupation: 'employee',
        observation: 'accompanied',
        status: 'ACTIVE',
        membershipNumber: 'ADH-102',
        gender: 'FEMALE',
        registrationDate: '2026-02-01',
        formationId: 'f2',
    }
];

const mockFormations = [
    { id: 'f1', subject: 'Maths', level: 'Terminale', type: 'regular' },
    { id: 'f2', subject: 'Physics', level: 'Terminale', type: 'regular' }
];

const mockInscriptions: any[] = [];
const mockCommercials: any[] = [];

// Mock other dependencies
vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    }
}));

// Mock dynamic context values
vi.mock('../../app/context/AppContext', () => ({
    useApp: () => ({
        currentUser: { role: 'admin' },
        candidates: mockCandidates,
        inscriptions: mockInscriptions,
        formations: mockFormations,
        commercials: mockCommercials,
        addCandidate: vi.fn(),
        updateCandidate: vi.fn(),
        deleteCandidate: vi.fn(),
        deleteInscription: vi.fn(),
    }),
}));

describe('Candidates Page - Search Functionality', () => {
    it('renders search input and title', () => {
        render(<Candidates />);
        expect(screen.getByRole('heading', { name: /gestion des candidats/i, level: 1 })).toBeInTheDocument();
        expect(screen.getByLabelText(/rechercher un candidat par code/i)).toBeInTheDocument();
    });

    it('performs nominal search (finding candidate case-sensitively)', () => {
        render(<Candidates />);

        const searchInput = screen.getByLabelText(/rechercher un candidat par code/i);
        const searchBtn = screen.getByRole('button', { name: /rechercher/i });

        // Search Tariq
        fireEvent.change(searchInput, { target: { value: 'CAND001' } });
        fireEvent.click(searchBtn);

        // Verify search result panel is rendered
        expect(screen.getByRole('heading', { name: /résultat de la recherche/i })).toBeInTheDocument();

        // Find Tariq within the search result card only to avoid duplicates from the table
        const resultCard = screen.getByRole('heading', { name: /résultat de la recherche/i }).closest('div');
        expect(within(resultCard!).getByText('Tariq Ait')).toBeInTheDocument();
        expect(within(resultCard!).getByText('ADH-101')).toBeInTheDocument();
    });

    it('runs case-insensitive search matching candidates correctly', () => {
        render(<Candidates />);

        const searchInput = screen.getByLabelText(/rechercher un candidat par code/i);
        const searchBtn = screen.getByRole('button', { name: /rechercher/i });

        // Search Fatima using lowercase
        fireEvent.change(searchInput, { target: { value: 'cand002' } });
        fireEvent.click(searchBtn);

        // Result should show Fatima within search result card
        const resultCard = screen.getByRole('heading', { name: /résultat de la recherche/i }).closest('div');
        expect(within(resultCard!).getByText('Fatima Zahra')).toBeInTheDocument();
    });

    it('renders an error block if no candidate matches code input', () => {
        render(<Candidates />);

        const searchInput = screen.getByLabelText(/rechercher un candidat par code/i);
        const searchBtn = screen.getByRole('button', { name: /rechercher/i });

        fireEvent.change(searchInput, { target: { value: 'CAND999' } });
        fireEvent.click(searchBtn);

        // Verify error notification text is printed on screen
        expect(screen.getByText(/aucun candidat trouvé avec le code "CAND999"/i)).toBeInTheDocument();
    });
});
