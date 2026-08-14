import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import { Navigation } from '../../app/components/Navigation';
import Root from '../../app/pages/Root';

// Set up a dynamic mock for useApp
let mockUser: any = null;
const mockLogout = vi.fn();

vi.mock('../../app/context/AppContext', () => ({
    useApp: () => ({
        currentUser: mockUser,
        logout: mockLogout,
        isLoadingSession: false,
    }),
    // Wrap Provider so child components invoke our mocked useApp
    AppProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Navigation & Route Authorization', () => {
    beforeEach(() => {
        mockLogout.mockClear();
    });

    describe('Navigation Sidebar - Role base menu items rendering', () => {
        it('returns null if no user logged in', () => {
            mockUser = null;
            const { container } = render(
                <MemoryRouter>
                    <Navigation isCollapsed={false} setIsCollapsed={(() => { })} isMobileOpen={false} setIsMobileOpen={(() => { })} />
                </MemoryRouter>
            );
            expect(container.firstChild).toBeNull();
        });

        it('renders receptionist navigation lists correctly (excludes Dashboard, includes Prospects)', () => {
            mockUser = {
                name: 'Alice',
                role: 'agent_reception',
                permissions: ['view_prospects'],
            };

            render(
                <MemoryRouter>
                    <Navigation isCollapsed={false} setIsCollapsed={(() => { })} isMobileOpen={false} setIsMobileOpen={(() => { })} />
                </MemoryRouter>
            );

            // Receptionist has no Dashboard link
            expect(screen.queryByText(/tableau de bord/i)).toBeNull();

            // Receptionist has Prospects link
            expect(screen.getByText(/prospects/i)).toBeInTheDocument();
            // But no Administration link
            expect(screen.queryByText(/administration/i)).toBeNull();
        });

        it('renders admin navigation lists correctly (includes Dashboard and Administration)', () => {
            mockUser = {
                name: 'Bob Admin',
                role: 'admin',
                permissions: ['view_prospects', 'manage_roles', 'view_candidates'],
            };

            render(
                <MemoryRouter>
                    <Navigation isCollapsed={false} setIsCollapsed={(() => { })} isMobileOpen={false} setIsMobileOpen={(() => { })} />
                </MemoryRouter>
            );

            expect(screen.getByText(/tableau de bord/i)).toBeInTheDocument();
            expect(screen.getByText(/prospects/i)).toBeInTheDocument();
            expect(screen.getAllByText(/administration/i).length).toBeGreaterThan(0);
        });
    });

    describe('Root Route Level Access Control', () => {
        it('renders child pages when user is authorized', () => {
            mockUser = {
                name: 'Admin User',
                role: 'admin',
                permissions: ['manage_roles'],
            };

            render(
                <MemoryRouter initialEntries={['/admin-roles']}>
                    <Root />
                </MemoryRouter>
            );

            // Should not present unauthorized shield box
            expect(screen.queryByText(/accès non autorisé/i)).toBeNull();
        });

        it('denies access (shows warning) when user is unauthorized', () => {
            mockUser = {
                name: 'Nancy Reception',
                role: 'agent_reception',
                permissions: ['view_prospects'], // no manage_roles permission
            };

            render(
                <MemoryRouter initialEntries={['/admin-roles']}>
                    <Root />
                </MemoryRouter>
            );

            expect(screen.getByText(/accès non autorisé/i)).toBeInTheDocument();
            expect(screen.getAllByText(/Nancy Reception/).length).toBeGreaterThan(0);
            expect(screen.getByRole('button', { name: /retour/i })).toBeInTheDocument();
        });
    });
});
