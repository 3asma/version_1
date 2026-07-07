import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
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
  ArrowDownRight
} from 'lucide-react';

export default function Dashboard() {
  const { currentUser, candidates, prospects, professors, formations, sessions, payments, inscriptions } = useApp();

  const isCandidateActive = (candidateId: string) =>
    inscriptions.some(
      ins =>
        ins.candidateId === candidateId &&
        (ins.status || ins.statut) !== 'CANCELLED'
    );

  // Statistiques globales
  const totalCandidates = candidates.filter(c => isCandidateActive(c.id)).length;
  const totalProspects = prospects.length;
  const totalProfessors = professors.length;
  const totalFormations = formations.length;

  // Statistiques des sessions
  const scheduledSessions = sessions.filter(s => s.status === 'scheduled').length;
  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  const totalSessions = sessions.length;

  // Statistiques des paiements
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const validatedPayments = payments.filter(p => p.status === 'validated').length;
  const pendingPayments = payments.filter(p => p.status === 'pending' || p.status === 'late').length;

  // Activités récentes (derniers prospects et candidats)
  const recentProspects = [...prospects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentCandidates = [...candidates]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Prochaines sessions (3 prochaines)
  const upcomingSessions = [...sessions]
    .filter(s => s.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  // Calcul des tendances (simulation - augmentation/diminution)
  const candidateTrend = +12.5;
  const revenueTrend = +8.3;
  const sessionTrend = -3.2;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <div className="p-8 space-y-8 bg-white min-h-screen">
      {/* Header simplifié */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getGreeting()}, {currentUser?.name} 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Voici un aperçu de votre centre de formation
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm">
          <Activity className="mr-2" size={16} />
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Badge>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-4 gap-6">
        {/* Candidats */}
        <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <Users className="text-gray-700" size={28} />
              </div>
              <Badge className={candidateTrend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {candidateTrend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(candidateTrend)}%
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Candidats actifs</p>
              <p className="text-3xl font-bold text-gray-900">{totalCandidates}</p>
              <p className="text-xs text-gray-500 mt-2">Total dans le système</p>
            </div>
          </CardContent>
        </Card>

        {/* Prospects */}
        <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <UserPlus className="text-gray-700" size={28} />
              </div>
              <Badge className="bg-gray-200 text-gray-800">
                <Activity size={14} className="mr-1" />
                Actif
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Prospects</p>
              <p className="text-3xl font-bold text-gray-900">{totalProspects}</p>
              <p className="text-xs text-gray-500 mt-2">En cours de conversion</p>
            </div>
          </CardContent>
        </Card>

        {/* Revenus */}
        <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <DollarSign className="text-gray-700" size={28} />
              </div>
              <Badge className={revenueTrend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {revenueTrend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(revenueTrend)}%
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Revenus totaux</p>
              <p className="text-3xl font-bold text-gray-900">{totalRevenue.toLocaleString()} DH</p>
              <p className="text-xs text-gray-500 mt-2">{validatedPayments} paiements validés</p>
            </div>
          </CardContent>
        </Card>

        {/* Sessions */}
        <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <Calendar className="text-gray-700" size={28} />
              </div>
              <Badge className={sessionTrend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {sessionTrend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(sessionTrend)}%
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Sessions planifiées</p>
              <p className="text-3xl font-bold text-gray-900">{scheduledSessions}</p>
              <p className="text-xs text-gray-500 mt-2">{completedSessions} complétées</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistiques secondaires */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <GraduationCap className="text-gray-700" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Professeurs</p>
                <p className="text-2xl font-bold text-gray-900">{totalProfessors}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-50 rounded-xl">
                <BookOpen className="text-pink-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Formations</p>
                <p className="text-2xl font-bold text-gray-900">{totalFormations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <AlertCircle className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Paiements en attente</p>
                <p className="text-2xl font-bold text-gray-900">{pendingPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sections activités et sessions */}
      <div className="grid grid-cols-3 gap-6">
        {/* Activités récentes */}
        <Card className="col-span-2 border border-gray-200">
          <CardHeader className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Activity className="text-gray-700" size={20} />
                  Activités récentes
                </CardTitle>
                <CardDescription className="mt-1 text-gray-600">
                  Derniers prospects et candidats ajoutés
                </CardDescription>
              </div>
              <Badge variant="outline" className="px-3 py-1 border-gray-300 text-gray-700">
                Aujourd'hui
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <UserPlus size={16} className="text-gray-600" />
                  Nouveaux prospects
                </h4>
                <div className="space-y-2">
                  {recentProspects.length > 0 ? (
                    recentProspects.map((prospect) => (
                      <div key={prospect.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <UserPlus size={18} className="text-gray-700" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{prospect.firstName} {prospect.lastName}</p>
                            <p className="text-xs text-gray-500">{prospect.age} ans · {prospect.subject}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700">
                          {new Date(prospect.createdAt).toLocaleDateString('fr-FR')}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">Aucun prospect récent</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <Users size={16} className="text-gray-600" />
                  Nouveaux candidats
                </h4>
                <div className="space-y-2">
                  {recentCandidates.length > 0 ? (
                    recentCandidates.slice(0, 3).map((candidate) => (
                      <div key={candidate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users size={18} className="text-gray-700" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{candidate.firstName} {candidate.lastName}</p>
                            <p className="text-xs text-gray-500">{candidate.candidateCode}</p>
                          </div>
                        </div>
                        <Badge className={`${isCandidateActive(candidate.id) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} text-xs`}>
                          {isCandidateActive(candidate.id) ? 'Actif' : 'Non actif'}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">Aucun candidat récent</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prochaines sessions */}
        <Card className="border border-gray-200">
          <CardHeader className="bg-white border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Calendar className="text-gray-700" size={20} />
              Prochaines sessions
            </CardTitle>
            <CardDescription className="mt-1 text-gray-600">
              Planning des sessions à venir
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => {
                  const candidate = candidates.find(c => c.id === session.candidateId);
                  const formation = formations.find(f => f.id === session.formationId);

                  return (
                    <div key={session.id} className="border-l-4 border-l-gray-900 pl-4 py-3 bg-gray-50 rounded-r-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm text-gray-900">
                            {candidate?.firstName} {candidate?.lastName}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {formation?.subject} - {formation?.level}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                          {session.time}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock size={12} className="text-gray-500" />
                        <span className="text-xs text-gray-600">
                          {new Date(session.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-sm text-gray-500">Aucune session planifiée</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicateurs de performance */}
      <Card className="bg-white border border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <BarChart3 size={24} className="text-gray-700" />
            Indicateurs de performance
          </CardTitle>
          <CardDescription className="text-gray-600">
            Vue d'ensemble des performances du mois
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mb-3">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-gray-700" size={32} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{completedSessions}</p>
              <p className="text-sm text-gray-600">Sessions complétées</p>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-800 rounded-full transition-all"
                  style={{ width: `${(completedSessions / (totalSessions || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-center">
              <div className="mb-3">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-gray-700" size={32} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{validatedPayments}</p>
              <p className="text-sm text-gray-600">Paiements validés</p>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-800 rounded-full transition-all"
                  style={{ width: `${(validatedPayments / (payments.length || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-center">
              <div className="mb-3">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="text-gray-700" size={32} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{totalCandidates}</p>
              <p className="text-sm text-gray-600">Candidats actifs</p>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gray-800 rounded-full transition-all" style={{ width: '75%' }} />
              </div>
            </div>

            <div className="text-center">
              <div className="mb-3">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <UserPlus className="text-gray-700" size={32} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{totalProspects}</p>
              <p className="text-sm text-gray-600">Prospects en cours</p>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gray-800 rounded-full transition-all" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
