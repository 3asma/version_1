import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { BookOpen, Mail, Lock, ChevronRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Spacer pour l'alignement */}
      <div className="hidden md:block h-6"></div>

      <div className="w-full max-w-md space-y-8 flex flex-col justify-center">
        {/* Identité visuelle */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105">
              <BookOpen size={32} className="text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              CPLI – Centre de Formation
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Système de gestion du centre de formation
            </p>
          </div>
        </div>

        {/* Accueil */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Bienvenue</h2>
          <p className="text-sm text-gray-550 mt-1.5 leading-relaxed">
            Connectez-vous pour accéder à votre espace de travail.
          </p>
        </div>

        {/* Carte du formulaire */}
        <Card className="shadow-xl border border-gray-200/80 rounded-2xl overflow-hidden bg-white">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  Adresse email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white"
                  required
                />
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Lock size={16} className="text-gray-400" />
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 pr-12 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-700 bg-red-50 p-4 rounded-xl border border-red-200/80 flex items-start gap-2.5">
                  <div className="w-2 h-2 bg-red-650 rounded-full mt-1.5 shrink-0"></div>
                  <span>{error}</span>
                </div>
              )}

              {/* Bouton de soumission */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold rounded-xl bg-gray-900 hover:bg-gray-800 text-white shadow-md transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
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

        {/* Accès sécurisé */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
          <ShieldCheck size={14} className="text-gray-400" />
          <span>Accès sécurisé à votre espace</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-gray-100 w-full max-w-sm">
        <p className="text-xs text-gray-400">
          © 2026 CPLI. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
