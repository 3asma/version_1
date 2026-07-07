import { useState } from 'react';
import { useApp, UserRole } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Shield, Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export default function RoleManagement() {
  const { currentUser } = useApp();
  const [roles] = useState<{ id: string; name: string; code: UserRole; description: string; permissions: string[] }[]>([
    {
      id: '1',
      name: 'Administrateur',
      code: 'admin',
      description: 'Accès complet à toutes les fonctionnalités',
      permissions: ['Gestion des utilisateurs', 'Gestion des rôles', 'Gestion des formations', 'Gestion des professeurs', 'Statistiques', 'Absences']
    },
    {
      id: '2',
      name: 'Agent de Réservation',
      code: 'agent_reservation',
      description: 'Gestion des réservations et des plannings',
      permissions: ['Planification des séances', 'Gestion des absences', 'Vue des professeurs', 'Vue des candidats']
    },
    {
      id: '3',
      name: 'Agent de Réception',
      code: 'agent_reception',
      description: 'Accueil et gestion des prospects',
      permissions: ['Gestion des prospects', 'Conversion en candidats', 'Gestion commerciaux']
    },
    {
      id: '4',
      name: 'Professeur',
      code: 'professor',
      description: 'Consultation du planning personnel',
      permissions: ['Vue planning personnel', 'Marquage présence']
    },
    {
      id: '5',
      name: 'Candidat',
      code: 'candidate',
      description: 'Consultation des informations personnelles',
      permissions: ['Vue planning personnel', 'Vue formations']
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

  const getRoleBadgeColor = (roleCode: UserRole) => {
    switch (roleCode) {
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

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des rôles</h1>
          <p className="text-gray-500 mt-2">Configuration des rôles et des permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Nouveau rôle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((roleItem) => (
          <Card key={roleItem.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{roleItem.name}</CardTitle>
                    <Badge className={`mt-1 ${getRoleBadgeColor(roleItem.code)}`}>
                      {roleItem.code}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit size={16} className="text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{roleItem.description}</p>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Permissions :</h4>
                <div className="space-y-1">
                  {roleItem.permissions.map((permission, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      {permission}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
