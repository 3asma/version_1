import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';

export default function ProfessorSchedule() {
  const { currentUser, sessions, candidates, professors, rooms, formations, addReservationRequest } = useApp();
  const [selectedDate, setSelectedDate] = useState('2026-03-13');
  const [cancelSessionId, setCancelSessionId] = useState<string | null>(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Time slots for calendar view
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // Get week days
  const getWeekDays = () => {
    const selectedDateObj = new Date(selectedDate);
    const startOfWeek = new Date(selectedDateObj);
    startOfWeek.setDate(selectedDateObj.getDate() - selectedDateObj.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const handleRequestCancellation = () => {
    if (!cancelSessionId) return;

    const session = sessions.find(s => s.id === cancelSessionId);
    if (session) {
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
        candidateId: session.candidateId,
        roomId: session.roomId,
        date: session.date,
        time: session.time,
        type: 'professor_cancellation',
        sessionId: session.id
      });
      toast.success('Demande d\'annulation envoyée à l\'agent de réservation');
    }
    setIsCancelDialogOpen(false);
    setCancelSessionId(null);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Planning des Professeurs</h1>
        <p className="text-gray-500 mt-2">Vue d'ensemble de tous les professeurs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Planning hebdomadaire - Tous les professeurs</CardTitle>
          <CardDescription>
            Sélectionnez une date de référence pour afficher la semaine
          </CardDescription>
          <div className="flex items-center gap-4 mt-4">
            <label className="text-sm text-gray-600">Sélectionner une date de référence :</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* Header with days */}
              <div className="grid grid-cols-8 border border-gray-200">
                <div className="bg-gray-50 p-3 border-r border-gray-200 font-semibold">Heure</div>
                {weekDays.map((day, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 border-r border-gray-200 text-center">
                    <div className="font-semibold">{['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][day.getDay()]}</div>
                    <div className="text-sm text-gray-500">{day.getDate()}/{day.getMonth() + 1}</div>
                  </div>
                ))}
              </div>

              {/* Rows for each time slot */}
              {timeSlots.map((time, timeIdx) => (
                <div key={timeIdx} className="grid grid-cols-8 border-l border-r border-b border-gray-200">
                  <div className="p-3 border-r border-gray-200 font-medium text-sm bg-gray-50">
                    {time}
                  </div>
                  {weekDays.map((day, dayIdx) => {
                    const dateStr = day.toISOString().split('T')[0];
                    const sessionsInSlot = sessions.filter(s =>
                      s.date === dateStr && s.time === time && s.status !== 'cancelled'
                    );

                    return (
                      <div key={dayIdx} className="p-2 border-r border-gray-200 min-h-[120px] space-y-1">
                        {sessionsInSlot.map(session => {
                          const candidate = candidates.find(c => c.id === session.candidateId);
                          const professor = professors.find(p => p.id === session.professorId);
                          const room = rooms.find(r => r.id === session.roomId);
                          const formation = formations.find(f => f.id === session.formationId);
                          const isProfessor = currentUser?.role === 'professor';
                          const canCancel = isProfessor && session.status === 'scheduled';

                          return (
                            <div
                              key={session.id}
                              className={`p-2 rounded-md text-xs border ${
                                session.status === 'completed'
                                  ? 'bg-green-50 border-green-300'
                                  : session.status === 'cancelled'
                                  ? 'bg-red-50 border-red-300'
                                  : 'bg-blue-50 border-blue-300'
                              }`}
                            >
                              <div className="font-semibold text-gray-800 mb-1">
                                {professor?.firstName} {professor?.lastName}
                              </div>
                              <div className="text-gray-600 truncate">
                                {candidate?.firstName} {candidate?.lastName}
                              </div>
                              <div className="text-gray-500 text-[10px]">
                                {formation?.subject}
                              </div>
                              <div className="text-gray-500 text-[10px]">
                                Salle {room?.roomNumber}
                              </div>
                              {session.status === 'completed' && session.attendance && (
                                <Badge
                                  variant={session.attendance === 'present' ? 'default' : 'destructive'}
                                  className="text-[9px] mt-1"
                                >
                                  {session.attendance === 'present' ? 'P' : 'A'}
                                </Badge>
                              )}
                              {canCancel && (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="w-full mt-2 h-6 text-[10px]"
                                  onClick={() => {
                                    setCancelSessionId(session.id);
                                    setIsCancelDialogOpen(true);
                                  }}
                                >
                                  <AlertCircle size={10} className="mr-1" />
                                  Demander annulation
                                </Button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cancel Request Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demande d'annulation</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir demander l'annulation de cette séance ?
              L'agent de réservation sera notifié de votre demande. Note : vous devez faire la demande au moins 24h avant la séance.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleRequestCancellation}>
              Confirmer la demande
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
