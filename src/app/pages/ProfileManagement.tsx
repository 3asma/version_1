import { useState } from 'react';
import { useApp, UserRole } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Users, Plus, Edit, Trash2, Search } from 'lucide-react';
import { Badge } from '../components/ui/badge';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function ProfileManagement() {
  const { currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [profiles] = useState<UserProfile[]>([
    {
      id: '1',
      name: 'Admin Principal',
      email: 'admin@centre-formation.com',
      role: 'admin',
      phone: '0600000001',
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Marie Dupont',
      email: 'marie.dupont@centre-formation.com',
      role: 'agent_reservation',
      phone: '0600000002',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      name: 'Jean Martin',
      email: 'jean.martin@centre-formation.com',
      role: 'agent_reception',
      phone: '0600000003',
      status: 'active',
      createdAt: '2024-02-01'
    },
    {
      id: '4',
      name: 'Sophie Bernard',
      email: 'sophie.bernard@centre-formation.com',
      role: 'professor',
      phone: '0600000004',
      status: 'active',
      createdAt: '2024-02-10'
    },
    {
      id: '5',
      name: 'Lucas Petit',
      email: 'lucas.petit@centre-formation.com',
      role: 'candidate',
      phone: '0600000005',
      status: 'inactive',
      createdAt: '2024-03-01'
    }
  ]);

  // Check permission
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-600">Accès refusé. Cette page est réservée aux administrateurs.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getRoleBadgeColor = (userRole: UserRole) => {
    switch (userRole) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'agent_reservation':
        return 'bg-blue-100 text-blue-800';
      case 'agent_reception':
        return 'bg-green-100 text-green-800';
      case 'professor':
        return 'bg-orange-100 text-orange-800';
      case 'candidate':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (userRole: UserRole) => {
    switch (userRole) {
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
        return userRole;
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || profile.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const stats = [
    { label: 'Total utilisateurs', value: profiles.length, color: 'text-blue-600' },
    { label: 'Actifs', value: profiles.filter(p => p.status === 'active').length, color: 'text-green-600' },
    { label: 'Inactifs', value: profiles.filter(p => p.status === 'inactive').length, color: 'text-gray-600' },
    { label: 'Administrateurs', value: profiles.filter(p => p.role === 'admin').length, color: 'text-purple-600' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des profils</h1>
          <p className="text-gray-500 mt-2">Gestion des utilisateurs et de leurs rôles</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Nouvel utilisateur
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Liste des utilisateurs ({filteredProfiles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Nom</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Téléphone</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rôle</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date création</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((profile) => (
                  <tr key={profile.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{profile.name}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{profile.email}</td>
                    <td className="py-3 px-4 text-gray-600">{profile.phone}</td>
                    <td className="py-3 px-4">
                      <Badge className={getRoleBadgeColor(profile.role)}>
                        {getRoleLabel(profile.role)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={profile.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {profile.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(profile.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Edit size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
