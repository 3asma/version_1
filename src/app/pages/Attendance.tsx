import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Attendance() {
  const { currentUser, sessions, candidates, professors, rooms, formations, markAttendance } = useApp();

  // Filter sessions for current professor (mock ID for demo)
  const professorId = currentUser?.role === 'professor' ? 'p1' : null;
  
  const completedSessions = sessions.filter(s => 
    s.status === 'completed' && 
    (!professorId || s.professorId === professorId)
  );

  const pastSessions = sessions.filter(s => {
    const sessionDate = new Date(s.date + ' ' + s.time);
    const now = new Date('2026-03-12T18:00:00'); // Mock current time
    return sessionDate < now && 
           s.status === 'scheduled' && 
           (!professorId || s.professorId === professorId);
  });

  const handleMarkAttendance = (sessionId: string, attendance: 'present' | 'absent') => {
    markAttendance(sessionId, attendance);
    toast.success(`Présence marquée : ${attendance === 'present' ? 'Présent' : 'Absent'}`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Présences</h1>
        <p className="text-gray-500 mt-2">Marquer les présences des candidats</p>
      </div>

      {/* Sessions to mark */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Séances à marquer</CardTitle>
          <CardDescription>
            Séances passées en attente de marquage de présence
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pastSessions.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Aucune séance à marquer
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Candidat</TableHead>
                  {currentUser?.role !== 'professor' && <TableHead>Professeur</TableHead>}
                  <TableHead>Formation</TableHead>
                  <TableHead>Salle</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastSessions.map((session) => {
                  const candidate = candidates.find(c => c.id === session.candidateId);
                  const professor = professors.find(p => p.id === session.professorId);
                  const room = rooms.find(r => r.id === session.roomId);
                  const formation = formations.find(f => f.id === session.formationId);

                  return (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.date}</TableCell>
                      <TableCell>{session.time}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {candidate?.firstName} {candidate?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {candidate?.candidateCode}
                          </div>
                        </div>
                      </TableCell>
                      {currentUser?.role !== 'professor' && (
                        <TableCell>
                          {professor?.firstName} {professor?.lastName}
                        </TableCell>
                      )}
                      <TableCell>{formation?.subject}</TableCell>
                      <TableCell>Salle {room?.roomNumber}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => handleMarkAttendance(session.id, 'present')}
                          >
                            <CheckCircle size={16} className="mr-1" />
                            Présent
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleMarkAttendance(session.id, 'absent')}
                          >
                            <XCircle size={16} className="mr-1" />
                            Absent
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Completed sessions history */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des présences</CardTitle>
          <CardDescription>
            Séances complétées avec présences marquées
          </CardDescription>
        </CardHeader>
        <CardContent>
          {completedSessions.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Aucune séance complétée
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Candidat</TableHead>
                  {currentUser?.role !== 'professor' && <TableHead>Professeur</TableHead>}
                  <TableHead>Formation</TableHead>
                  <TableHead>Salle</TableHead>
                  <TableHead>Présence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedSessions
                  .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime())
                  .map((session) => {
                    const candidate = candidates.find(c => c.id === session.candidateId);
                    const professor = professors.find(p => p.id === session.professorId);
                    const room = rooms.find(r => r.id === session.roomId);
                    const formation = formations.find(f => f.id === session.formationId);

                    return (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.date}</TableCell>
                        <TableCell>{session.time}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {candidate?.firstName} {candidate?.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {candidate?.candidateCode}
                            </div>
                          </div>
                        </TableCell>
                        {currentUser?.role !== 'professor' && (
                          <TableCell>
                            {professor?.firstName} {professor?.lastName}
                          </TableCell>
                        )}
                        <TableCell>{formation?.subject}</TableCell>
                        <TableCell>Salle {room?.roomNumber}</TableCell>
                        <TableCell>
                          <Badge
                            variant={session.attendance === 'present' ? 'default' : 'destructive'}
                          >
                            {session.attendance === 'present' ? 'Présent' : 'Absent'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
