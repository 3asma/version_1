import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function Reservations() {
  const {
    candidates,
    professors,
    rooms,
    formations,
    addSession,
    reservationRequests,
    updateReservationRequest,
    getCandidateAssignments,
    getProfessorAssignments,
    sessions
  } = useApp();

  const [formData, setFormData] = useState({
    candidateCode: '',
    formationId: '',
    professorId: '',
    roomId: '',
    date: '',
    time: ''
  });

  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
  const [candidateFormations, setCandidateFormations] = useState<ReturnType<typeof getCandidateAssignments>>([]);

  const handleCandidateCodeChange = (code: string) => {
    setFormData(prev => ({ ...prev, candidateCode: code, formationId: '' }));
    const candidate = candidates.find(c => c.candidateCode.toLowerCase() === code.toLowerCase());
    setSelectedCandidate(candidate || null);

    if (candidate) {
      const assignments = getCandidateAssignments(candidate.id);
      setCandidateFormations(assignments);
      // Auto-select formation if only one
      if (assignments.length === 1) {
        setFormData(prev => ({ ...prev, formationId: assignments[0].formationId }));
      }
    } else {
      setCandidateFormations([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCandidate) {
      toast.error('Candidat introuvable');
      return;
    }

    if (!formData.formationId) {
      toast.error('Veuillez sélectionner une formation');
      return;
    }

    const formation = formations.find(f => f.id === formData.formationId);
    if (!formation) {
      toast.error('Formation introuvable');
      return;
    }

    const success = addSession({
      candidateId: selectedCandidate.id,
      professorId: formData.professorId,
      roomId: formData.roomId,
      formationId: formData.formationId,
      date: formData.date,
      time: formData.time,
      duration: formation.duration
    });

    if (success) {
      toast.success('Séance réservée avec succès');
      setFormData({
        candidateCode: '',
        formationId: '',
        professorId: '',
        roomId: '',
        date: '',
        time: ''
      });
      setSelectedCandidate(null);
      setCandidateFormations([]);
    } else {
      toast.error('Impossible de réserver : conflit d\'horaire ou contraintes non respectées');
    }
  };

  const handleApprove = (requestId: string) => {
    updateReservationRequest(requestId, 'approved');
    toast.success('Demande approuvée');
  };

  const handleReject = (requestId: string) => {
    updateReservationRequest(requestId, 'rejected');
    toast.success('Demande rejetée');
  };

  // Check if professor is available at the given date and time
  const isProfessorAvailable = (professorId: string, date: string, time: string) => {
    if (!date || !time) return true; // If no date/time selected, show all

    // Check if professor has any session at this date/time
    const hasConflict = sessions.some(session =>
      session.professorId === professorId &&
      session.date === date &&
      session.time === time &&
      session.status !== 'cancelled'
    );

    return !hasConflict;
  };

  // Check if room is available at the given date and time
  const isRoomAvailable = (roomId: string, date: string, time: string) => {
    if (!date || !time) return true; // If no date/time selected, show all

    // Check if room has any session at this date/time
    const hasConflict = sessions.some(session =>
      session.roomId === roomId &&
      session.date === date &&
      session.time === time &&
      session.status !== 'cancelled'
    );

    return !hasConflict;
  };

  const availableProfessors = professors.filter(prof => {
    if (!formData.formationId) return false;
    // Check if professor is assigned to this formation
    const profAssignments = getProfessorAssignments(prof.id);
    const isAssigned = profAssignments.some(assignment => assignment.formationId === formData.formationId);

    // Check availability for selected date/time
    if (formData.date && formData.time) {
      return isAssigned && isProfessorAvailable(prof.id, formData.date, formData.time);
    }

    return isAssigned;
  });

  const availableRooms = rooms.filter(room => {
    if (!room.available) return false;

    // Check availability for selected date/time
    if (formData.date && formData.time) {
      return isRoomAvailable(room.id, formData.date, formData.time);
    }

    return true;
  });

  const pendingRequests = reservationRequests.filter(r => r.status === 'pending');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Réservations</h1>
        <p className="text-gray-500 mt-2">Gérer les réservations de séances</p>
      </div>

      <Tabs defaultValue="new" className="space-y-6">
        <TabsList>
          <TabsTrigger value="new">
            <Calendar size={18} className="mr-2" />
            Nouvelle réservation
          </TabsTrigger>
          <TabsTrigger value="requests">
            Demandes en attente
            {pendingRequests.length > 0 && (
              <Badge className="ml-2" variant="destructive">
                {pendingRequests.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Réserver une séance</CardTitle>
              <CardDescription>
                Recherchez un candidat et créez une nouvelle réservation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Candidate Search */}
                <div className="space-y-2">
                  <Label htmlFor="candidateCode">Code candidat *</Label>
                  <Input
                    id="candidateCode"
                    placeholder="Ex: CAND001"
                    value={formData.candidateCode}
                    onChange={(e) => handleCandidateCodeChange(e.target.value)}
                    required
                  />
                </div>

                {/* Candidate Info */}
                {selectedCandidate && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="text-sm text-gray-600">Candidat</p>
                      <p className="font-medium">
                        {selectedCandidate.firstName} {selectedCandidate.lastName}
                      </p>
                    </div>
                  </div>
                )}

                {/* Reservation Details */}
                {selectedCandidate && (
                  <>
                    {candidateFormations.length > 1 && (
                      <div className="space-y-2">
                        <Label htmlFor="formationId">Formation *</Label>
                        <Select
                          value={formData.formationId}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, formationId: value, professorId: '', roomId: '' }))}
                          required
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
                                  {formation.subject} - {formation.level} ({formation.type})
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value, professorId: '', roomId: '' }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time">Heure *</Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value, professorId: '', roomId: '' }))}
                          required
                        />
                      </div>
                    </div>

                    {formData.date && formData.time && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-700 font-medium">
                          Vérification de disponibilité pour le {formData.date} à {formData.time}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          {availableProfessors.length} professeur(s) et {availableRooms.length} salle(s) disponible(s)
                        </p>
                      </div>
                    )}

                    {formData.date && formData.time && formData.formationId && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="professorId">Professeur disponible *</Label>
                          <Select
                            value={formData.professorId}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, professorId: value }))}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un professeur" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableProfessors.length === 0 ? (
                                <div className="p-2 text-sm text-gray-500">Aucun professeur disponible</div>
                              ) : (
                                availableProfessors.map(prof => (
                                  <SelectItem key={prof.id} value={prof.id}>
                                    {prof.firstName} {prof.lastName}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="roomId">Salle disponible *</Label>
                          <Select
                            value={formData.roomId}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, roomId: value }))}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une salle" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableRooms.length === 0 ? (
                                <div className="p-2 text-sm text-gray-500">Aucune salle disponible</div>
                              ) : (
                                availableRooms.map(room => (
                                  <SelectItem key={room.id} value={room.id}>
                                    Salle {room.roomNumber} ({room.type})
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button type="submit">
                        Réserver la séance
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Demandes en attente</CardTitle>
              <CardDescription>
                Gérer les demandes d'annulation des professeurs et les demandes de réservation des candidats
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingRequests.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Aucune demande en attente
                </p>
              ) : (
                <div className="space-y-4">
                  {/* Cancellation Requests */}
                  {pendingRequests.filter(r => r.type === 'professor_cancellation' || r.type === 'candidate_cancellation').length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-red-600">Demandes d'annulation</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Demandeur</TableHead>
                            <TableHead>Candidat</TableHead>
                            <TableHead>Date et heure</TableHead>
                            <TableHead>Salle</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pendingRequests
                            .filter(r => r.type === 'professor_cancellation' || r.type === 'candidate_cancellation')
                            .map((request) => {
                              const professor = professors.find(p => p.id === request.professorId);
                              const candidate = candidates.find(c => c.id === request.candidateId);
                              const room = rooms.find(r => r.id === request.roomId);

                              return (
                                <TableRow key={request.id}>
                                  <TableCell>
                                    <Badge variant={request.type === 'professor_cancellation' ? 'default' : 'secondary'}>
                                      {request.type === 'professor_cancellation' ? 'Professeur' : 'Candidat'}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {request.type === 'professor_cancellation'
                                      ? `${professor?.firstName} ${professor?.lastName}`
                                      : `${candidate?.firstName} ${candidate?.lastName}`
                                    }
                                  </TableCell>
                                  <TableCell>
                                    {candidate?.firstName} {candidate?.lastName}
                                  </TableCell>
                                  <TableCell>
                                    {request.date} à {request.time}
                                  </TableCell>
                                  <TableCell>
                                    Salle {room?.roomNumber}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-green-600 border-green-600 hover:bg-green-50"
                                        onClick={() => handleApprove(request.id)}
                                      >
                                        <Check size={16} className="mr-1" />
                                        Approuver
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                        onClick={() => handleReject(request.id)}
                                      >
                                        <X size={16} className="mr-1" />
                                        Rejeter
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {/* Candidate Requests */}
                  {pendingRequests.filter(r => r.type === 'candidate_request').length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-blue-600">Demandes de réservation des candidats</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Candidat</TableHead>
                            <TableHead>Formation</TableHead>
                            <TableHead>Date et heure</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pendingRequests
                            .filter(r => r.type === 'candidate_request')
                            .map((request) => {
                              const candidate = candidates.find(c => c.id === request.candidateId);
                              const formation = formations.find(f => f.id === request.formationId);

                              return (
                                <TableRow key={request.id}>
                                  <TableCell className="font-medium">
                                    {candidate?.firstName} {candidate?.lastName}
                                  </TableCell>
                                  <TableCell>
                                    {formation ? `${formation.subject} - ${formation.level}` : 'Non spécifiée'}
                                  </TableCell>
                                  <TableCell>
                                    {request.date} à {request.time}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-green-600 border-green-600 hover:bg-green-50"
                                        onClick={() => handleApprove(request.id)}
                                      >
                                        <Check size={16} className="mr-1" />
                                        Approuver
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                        onClick={() => handleReject(request.id)}
                                      >
                                        <X size={16} className="mr-1" />
                                        Rejeter
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
