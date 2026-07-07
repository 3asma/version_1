import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { CalendarPlus, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function CandidateReservations() {
  const { currentUser, sessions, candidates, professors, rooms, formations, addReservationRequest, reservationRequests, getCandidateAssignments } = useApp();
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [cancelSessionId, setCancelSessionId] = useState<string | null>(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Mock candidate ID for demo (in real app, would come from currentUser)
  const candidateId = 'c1';
  const candidate = candidates.find(c => c.id === candidateId);
  const formation = candidate ? formations.find(f => f.id === candidate.formationId) : undefined;

  // Get all formations assigned to this candidate
  const candidateFormations = getCandidateAssignments(candidateId);
  const hasMultipleFormations = candidateFormations.length > 1;

  const [requestForm, setRequestForm] = useState({
    formationId: '',
    professorId: '',
    roomId: '',
    date: '',
    time: ''
  });

  const candidateSessions = sessions.filter(s => s.candidateId === candidateId);
  const upcomingSessions = candidateSessions.filter(s => s.status === 'scheduled');
  const completedSessions = candidateSessions.filter(s => s.status === 'completed');

  // Filter reservation requests for this candidate
  const candidateRequests = reservationRequests.filter(r => r.candidateId === candidateId);
  const newReservationRequests = candidateRequests.filter(r => r.type === 'candidate_request');
  const cancellationRequests = candidateRequests.filter(r => r.type === 'candidate_cancellation');

  const handleInputChange = (field: string, value: string) => {
    setRequestForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();

    if (!candidate) {
      toast.error('Candidat non trouvé');
      return;
    }

    if (hasMultipleFormations && !requestForm.formationId) {
      toast.error('Veuillez sélectionner une formation');
      return;
    }

    const selectedFormationId = hasMultipleFormations ? requestForm.formationId : candidateFormations[0]?.formationId;

    if (!selectedFormationId) {
      toast.error('Aucune formation affectée');
      return;
    }

    addReservationRequest({
      professorId: '', // L'agent de réservation assignera le professeur
      candidateId: candidate.id,
      roomId: '', // L'agent de réservation assignera la salle
      formationId: selectedFormationId,
      date: requestForm.date,
      time: requestForm.time,
      type: 'candidate_request'
    });

    toast.success('Demande de réservation envoyée');
    setIsRequestDialogOpen(false);
    setRequestForm({
      formationId: '',
      professorId: '',
      roomId: '',
      date: '',
      time: ''
    });
  };

  const handleCancelSession = () => {
    if (!cancelSessionId) return;

    const session = sessions.find(s => s.id === cancelSessionId);
    if (!session || !candidate) return;

    // Check if request is made at least 24 hours before the session
    const sessionDateTime = new Date(`${session.date}T${session.time}`);
    const now = new Date();
    const hoursUntilSession = (sessionDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilSession < 24) {
      toast.error('Vous devez faire la demande d\'annulation au moins 24h avant la séance');
      setIsCancelDialogOpen(false);
      setCancelSessionId(null);
      return;
    }

    addReservationRequest({
      professorId: session.professorId,
      candidateId: candidate.id,
      roomId: session.roomId,
      formationId: session.formationId,
      date: session.date,
      time: session.time,
      type: 'candidate_cancellation',
      sessionId: session.id
    });

    toast.success('Demande d\'annulation envoyée à l\'agent de réservation');
    setIsCancelDialogOpen(false);
    setCancelSessionId(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Réservations</h1>
          <p className="text-gray-500 mt-2">Gérez vos séances et demandes de réservation</p>
        </div>

        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <CalendarPlus size={18} className="mr-2" />
              Nouvelle demande
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Demande de réservation</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour votre demande de séance
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitRequest} className="space-y-4">
              {hasMultipleFormations ? (
                <div className="space-y-2">
                  <Label htmlFor="formationId">Formation *</Label>
                  <Select
                    value={requestForm.formationId}
                    onValueChange={(value) => handleInputChange('formationId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une formation" />
                    </SelectTrigger>
                    <SelectContent>
                      {candidateFormations.map((assignment) => {
                        const formation = formations.find(f => f.id === assignment.formationId);
                        if (!formation) return null;
                        return (
                          <SelectItem key={assignment.id} value={formation.id}>
                            {formation.subject} - {formation.level}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Formation inscrite</Label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="font-medium">
                      {candidateFormations.length > 0
                        ? (() => {
                            const formation = formations.find(f => f.id === candidateFormations[0].formationId);
                            return formation ? `${formation.subject} - ${formation.level}` : 'Aucune formation';
                          })()
                        : 'Aucune formation'}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={requestForm.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Heure *</Label>
                <Input
                  id="time"
                  type="time"
                  value={requestForm.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  Envoyer la demande
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Candidate Info Card */}
      {candidate && formation && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Mes informations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Code candidat</p>
                <p className="font-medium">{candidate.candidateCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Formation</p>
                <p className="font-medium">{formation ? `${formation.subject} - ${formation.level}` : '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Observation</p>
                <p className="font-medium text-blue-600">
                  {candidate.observation === 'alone' ? 'Seul' : 'Accompagné'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* New Reservation Requests */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Demandes de réservation à venir</CardTitle>
          <CardDescription>Vos nouvelles demandes de séances</CardDescription>
        </CardHeader>
        <CardContent>
          {newReservationRequests.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucune demande de réservation</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Formation</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date de demande</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newReservationRequests
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((request) => {
                    const requestFormation = formations.find(f => f.id === request.formationId);

                    const getStatusBadge = (status: string) => {
                      switch (status) {
                        case 'pending':
                          return <Badge variant="secondary">En attente</Badge>;
                        case 'approved':
                          return <Badge variant="default">Approuvée</Badge>;
                        case 'rejected':
                          return <Badge variant="destructive">Rejetée</Badge>;
                        default:
                          return <Badge>{status}</Badge>;
                      }
                    };

                    return (
                      <TableRow key={request.id}>
                        <TableCell>
                          {requestFormation ? `${requestFormation.subject} - ${requestFormation.level}` : '-'}
                        </TableCell>
                        <TableCell className="font-medium">{request.date}</TableCell>
                        <TableCell>{request.time}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          {new Date(request.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Cancellation Requests */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Demandes d'annulation</CardTitle>
          <CardDescription>Vos demandes d'annulation de séances</CardDescription>
        </CardHeader>
        <CardContent>
          {cancellationRequests.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucune demande d'annulation</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Formation</TableHead>
                  <TableHead>Date de la séance</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date de demande</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cancellationRequests
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((request) => {
                    const formation = formations.find(f => f.id === request.formationId);

                    const getStatusBadge = (status: string) => {
                      switch (status) {
                        case 'pending':
                          return <Badge variant="secondary">En attente</Badge>;
                        case 'approved':
                          return <Badge variant="default">Approuvée</Badge>;
                        case 'rejected':
                          return <Badge variant="destructive">Rejetée</Badge>;
                        default:
                          return <Badge>{status}</Badge>;
                      }
                    };

                    return (
                      <TableRow key={request.id}>
                        <TableCell>
                          {formation ? `${formation.subject} - ${formation.level}` : '-'}
                        </TableCell>
                        <TableCell className="font-medium">{request.date}</TableCell>
                        <TableCell>{request.time}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          {new Date(request.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Séances à venir</CardTitle>
          <CardDescription>Vos prochaines séances programmées</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingSessions.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucune séance programmée</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Professeur</TableHead>
                  <TableHead>Salle</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingSessions
                  .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
                  .map((session) => {
                    const professor = professors.find(p => p.id === session.professorId);
                    const room = rooms.find(r => r.id === session.roomId);

                    return (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.date}</TableCell>
                        <TableCell>{session.time}</TableCell>
                        <TableCell>
                          {professor?.firstName} {professor?.lastName}
                        </TableCell>
                        <TableCell>Salle {room?.roomNumber}</TableCell>
                        <TableCell>{session.duration} min</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setCancelSessionId(session.id);
                              setIsCancelDialogOpen(true);
                            }}
                          >
                            <XCircle size={16} className="mr-1" />
                            Demander annulation
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Completed Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des séances</CardTitle>
          <CardDescription>Vos séances passées</CardDescription>
        </CardHeader>
        <CardContent>
          {completedSessions.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucune séance complétée</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Professeur</TableHead>
                  <TableHead>Salle</TableHead>
                  <TableHead>Présence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedSessions
                  .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime())
                  .map((session) => {
                    const professor = professors.find(p => p.id === session.professorId);
                    const room = rooms.find(r => r.id === session.roomId);

                    return (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.date}</TableCell>
                        <TableCell>{session.time}</TableCell>
                        <TableCell>
                          {professor?.firstName} {professor?.lastName}
                        </TableCell>
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

      {/* Cancel Confirmation Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demander l'annulation</DialogTitle>
            <DialogDescription>
              Voulez-vous envoyer une demande d'annulation pour cette séance ? L'agent de réservation devra l'approuver. Note : vous devez faire la demande au moins 24h avant la séance.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleCancelSession}>
              Envoyer la demande
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
