import { useState, useEffect } from 'react';
import { useApp, Session, mapReservationToSession } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, User, DoorOpen, Users, BookOpen, Printer, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import api from '../services/api';
import { toast } from 'sonner';

export default function Planning() {
  const { currentUser, sessions, candidates, professors, rooms, formations, cancelSession, refreshPlanning } = useApp();

  // Dynamically initialize selectedDate as local YYYY-MM-DD
  const getTodayString = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayString);
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [selectedFormation, setSelectedFormation] = useState('');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('weekly');

  // Local date-shifting logic (retains local timezone)
  const shiftDate = (days: number) => {
    const [year, month, day] = selectedDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    dateObj.setDate(dateObj.getDate() + days);
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    setSelectedDate(`${y}-${m}-${d}`);
  };

  // Format date to French words
  const formatFrenchDate = (dateObj: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(dateObj);
  };

  // Generate period header text dynamically
  const getPeriodLabel = () => {
    const [year, month, day] = selectedDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);

    if (viewMode === 'daily') {
      return formatFrenchDate(dateObj);
    } else {
      const weekDays = getWeekDays();
      if (weekDays.length === 0) return '';
      // Create local Dates matching the UTC date components of getWeekDays
      const firstLocal = new Date(weekDays[0].getUTCFullYear(), weekDays[0].getUTCMonth(), weekDays[0].getUTCDate());
      const lastLocal = new Date(weekDays[6].getUTCFullYear(), weekDays[6].getUTCMonth(), weekDays[6].getUTCDate());
      return `${formatFrenchDate(firstLocal)} — ${formatFrenchDate(lastLocal)}`;
    }
  };

  // Reload reservations when date selection changes
  useEffect(() => {
    refreshPlanning();
  }, [selectedDate]);

  // Shared reusable Navigation toolbar header HTML
  const renderNavigationHeader = (onPrint?: () => void, isPrintDisabled?: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 w-full mb-6 pb-4 border-b border-gray-100">
      {/* Left Section: Navigation buttons */}
      <div className="flex items-center gap-2 justify-center md:justify-start">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            shiftDate(viewMode === 'daily' ? -1 : -7);
          }}
        >
          ← Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedDate(getTodayString());
          }}
        >
          Aujourd'hui
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            shiftDate(viewMode === 'daily' ? 1 : 7);
          }}
        >
          Suivant →
        </Button>
      </div>

      {/* Center Section: Centered Period label */}
      <div className="text-center">
        <h2 className="text-base font-bold text-gray-800 first-letter:uppercase tracking-tight">
          {getPeriodLabel()}
        </h2>
      </div>

      {/* Right Section: View selector + reference picker + printable trigger */}
      <div className="flex flex-wrap items-center gap-2 justify-center md:justify-end">
        {onPrint && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPrint}
            disabled={isPrintDisabled}
          >
            <Printer size={16} className="mr-2" />
            Imprimer
          </Button>
        )}

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        />

        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Button
            variant={viewMode === 'daily' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('daily')}
            className="rounded-r-none border-r-0"
          >
            Jour
          </Button>
          <Button
            variant={viewMode === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('weekly')}
            className="rounded-l-none"
          >
            Semaine
          </Button>
        </div>
      </div>
    </div>
  );

  const [selectedReservation, setSelectedReservation] = useState<Session | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [editForm, setEditForm] = useState({
    date: '',
    startTime: '',
    endTime: '',
    professorId: '',
    roomId: ''
  });

  // Filter sessions based on current user role
  const getFilteredSessions = () => {
    if (currentUser?.role === 'professor') {
      return sessions.filter(s => s.professorId === currentUser.professorId);
    }
    if (currentUser?.role === 'candidate') {
      return sessions.filter(s => s.candidateId === 'c1');
    }
    return sessions;
  };

  const allSessions = getFilteredSessions();

  console.log("DEBUG: total sessions loaded in app:", sessions.length);
  sessions.forEach(s => {
    console.log(`DEBUG Session detail: id=${s.id}, code=${s.reservationCode || s.inscriptionCode}, date=${s.date}, rawResDate=${s.reservationDate}, time=${s.time}, rawStartTime=${s.startTime}`);
  });

  // Timezone-robust comparison helpers in UTC
  const isSameDay = (dateVal1: string | Date | undefined, dateVal2: string | Date | undefined) => {
    if (!dateVal1 || !dateVal2) return false;
    const d1 = new Date(dateVal1);
    const d2 = new Date(dateVal2);
    return (
      d1.getUTCFullYear() === d2.getUTCFullYear() &&
      d1.getUTCMonth() === d2.getUTCMonth() &&
      d1.getUTCDate() === d2.getUTCDate()
    );
  };

  const isSameTime = (startTimeVal: string | undefined, timeSlot: string) => {
    if (!startTimeVal) return false;
    const date = new Date(startTimeVal);
    const h = String(date.getUTCHours()).padStart(2, '0');
    const m = String(date.getUTCMinutes()).padStart(2, '0');
    return `${h}:${m}` === timeSlot;
  };

  const matchSlot = (session: Session, cellDate: Date, cellTimeStr: string) => {
    const dateMatch = isSameDay(session.reservationDate || session.date, cellDate);
    const timeMatch = session.startTime
      ? isSameTime(session.startTime, cellTimeStr)
      : session.time === cellTimeStr;
    return dateMatch && timeMatch;
  };

  const isToday = (day: Date) => {
    const today = new Date();
    return (
      day.getUTCFullYear() === today.getFullYear() &&
      day.getUTCMonth() === today.getMonth() &&
      day.getUTCDate() === today.getDate()
    );
  };

  const getMinutesFromISO = (isoString: string) => {
    const d = new Date(isoString);
    const h = d.getUTCHours();
    const m = d.getUTCMinutes();
    const startMinutes = 8 * 60; // 08:00
    return (h * 60 + m) - startMinutes;
  };

  interface PlacedEvent {
    session: Session;
    top: number;
    height: number;
    left: number; // in percent
    width: number; // in percent
  }

  const placeEvents = (sessionsInColumn: Session[]): PlacedEvent[] => {
    const events = sessionsInColumn.map(s => {
      let startISO = s.startTime;
      let endISO = s.endTime;

      if (!startISO) {
        // Construct pseudo-ISO string in UTC for mock sessions
        startISO = `${s.date}T${s.time}:00Z`;
      }
      if (!endISO) {
        // Construct endTime from duration and time parameters
        const [h, m] = (s.startTimeText || s.time).split(':').map(Number);
        const endMin = (h * 60 + m + (s.duration || 60));
        const endH = Math.floor(endMin / 60) % 24;
        const endM = endMin % 60;
        const endTimeStr = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
        endISO = `${s.date}T${endTimeStr}:00Z`;
      }

      const startMin = getMinutesFromISO(startISO);
      const endMin = getMinutesFromISO(endISO);

      const slotHeight = 55;
      const top = startMin * (slotHeight / 60);
      const height = (endMin - startMin) * (slotHeight / 60);

      return {
        session: s,
        top,
        height,
        startMin,
        endMin
      };
    });

    events.sort((a, b) => a.startMin - b.startMin);

    const clusters: typeof events[] = [];
    events.forEach(event => {
      let added = false;
      for (const cluster of clusters) {
        const overlaps = cluster.some(c =>
          event.startMin < c.endMin && event.endMin > c.startMin
        );
        if (overlaps) {
          cluster.push(event);
          added = true;
          break;
        }
      }
      if (!added) {
        clusters.push([event]);
      }
    });

    const placedEvents: PlacedEvent[] = [];
    clusters.forEach(cluster => {
      const columns: typeof events[] = [];
      cluster.forEach(event => {
        let colIdx = 0;
        while (true) {
          if (!columns[colIdx]) {
            columns[colIdx] = [];
          }
          const col = columns[colIdx];
          const hasOverlap = col.some(c =>
            event.startMin < c.endMin && event.endMin > c.startMin
          );
          if (!hasOverlap) {
            col.push(event);
            break;
          }
          colIdx++;
        }
      });

      const numCols = columns.length;
      const colWidth = 100 / numCols;

      columns.forEach((col, colIdx) => {
        col.forEach(event => {
          placedEvents.push({
            session: event.session,
            top: event.top,
            height: Math.max(event.height, 15),
            left: colIdx * colWidth,
            width: colWidth - 2
          });
        });
      });
    });

    return placedEvents;
  };

  // Get week days in UTC to avoid local timezone shifts changing dates on .toISOString().split('T')[0]
  const getWeekDays = () => {
    const [year, month, day] = selectedDate.split('-').map(Number);
    const dateObj = new Date(Date.UTC(year, month - 1, day));
    const dayOfWeek = dateObj.getUTCDay();
    const sundayUTC = new Date(dateObj);
    sundayUTC.setUTCDate(dateObj.getUTCDate() - dayOfWeek);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sundayUTC);
      d.setUTCDate(sundayUTC.getUTCDate() + i);
      days.push(d);
    }
    return days;
  };

  const dailySessions = allSessions.filter(s => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const selectedDateUTC = new Date(Date.UTC(y, m - 1, d));
    return isSameDay(s.reservationDate || s.date, selectedDateUTC);
  });

  const weeklySessions = allSessions.filter(s => {
    const weekDays = getWeekDays();
    const sessionDate = new Date(s.reservationDate || s.date);
    const startOfWeek = weekDays[0];
    const endOfWeek = weekDays[6];

    const sTime = Date.UTC(sessionDate.getUTCFullYear(), sessionDate.getUTCMonth(), sessionDate.getUTCDate());
    const startTimeUTC = Date.UTC(startOfWeek.getUTCFullYear(), startOfWeek.getUTCMonth(), startOfWeek.getUTCDate());
    const endTimeUTC = Date.UTC(endOfWeek.getUTCFullYear(), endOfWeek.getUTCMonth(), endOfWeek.getUTCDate());

    return sTime >= startTimeUTC && sTime <= endTimeUTC;
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

  const renderCalendarView = (sessionsList: typeof sessions) => {
    const weekDays = getWeekDays();

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-8 border border-gray-200">
            <div className="bg-gray-50 p-2 border-r border-gray-200 font-semibold text-xs flex items-center justify-center">Heure</div>
            {weekDays.map((day, idx) => {
              const yesToday = isToday(day);
              return (
                <div key={idx} className={`p-2 border-r border-gray-200 text-center ${yesToday ? 'bg-indigo-50/50 text-indigo-700 border-b-2 border-b-indigo-500 font-bold' : 'bg-gray-50'}`}>
                  <div className="font-semibold text-xs">{['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][day.getUTCDay()]}</div>
                  <div className="text-[10px] text-gray-500">{day.getUTCDate()}/{day.getUTCMonth() + 1}</div>
                </div>
              );
            })}
          </div>

          {/* Grid Area */}
          <div className="grid grid-cols-8 border-l border-r border-b border-gray-200 relative">
            {/* Time labels column */}
            <div className="flex flex-col border-r border-gray-200">
              {timeSlots.map((time, idx) => (
                <div key={idx} className="h-[55px] p-2 border-b border-gray-200 font-medium text-xs bg-gray-50 flex items-center justify-center last:border-b-0">
                  {time}
                </div>
              ))}
            </div>

            {/* Day columns */}
            {weekDays.map((day, dayIdx) => {
              const yesToday = isToday(day);
              const sessionsForDay = sessionsList.filter(s =>
                isSameDay(s.reservationDate || s.date, day)
              );
              const placed = placeEvents(sessionsForDay);

              return (
                <div key={dayIdx} className={`relative border-r border-gray-200 h-[605px] last:border-r-0 ${yesToday ? 'bg-indigo-50/10' : ''}`}>
                  {/* Grid background lines */}
                  {timeSlots.map((_, slotIdx) => (
                    <div key={slotIdx} className="h-[55px] border-b border-gray-100 last:border-b-0 pointer-events-none" />
                  ))}

                  {/* Absolute Positioned Event Cards */}
                  {placed.map(({ session, top, height, left, width }) => {
                    const profName = session.professor
                      ? `${session.professor.firstName} ${session.professor.lastName}`
                      : (professors.find(p => p.id === session.professorId)
                        ? `${professors.find(p => p.id === session.professorId)?.firstName} ${professors.find(p => p.id === session.professorId)?.lastName}`
                        : 'Professeur');

                    const formationName = session.formation
                      ? `${session.formation.subject} - ${session.formation.level}`
                      : (formations.find(f => f.id === session.formationId)
                        ? `${formations.find(f => f.id === session.formationId)?.subject} - ${formations.find(f => f.id === session.formationId)?.level}`
                        : 'Formation');

                    const roomName = session.room
                      ? `Salle ${session.room.roomNumber}`
                      : (rooms.find(r => r.id === session.roomId)
                        ? `Salle ${rooms.find(r => r.id === session.roomId)?.roomNumber}`
                        : 'Salle');

                    // Compute times from raw ISO strings
                    const getRefreshedTimeRange = () => {
                      const startISO = session.startTime;
                      const endISO = session.endTime;
                      if (!startISO || !endISO) {
                        const startTime = session.startTimeText || session.time;
                        if (session.endTimeText) {
                          return `${startTime} - ${session.endTimeText}`;
                        }
                        const [h, m] = startTime.split(':').map(Number);
                        const endMin = (h * 60 + m + (session.duration || 60));
                        const endH = Math.floor(endMin / 60) % 24;
                        const endM = endMin % 60;
                        const endTimeStr = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
                        return `${startTime} - ${endTimeStr}`;
                      }
                      const dStart = new Date(startISO);
                      const dEnd = new Date(endISO);
                      const sH = String(dStart.getUTCHours()).padStart(2, '0');
                      const sM = String(dStart.getUTCMinutes()).padStart(2, '0');
                      const eH = String(dEnd.getUTCHours()).padStart(2, '0');
                      const eM = String(dEnd.getUTCMinutes()).padStart(2, '0');
                      return `${sH}:${sM} - ${eH}:${eM}`;
                    };
                    const displayTime = getRefreshedTimeRange();
                    const isSelected = selectedReservation?.id === session.id;

                    return (
                      <div
                        key={session.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReservation(session);
                        }}
                        style={{
                          position: 'absolute',
                          top: `${top}px`,
                          height: `${height}px`,
                          left: `${left}%`,
                          width: `${width}%`,
                          zIndex: isSelected ? 20 : 10
                        }}
                        className={`p-1.5 rounded-md text-[10px] shadow-sm border cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 overflow-hidden flex flex-col justify-start leading-tight ${isSelected
                          ? 'ring-2 ring-indigo-500 ring-offset-1 border-indigo-400 font-medium scale-[1.01]'
                          : ''
                          } ${session.status === 'completed'
                            ? 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100'
                            : session.status === 'cancelled'
                              ? 'bg-red-50 border-red-200 text-red-800 hover:bg-red-100'
                              : 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100'
                          }`}
                      >
                        <div className="font-bold truncate leading-none mb-0.5">{profName} ({session.inscriptionCode || 'Session'})</div>
                        <div className="text-gray-600 truncate leading-none mb-0.5">{formationName}</div>
                        <div className="text-gray-500 truncate leading-none">{roomName}</div>
                        <div className="text-gray-500 font-mono mt-auto pt-0.5 truncate leading-none">{displayTime}</div>
                        {session.status === 'completed' && (
                          <Badge
                            variant={session.attendance === 'present' ? 'default' : 'destructive'}
                            className="text-[9px] px-1 py-0 scale-90 origin-top-left mt-0.5 self-start"
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
        </div>
      </div>
    );
  };

  const renderDailyView = (sessionsList: typeof sessions) => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const selectedDateUTC = new Date(Date.UTC(y, m - 1, d));

    const sessionsForDay = sessionsList.filter(s =>
      isSameDay(s.reservationDate || s.date, selectedDateUTC)
    );

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid border border-gray-200" style={{ gridTemplateColumns: `120px repeat(${professors.length}, 1fr)` }}>
            <div className="bg-gray-50 p-2 border-r border-gray-200 font-semibold text-xs flex items-center justify-center">Heure</div>
            {professors.map((prof) => (
              <div key={prof.id} className="bg-gray-50 p-2 border-r border-gray-200 text-center flex items-center justify-center last:border-r-0">
                <div className="font-semibold text-xs">{prof.firstName} {prof.lastName}</div>
              </div>
            ))}
          </div>

          {/* Grid Area */}
          <div className="grid border-l border-r border-b border-gray-200 relative" style={{ gridTemplateColumns: `120px repeat(${professors.length}, 1fr)` }}>
            {/* Time labels column */}
            <div className="flex flex-col border-r border-gray-200">
              {timeSlots.map((time, idx) => (
                <div key={idx} className="h-[55px] p-2 border-b border-gray-200 font-medium text-xs bg-gray-50 flex items-center justify-center last:border-b-0">
                  {time}
                </div>
              ))}
            </div>

            {/* Professor columns */}
            {professors.map((prof, profIdx) => {
              const sessionsForProf = sessionsForDay.filter(s => s.professorId === prof.id);
              const placed = placeEvents(sessionsForProf);

              return (
                <div key={prof.id} className="relative border-r border-gray-200 h-[605px] last:border-r-0">
                  {/* Grid background lines */}
                  {timeSlots.map((_, slotIdx) => (
                    <div key={slotIdx} className="h-[55px] border-b border-gray-100 last:border-b-0 pointer-events-none" />
                  ))}

                  {/* Absolute Positioned Event Cards */}
                  {placed.map(({ session, top, height, left, width }) => {
                    const profName = session.professor
                      ? `${session.professor.firstName} ${session.professor.lastName}`
                      : (professors.find(p => p.id === session.professorId)
                        ? `${professors.find(p => p.id === session.professorId)?.firstName} ${professors.find(p => p.id === session.professorId)?.lastName}`
                        : 'Professeur');

                    const formationName = session.formation
                      ? `${session.formation.subject} - ${session.formation.level}`
                      : (formations.find(f => f.id === session.formationId)
                        ? `${formations.find(f => f.id === session.formationId)?.subject} - ${formations.find(f => f.id === session.formationId)?.level}`
                        : 'Formation');

                    const roomName = session.room
                      ? `Salle ${session.room.roomNumber}`
                      : (rooms.find(r => r.id === session.roomId)
                        ? `Salle ${rooms.find(r => r.id === session.roomId)?.roomNumber}`
                        : 'Salle');

                    // Compute times from raw ISO strings
                    const getRefreshedTimeRange = () => {
                      const startISO = session.startTime;
                      const endISO = session.endTime;
                      if (!startISO || !endISO) {
                        const startTime = session.startTimeText || session.time;
                        if (session.endTimeText) {
                          return `${startTime} - ${session.endTimeText}`;
                        }
                        const [h, m] = startTime.split(':').map(Number);
                        const endMin = (h * 60 + m + (session.duration || 60));
                        const endH = Math.floor(endMin / 60) % 24;
                        const endM = endMin % 60;
                        const endTimeStr = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
                        return `${startTime} - ${endTimeStr}`;
                      }
                      const dStart = new Date(startISO);
                      const dEnd = new Date(endISO);
                      const sH = String(dStart.getUTCHours()).padStart(2, '0');
                      const sM = String(dStart.getUTCMinutes()).padStart(2, '0');
                      const eH = String(dEnd.getUTCHours()).padStart(2, '0');
                      const eM = String(dEnd.getUTCMinutes()).padStart(2, '0');
                      return `${sH}:${sM} - ${eH}:${eM}`;
                    };
                    const displayTime = getRefreshedTimeRange();
                    const isSelected = selectedReservation?.id === session.id;

                    return (
                      <div
                        key={session.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReservation(session);
                        }}
                        style={{
                          position: 'absolute',
                          top: `${top}px`,
                          height: `${height}px`,
                          left: `${left}%`,
                          width: `${width}%`,
                          zIndex: isSelected ? 20 : 10
                        }}
                        className={`p-1.5 rounded-md text-[10px] shadow-sm border cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 overflow-hidden flex flex-col justify-start leading-tight ${isSelected
                          ? 'ring-2 ring-indigo-500 ring-offset-1 border-indigo-400 font-medium scale-[1.01]'
                          : ''
                          } ${session.status === 'completed'
                            ? 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100'
                            : session.status === 'cancelled'
                              ? 'bg-red-50 border-red-200 text-red-800 hover:bg-red-100'
                              : 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100'
                          }`}
                      >
                        <div className="font-bold truncate leading-none mb-0.5">{profName} ({session.inscriptionCode || 'Session'})</div>
                        <div className="text-gray-600 truncate leading-none mb-0.5">{formationName}</div>
                        <div className="text-gray-500 truncate leading-none">{roomName}</div>
                        <div className="text-gray-500 font-mono mt-auto pt-0.5 truncate leading-none">{displayTime}</div>
                        {session.status === 'completed' && (
                          <Badge
                            variant={session.attendance === 'present' ? 'default' : 'destructive'}
                            className="text-[9px] px-1 py-0 scale-90 origin-top-left mt-0.5 self-start"
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
        </div>
      </div>
    );
  };

  const handleOpenEdit = (session: Session) => {
    const startHM = session.startTimeText || session.time;
    let endHM = session.endTimeText;
    if (!endHM) {
      const [h, m] = startHM.split(':').map(Number);
      const minutes = h * 60 + m + (session.duration || 60);
      const endH = Math.floor(minutes / 60) % 24;
      const endM = minutes % 60;
      endHM = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
    }

    setEditingSession(session);
    setEditForm({
      date: session.date,
      startTime: startHM,
      endTime: endHM,
      professorId: session.professorId,
      roomId: session.roomId
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSession) return;

    try {
      const payload = {
        reservationDate: `${editForm.date}T00:00:00.000Z`,
        startTime: `${editForm.date}T${editForm.startTime}:00.000Z`,
        endTime: `${editForm.date}T${editForm.endTime}:00.000Z`,
        professorId: editForm.professorId,
        roomId: editForm.roomId
      };

      const response = await api.patch(`/reservations/${editingSession.id}`, payload);
      if (response.data.message === 'success') {
        toast.success('Réservation modifiée avec succès');
        const freshSessions = await refreshPlanning();

        if (freshSessions) {
          const freshSel = freshSessions.find(s => s.id === editingSession.id);
          if (freshSel) {
            setSelectedReservation(freshSel);
          } else {
            const updatedRaw = response.data.data;
            const updatedSession = mapReservationToSession(updatedRaw);
            setSelectedReservation(updatedSession);
          }
        } else {
          const updatedRaw = response.data.data;
          const updatedSession = mapReservationToSession(updatedRaw);
          setSelectedReservation(updatedSession);
        }

        setIsEditDialogOpen(false);
        setEditingSession(null);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Erreur lors de la modification de la réservation');
    }
  };

  const handleCancelReservation = async () => {
    if (!selectedReservation) return;

    try {
      await cancelSession(selectedReservation.id);
      toast.success('Réservation annulée avec succès');
      setSelectedReservation(null);
      setIsCancelConfirmOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || "Erreur lors de l'annulation de la réservation");
    }
  };

  const selectedCandidateObj = selectedReservation
    ? (selectedReservation.candidate
      ? `${selectedReservation.candidate.firstName} ${selectedReservation.candidate.lastName}`
      : (candidates.find(c => c.id === selectedReservation.candidateId)
        ? `${candidates.find(c => c.id === selectedReservation.candidateId)?.firstName} ${candidates.find(c => c.id === selectedReservation.candidateId)?.lastName}`
        : 'Candidat non trouvé'))
    : '';

  const selectedProfessorObj = selectedReservation
    ? (selectedReservation.professor
      ? `${selectedReservation.professor.firstName} ${selectedReservation.professor.lastName}`
      : (professors.find(p => p.id === selectedReservation.professorId)
        ? `${professors.find(p => p.id === selectedReservation.professorId)?.firstName} ${professors.find(p => p.id === selectedReservation.professorId)?.lastName}`
        : 'Professeur non trouvé'))
    : '';

  const selectedRoomObj = selectedReservation
    ? (selectedReservation.room
      ? `Salle ${selectedReservation.room.roomNumber}`
      : (rooms.find(r => r.id === selectedReservation.roomId)
        ? `Salle ${rooms.find(r => r.id === selectedReservation.roomId)?.roomNumber}`
        : 'Salle non trouvée'))
    : '';

  const selectedFormationObj = selectedReservation
    ? (selectedReservation.formation
      ? `${selectedReservation.formation.subject} - ${selectedReservation.formation.level}`
      : (formations.find(f => f.id === selectedReservation.formationId)
        ? `${formations.find(f => f.id === selectedReservation.formationId)?.subject} - ${formations.find(f => f.id === selectedReservation.formationId)?.level}`
        : 'Formation non trouvée'))
    : '';

  return (
    <div className="p-4" onClick={() => setSelectedReservation(null)}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Planning</h1>
        <p className="text-gray-500 text-xs mt-1">Consultation des séances programmées</p>
      </div>

      <Tabs defaultValue="weekly" className="space-y-3">
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
            <CardHeader className="pb-1">
              <CardTitle>Planning hebdomadaire</CardTitle>
            </CardHeader>
            <CardContent>
              {renderNavigationHeader(handlePrint)}
              {viewMode === 'daily' ? (
                renderDailyView(dailySessions)
              ) : (
                renderCalendarView(weeklySessions)
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Formation Planning */}
        {(currentUser?.role === 'agent_reception' || currentUser?.role === 'agent_reservation' || currentUser?.role === 'admin') && (
          <TabsContent value="formation">
            <Card>
              <CardHeader className="pb-1">
                <CardTitle>Planning par formation</CardTitle>
              </CardHeader>
              <CardContent>
                {renderNavigationHeader(handlePrint, !selectedFormation)}
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
              <CardHeader className="pb-1">
                <CardTitle>Planning par professeur</CardTitle>
              </CardHeader>
              <CardContent>
                {renderNavigationHeader(handlePrint, !selectedProfessor)}
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
              <CardHeader className="pb-1">
                <CardTitle>Planning par salle</CardTitle>
              </CardHeader>
              <CardContent>
                {renderNavigationHeader(handlePrint, !selectedRoom)}
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
              <CardHeader className="pb-1">
                <CardTitle>Planning par candidat</CardTitle>
              </CardHeader>
              <CardContent>
                {renderNavigationHeader(handlePrint, !selectedCandidate)}
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
                ) : (
                  renderCalendarView(candidateSessions)
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Reservation Details Card */}
      <Card className="mt-8 shadow-md border-t-4 border-t-indigo-600" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="text-indigo-600" size={20} />
            Informations de la réservation
          </CardTitle>
          <CardDescription>
            Détails complets de la séance sélectionnée
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedReservation ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="text-gray-500 w-1/2 font-medium text-sm">N° réservation :</span>
                  <span className="font-semibold text-gray-800 text-sm font-mono">{selectedReservation.reservationCode || '-'}</span>
                </div>
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="text-gray-500 w-1/2 font-medium text-sm">N° inscription :</span>
                  <span className="font-semibold text-gray-800 text-sm font-mono">{selectedReservation.inscriptionCode || '-'}</span>
                </div>
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="text-gray-500 w-1/2 font-medium text-sm">Candidat :</span>
                  <span className="font-semibold text-gray-800 text-sm">{selectedCandidateObj}</span>
                </div>
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="text-gray-500 w-1/2 font-medium text-sm">Formation :</span>
                  <span className="font-semibold text-gray-800 text-sm">{selectedFormationObj}</span>
                </div>
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="text-gray-500 w-1/2 font-medium text-sm">Professeur :</span>
                  <span className="font-semibold text-gray-800 text-sm">{selectedProfessorObj}</span>
                </div>
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="text-gray-500 w-1/2 font-medium text-sm">Salle :</span>
                  <span className="font-semibold text-gray-800 text-sm">{selectedRoomObj}</span>
                </div>
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="text-gray-500 w-1/2 font-medium text-sm">Date :</span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {selectedReservation.date ? new Date(selectedReservation.date).toLocaleDateString('fr-FR') : '-'}
                  </span>
                </div>
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="text-gray-500 w-1/2 font-medium text-sm">Heure début :</span>
                  <span className="font-semibold text-gray-800 text-sm font-mono">{selectedReservation.startTimeText || selectedReservation.time}</span>
                </div>
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="text-gray-500 w-1/2 font-medium text-sm">Heure fin :</span>
                  <span className="font-semibold text-gray-800 text-sm font-mono">
                    {(() => {
                      if (selectedReservation.endTimeText) return selectedReservation.endTimeText;
                      const startTime = selectedReservation.startTimeText || selectedReservation.time;
                      const [h, m] = startTime.split(':').map(Number);
                      const endMin = (h * 60 + m + (selectedReservation.duration || 60));
                      const endH = Math.floor(endMin / 60) % 24;
                      const endM = endMin % 60;
                      return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
                    })()}
                  </span>
                </div>
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="text-gray-500 w-1/2 font-medium text-sm">Mode d'apprentissage :</span>
                  <span className="font-semibold text-gray-800 text-sm capitalize">
                    {selectedReservation.learningMode?.toLowerCase() || '-'}
                  </span>
                </div>
                <div className="flex border-b border-gray-100 pb-2 col-span-1 md:col-span-2">
                  <span className="text-gray-500 w-1/4 md:w-1/4 font-medium text-sm">Statut :</span>
                  <span>
                    <Badge
                      variant={
                        selectedReservation.status === 'completed'
                          ? 'default'
                          : selectedReservation.status === 'cancelled'
                            ? 'destructive'
                            : 'secondary'
                      }
                      className="capitalize"
                    >
                      {selectedReservation.status === 'completed'
                        ? 'complétée'
                        : selectedReservation.status === 'cancelled'
                          ? 'annulée'
                          : 'programmée'}
                    </Badge>
                  </span>
                </div>
              </div>

              {(currentUser?.role === 'agent_reservation' || currentUser?.role === 'admin') && (
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    onClick={() => handleOpenEdit(selectedReservation)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setIsCancelConfirmOpen(true)}
                  >
                    Annuler
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-6 italic">
              Sélectionnez une réservation dans le planning pour afficher ses informations.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Edit Reservation Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Modifier la réservation</DialogTitle>
            <DialogDescription>
              Modifiez la date, les heures, le professeur ou la salle de la séance.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="edit-date">Date *</Label>
              <Input
                id="edit-date"
                type="date"
                value={editForm.date}
                onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-start">Heure début *</Label>
                <Input
                  id="edit-start"
                  type="time"
                  value={editForm.startTime}
                  onChange={(e) => setEditForm(prev => ({ ...prev, startTime: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-end">Heure fin *</Label>
                <Input
                  id="edit-end"
                  type="time"
                  value={editForm.endTime}
                  onChange={(e) => setEditForm(prev => ({ ...prev, endTime: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-professor">Professeur *</Label>
              <Select
                value={editForm.professorId}
                onValueChange={(val) => setEditForm(prev => ({ ...prev, professorId: val }))}
              >
                <SelectTrigger id="edit-professor">
                  <SelectValue placeholder="Choisir un professeur" />
                </SelectTrigger>
                <SelectContent>
                  {professors.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.firstName} {p.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-room">Salle *</Label>
              <Select
                value={editForm.roomId}
                onValueChange={(val) => setEditForm(prev => ({ ...prev, roomId: val }))}
              >
                <SelectTrigger id="edit-room">
                  <SelectValue placeholder="Choisir une salle" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      Salle {r.roomNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingSession(null);
                }}
              >
                Annuler
              </Button>
              <Button type="submit">
                Enregistrer
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Cancel Reservation Confirmation Dialog */}
      <AlertDialog open={isCancelConfirmOpen} onOpenChange={setIsCancelConfirmOpen}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle size={20} />
              Confirmer l'annulation
            </AlertDialogTitle>
            <AlertDialogDescription>
              Voulez-vous vraiment annuler cette réservation ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsCancelConfirmOpen(false)}>
              Non, conserver
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90 text-white"
              onClick={handleCancelReservation}
            >
              Oui, annuler
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div >
  );
}
