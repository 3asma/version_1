import { Outlet, useNavigate, useLocation } from 'react-router';
import { useEffect } from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { Navigation } from '../components/Navigation';

function RootContent() {
  const { currentUser, isLoadingSession } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoadingSession) return;

    if (!currentUser && location.pathname !== '/') {
      navigate('/');
    } else if (currentUser && location.pathname === '/') {
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

  return (
    <div className="min-h-screen bg-white">
      {currentUser && <Navigation />}
      <main className={currentUser ? 'ml-72' : ''}>
        <Outlet />
      </main>
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
