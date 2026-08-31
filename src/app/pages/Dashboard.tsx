import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import {
  Users,
  UserPlus,
  GraduationCap,
  Calendar,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  BookOpen,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CalendarCheck,
  CreditCard,
  DoorOpen,
  FileText
} from 'lucide-react';

export default function Dashboard() {
  const { currentUser, candidates, prospects, professors, formations, sessions, payments, inscriptions } = useApp();

  const isCandidateActive = (candidateId: string) =>
    inscriptions.some(
      ins =>
        ins.candidateId === candidateId &&
        ins.status !== 'CANCELLED'
    );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const todayStr = new Date().toDateString();
  const todayDateStr = new Date().toISOString().split('T')[0];

  // ==========================================
  // VIEW RENDERER PER ROLE
  // ==========================================

  // --- 1. ADMIN ---
  if (currentUser?.role === 'admin') {
    const totalCandidates = candidates.filter(c => isCandidateActive(c.id)).length;
    const totalProspects = prospects.length;
    const totalReservations = sessions.length;
    const totalPayments = payments.length;
    const totalFormations = formations.length;
    const totalProfessors = professors.length;
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    const recentProspects = [...prospects]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    const recentCandidates = [...candidates]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    return (
      <div className="p-8 space-y-8 bg-white min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {getGreeting()}, {currentUser?.name} 👋
            </h1>
            <p className="text-gray-600 mt-1">Tableau de bord administrateur</p>
          </div>
          <Badge variant="outline" className="px-4 py-2 text-sm">
            <Activity className="mr-2 animate-pulse text-green-500" size={16} />
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Badge>
        </div>

        {/* Admin Grid Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Candidats actifs</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalCandidates}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-xl text-indigo-650">
                <Users size={28} />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Nombre de prospects</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalProspects}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl text-blue-600">
                <UserPlus size={28} />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Nombre de réservations</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalReservations}</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl text-emerald-600">
                <Calendar size={28} />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenus générés</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalRevenue.toLocaleString()} DH</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl text-amber-600">
                <DollarSign size={28} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-all border border-gray-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-pink-50 rounded-xl text-pink-600">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Formations proposées</p>
                <p className="text-2xl font-bold text-gray-900">{totalFormations}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all border border-gray-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Professeurs actifs</p>
                <p className="text-2xl font-bold text-gray-900">{totalProfessors}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all border border-gray-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Nombre de paiements</p>
                <p className="text-2xl font-bold text-gray-900">{totalPayments}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dernières activités */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-gray-200">
            <CardHeader className="border-b bg-gray-55/10">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity size={18} />
                Derniers prospects
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {recentProspects.length > 0 ? (
                recentProspects.map(p => (
                  <div key={p.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                    <div>
                      <p className="font-semibold text-sm">{p.firstName} {p.lastName}</p>
                      <p className="text-xs text-gray-500">{p.email || 'Pas d\'email'} · {p.phone || 'Pas de tél'}</p>
                    </div>
                    <Badge variant="outline">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500 py-4">Aucun prospect enregistré</p>
              )}
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader className="border-b bg-gray-55/10">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users size={18} />
                Derniers candidats inscrits
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {recentCandidates.length > 0 ? (
                recentCandidates.map(c => (
                  <div key={c.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                    <div>
                      <p className="font-semibold text-sm">{c.firstName} {c.lastName}</p>
                      <p className="text-xs text-gray-500">Code: {c.candidateCode}</p>
                    </div>
                    <Badge variant={isCandidateActive(c.id) ? 'default' : 'secondary'}>
                      {isCandidateActive(c.id) ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500 py-4">Aucun candidat récent</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // --- 2. AGENT_RECEPTION ---
  if (currentUser?.role === 'agent_reception') {
    const totalProspects = prospects.length;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newCandidatesCount = candidates.filter(c => new Date(c.createdAt) >= sevenDaysAgo).length;

    const inscriptionsTodayCount = inscriptions.filter(ins => {
      return new Date(ins.createdAt).toDateString() === todayStr;
    }).length;

    const recentProspects = [...prospects]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    return (
      <div className="p-8 space-y-8 bg-white min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {getGreeting()}, {currentUser?.name} 👋
            </h1>
            <p className="text-gray-600 mt-1">Tableau de bord Agent Réception</p>
          </div>
          <Badge className="bg-blue-600 text-white px-3 py-1">Réception</Badge>
        </div>

        {/* Reception metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Nombre de prospects</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalProspects}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl text-orange-600">
                <UserPlus size={28} />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Nouveaux candidats (7 jours)</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{newCandidatesCount}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-xl text-indigo-600">
                <Users size={28} />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Inscriptions du jour</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{inscriptionsTodayCount}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl text-green-600">
                <CheckCircle size={28} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Derniers prospects */}
        <Card className="border border-gray-200">
          <CardHeader className="border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus size={18} />
              Derniers prospects enregistrés
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {recentProspects.length > 0 ? (
              recentProspects.map(p => (
                <div key={p.id} className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl border">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{p.firstName} {p.lastName}</p>
                    <p className="text-xs text-gray-500">Email: {p.email || '-'} · Tél: {p.phone || '-'}</p>
                  </div>
                  <Badge variant="secondary">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</Badge>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500 py-6">Aucun prospect enregistré</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- 3. AGENT_RESERVATION ---
  if (currentUser?.role === 'agent_reservation') {
    const reservationsTodayCount = sessions.filter(s => s.date === todayDateStr).length;
    const totalPayments = payments.length;
    const sessionsTodayCount = sessions.filter(s => s.date === todayDateStr && s.status === 'scheduled').length;

    const upcomingReservations = [...sessions]
      .filter(s => s.status === 'scheduled')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);

    return (
      <div className="p-8 space-y-8 bg-white min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {getGreeting()}, {currentUser?.name} 👋
            </h1>
            <p className="text-gray-600 mt-1">Tableau de bord Agent Réservation</p>
          </div>
          <Badge className="bg-purple-600 text-white px-3 py-1">Réservations & Planning</Badge>
        </div>

        {/* Reservation agent metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Réservations aujourd'hui</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{reservationsTodayCount}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl text-purple-600">
                <Calendar size={28} />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Nombre total de paiements</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalPayments}</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl text-amber-600">
                <DollarSign size={28} />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Séances aujourd'hui (actif)</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{sessionsTodayCount}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl text-green-600">
                <Clock size={28} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prochaines réservations */}
        <Card className="border border-gray-200">
          <CardHeader className="border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarCheck size={18} />
              Prochaines réservations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {upcomingReservations.length > 0 ? (
                upcomingReservations.map(s => {
                  const candidate = candidates.find(c => c.id === s.candidateId);
                  const prof = professors.find(p => p.id === s.professorId);
                  const formation = formations.find(f => f.id === s.formationId);

                  return (
                    <div key={s.id} className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl border border-gray-150">
                      <div>
                        <p className="font-semibold text-sm text-gray-900">
                          {candidatsLabel(candidate)}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Prof: {prof ? `${prof.firstName} ${prof.lastName}` : '-'} | {formation ? `${formation.subject} ${formation.level}` : '-'}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{s.time}</Badge>
                        <p className="text-[10px] text-gray-400 mt-1">Date: {s.date}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-sm text-gray-500 py-6">Aucune séance planifiée</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- Helper to display candidate name safely ---
  function candidatsLabel(candidate: any) {
    if (!candidate) return 'Candidat inconnu';
    return `${candidate.firstName} ${candidate.lastName}`;
  }

  // --- 4. PROFESSOR ---
  if (currentUser?.role === 'professor') {
    const profSessions = sessions.filter(s => s.professorId === currentUser.professorId);
    const profSessionsToday = profSessions.filter(s => s.date === todayDateStr);

    // Count all unique candidates from assigned inscriptions and professor's session members
    const myCandidatesIds = new Set<string>();
    inscriptions.forEach(ins => {
      if (ins.professorId === currentUser.professorId && ins.candidateId) {
        myCandidatesIds.add(ins.candidateId);
      }
    });
    profSessions.forEach(s => {
      if (s.members && s.members.length > 0) {
        s.members.forEach(member => {
          if (member && member.id) {
            myCandidatesIds.add(member.id);
          }
        });
      } else if (s.candidateId) {
        myCandidatesIds.add(s.candidateId);
      }
    });

    const completedProfSessions = profSessions.filter(s => s.status === 'completed');

    // Retrieve only future scheduled sessions
    const myUpcomingSessions = profSessions
      .filter(s => s.status === 'scheduled' && s.startTime && new Date(s.startTime).getTime() >= new Date().getTime())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);

    return (
      <div className="p-8 space-y-8 bg-white min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {getGreeting()}, Professeur {currentUser?.name} 👋
            </h1>
            <p className="text-gray-600 mt-1">Tableau de bord Enseignant</p>
          </div>
          <Badge className="bg-emerald-600 text-white px-3 py-1">Professeur</Badge>
        </div>

        {/* Professor metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Mes séances aujourd'hui</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{profSessionsToday.length}</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl text-emerald-600">
                <Calendar size={28} />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Mes candidats uniques</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{myCandidatesIds.size}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-xl text-indigo-650">
                <Users size={28} />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Mes présences enregistrées</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{completedProfSessions.length}</p>
              </div>
              <div className="p-4 bg-info-50 rounded-xl text-blue-600">
                <CheckCircle size={28} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mes prochaines séances */}
        <Card className="border border-gray-200">
          <CardHeader className="border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock size={18} />
              Mes prochaines séances
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {myUpcomingSessions.length > 0 ? (
                myUpcomingSessions.map(s => {
                  const formation = formations.find(f => f.id === s.formationId);

                  const getSessionSubtitle = () => {
                    if (s.learningMode === 'GROUPE' && s.groupName) {
                      return s.groupName;
                    }
                    if (s.learningMode === 'BINOME') {
                      if (s.members && s.members.length > 0) {
                        return s.members.map(m => `${m.firstName || m.prenom || ''} ${m.lastName || m.nom || ''}`.trim()).join(' & ');
                      }
                      return s.groupName || 'Binôme';
                    }
                    if (s.candidate) {
                      return `${s.candidate.firstName} ${s.candidate.lastName}`;
                    }
                    const candidate = candidates.find(c => c.id === s.candidateId);
                    if (candidate) {
                      return `${candidate.firstName} ${candidate.lastName}`;
                    }
                    return s.groupName || 'Candidat inconnu';
                  };

                  return (
                    <div key={s.id} className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl border">
                      <div>
                        {/* Display Formation as Main Title */}
                        <p className="font-semibold text-sm text-gray-900">
                          {formation ? `${formation.subject} ${formation.level}` : 'Formation inconnue'}
                        </p>
                        {/* Display Group / Candidate details as Subtitle */}
                        <p className="text-xs text-gray-500 mt-0.5">
                          {getSessionSubtitle()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{s.time}</Badge>
                        <p className="text-[10px] text-gray-400 mt-1">Le {s.date}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-sm text-gray-500 py-6">Aucune séance programmée</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- Fallback View (e.g. Candidates or others) ---
  return (
    <div className="p-8 text-center bg-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-gray-900">Bienvenue sur le portail</h1>
      <p className="text-gray-500 mt-2">Veuillez utiliser le menu latéral pour naviguer.</p>
    </div>
  );
}
