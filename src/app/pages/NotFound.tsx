import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mt-4">Page non trouvée</h2>
        <p className="text-gray-500 mt-2 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/dashboard">
          <Button>
            <Home size={18} className="mr-2" />
            Retour au tableau de bord
          </Button>
        </Link>
      </div>
    </div>
  );
}
