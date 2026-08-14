import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../../app/pages/Login';

// Mock useNavigate and useLocation
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
    useNavigate: () => mockNavigate,
}));

// Mock useApp context hook
const mockLogin = vi.fn();
vi.mock('../../app/context/AppContext', () => ({
    useApp: () => ({
        login: mockLogin,
    }),
}));

describe('Login Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockLogin.mockClear();
    });

    it('renders email and password inputs and the submit button', () => {
        render(<Login />);

        expect(screen.getByLabelText(/adresse email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
    });

    it('allows user to enter email and password', () => {
        render(<Login />);

        const emailInput = screen.getByLabelText(/adresse email/i);
        const passwordInput = screen.getByLabelText(/mot de passe/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    });

    it('handles successful login submission and navigates to dashboard', async () => {
        mockLogin.mockResolvedValue(true);

        render(<Login />);

        const emailInput = screen.getByLabelText(/adresse email/i);
        const passwordInput = screen.getByLabelText(/mot de passe/i);
        const submitButton = screen.getByRole('button', { name: /se connecter/i });

        fireEvent.change(emailInput, { target: { value: 'admin@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'correct-pass' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('admin@test.com', 'correct-pass');
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        }, { timeout: 2000 });
    });

    it('handles login failure and shows an error message', async () => {
        mockLogin.mockResolvedValue(false);

        render(<Login />);

        const emailInput = screen.getByLabelText(/adresse email/i);
        const passwordInput = screen.getByLabelText(/mot de passe/i);
        const submitButton = screen.getByRole('button', { name: /se connecter/i });

        fireEvent.change(emailInput, { target: { value: 'wrong@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrong-pass' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('wrong@test.com', 'wrong-pass');
        }, { timeout: 2000 });

        const errorMsg = await screen.findByText('Email ou mot de passe incorrect');
        expect(errorMsg).toBeInTheDocument();
    });
});
