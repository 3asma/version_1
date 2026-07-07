import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { BookOpen, Mail, Lock, ChevronRight, Shield, Users, GraduationCap, UserCircle, Sparkles } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = await login(email, password);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Email ou mot de passe incorrect');
    }

    setLoading(false);
  };

  const quickLogin = (userEmail: string, role: string) => {
    setEmail(userEmail);
    setPassword('demo');
  };

  const demoAccounts = [
    { email: 'admin@formation.com', role: 'Administrateur', icon: Shield, color: 'bg-gray-100 text-gray-800 border-gray-200' },
    { email: 'reservation@formation.com', role: 'Agent Réservation', icon: Users, color: 'bg-gray-100 text-gray-800 border-gray-200' },
    { email: 'reception@formation.com', role: 'Agent Réception', icon: UserCircle, color: 'bg-gray-100 text-gray-800 border-gray-200' },
    { email: 'prof@formation.com', role: 'Professeur', icon: GraduationCap, color: 'bg-gray-100 text-gray-800 border-gray-200' },
    { email: 'candidat@formation.com', role: 'Candidat', icon: Users, color: 'bg-gray-100 text-gray-800 border-gray-200' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-8 space-y-10">
        {/* Logo centré */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Centre Formation</h1>
          <p className="text-gray-500 mt-2">Système de gestion moderne</p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Bienvenue</h2>
          <p className="text-gray-600 mt-2">Connectez-vous pour accéder à votre espace</p>
        </div>

        <Card className="shadow-2xl border border-gray-200">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  Adresse email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock size={16} className="text-gray-400" />
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  required
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-4 rounded-lg border border-red-200 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold rounded-lg bg-gray-900 hover:bg-gray-800 text-white shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connexion...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Se connecter
                    <ChevronRight size={18} />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="bg-gray-50 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base text-gray-900">Comptes de démonstration</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Cliquez sur un compte pour vous connecter rapidement
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {demoAccounts.map((account) => {
              const Icon = account.icon;
              return (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => quickLogin(account.email, account.role)}
                  className="flex items-center gap-3 p-4 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-200 hover:shadow-md group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Icon size={20} className="text-gray-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{account.role}</p>
                    <Badge className={`${account.color} text-xs mt-1`}>
                      Démo
                    </Badge>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500">
          © 2026 Centre de Formation. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
