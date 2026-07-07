import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { UserX, Clock } from 'lucide-react';

export default function ProfessorAbsences() {
  const { currentUser, sessions, professors, candidates, formations } = useApp();

  // Only admin and agent_reservation can access this page
  if (currentUser?.role !== 'admin' && currentUser?.role !== 'agent_reservation') {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Accès refusé</h1>
          <p className="text-gray-500 mt-2">Vous n'avez pas la permission d'accéder à cette page.</p>
        </div>
      </div>
    );
  }

  // Get all sessions with absences (where status is completed but professor was absent)
  // We'll assume a professor is absent when a session is cancelled or when they don't show up
  const professorAbsences = sessions.filter(s => s.status === 'cancelled' || (s.status === 'completed' && s.attendance === 'absent'));

  // Count absences by professor
  const absencesByProfessor = new Map<string, number>();
  professorAbsences.forEach(session => {
    const count = absencesByProfessor.get(session.professorId) || 0;
    absencesByProfessor.set(session.professorId, count + 1);
  });

  // Get professor statistics
  const professorStats = professors.map(prof => {
    const completedSessions = sessions.filter(s =>
      s.professorId === prof.id &&
      s.status === 'completed' &&
      s.attendance === 'present'
    );

    const absences = absencesByProfessor.get(prof.id) || 0;
    const scheduledSessions = sessions.filter(s =>
      s.professorId === prof.id &&
      s.status === 'scheduled'
    );

    return {
      professor: prof,
      completedSessions: completedSessions.length,
      absences: absences,
      scheduledSessions: scheduledSessions.length,
      totalHoursWorked: prof.totalHoursWorked
    };
  }).sort((a, b) => b.absences - a.absences);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Absences des professeurs</h1>
        <p className="text-gray-500 mt-2">Suivi des absences et des heures travaillées</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserX size={20} />
              Total des absences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{professorAbsences.length}</div>
            <p className="text-sm text-gray-500">Séances annulées ou absentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Heures totales travaillées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {professors.reduce((total, prof) => total + prof.totalHoursWorked, 0).toFixed(1)}h
            </div>
            <p className="text-sm text-gray-500">Par tous les professeurs</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques par professeur</CardTitle>
          <CardDescription>Détails des séances complétées, absences et heures travaillées</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Professeur</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Matières</TableHead>
                <TableHead className="text-center">Séances complétées</TableHead>
                <TableHead className="text-center">Absences</TableHead>
                <TableHead className="text-center">Séances planifiées</TableHead>
                <TableHead className="text-right">Heures travaillées</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professorStats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    Aucun professeur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                professorStats.map(stat => (
                  <TableRow key={stat.professor.id}>
                    <TableCell className="font-medium">
                      {stat.professor.firstName} {stat.professor.lastName}
                    </TableCell>
                    <TableCell>
                      <Badge variant={stat.professor.type === 'permanent' ? 'default' : 'secondary'}>
                        {stat.professor.type === 'permanent' ? 'Permanent' : 'Temporaire'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {stat.professor.subjects.slice(0, 2).map((subject, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {stat.professor.subjects.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{stat.professor.subjects.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{stat.completedSessions}</TableCell>
                    <TableCell className="text-center">
                      {stat.absences > 0 ? (
                        <Badge variant="destructive">{stat.absences}</Badge>
                      ) : (
                        <span className="text-gray-400">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">{stat.scheduledSessions}</TableCell>
                    <TableCell className="text-right font-medium">
                      {stat.totalHoursWorked.toFixed(1)}h
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {professorAbsences.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Historique des absences</CardTitle>
            <CardDescription>Liste détaillée de toutes les absences enregistrées</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Professeur</TableHead>
                  <TableHead>Candidat</TableHead>
                  <TableHead>Formation</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {professorAbsences.map(session => {
                  const professor = professors.find(p => p.id === session.professorId);
                  const candidate = candidates.find(c => c.id === session.candidateId);
                  const formation = formations.find(f => f.id === session.formationId);

                  return (
                    <TableRow key={session.id}>
                      <TableCell>{new Date(session.date).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>{session.time}</TableCell>
                      <TableCell>
                        {professor ? `${professor.firstName} ${professor.lastName}` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {candidate ? `${candidate.firstName} ${candidate.lastName}` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {formation ? `${formation.subject} - ${formation.level}` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={session.status === 'cancelled' ? 'destructive' : 'secondary'}>
                          {session.status === 'cancelled' ? 'Annulée' : 'Absent'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
