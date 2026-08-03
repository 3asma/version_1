import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Shield, Plus, Pencil, Trash2, UserCog, CheckCircle, XCircle, Users, Settings, Lock, Eye, Calendar, BookOpen, DollarSign, BarChart } from 'lucide-react';
import { toast } from 'sonner';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'prospects' | 'candidates' | 'professors' | 'formations' | 'payments' | 'reservations' | 'statistics' | 'admin';
  icon: any;
}

interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  userCount: number;
  color: string;
}

export default function AdminRoles() {
  const { roles, updateRolePermissions, deleteRole } = useApp();

  const [permissions] = useState<Permission[]>([
    // Prospects
    { id: 'view_prospects', name: 'Voir les prospects', description: 'Consulter la liste des prospects', category: 'prospects', icon: Eye },
    { id: 'manage_prospects', name: 'Gérer les prospects', description: 'Ajouter, modifier, supprimer des prospects', category: 'prospects', icon: Users },

    // Candidates
    { id: 'view_candidates', name: 'Voir les candidats', description: 'Consulter la liste des candidats', category: 'candidates', icon: Eye },
    { id: 'manage_candidates', name: 'Gérer les candidats', description: 'Ajouter, modifier, supprimer des candidats', category: 'candidates', icon: Users },
    { id: 'transform_prospect', name: 'Transformer prospect', description: 'Transformer un prospect en candidat', category: 'candidates', icon: CheckCircle },

    // Professors
    { id: 'view_professors', name: 'Voir les professeurs', description: 'Consulter la liste des professeurs', category: 'professors', icon: Eye },
    { id: 'manage_professors', name: 'Gérer les professeurs', description: 'Ajouter, modifier, supprimer des professeurs', category: 'professors', icon: UserCog },

    // Formations
    { id: 'view_formations', name: 'Voir les formations', description: 'Consulter la liste des formations', category: 'formations', icon: Eye },
    { id: 'manage_formations', name: 'Gérer les formations', description: 'Ajouter, modifier, supprimer des formations', category: 'formations', icon: BookOpen },

    // Payments
    { id: 'view_payments', name: 'Voir les paiements', description: 'Consulter l\'historique des paiements', category: 'payments', icon: Eye },
    { id: 'manage_payments', name: 'Gérer les paiements', description: 'Enregistrer et valider les paiements', category: 'payments', icon: DollarSign },

    // Reservations
    { id: 'view_reservations', name: 'Voir les réservations', description: 'Consulter le planning des réservations', category: 'reservations', icon: Eye },
    { id: 'manage_reservations', name: 'Gérer les réservations', description: 'Créer, modifier, annuler des réservations', category: 'reservations', icon: Calendar },
    { id: 'manage_attendance', name: 'Gérer les présences', description: 'Marquer les présences et absences', category: 'reservations', icon: CheckCircle },

    // Statistics
    { id: 'view_statistics', name: 'Voir les statistiques', description: 'Accéder aux statistiques et rapports', category: 'statistics', icon: BarChart },

    // Admin
    { id: 'manage_roles', name: 'Gérer les rôles', description: 'Créer, modifier, supprimer des rôles', category: 'admin', icon: Shield },
    { id: 'manage_users', name: 'Gérer les utilisateurs', description: 'Gérer les comptes utilisateurs', category: 'admin', icon: Users },

    // Own
    { id: 'view_own_schedule', name: 'Voir son planning', description: 'Consulter son propre planning', category: 'reservations', icon: Calendar },
    { id: 'view_own_reservations', name: 'Voir ses réservations', description: 'Consulter ses propres réservations', category: 'reservations', icon: Calendar },
    { id: 'view_own_info', name: 'Voir ses informations', description: 'Consulter ses propres informations', category: 'candidates', icon: Eye }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [formData, setFormData] = useState({
    displayName: '',
    description: '',
    selectedPermissions: [] as string[]
  });

  const resetForm = () => {
    setFormData({
      displayName: '',
      description: '',
      selectedPermissions: []
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const roleId = formData.displayName.toLowerCase().replace(/\s+/g, '_');
    updateRolePermissions(roleId, formData.selectedPermissions, formData.description, formData.displayName)
      .then((success) => {
        if (success) {
          toast.success('Rôle créé avec succès');
          setIsAddDialogOpen(false);
          resetForm();
        } else {
          toast.error('Erreur lors de la création du rôle');
        }
      });
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      displayName: role.displayName,
      description: role.description,
      selectedPermissions: role.permissions
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) return;

    updateRolePermissions(selectedRole.id, formData.selectedPermissions, formData.description, formData.displayName)
      .then((success) => {
        if (success) {
          toast.success('Rôle modifié avec succès');
          setIsEditDialogOpen(false);
          setSelectedRole(null);
          resetForm();
        } else {
          toast.error('Erreur lors de la modification du rôle');
        }
      });
  };

  const handleDeleteClick = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedRole) return;

    if (selectedRole.userCount > 0) {
      toast.error(`Impossible de supprimer ce rôle. ${selectedRole.userCount} utilisateur(s) l'utilisent encore.`);
      setIsDeleteAlertOpen(false);
      return;
    }

    deleteRole(selectedRole.id).then((success) => {
      if (success) {
        toast.success('Rôle supprimé avec succès');
        setIsDeleteAlertOpen(false);
        setSelectedRole(null);
      } else {
        toast.error('Erreur lors de la suppression du rôle');
      }
    });
  };

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPermissions: prev.selectedPermissions.includes(permissionId)
        ? prev.selectedPermissions.filter(p => p !== permissionId)
        : [...prev.selectedPermissions, permissionId]
    }));
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      prospects: Users,
      candidates: UserCog,
      professors: Shield,
      formations: BookOpen,
      payments: DollarSign,
      reservations: Calendar,
      statistics: BarChart,
      admin: Lock
    };
    return icons[category] || Settings;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      prospects: 'bg-green-50 border-green-200',
      candidates: 'bg-blue-50 border-blue-200',
      professors: 'bg-purple-50 border-purple-200',
      formations: 'bg-yellow-50 border-yellow-200',
      payments: 'bg-pink-50 border-pink-200',
      reservations: 'bg-indigo-50 border-indigo-200',
      statistics: 'bg-orange-50 border-orange-200',
      admin: 'bg-red-50 border-red-200'
    };
    return colors[category] || 'bg-gray-50 border-gray-200';
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="text-blue-600" size={36} />
            Administration des rôles
          </h1>
          <p className="text-gray-500 mt-2">Gérer les rôles et leurs permissions dans le système</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="shadow-md">
              <Plus size={20} className="mr-2" />
              Nouveau rôle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Créer un nouveau rôle</DialogTitle>
              <DialogDescription>
                Définissez le nom, la description et les permissions du nouveau rôle
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-base font-semibold flex items-center gap-2">
                    <Shield size={16} className="text-gray-600" />
                    Nom du rôle *
                  </Label>
                  <Input
                    id="displayName"
                    value={formData.displayName}
                    onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                    className="h-12 rounded-xl"
                    placeholder="Ex: Superviseur"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold">
                    Description *
                  </Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="h-12 rounded-xl"
                    placeholder="Brève description du rôle"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Permissions</h3>
                  <Badge variant="outline">
                    {formData.selectedPermissions.length} permission{formData.selectedPermissions.length > 1 ? 's' : ''} sélectionnée{formData.selectedPermissions.length > 1 ? 's' : ''}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {Object.entries(groupedPermissions).map(([category, perms]) => {
                    const CategoryIcon = getCategoryIcon(category);
                    return (
                      <div key={category} className={`border-2 rounded-xl p-4 ${getCategoryColor(category)}`}>
                        <h4 className="font-semibold mb-3 capitalize flex items-center gap-2">
                          <CategoryIcon size={18} />
                          {category === 'prospects' && 'Prospects'}
                          {category === 'candidates' && 'Candidats'}
                          {category === 'professors' && 'Professeurs'}
                          {category === 'formations' && 'Formations'}
                          {category === 'payments' && 'Paiements'}
                          {category === 'reservations' && 'Réservations'}
                          {category === 'statistics' && 'Statistiques'}
                          {category === 'admin' && 'Administration'}
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {perms.map((permission) => {
                            const PermIcon = permission.icon;
                            return (
                              <div
                                key={permission.id}
                                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${formData.selectedPermissions.includes(permission.id)
                                    ? 'bg-white border-2 border-blue-500 shadow-sm'
                                    : 'bg-white/50 border border-gray-200 hover:bg-white'
                                  }`}
                                onClick={() => togglePermission(permission.id)}
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.selectedPermissions.includes(permission.id)}
                                  onChange={() => togglePermission(permission.id)}
                                  className="w-5 h-5 rounded mt-0.5"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <PermIcon size={14} className="text-gray-600" />
                                    <p className="font-medium text-sm">{permission.name}</p>
                                  </div>
                                  <p className="text-xs text-gray-600 mt-0.5">{permission.description}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                  }}
                >
                  Annuler
                </Button>
                <Button type="submit" size="lg">
                  <CheckCircle size={18} className="mr-2" />
                  Créer le rôle
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total des rôles</p>
                <p className="text-3xl font-bold">{roles.length}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-full">
                <Shield className="text-blue-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Utilisateurs</p>
                <p className="text-3xl font-bold">{roles.reduce((sum, r) => sum + r.userCount, 0)}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-full">
                <Users className="text-green-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Permissions</p>
                <p className="text-3xl font-bold">{permissions.length}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-full">
                <Lock className="text-purple-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Catégories</p>
                <p className="text-3xl font-bold">{Object.keys(groupedPermissions).length}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-full">
                <Settings className="text-yellow-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl">Liste des rôles</CardTitle>
          <CardDescription className="mt-1">
            Gérez les rôles et leurs permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Rôle</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Permissions</TableHead>
                <TableHead className="font-semibold">Utilisateurs</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Shield size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{role.displayName}</p>
                        <Badge className={`${role.color} text-xs mt-1`}>
                          {role.name}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 max-w-xs">
                    {role.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {role.permissions.length} permission{role.permissions.length > 1 ? 's' : ''}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-400" />
                      <span className="font-semibold">{role.userCount}</span>
                      <span className="text-sm text-gray-500">
                        utilisateur{role.userCount > 1 ? 's' : ''}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(role)}
                      >
                        <Pencil size={16} className="mr-1" />
                        Modifier
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteClick(role)}
                        disabled={role.userCount > 0}
                      >
                        <Trash2 size={16} className="mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog - Same structure as Add Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Modifier le rôle</DialogTitle>
            <DialogDescription>
              Modifiez le nom, la description et les permissions du rôle
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="edit-displayName" className="text-base font-semibold flex items-center gap-2">
                  <Shield size={16} className="text-gray-600" />
                  Nom du rôle *
                </Label>
                <Input
                  id="edit-displayName"
                  value={formData.displayName}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                  className="h-12 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description" className="text-base font-semibold">
                  Description *
                </Label>
                <Input
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Permissions</h3>
                <Badge variant="outline">
                  {formData.selectedPermissions.length} permission{formData.selectedPermissions.length > 1 ? 's' : ''} sélectionnée{formData.selectedPermissions.length > 1 ? 's' : ''}
                </Badge>
              </div>

              <div className="space-y-4">
                {Object.entries(groupedPermissions).map(([category, perms]) => {
                  const CategoryIcon = getCategoryIcon(category);
                  return (
                    <div key={category} className={`border-2 rounded-xl p-4 ${getCategoryColor(category)}`}>
                      <h4 className="font-semibold mb-3 capitalize flex items-center gap-2">
                        <CategoryIcon size={18} />
                        {category === 'prospects' && 'Prospects'}
                        {category === 'candidates' && 'Candidats'}
                        {category === 'professors' && 'Professeurs'}
                        {category === 'formations' && 'Formations'}
                        {category === 'payments' && 'Paiements'}
                        {category === 'reservations' && 'Réservations'}
                        {category === 'statistics' && 'Statistiques'}
                        {category === 'admin' && 'Administration'}
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {perms.map((permission) => {
                          const PermIcon = permission.icon;
                          return (
                            <div
                              key={permission.id}
                              className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${formData.selectedPermissions.includes(permission.id)
                                  ? 'bg-white border-2 border-blue-500 shadow-sm'
                                  : 'bg-white/50 border border-gray-200 hover:bg-white'
                                }`}
                              onClick={() => togglePermission(permission.id)}
                            >
                              <input
                                type="checkbox"
                                checked={formData.selectedPermissions.includes(permission.id)}
                                onChange={() => togglePermission(permission.id)}
                                className="w-5 h-5 rounded mt-0.5"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <PermIcon size={14} className="text-gray-600" />
                                  <p className="font-medium text-sm">{permission.name}</p>
                                </div>
                                <p className="text-xs text-gray-600 mt-0.5">{permission.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedRole(null);
                  resetForm();
                }}
              >
                Annuler
              </Button>
              <Button type="submit" size="lg">
                <CheckCircle size={18} className="mr-2" />
                Enregistrer les modifications
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="text-red-600" />
              Confirmer la suppression
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedRole && selectedRole.userCount > 0 ? (
                <span className="text-red-600 font-semibold">
                  Impossible de supprimer ce rôle car {selectedRole.userCount} utilisateur(s) l'utilisent encore.
                  Veuillez d'abord réaffecter ces utilisateurs à un autre rôle.
                </span>
              ) : (
                <span>
                  Êtes-vous sûr de vouloir supprimer le rôle "{selectedRole?.displayName}" ?
                  Cette action est irréversible.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            {selectedRole && selectedRole.userCount === 0 && (
              <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                Supprimer
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
