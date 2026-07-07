import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, GraduationCap, Calendar, CheckCircle, TrendingUp, DoorOpen } from 'lucide-react';

export default function Statistics() {
  const { candidates, professors, sessions, rooms, inscriptions } = useApp();

  const isCandidateActive = (candidateId: string) =>
    inscriptions.some(
      ins =>
        ins.candidateId === candidateId &&
        (ins.status || ins.statut) !== 'CANCELLED'
    );

  // Calculate statistics
  const activeCandidates = candidates.filter(c => isCandidateActive(c.id)).length;
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  const presentSessions = sessions.filter(s => s.attendance === 'present').length;
  const attendanceRate = completedSessions > 0 ? (presentSessions / completedSessions * 100).toFixed(1) : 0;

  // Professor workload
  const professorWorkload = professors.map(prof => {
    const profSessions = sessions.filter(s => s.professorId === prof.id && s.status !== 'cancelled');
    return {
      id: prof.id,
      name: `${prof.firstName} ${prof.lastName}`,
      sessions: profSessions.length,
      maxSessions: prof.maxSessions
    };
  });

  // Room occupancy
  const roomOccupancy = rooms.map(room => {
    const roomSessions = sessions.filter(s => s.roomId === room.id && s.status !== 'cancelled');
    return {
      id: room.id,
      name: `Salle ${room.roomNumber}`,
      sessions: roomSessions.length
    };
  });

  // Session status distribution
  const statusData = [
    { id: 'scheduled', name: 'Programmées', value: sessions.filter(s => s.status === 'scheduled').length, color: '#3b82f6' },
    { id: 'completed', name: 'Complétées', value: sessions.filter(s => s.status === 'completed').length, color: '#10b981' },
    { id: 'cancelled', name: 'Annulées', value: sessions.filter(s => s.status === 'cancelled').length, color: '#ef4444' }
  ];

  // Attendance data
  const attendanceData = [
    { id: 'present', name: 'Présent', value: presentSessions, color: '#10b981' },
    { id: 'absent', name: 'Absent', value: sessions.filter(s => s.attendance === 'absent').length, color: '#ef4444' }
  ];

  // Mock weekly sessions data
  const weeklyData = [
    { id: 'mon', day: 'Lun', sessions: 12 },
    { id: 'tue', day: 'Mar', sessions: 15 },
    { id: 'wed', day: 'Mer', sessions: 18 },
    { id: 'thu', day: 'Jeu', sessions: 14 },
    { id: 'fri', day: 'Ven', sessions: 16 },
    { id: 'sat', day: 'Sam', sessions: 8 },
    { id: 'sun', day: 'Dim', sessions: 5 }
  ];

  const stats = [
    {
      title: 'Candidats actifs',
      value: activeCandidates,
      icon: Users,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Professeurs',
      value: professors.length,
      icon: GraduationCap,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Séances totales',
      value: totalSessions,
      icon: Calendar,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Taux de présence',
      value: `${attendanceRate}%`,
      icon: CheckCircle,
      color: 'bg-emerald-50 text-emerald-600'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Statistiques</h1>
        <p className="text-gray-500 mt-2">Vue d'ensemble des performances du centre</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Professor Workload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap size={20} />
              Charge de travail des professeurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={professorWorkload}>
                <CartesianGrid key="prof-grid" strokeDasharray="3 3" />
                <XAxis key="prof-xaxis" dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis key="prof-yaxis" />
                <Tooltip key="prof-tooltip" />
                <Legend key="prof-legend" />
                <Bar key="prof-sessions" dataKey="sessions" fill="#3b82f6" name="Séances actuelles" />
                <Bar key="prof-max" dataKey="maxSessions" fill="#e5e7eb" name="Maximum autorisé" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Room Occupancy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DoorOpen size={20} />
              Taux d'occupation des salles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roomOccupancy}>
                <CartesianGrid key="room-grid" strokeDasharray="3 3" />
                <XAxis key="room-xaxis" dataKey="name" />
                <YAxis key="room-yaxis" />
                <Tooltip key="room-tooltip" />
                <Bar key="room-sessions" dataKey="sessions" fill="#10b981" name="Séances" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Session Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} />
              Statut des séances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  key="status-pie"
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`status-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip key="status-tooltip" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle size={20} />
              Présences vs Absences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  key="attendance-pie"
                  data={attendanceData.filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`attendance-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip key="attendance-tooltip" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} />
            Évolution hebdomadaire des séances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid key="weekly-grid" strokeDasharray="3 3" />
              <XAxis key="weekly-xaxis" dataKey="day" />
              <YAxis key="weekly-yaxis" />
              <Tooltip key="weekly-tooltip" />
              <Legend key="weekly-legend" />
              <Line key="weekly-sessions" type="monotone" dataKey="sessions" stroke="#3b82f6" strokeWidth={2} name="Séances" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
