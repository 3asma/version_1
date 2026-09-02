import { useState, useEffect } from 'react';
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
import api from '../services/api';
import { LearningGroupDetailsDialog } from '../components/LearningGroupDetailsDialog';

export default function Reservations() {
  const {
    candidates,
    professors,
    rooms,
    formations,
    reservationRequests,
    updateReservationRequest,
    inscriptions,
    cancelRequests,
    approveCancelRequest,
    rejectCancelRequest
  } = useApp();

  // Local helper functions for assignments as they are not defined in AppContext
  const getCandidateAssignments = (candidateId: string) => {
    return inscriptions.filter(ins => ins.candidateId === candidateId);
  };

  const handleApproveCancelRequest = async (requestId: string) => {
    try {
      await approveCancelRequest(requestId);
      toast.success("Demande d'annulation approuvée avec succès (séance annulée)");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || "Erreur lors de l'approbation de la demande");
    }
  };

  const handleRejectCancelRequest = async (requestId: string) => {
    try {
      await rejectCancelRequest(requestId);
      toast.success("Demande d'annulation rejetée avec succès (séance conservée)");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || "Erreur lors du rejet de la demande");
    }
  };

  const [formData, setFormData] = useState({
    candidateCode: '',
    formationId: '',
    professorId: '',
    roomId: '',
    date: '',
    startTime: '',
    endTime: ''
  });

  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
  const [candidateFormations, setCandidateFormations] = useState<ReturnType<typeof getCandidateAssignments>>([]);
  const [selectedLearningGroup, setSelectedLearningGroup] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [searchResult, setSearchResult] = useState<{
    exists: boolean;
    inscriptionId: string;
    candidateId: string;
    formationId: string;
    professorId: string | null;
    roomId: string | null;
    learningGroup?: any | null;
  } | null>(null);

  const [isSearching, setIsSearching] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [availabilityResult, setAvailabilityResult] = useState<{
    available: boolean;
    professorAvailable: boolean;
    candidateAvailable: boolean;
    availableRooms: Array<{
      id: string;
      numero: string;
      capacite?: number;
    }>;
  } | null>(null);

  const handleCandidateCodeChange = (code: string) => {
    setFormData(prev => ({
      ...prev,
      candidateCode: code,
      formationId: '',
      professorId: '',
      roomId: ''
    }));
    setSelectedCandidate(null);
    setSelectedLearningGroup(null);
    setSearchResult(null);
    setAvailabilityResult(null);
    setCandidateFormations([]);
  };

  const handleSearch = async (enteredCode: string) => {
    const codeToSearch = enteredCode || formData.candidateCode;
    if (!codeToSearch.trim()) {
      toast.error('Veuillez saisir un code');
      return;
    }

    setIsSearching(true);
    setSelectedCandidate(null);
    setCandidateFormations([]);
    setSearchResult(null);
    setAvailabilityResult(null);
    setSelectedLearningGroup(null);

    try {
      const res = await api.get(`/reservations/search?code=${encodeURIComponent(codeToSearch.trim())}`);
      if (res.data.message === 'success') {
        const data = res.data.data;
        setSearchResult(data);
        setSelectedLearningGroup(data.learningGroup || null);

        // Find candidate in context to display name
        const matchCandidate = candidates.find(c => c.id === data.candidateId);
        setSelectedCandidate(matchCandidate || null);

        // Populate details: note professorId is saved but roomId is NOT prefused to force checking first
        setFormData(prev => ({
          ...prev,
          formationId: data.formationId || '',
          professorId: data.professorId || '',
          roomId: ''
        }));

        if (matchCandidate) {
          const assignments = getCandidateAssignments(matchCandidate.id);
          setCandidateFormations(assignments);
        }
        toast.success('Bénéficiaire / Inscription identifié(e)');
      }
    } catch (error: any) {
      setSearchResult(null);
      setSelectedCandidate(null);
      setSelectedLearningGroup(null);
      setCandidateFormations([]);
      const status = error.response?.status;
      if (status === 404) {
        toast.error('Aucune inscription ou candidat trouvé.');
      } else if (status === 400) {
        toast.error(error.response?.data?.error || 'Validation error');
      } else {
        toast.error('Une erreur est survenue lors de la recherche.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  // Perform availability checks reactively
  useEffect(() => {
    const runAvailabilityCheck = async () => {
      const { date, startTime, endTime } = formData;
      const candidateId = searchResult?.candidateId;
      const professorId = formData.professorId || searchResult?.professorId;

      if (!date || !startTime || !endTime || !professorId || !candidateId) {
        setAvailabilityResult(null);
        return;
      }

      try {
        setIsCheckingAvailability(true);
        const payload = {
          reservationDate: `${date}T00:00:00.000Z`,
          startTime: `${date}T${startTime}:00.000Z`,
          endTime: `${date}T${endTime}:00.000Z`,
          professorId,
          candidateId
        };
        const res = await api.post('/reservations/availability', payload);
        if (res.data.message === 'success') {
          setAvailabilityResult(res.data.data);
        }
      } catch (err) {
        console.error('Availability check failed:', err);
        setAvailabilityResult(null);
      } finally {
        setIsCheckingAvailability(false);
      }
    };

    runAvailabilityCheck();
  }, [formData.date, formData.startTime, formData.endTime, formData.professorId, searchResult?.professorId, searchResult?.candidateId]);

  // Reset roomId if it becomes unavailable
  useEffect(() => {
    if (availabilityResult) {
      const stillAvailable = availabilityResult.availableRooms.some(r => r.id === formData.roomId);
      if (!stillAvailable) {
        setFormData(prev => ({ ...prev, roomId: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, roomId: '' }));
    }
  }, [availabilityResult]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCandidate || !searchResult) {
      toast.error('Veuillez d\'abord rechercher et sélectionner un candidat valide');
      return;
    }

    if (!formData.formationId) {
      toast.error('Veuillez sélectionner une formation');
      return;
    }

    const { date, startTime, endTime, roomId } = formData;
    const professorId = searchResult.professorId;
    if (!date || !startTime || !endTime || !professorId || !roomId) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    if (!availabilityResult || !availabilityResult.professorAvailable || !availabilityResult.candidateAvailable) {
      toast.error('Création impossible : ressources indisponibles');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        reservationCode: `RES-${Date.now()}`,
        reservationDate: `${date}T00:00:00.000Z`,
        startTime: `${date}T${startTime}:00.000Z`,
        endTime: `${date}T${endTime}:00.000Z`,
        inscriptionId: searchResult.inscriptionId,
        professorId,
        roomId,
        status: 'CONFIRMED'
      };

      const res = await api.post('/reservations', payload);
      if (res.status === 201 || res.status === 200) {
        toast.success('Séance réservée avec succès');
        setFormData({
          candidateCode: '',
          formationId: '',
          professorId: '',
          roomId: '',
          date: '',
          startTime: '',
          endTime: ''
        });
        setSelectedCandidate(null);
        setSelectedLearningGroup(null);
        setCandidateFormations([]);
        setSearchResult(null);
        setAvailabilityResult(null);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erreur lors de la réservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProfName = () => {
    if (!selectedLearningGroup?.professor) return 'Non affecté';
    const p = selectedLearningGroup.professor;
    const prenom = p.prenom !== undefined ? p.prenom : (p as any).firstName || '';
    const nom = p.nom !== undefined ? p.nom : (p as any).lastName || '';
    return `${prenom} ${nom}`.trim() || 'Non affecté';
  };

  const handleApprove = (requestId: string) => {
    updateReservationRequest(requestId, 'approved');
    toast.success('Demande approuvée');
  };

  const handleReject = (requestId: string) => {
    updateReservationRequest(requestId, 'rejected');
    toast.success('Demande rejetée');
  };

  const pendingRequests = reservationRequests.filter(r => r.status === 'pending' && r.type !== 'candidate_request');
  const pendingCancelRequests = cancelRequests.filter(r => r.status === 'PENDING');
  const totalPendingCount = pendingRequests.length + pendingCancelRequests.length;

  const unifiedCancelRequests = [
    ...(pendingCancelRequests || []).map(c => {
      let dateVal = 'N/A';
      let timeVal = 'N/A';

      try {
        const dateStr = c?.reservation?.startTime || c?.reservation?.reservationDate;
        if (dateStr) {
          const parsedDate = new Date(dateStr);
          if (!isNaN(parsedDate.getTime())) {
            dateVal = parsedDate.toLocaleDateString('fr-FR');
          }
        }
      } catch (e) {
        console.error("Error formatting date:", e);
      }

      try {
        const timeStr = c?.reservation?.startTime;
        if (timeStr) {
          const parsedTime = new Date(timeStr);
          if (!isNaN(parsedTime.getTime())) {
            timeVal = parsedTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
          }
        }
      } catch (e) {
        console.error("Error formatting time:", e);
      }

      return {
        id: c?.id || '',
        type: 'professor_cancellation' as const,
        professorId: c?.professorId || '',
        candidateId: c?.reservation?.inscription?.candidate?.id || '',
        roomId: c?.reservation?.room?.id || '',
        date: dateVal,
        time: timeVal,
        isDatabaseRequest: true,
        reason: c?.reason || ''
      };
    }),
    ...(pendingRequests || []).filter(r => r && r.type === 'candidate_cancellation').map(r => ({
      id: r.id || '',
      type: 'candidate_cancellation' as const,
      professorId: r.professorId || '',
      candidateId: r.candidateId || '',
      roomId: r.roomId || '',
      date: r.date || 'N/A',
      time: r.time || 'N/A',
      isDatabaseRequest: false,
      reason: ''
    }))
  ];

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
                Recherchez un candidat ou inscription via son code et créez une nouvelle réservation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Candidate Search */}
                <div className="space-y-2">
                  <Label htmlFor="candidateCode">Code candidat ou inscription *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="candidateCode"
                      placeholder="Ex: CAN-2026-9577 ou INS-2026-0001"
                      value={formData.candidateCode}
                      onChange={(e) => handleCandidateCodeChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSearch(formData.candidateCode);
                        }
                      }}
                      required
                    />
                    <Button
                      type="button"
                      onClick={() => handleSearch(formData.candidateCode)}
                      disabled={isSearching}
                    >
                      {isSearching ? 'Recherche...' : 'Rechercher'}
                    </Button>
                  </div>
                </div>

                {/* Group Info */}
                {selectedLearningGroup && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="text-sm text-gray-600">Groupe</p>
                      <button
                        type="button"
                        className="font-bold text-indigo-650 hover:underline text-left cursor-pointer"
                        onClick={() => setIsDetailsOpen(true)}
                      >
                        {selectedLearningGroup.groupName}
                      </button>
                    </div>
                  </div>
                )}

                {/* Reservation Details */}
                {selectedCandidate && searchResult && (
                  <>
                    {candidateFormations.length > 1 && (
                      <div className="space-y-2">
                        <Label htmlFor="formationId">Formation *</Label>
                        <Select
                          value={formData.formationId}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, formationId: value, roomId: '' }))}
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
                                  {formation.matiere} - {formation.niveau}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value, roomId: '' }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="startTime">Heure début *</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={formData.startTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value, roomId: '' }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endTime">Heure fin *</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value, roomId: '' }))}
                          required
                        />
                      </div>
                    </div>

                    {formData.date && formData.startTime && formData.endTime && (
                      <div className="grid grid-cols-1 gap-4">
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
                              {!availabilityResult?.availableRooms || availabilityResult.availableRooms.length === 0 ? (
                                <div className="p-2 text-sm text-gray-500">
                                  {availabilityResult ? "Aucune salle disponible" : "Vérification en cours..."}
                                </div>
                              ) : (
                                availabilityResult.availableRooms.map(room => (
                                  <SelectItem key={room.id} value={room.id}>
                                    Salle {room.numero} (Capacité: {room.capacite || 'N/A'})
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {formData.date && formData.startTime && formData.endTime && (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4 space-y-2">
                        <p className="font-semibold text-sm mb-2 text-gray-700">Statut de disponibilité :</p>
                        {isCheckingAvailability ? (
                          <p className="text-sm text-gray-500">Vérification de disponibilité en cours...</p>
                        ) : availabilityResult ? (
                          <div className="space-y-1 text-sm font-semibold">
                            <p className={!availabilityResult.professorAvailable ? "text-red-600" : "text-green-600"}>
                              {!availabilityResult.professorAvailable
                                ? `✗ Professeur : ${getProfName()} indisponible (Occupé sur ce créneau)`
                                : `✓ Professeur : ${getProfName()} disponible${availabilityResult.isDayOff ? ' (Jour de repos)' : ''}`}
                            </p>
                            {availabilityResult.availableRooms.length === 0 && (
                              <p className="text-red-600 mt-2 font-bold">
                                Aucune salle n'est disponible pour ce créneau.
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-red-500">Impossible de vérifier la disponibilité</p>
                        )}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Réservation...' : 'Réserver la séance'}
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
              {totalPendingCount === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Aucune demande en attente
                </p>
              ) : (
                <div className="space-y-4">
                  {/* Cancellation Requests */}
                  {unifiedCancelRequests.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-red-650">Demandes d'annulation</h3>
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
                          {unifiedCancelRequests.map((request) => {
                            const professor = professors.find(p => p.id === request.professorId);
                            const candidate = candidates.find(c => c.id === request.candidateId);
                            const room = rooms.find(r => r.id === request.roomId);

                            const profFullName = professor ? `${professor.prenom} ${professor.nom}` : 'N/A';
                            const candFullName = candidate ? `${candidate.firstName} ${candidate.lastName}` : 'N/A';

                            return (
                              <TableRow key={request.id}>
                                <TableCell>
                                  <Badge variant={request.type === 'professor_cancellation' ? 'default' : 'secondary'}>
                                    {request.type === 'professor_cancellation' ? 'Professeur' : 'Candidat'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium">
                                  <div>
                                    {request.type === 'professor_cancellation'
                                      ? profFullName
                                      : candFullName
                                    }
                                  </div>
                                  {request.reason && (
                                    <div className="text-xs text-gray-500 font-normal italic mt-0.5">
                                      Motif: {request.reason}
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {candFullName}
                                </TableCell>
                                <TableCell>
                                  {request.date} à {request.time}
                                </TableCell>
                                <TableCell>
                                  Salle {room?.numero || (room && (room as any).roomNumber) || 'N/A'}
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-green-600 border-green-600 hover:bg-green-50"
                                      onClick={() => {
                                        if (request.isDatabaseRequest) {
                                          handleApproveCancelRequest(request.id);
                                        } else {
                                          handleApprove(request.id);
                                        }
                                      }}
                                    >
                                      <Check size={16} className="mr-1" />
                                      Approuver
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-650 border-red-650 hover:bg-red-50"
                                      onClick={() => {
                                        if (request.isDatabaseRequest) {
                                          handleRejectCancelRequest(request.id);
                                        } else {
                                          handleReject(request.id);
                                        }
                                      }}
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
      <LearningGroupDetailsDialog
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        group={selectedLearningGroup}
      />
    </div>
  );
}
