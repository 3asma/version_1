import { Outlet, useNavigate, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { Navigation } from '../components/Navigation';
import { Shield, Menu } from 'lucide-react';

const KNOWN_ROUTES = [
  '/prospects',
  '/candidates',
  '/professors',
  '/rooms',
  '/formations',
  '/commercials',
  '/payments',
  '/reservations',
  '/planning',
  '/inscriptions',
  '/candidate-reservations',
  '/attendance',
  '/statistics',
  '/role-management',
  '/profile-management',
  '/admin-roles',
  '/settings'
];

const ROUTE_REQUIRED_PERMISSIONS: Record<string, string[]> = {
  '/dashboard': [],
  '/settings': [],
  '/prospects': ['view_prospects'],
  '/candidates': ['view_candidates'],
  '/professors': ['view_professors'],
  '/rooms': ['view_formations'],
  '/formations': ['view_formations'],
  '/commercials': ['manage_users'],
  '/payments': ['view_payments'],
  '/reservations': ['view_reservations'],
  '/planning': ['view_reservations', 'view_own_schedule', 'view_prospects'],
  '/inscriptions': ['view_candidates'],
  '/candidate-reservations': ['view_own_reservations'],
  '/attendance': ['manage_attendance'],
  '/statistics': ['view_statistics'],
  '/role-management': ['manage_roles'],
  '/profile-management': ['manage_users'],
  '/admin-roles': ['manage_roles']
};

function RootContent() {
  const { currentUser, isLoadingSession } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Refermer la sidebar mobile lors du changement de page
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isLoadingSession) return;

    if (!currentUser && location.pathname !== '/') {
      navigate('/');
    } else if (currentUser && location.pathname === '/') {
      // If we are agent_reception, redirecting to prospects is more aligned with no dashboard link, 
      // but they are allowed to view the dashboard page if needed. Let's keep /dashboard as default start.
      navigate('/dashboard');
    }
  }, [currentUser, location.pathname, navigate, isLoadingSession]);

  if (isLoadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const permissions = currentUser?.permissions || [];
  const isAuthorized =
    !currentUser ||
    !KNOWN_ROUTES.includes(location.pathname) ||
    location.pathname === '/dashboard' ||
    (location.pathname === '/inscriptions' && currentUser.role === 'agent_reception' ? false :
      location.pathname === '/reservations' && currentUser.role === 'professor' ? false :
        (ROUTE_REQUIRED_PERMISSIONS[location.pathname] &&
          (ROUTE_REQUIRED_PERMISSIONS[location.pathname].length === 0 ||
            ROUTE_REQUIRED_PERMISSIONS[location.pathname].some(p => permissions.includes(p)))));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {currentUser && (
        <Navigation
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      )}

      {currentUser && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {currentUser && (
          <div className="md:hidden flex h-14 items-center px-4 border-b border-gray-200 bg-white sticky top-0 z-30 justify-between shrink-0">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 -ml-2 text-gray-500 hover:bg-gray-150 hover:text-gray-900 rounded-xl transition-colors cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <span className="font-bold text-gray-900 text-sm">CPLI - Centre de Formation</span>
            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}

        <main className={`flex-1 min-h-screen bg-gray-50 transition-all duration-300 ${currentUser ? (isCollapsed ? 'md:ml-20 ml-0' : 'md:ml-72 ml-0') : ''}`}>
          {isAuthorized ? (
            <Outlet />
          ) : (
            <div className="p-8 flex items-center justify-center min-h-screen">
              <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-2xl border border-gray-200 shadow-xl">
                <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 border border-red-100 shadow-sm">
                  <Shield size={40} className="stroke-[1.5]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Accès non autorisé</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Votre compte ({currentUser.name}) ne dispose pas des permissions requises pour accéder à la page <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-650 font-mono text-sm font-semibold">{location.pathname}</code>.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      // Navigate receptionist to prospects since dashboard is hidden from their menu, or /dashboard if applicable
                      if (currentUser.role === 'agent_reception') {
                        navigate('/prospects');
                      } else {
                        navigate('/dashboard');
                      }
                    }}
                    className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
                  >
                    Retour
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function Root() {
  return (
    <AppProvider>
      <RootContent />
    </AppProvider>
  );
}
