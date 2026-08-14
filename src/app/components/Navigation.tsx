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
  ChevronLeft,
  Bell,
  Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NavigationProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function Navigation({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }: NavigationProps) {
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
    const permissions = currentUser.permissions || [];

    const items = [];

    // 1. Dashboard (All users except agent_reception)
    if (role !== 'agent_reception') {
      items.push({
        path: '/dashboard',
        icon: LayoutDashboard,
        label: 'Tableau de bord',
        badge: null,
        category: 'main'
      });
    }

    // 2. Prospects (view_prospects)
    if (permissions.includes('view_prospects')) {
      items.push({
        path: '/prospects',
        icon: UserPlus,
        label: 'Prospects',
        badge: null,
        category: 'gestion'
      });
    }

    // 3. Candidates (view_candidates)
    if (permissions.includes('view_candidates')) {
      items.push({
        path: '/candidates',
        icon: Users,
        label: 'Candidats',
        badge: null,
        category: 'gestion'
      });
    }

    // 4. Formations (view_formations)
    if (permissions.includes('view_formations')) {
      items.push({
        path: '/formations',
        icon: BookOpen,
        label: 'Formations',
        badge: null,
        category: 'gestion'
      });
    }

    // 5. Professors (view_professors)
    if (permissions.includes('view_professors')) {
      items.push({
        path: '/professors',
        icon: GraduationCap,
        label: 'Professeurs',
        badge: null,
        category: 'gestion'
      });
    }

    // 6. Inscriptions (view_candidates)
    if (permissions.includes('view_candidates')) {
      items.push({
        path: '/inscriptions',
        icon: Users,
        label: 'Inscriptions',
        badge: null,
        category: 'gestion'
      });
    }

    // 7. Rooms (view_formations)
    if (permissions.includes('view_formations')) {
      items.push({
        path: '/rooms',
        icon: DoorOpen,
        label: 'Salles',
        badge: null,
        category: 'gestion'
      });
    }

    // 8. Commercials (manage_users)
    if (permissions.includes('manage_users')) {
      items.push({
        path: '/commercials',
        icon: Briefcase,
        label: 'Commerciaux',
        badge: null,
        category: 'gestion'
      });
    }

    // 9. Payments (view_payments)
    if (permissions.includes('view_payments')) {
      items.push({
        path: '/payments',
        icon: CreditCard,
        label: 'Paiements',
        badge: null,
        category: 'finances'
      });
    }

    // 10. Reservations (view_reservations)
    if (permissions.includes('view_reservations')) {
      items.push({
        path: '/reservations',
        icon: Calendar,
        label: 'Réservations',
        badge: null,
        category: 'planning'
      });
    }

    // 11. Planning (view_reservations or view_own_schedule or view_prospects)
    if (permissions.includes('view_reservations') || permissions.includes('view_own_schedule') || permissions.includes('view_prospects')) {
      items.push({
        path: '/planning',
        icon: CalendarCheck,
        label: 'Planning',
        badge: null,
        category: 'planning'
      });
    }

    // 12. Candidate Reservations (view_own_reservations)
    if (permissions.includes('view_own_reservations')) {
      items.push({
        path: '/candidate-reservations',
        icon: Calendar,
        label: 'Mes réservations',
        badge: null,
        category: 'planning'
      });
    }

    // 13. Attendance (manage_attendance)
    if (permissions.includes('manage_attendance')) {
      items.push({
        path: '/attendance',
        icon: UserCircle,
        label: 'Présences',
        badge: null,
        category: 'planning'
      });
    }

    // 14. Statistics (view_statistics)
    if (permissions.includes('view_statistics')) {
      items.push({
        path: '/statistics',
        icon: BarChart3,
        label: 'Statistiques',
        badge: null,
        category: 'analytics'
      });
    }

    // 15. Admin Roles (manage_roles)
    if (permissions.includes('manage_roles')) {
      items.push({
        path: '/admin-roles',
        icon: Shield,
        label: 'Administration',
        badge: null,
        category: 'admin'
      });
    }

    // 16. User Profiles Management (manage_users)
    if (permissions.includes('manage_users')) {
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
    <nav className={`
      fixed left-0 top-0 h-screen bg-gray-900 text-white flex flex-col shadow-2xl border-r border-gray-800 transition-all duration-300 z-50
      ${isCollapsed ? 'w-20' : 'w-72'}
      ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      {/* Header */}
      <div className={`p-5 border-b border-gray-800 relative ${isCollapsed ? 'p-4' : ''}`}>
        <div className={`flex ${isCollapsed ? 'flex-col items-center gap-3.5' : 'items-center gap-2'} mb-4`}>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer shrink-0"
            title={isCollapsed ? "Développer" : "Réduire"}
          >
            {isCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shrink-0">
              <BookOpen size={20} className="text-gray-900" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="text-base font-bold text-white leading-none tracking-tight">Centre Formation</h1>
                <p className="text-[10px] text-gray-400 leading-none mt-1">Système de gestion</p>
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className={`bg-white/5 rounded-xl p-4 border border-gray-800 ${isCollapsed ? 'p-2' : ''}`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 font-bold text-sm shrink-0">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                <Badge className={`${getRoleBadgeColor(currentUser.role)} text-xs mt-1`}>
                  {getRoleLabel(currentUser.role)}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-4 scrollbar-thin scrollbar-thumb-gray-800">
        <div className="space-y-6">
          {groupedItems.map((category) => (
            <div key={category.id}>
              {category.id !== 'main' && !isCollapsed && (
                <p className="text-xs font-semibold text-gray-450 uppercase tracking-wider px-3 mb-2">
                  {category.label}
                </p>
              )}
              {category.id !== 'main' && isCollapsed && (
                <div className="h-px bg-gray-800 my-4" />
              )}
              <ul className="space-y-1">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        title={isCollapsed ? item.label : undefined}
                        className={`
                          group flex items-center rounded-xl text-sm font-medium transition-all duration-200
                          ${isCollapsed ? 'justify-center p-3' : 'justify-between px-3 py-2.5'}
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
                          {!isCollapsed && <span>{item.label}</span>}
                        </div>
                        {!isCollapsed && item.badge && (
                          <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
                            {item.badge}
                          </Badge>
                        )}
                        {!isCollapsed && active && (
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
      <div className={`p-4 border-t border-gray-800 space-y-2 ${isCollapsed ? 'p-2' : ''}`}>
        <Link to="/settings" className="w-full block">
          <Button
            variant="ghost"
            title={isCollapsed ? "Paramètres du compte" : undefined}
            className={`w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-white/5 ${isCollapsed ? 'justify-center px-0' : ''}`}
            size="sm"
          >
            {currentUser.role === 'agent_reception' ? <UserCircle size={18} /> : <Settings size={18} />}
            {!isCollapsed && <span>Paramètres du compte</span>}
          </Button>
        </Link>

        <Button
          variant="destructive"
          title={isCollapsed ? "Déconnexion" : undefined}
          className={`w-full justify-start gap-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 ${isCollapsed ? 'justify-center px-0' : ''}`}
          onClick={logout}
          size="sm"
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Déconnexion</span>}
        </Button>

      </div>
    </nav>
  );
}
