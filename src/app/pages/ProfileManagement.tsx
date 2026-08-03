import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Users, Plus, Edit, Trash2, Search, CheckCircle, Shield, Mail, Power, AlertTriangle, Key } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { toast } from 'sonner';

export default function ProfileManagement() {
  const { currentUser, users, addUser, updateUser, deleteUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  // Dialog & Form States
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);

  const [editingUser, setEditingUser] = useState<any>(null);
  const [deletingUser, setDeletingUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'candidate',
    status: 'active' as 'active' | 'inactive'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'candidate',
      status: 'active'
    });
  };

  // Check permission
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-600 font-semibold">Accès refusé. Cette page est réservée aux administrateurs.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getRoleBadgeColor = (roleStr: string) => {
    switch (roleStr) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'agent_reservation':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'agent_reception':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'professor':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'candidate':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleLabel = (roleStr: string) => {
    switch (roleStr) {
      case 'admin':
        return 'Administrateur';
      case 'agent_reservation':
        return 'Agent de Réservation';
      case 'agent_reception':
        return 'Agent de Réception';
      case 'professor':
        return 'Professeur';
      case 'candidate':
        return 'Candidat';
      default:
        return roleStr;
    }
  };

  // Handlers
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role as any,
        status: formData.status
      });
      toast.success('Utilisateur créé avec succès');
      setIsOpenAdd(false);
      resetForm();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Erreur lors de la création de l'utilisateur");
    }
  };

  const handleEditClick = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '', // Blank by default, updated only if typed
      role: user.role,
      status: user.status || 'active'
    });
    setIsOpenEdit(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      const updates: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status
      };
      if (formData.password) {
        updates.password = formData.password;
      }
      await updateUser(editingUser.id, updates);
      toast.success('Utilisateur mis à jour avec succès');
      setIsOpenEdit(false);
      setEditingUser(null);
      resetForm();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Erreur lors de la mise à jour de l'utilisateur");
    }
  };

  const handleDeleteClick = (user: any) => {
    if (user.id === currentUser.id) {
      toast.error("Impossible de supprimer votre propre compte administrateur.");
      return;
    }
    setDeletingUser(user);
    setIsOpenDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingUser) return;
    try {
      await deleteUser(deletingUser.id);
      toast.success('Utilisateur supprimé avec succès');
      setIsOpenDeleteConfirm(false);
      setDeletingUser(null);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Erreur lors de la suppression de l'utilisateur");
    }
  };

  const handleToggleStatus = async (user: any) => {
    if (user.id === currentUser.id) {
      toast.error("Impossible de désactiver votre propre compte administrateur.");
      return;
    }
    const nextStatus = user.status === 'active' ? 'inactive' : 'active';
    try {
      await updateUser(user.id, { status: nextStatus });
      toast.success(`Compte ${nextStatus === 'active' ? 'réactivé' : 'désactivé'} avec succès`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Erreur lors du changement de statut");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const stats = [
    { label: 'Total utilisateurs', value: users.length, color: 'text-blue-600' },
    { label: 'Actifs', value: users.filter(u => u.status === 'active').length, color: 'text-green-600' },
    { label: 'Inactifs', value: users.filter(u => u.status === 'inactive').length, color: 'text-red-500' },
    { label: 'Administrateurs', value: users.filter(u => u.role === 'admin').length, color: 'text-purple-600' }
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="text-blue-600" size={32} />
            Gestion des profils
          </h1>
          <p className="text-gray-500 mt-2">Gestion des utilisateurs, des accès et des rôles système</p>
        </div>
        <Button onClick={() => { resetForm(); setIsOpenAdd(true); }} className="shadow-md">
          <Plus size={20} className="mr-2" />
          Nouvel utilisateur
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              <div className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters Toolbar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Tous les rôles</option>
              <option value="admin">Administrateur</option>
              <option value="agent_reservation">Agent de Réservation</option>
              <option value="agent_reception">Agent de Réception</option>
              <option value="professor">Professeur</option>
              <option value="candidate">Candidat</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Users size={20} className="text-gray-600" />
            Liste des utilisateurs ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 text-sm font-semibold">
                  <th className="py-3 px-4">Nom</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Rôle</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4">Date création</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-gray-900">{user.name}</td>
                    <td className="py-4 px-4 text-gray-600">{user.email}</td>
                    <td className="py-4 px-4">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {getRoleLabel(user.role)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={user.status === 'active' ? 'bg-green-150 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}>
                        {user.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleStatus(user)}
                          title={user.status === 'active' ? 'Désactiver le compte' : 'Activer le compte'}
                        >
                          <Power className={`h-4 w-4 ${user.status === 'active' ? 'text-red-500' : 'text-green-500'}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(user)}
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(user)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400">
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog for Adding User */}
      <Dialog open={isOpenAdd} onOpenChange={setIsOpenAdd}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Users className="text-blue-600" size={24} />
              Ajouter un utilisateur
            </DialogTitle>
            <DialogDescription>
              Enregistrez un nouveau compte système avec des privilèges de rôle configurés.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4 pt-2">
            <div className="space-y-1">
              <Label htmlFor="add-name">Nom complet *</Label>
              <Input
                id="add-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Sophia Loren"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="add-email">Email *</Label>
              <Input
                id="add-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="sophia@formation.com"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="add-password">Mot de passe *</Label>
              <Input
                id="add-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="******"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="add-role">Rôle systême *</Label>
                <select
                  id="add-role"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="admin">Administrateur</option>
                  <option value="agent_reservation">Agent Réservation</option>
                  <option value="agent_reception">Agent Réception</option>
                  <option value="professor">Professeur</option>
                  <option value="candidate">Candidat</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="add-status">Statut de compte *</Label>
                <select
                  id="add-status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpenAdd(false)}>Annuler</Button>
              <Button type="submit">Créer le compte</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for Editing User */}
      <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Edit className="text-blue-600" size={24} />
              Modifier l'utilisateur
            </DialogTitle>
            <DialogDescription>
              Mettez à jour les privilèges ou modifiez le statut du compte {editingUser?.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 pt-2">
            <div className="space-y-1">
              <Label htmlFor="edit-name">Nom complet *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-password">Changer le mot de passe (optionnel)</Label>
              <Input
                id="edit-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Remplir pour changer, sinon vide"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="edit-role">Rôle systême *</Label>
                <select
                  id="edit-role"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="admin">Administrateur</option>
                  <option value="agent_reservation">Agent Réservation</option>
                  <option value="agent_reception">Agent Réception</option>
                  <option value="professor">Professeur</option>
                  <option value="candidate">Candidat</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-status">Statut de compte *</Label>
                <select
                  id="edit-status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpenEdit(false)}>Annuler</Button>
              <Button type="submit">Enregistrer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={isOpenDeleteConfirm} onOpenChange={setIsOpenDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600 font-bold">
              <AlertTriangle size={24} />
              Confirmer la suppression
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le compte de <strong>{deletingUser?.name}</strong> ({deletingUser?.email}) ?
              <br />
              Cette action est irréversible et supprimera le compte utilisateur définitivement du système.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpenDeleteConfirm(false)}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-650 hover:bg-red-700 bg-red-600 text-white">
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
