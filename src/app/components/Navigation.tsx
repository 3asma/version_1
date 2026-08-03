import { Link, useLocation } from 'react-router';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCircle,
  DoorOpen,
  BookOpen,
  Calendar,
  CalendarCheck,
  BarChart3,
  LogOut,
  UserPlus,
  CalendarClock,
  Briefcase,
  Shield,
  UserCog,
  CreditCard,
  ChevronRight,
  Bell,
  Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Navigation() {
  const { currentUser, logout } = useApp();
  const location = useLocation();

  if (!currentUser) return null;

  const isActive = (path: string) => location.pathname === path;

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-gray-200 text-gray-800 border-gray-300',
      agent_reservation: 'bg-gray-200 text-gray-800 border-gray-300',
      agent_reception: 'bg-gray-200 text-gray-800 border-gray-300',
      professor: 'bg-gray-200 text-gray-800 border-gray-300',
      candidate: 'bg-gray-200 text-gray-800 border-gray-300'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: 'Administrateur',
      agent_reservation: 'Agent Réservation',
      agent_reception: 'Agent Réception',
      professor: 'Professeur',
      candidate: 'Candidat'
    };
    return labels[role] || role;
  };

  const getNavigationItems = () => {
    const role = currentUser.role;

    const items = [];

    // 1. Dashboard (All users)
    items.push({
      path: '/dashboard',
      icon: LayoutDashboard,
      label: 'Tableau de bord',
      badge: null,
      category: 'main'
    });

    // 2. Prospects (Admin, Agent Reception)
    if (role === 'admin' || role === 'agent_reception') {
      items.push({
        path: '/prospects',
        icon: UserPlus,
        label: 'Prospects',
        badge: null,
        category: 'gestion'
      });
    }

    // 3. Candidates (Admin, Agent Reception)
    if (role === 'admin' || role === 'agent_reception') {
      items.push({
        path: '/candidates',
        icon: Users,
        label: 'Candidats',
        badge: null,
        category: 'gestion'
      });
    }

    // 4. Formations (Admin only)
    if (role === 'admin') {
      items.push({
        path: '/formations',
        icon: BookOpen,
        label: 'Formations',
        badge: null,
        category: 'gestion'
      });
    }

    // 5. Professors (Admin only)
    if (role === 'admin') {
      items.push({
        path: '/professors',
        icon: GraduationCap,
        label: 'Professeurs',
        badge: null,
        category: 'gestion'
      });
    }

    // 6. Inscriptions (Admin, Agent Reception, Agent Reservation)
    if (role === 'admin' || role === 'agent_reception' || role === 'agent_reservation') {
      items.push({
        path: '/inscriptions',
        icon: Users,
        label: 'Inscriptions',
        badge: null,
        category: 'gestion'
      });
    }

    // 7. Rooms (Admin only)
    if (role === 'admin') {
      items.push({
        path: '/rooms',
        icon: DoorOpen,
        label: 'Salles',
        badge: null,
        category: 'gestion'
      });
    }

    // 8. Commercials (Admin, Agent Reception)
    if (role === 'admin' || role === 'agent_reception') {
      items.push({
        path: '/commercials',
        icon: Briefcase,
        label: 'Commerciaux',
        badge: null,
        category: 'gestion'
      });
    }

    // 9. Payments (Admin, Agent Reservation)
    if (role === 'admin' || role === 'agent_reservation') {
      items.push({
        path: '/payments',
        icon: CreditCard,
        label: 'Paiements',
        badge: '3',
        category: 'finances'
      });
    }

    // 10. Reservations (Admin, Agent Reservation)
    if (role === 'admin' || role === 'agent_reservation') {
      items.push({
        path: '/reservations',
        icon: Calendar,
        label: 'Réservations',
        badge: null,
        category: 'planning'
      });
    }

    // 11. Planning (Admin, Agent Reservation, Professor)
    if (role === 'admin' || role === 'agent_reservation' || role === 'professor') {
      items.push({
        path: '/planning',
        icon: CalendarCheck,
        label: 'Planning',
        badge: null,
        category: 'planning'
      });
    }

    // 12. Candidate Reservations (Candidate only)
    if (role === 'candidate') {
      items.push({
        path: '/candidate-reservations',
        icon: Calendar,
        label: 'Mes réservations',
        badge: null,
        category: 'planning'
      });
    }

    // 13. Attendance (Admin, Professor)
    if (role === 'admin' || role === 'professor') {
      items.push({
        path: '/attendance',
        icon: UserCircle,
        label: 'Présences',
        badge: null,
        category: 'planning'
      });
    }

    // 14. Statistics (Admin only)
    if (role === 'admin') {
      items.push({
        path: '/statistics',
        icon: BarChart3,
        label: 'Statistiques',
        badge: null,
        category: 'analytics'
      });
    }

    // 15. Admin Roles (Admin only)
    if (role === 'admin') {
      items.push({
        path: '/admin-roles',
        icon: Shield,
        label: 'Administration',
        badge: null,
        category: 'admin'
      });
    }

    // 16. User Profiles Management (Admin only)
    if (role === 'admin') {
      items.push({
        path: '/profile-management',
        icon: UserCog,
        label: 'Utilisateurs',
        badge: null,
        category: 'admin'
      });
    }

    return items;
  };

  const navItems = getNavigationItems();

  // Grouper les items par catégorie
  const categories = [
    { id: 'main', label: 'Principal' },
    { id: 'gestion', label: 'Gestion' },
    { id: 'finances', label: 'Finances' },
    { id: 'planning', label: 'Planning' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'admin', label: 'Administration' }
  ];

  const groupedItems = categories.map(category => ({
    ...category,
    items: navItems.filter(item => item.category === category.id)
  })).filter(category => category.items.length > 0);

  return (
    <nav className="fixed left-0 top-0 h-screen w-72 bg-gray-900 text-white flex flex-col shadow-2xl border-r border-gray-800">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen size={24} className="text-gray-900" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Centre Formation</h1>
            <p className="text-xs text-gray-400">Système de gestion</p>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white/5 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
              <Badge className={`${getRoleBadgeColor(currentUser.role)} text-xs mt-1`}>
                {getRoleLabel(currentUser.role)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-4">
        <div className="space-y-6">
          {groupedItems.map((category) => (
            <div key={category.id}>
              {category.id !== 'main' && (
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                  {category.label}
                </p>
              )}
              <ul className="space-y-1">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`
                          group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                          ${active
                            ? 'bg-white text-gray-900 shadow-lg'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            size={20}
                            className={active ? 'text-gray-900' : 'text-gray-400 group-hover:text-white'}
                          />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
                            {item.badge}
                          </Badge>
                        )}
                        {active && (
                          <ChevronRight size={16} className="text-gray-900" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-white/5"
          size="sm"
        >
          <Bell size={18} />
          <span>Notifications</span>
          <Badge className="ml-auto bg-red-500 text-white text-xs">5</Badge>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-white/5"
          size="sm"
        >
          <Settings size={18} />
          <span>Paramètres</span>
        </Button>

        <Button
          variant="destructive"
          className="w-full justify-start gap-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20"
          onClick={logout}
          size="sm"
        >
          <LogOut size={18} />
          <span>Déconnexion</span>
        </Button>
      </div>
    </nav>
  );
}
