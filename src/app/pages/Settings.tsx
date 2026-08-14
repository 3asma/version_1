import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { User, Lock, Mail, ShieldAlert, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function Settings() {
    const { currentUser, logout } = useApp();

    // Profile name state
    const [name, setName] = useState(currentUser?.name || '');
    const [profileSuccess, setProfileSuccess] = useState('');
    const [profileError, setProfileError] = useState('');
    const [profileLoading, setProfileLoading] = useState(false);

    // Password state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileSuccess('');
        setProfileError('');
        setProfileLoading(true);

        try {
            const response = await api.put('/auth/update-profile', { name });
            if (response.data.message === 'success') {
                setProfileSuccess('Informations personnelles mises à jour avec succès! Vos modifications seront visibles lors de votre prochaine session ou après actualisation.');
                // Update current user locally if needed
                if (currentUser) {
                    currentUser.name = name;
                }
            } else {
                setProfileError(response.data.error || 'Une erreur est survenue.');
            }
        } catch (err: any) {
            setProfileError(err.response?.data?.error || 'Une erreur est survenue lors de la communication avec le serveur.');
        } finally {
            setProfileLoading(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordSuccess('');
        setPasswordError('');

        if (newPassword.length < 6) {
            setPasswordError('Le nouveau mot de passe doit comporter au moins 6 caractères.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('Les mots de passe ne correspondent pas.');
            return;
        }

        setPasswordLoading(true);

        try {
            const response = await api.put('/auth/change-password', {
                currentPassword,
                newPassword
            });

            if (response.data.message === 'success') {
                setPasswordSuccess('Votre mot de passe a été modifié avec succès.');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setPasswordError(response.data.error || 'Erreur lors du changement de mot de passe.');
            }
        } catch (err: any) {
            setPasswordError(err.response?.data?.error || 'Erreur lors du changement de mot de passe.');
        } finally {
            setPasswordLoading(false);
        }
    };

    const getRoleDisplayName = (role: string) => {
        const map: Record<string, string> = {
            admin: 'Administrateur',
            agent_reservation: 'Agent Réservation',
            agent_reception: 'Agent Réception',
            professor: 'Professeur',
            candidate: 'Candidat'
        };
        return map[role.toLowerCase()] || role;
    };

    const getRoleBadgeStyle = (role: string) => {
        const map: Record<string, string> = {
            admin: 'bg-red-50 text-red-700 border-red-200',
            agent_reservation: 'bg-blue-50 text-blue-700 border-blue-200',
            agent_reception: 'bg-green-50 text-green-700 border-green-200',
            professor: 'bg-purple-50 text-purple-700 border-purple-200',
            candidate: 'bg-yellow-50 text-yellow-700 border-yellow-200'
        };
        return map[role.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200';
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-5xl space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Paramètres du compte</h1>
                    <p className="text-gray-500 mt-1">Gérez vos informations personnelles et sécurisez votre compte.</p>
                </div>
                <Button
                    variant="outline"
                    onClick={logout}
                    className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-11 self-start md:self-center transition-colors duration-200"
                >
                    <LogOut size={16} />
                    Se déconnecter
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Info Box */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="shadow-sm border border-gray-200 overflow-hidden">
                        <CardHeader className="bg-gray-50/50 pb-6 text-center border-b border-gray-100">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md shadow-gray-200 border-4 border-white">
                                    {currentUser?.name?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            </div>
                            <CardTitle className="text-xl font-bold text-gray-900 truncate">
                                {currentUser?.name || 'Utilisateur'}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 truncate mt-1">
                                {currentUser?.email}
                            </CardDescription>
                            <div className="mt-3 flex justify-center">
                                <Badge className={`${getRoleBadgeStyle(currentUser?.role || 'candidate')} px-3 py-1 font-semibold text-xs border rounded-full`}>
                                    {getRoleDisplayName(currentUser?.role || 'candidate')}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4 text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-gray-400 shrink-0" />
                                <span className="truncate">{currentUser?.email}</span>
                            </div>
                            {currentUser?.createdAt && (
                                <div className="flex items-center gap-3">
                                    <User size={16} className="text-gray-400 shrink-0" />
                                    <span>Membre depuis le : {new Date(currentUser.createdAt).toLocaleDateString('fr-FR')}</span>
                                </div>
                            )}
                            <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 flex items-start gap-2">
                                <ShieldAlert size={14} className="text-gray-400 shrink-0 mt-0.5" />
                                <span>Pour modifier votre adresse e-mail ou votre rôle, veuillez contacter l'administrateur du système.</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Forms */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Personal Info Form */}
                    <Card className="shadow-sm border border-gray-200">
                        <CardHeader className="border-b border-gray-100 pb-4">
                            <CardTitle className="text-lg font-bold text-gray-900">Informations personnelles</CardTitle>
                            <CardDescription className="text-sm text-gray-500 mt-1">Modifier les informations de profil public de votre compte.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="profile-name" className="text-sm font-semibold text-gray-700">Nom complet</Label>
                                    <Input
                                        id="profile-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Votre nom complet"
                                        className="h-11 rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                        required
                                    />
                                </div>

                                <div className="space-y-2 opacity-75">
                                    <Label className="text-sm font-semibold text-gray-400">Adresse e-mail (Non modifiable)</Label>
                                    <Input
                                        value={currentUser?.email || ''}
                                        disabled
                                        className="h-11 rounded-lg bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                                    />
                                </div>

                                {profileSuccess && (
                                    <div className="text-sm text-green-700 bg-green-50 p-4 rounded-lg border border-green-200 flex items-start gap-2.5">
                                        <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>{profileSuccess}</span>
                                    </div>
                                )}

                                {profileError && (
                                    <div className="text-sm text-red-700 bg-red-50 p-4 rounded-lg border border-red-200 flex items-start gap-2.5">
                                        <AlertCircle size={16} className="text-red-600 mt-0.5 shrink-0" />
                                        <span>{profileError}</span>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={profileLoading}
                                    className="bg-gray-900 hover:bg-gray-800 text-white h-11 px-6 rounded-lg transition-all duration-200 font-semibold"
                                >
                                    {profileLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Change Password Form */}
                    <Card className="shadow-sm border border-gray-200">
                        <CardHeader className="border-b border-gray-100 pb-4">
                            <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Lock size={18} className="text-gray-400" />
                                Sécurité &amp; Mot de passe
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 mt-1">Mettez à jour votre mot de passe régulièrement pour protéger votre compte.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleChangePassword} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password" className="text-sm font-semibold text-gray-700">Mot de passe actuel</Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Entrez votre mot de passe actuel"
                                        className="h-11 rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password" className="text-sm font-semibold text-gray-700">Nouveau mot de passe</Label>
                                        <Input
                                            id="new-password"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Min. 6 caractères"
                                            className="h-11 rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password" className="text-sm font-semibold text-gray-700">Confirmer le nouveau mot de passe</Label>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirmez le nouveau mot de passe"
                                            className="h-11 rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                            required
                                        />
                                    </div>
                                </div>

                                {passwordSuccess && (
                                    <div className="text-sm text-green-700 bg-green-50 p-4 rounded-lg border border-green-200 flex items-start gap-2.5">
                                        <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>{passwordSuccess}</span>
                                    </div>
                                )}

                                {passwordError && (
                                    <div className="text-sm text-red-700 bg-red-50 p-4 rounded-lg border border-red-200 flex items-start gap-2.5">
                                        <AlertCircle size={16} className="text-red-600 mt-0.5 shrink-0" />
                                        <span>{passwordError}</span>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={passwordLoading}
                                    className="bg-gray-900 hover:bg-gray-800 text-white h-11 px-6 rounded-lg transition-all duration-200 font-semibold"
                                >
                                    {passwordLoading ? 'Modification...' : 'Modifier le mot de passe'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
