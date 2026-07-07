import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, User, DoorOpen, Users, BookOpen, Printer } from 'lucide-react';

export default function Planning() {
  const { currentUser, sessions, candidates, professors, rooms, formations } = useApp();
  const [selectedDate, setSelectedDate] = useState('2026-03-13');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [selectedFormation, setSelectedFormation] = useState('');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('weekly');

  // Filter sessions based on current user role
  const getFilteredSessions = () => {
    if (currentUser?.role === 'professor') {
      return sessions.filter(s => s.professorId === 'p1');
    }
    if (currentUser?.role === 'candidate') {
      return sessions.filter(s => s.candidateId === 'c1');
    }
    return sessions;
  };

  const allSessions = getFilteredSessions();

  const dailySessions = allSessions.filter(s => s.date === selectedDate);

  const weeklySessions = allSessions.filter(s => {
    const sessionDate = new Date(s.date);
    const selectedDateObj = new Date(selectedDate);
    const startOfWeek = new Date(selectedDateObj);
    startOfWeek.setDate(selectedDateObj.getDate() - selectedDateObj.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
  });

  const professorSessions = selectedProfessor
    ? allSessions.filter(s => s.professorId === selectedProfessor)
    : [];

  const roomSessions = selectedRoom
    ? allSessions.filter(s => s.roomId === selectedRoom)
    : [];

  const candidateSessions = selectedCandidate
    ? allSessions.filter(s => s.candidateId === selectedCandidate)
    : [];

  const formationSessions = selectedFormation
    ? allSessions.filter(s => s.formationId === selectedFormation)
    : [];

  // Print function
  const handlePrint = () => {
    window.print();
  };

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

  const renderCalendarView = (sessionsList: typeof sessions) => {
    const weekDays = getWeekDays();

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 border border-gray-200">
            <div className="bg-gray-50 p-3 border-r border-gray-200 font-semibold">Heure</div>
            {weekDays.map((day, idx) => (
              <div key={idx} className="bg-gray-50 p-3 border-r border-gray-200 text-center">
                <div className="font-semibold">{['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][day.getDay()]}</div>
                <div className="text-sm text-gray-500">{day.getDate()}/{day.getMonth() + 1}</div>
              </div>
            ))}
          </div>

          {timeSlots.map((time, timeIdx) => (
            <div key={timeIdx} className="grid grid-cols-8 border-l border-r border-b border-gray-200">
              <div className="p-3 border-r border-gray-200 font-medium text-sm bg-gray-50">
                {time}
              </div>
              {weekDays.map((day, dayIdx) => {
                const dateStr = day.toISOString().split('T')[0];
                const sessionsInSlot = sessionsList.filter(s =>
                  s.date === dateStr && s.time === time
                );

                return (
                  <div key={dayIdx} className="p-2 border-r border-gray-200 min-h-[80px]">
                    {sessionsInSlot.map(session => {
                      const candidate = candidates.find(c => c.id === session.candidateId);
                      const professor = professors.find(p => p.id === session.professorId);
                      const room = rooms.find(r => r.id === session.roomId);
                      const formation = formations.find(f => f.id === session.formationId);

                      return (
                        <div
                          key={session.id}
                          className={`p-2 rounded-md text-xs mb-1 ${
                            session.status === 'completed'
                              ? 'bg-green-100 border border-green-300'
                              : session.status === 'cancelled'
                              ? 'bg-red-100 border border-red-300'
                              : 'bg-blue-100 border border-blue-300'
                          }`}
                        >
                          <div className="font-semibold truncate">
                            {currentUser?.role === 'candidate'
                              ? formation?.subject
                              : `${candidate?.firstName} ${candidate?.lastName}`
                            }
                          </div>
                          <div className="text-gray-600 truncate">
                            {currentUser?.role === 'professor'
                              ? formation?.subject
                              : `${professor?.firstName} ${professor?.lastName}`
                            }
                          </div>
                          <div className="text-gray-500">Salle {room?.roomNumber}</div>
                          {session.status === 'completed' && (
                            <Badge
                              variant={session.attendance === 'present' ? 'default' : 'destructive'}
                              className="text-[10px] mt-1"
                            >
                              {session.attendance === 'present' ? 'P' : 'A'}
                            </Badge>
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
    );
  };

  const renderDailyView = (sessionsList: typeof sessions) => {
    const sessionsForDay = sessionsList.filter(s => s.date === selectedDate);

    // Group sessions by professor and time
    const sessionsByProfAndTime = new Map<string, Map<string, typeof sessions>>();

    professors.forEach(prof => {
      const timeMap = new Map<string, typeof sessions>();
      timeSlots.forEach(time => {
        timeMap.set(time, []);
      });
      sessionsByProfAndTime.set(prof.id, timeMap);
    });

    sessionsForDay.forEach(session => {
      const profMap = sessionsByProfAndTime.get(session.professorId);
      if (profMap) {
        const sessionsAtTime = profMap.get(session.time);
        if (sessionsAtTime) {
          sessionsAtTime.push(session);
        }
      }
    });

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid border border-gray-200" style={{ gridTemplateColumns: `120px repeat(${professors.length}, 1fr)` }}>
            <div className="bg-gray-50 p-3 border-r border-gray-200 font-semibold">Heure</div>
            {professors.map((prof) => (
              <div key={prof.id} className="bg-gray-50 p-3 border-r border-gray-200 text-center">
                <div className="font-semibold">{prof.firstName} {prof.lastName}</div>
              </div>
            ))}
          </div>

          {timeSlots.map((time, timeIdx) => (
            <div key={timeIdx} className="grid border-l border-r border-b border-gray-200" style={{ gridTemplateColumns: `120px repeat(${professors.length}, 1fr)` }}>
              <div className="p-3 border-r border-gray-200 font-medium text-sm bg-gray-50">
                {time}
              </div>
              {professors.map((prof) => {
                const sessionsInSlot = sessionsByProfAndTime.get(prof.id)?.get(time) || [];

                return (
                  <div key={prof.id} className="p-2 border-r border-gray-200 min-h-[80px]">
                    {sessionsInSlot.map(session => {
                      const candidate = candidates.find(c => c.id === session.candidateId);
                      const room = rooms.find(r => r.id === session.roomId);
                      const formation = formations.find(f => f.id === session.formationId);

                      return (
                        <div
                          key={session.id}
                          className={`p-2 rounded-md text-xs mb-1 ${
                            session.status === 'completed'
                              ? 'bg-green-100 border border-green-300'
                              : session.status === 'cancelled'
                              ? 'bg-red-100 border border-red-300'
                              : 'bg-blue-100 border border-blue-300'
                          }`}
                        >
                          <div className="font-semibold truncate">
                            {candidate?.firstName} {candidate?.lastName}
                          </div>
                          <div className="text-gray-600 truncate">
                            {formation?.subject}
                          </div>
                          <div className="text-gray-500">Salle {room?.roomNumber}</div>
                          {session.status === 'completed' && (
                            <Badge
                              variant={session.attendance === 'present' ? 'default' : 'destructive'}
                              className="text-[10px] mt-1"
                            >
                              {session.attendance === 'present' ? 'P' : 'A'}
                            </Badge>
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
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Planning</h1>
        <p className="text-gray-500 mt-2">Consultation des séances programmées</p>
      </div>

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList>
          <TabsTrigger value="weekly">
            <Calendar size={18} className="mr-2" />
            Calendrier hebdomadaire
          </TabsTrigger>
          {(currentUser?.role === 'agent_reception' || currentUser?.role === 'agent_reservation' || currentUser?.role === 'admin') && (
            <>
              <TabsTrigger value="formation">
                <BookOpen size={18} className="mr-2" />
                Par formation
              </TabsTrigger>
              <TabsTrigger value="professor">
                <User size={18} className="mr-2" />
                Par professeur
              </TabsTrigger>
              <TabsTrigger value="room">
                <DoorOpen size={18} className="mr-2" />
                Par salle
              </TabsTrigger>
              <TabsTrigger value="candidate">
                <Users size={18} className="mr-2" />
                Par candidat
              </TabsTrigger>
            </>
          )}
        </TabsList>

        {/* Weekly Calendar */}
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <span>Planning hebdomadaire</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrint}
                    >
                      <Printer size={16} className="mr-2" />
                      Imprimer
                    </Button>
                    <Button
                      variant={viewMode === 'daily' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('daily')}
                    >
                      Jour
                    </Button>
                    <Button
                      variant={viewMode === 'weekly' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('weekly')}
                    >
                      Semaine
                    </Button>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm text-gray-600">Sélectionner une date de référence :</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md"
                />
              </div>
              {viewMode === 'daily' ? (
                dailySessions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucune séance programmée ce jour
                  </p>
                ) : (
                  renderDailyView(allSessions)
                )
              ) : (
                weeklySessions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucune séance programmée cette semaine
                  </p>
                ) : (
                  renderCalendarView(weeklySessions)
                )
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Formation Planning */}
        {(currentUser?.role === 'agent_reception' || currentUser?.role === 'agent_reservation' || currentUser?.role === 'admin') && (
          <TabsContent value="formation">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center justify-between">
                    <span>Planning par formation</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrint}
                      disabled={!selectedFormation}
                    >
                      <Printer size={16} className="mr-2" />
                      Imprimer
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm text-gray-600">Sélectionner une formation :</label>
                  <Select value={selectedFormation || 'none'} onValueChange={(value) => setSelectedFormation(value === 'none' ? '' : value)}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Choisir une formation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Choisir une formation</SelectItem>
                      {formations.map(formation => (
                        <SelectItem key={formation.id} value={formation.id}>
                          {formation.subject} - {formation.level} ({formation.type === 'group' ? 'Groupe' : formation.type === 'pair' ? 'Binôme' : 'Individuel'})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {!selectedFormation ? (
                  <p className="text-center text-gray-500 py-8">
                    Sélectionnez une formation pour voir son planning
                  </p>
                ) : formationSessions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucune séance programmée pour cette formation
                  </p>
                ) : (
                  renderCalendarView(formationSessions)
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Professor Planning */}
        {(currentUser?.role === 'agent_reception' || currentUser?.role === 'agent_reservation' || currentUser?.role === 'admin') && (
          <TabsContent value="professor">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center justify-between">
                    <span>Planning par professeur</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrint}
                      disabled={!selectedProfessor}
                    >
                      <Printer size={16} className="mr-2" />
                      Imprimer
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm text-gray-600">Sélectionner un professeur :</label>
                  <Select value={selectedProfessor || 'none'} onValueChange={(value) => setSelectedProfessor(value === 'none' ? '' : value)}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Choisir un professeur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Choisir un professeur</SelectItem>
                      {professors.map(prof => (
                        <SelectItem key={prof.id} value={prof.id}>
                          {prof.firstName} {prof.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {!selectedProfessor ? (
                  <p className="text-center text-gray-500 py-8">
                    Sélectionnez un professeur pour voir son planning
                  </p>
                ) : professorSessions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucune séance programmée pour ce professeur
                  </p>
                ) : (
                  renderCalendarView(professorSessions)
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Room Planning */}
        {(currentUser?.role === 'agent_reception' || currentUser?.role === 'agent_reservation' || currentUser?.role === 'admin') && (
          <TabsContent value="room">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center justify-between">
                    <span>Planning par salle</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrint}
                      disabled={!selectedRoom}
                    >
                      <Printer size={16} className="mr-2" />
                      Imprimer
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm text-gray-600">Sélectionner une salle :</label>
                  <Select value={selectedRoom || 'none'} onValueChange={(value) => setSelectedRoom(value === 'none' ? '' : value)}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Choisir une salle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Choisir une salle</SelectItem>
                      {rooms.map(room => (
                        <SelectItem key={room.id} value={room.id}>
                          Salle {room.roomNumber} ({room.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {!selectedRoom ? (
                  <p className="text-center text-gray-500 py-8">
                    Sélectionnez une salle pour voir son planning
                  </p>
                ) : roomSessions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucune séance programmée dans cette salle
                  </p>
                ) : (
                  renderCalendarView(roomSessions)
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Candidate Planning */}
        {(currentUser?.role === 'agent_reception' || currentUser?.role === 'agent_reservation' || currentUser?.role === 'admin') && (
          <TabsContent value="candidate">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center justify-between">
                    <span>Planning par candidat</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrint}
                      disabled={!selectedCandidate}
                    >
                      <Printer size={16} className="mr-2" />
                      Imprimer
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm text-gray-600">Sélectionner un candidat :</label>
                  <Select value={selectedCandidate || 'none'} onValueChange={(value) => setSelectedCandidate(value === 'none' ? '' : value)}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Choisir un candidat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Choisir un candidat</SelectItem>
                      {candidates.map(cand => (
                        <SelectItem key={cand.id} value={cand.id}>
                          {cand.firstName} {cand.lastName} ({cand.candidateCode})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {!selectedCandidate ? (
                  <p className="text-center text-gray-500 py-8">
                    Sélectionnez un candidat pour voir son planning
                  </p>
                ) : candidateSessions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucune séance programmée pour ce candidat
                  </p>
                ) : (
                  renderCalendarView(candidateSessions)
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
