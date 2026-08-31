import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { CheckCircle, XCircle, UserCheck, UserX, Loader2, AlertCircle, FileText } from 'lucide-react';
import { toast } from 'sonner';
import api, { exportPDF } from '../services/api';

interface AttendanceStudent {
  candidateId: string;
  candidateCode: string;
  firstName: string;
  lastName: string;
  status: 'PRESENT' | 'ABSENT' | null;
  attendanceId: string | null;
  note: string | null;
}

export default function Attendance() {
  const { currentUser, sessions, inscriptions, refreshPlanning } = useApp();

  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [students, setStudents] = useState<AttendanceStudent[]>([]);
  const [initialStatuses, setInitialStatuses] = useState<Record<string, 'PRESENT' | 'ABSENT' | null>>({});
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [saving, setSaving] = useState(false);

  // Retrieve professorId depending on user role
  const professorId = currentUser?.role === 'professor' ? currentUser.professorId : null;
  const isAdmin = currentUser?.role === 'admin';

  // Filter completed and past scheduled sessions (Admins see all sessions)
  const completedSessions = sessions.filter(s =>
    s.status === 'completed' &&
    (!professorId || s.professorId === professorId)
  );

  const pastSessions = sessions.filter(s => {
    if (s.status !== 'scheduled') return false;
    if (professorId && s.professorId !== professorId) return false;

    // Check if session is past (based on date & time)
    const sessionDate = new Date(s.date + ' ' + (s.time || '00:00'));
    const now = new Date();
    return sessionDate < now;
  });

  // Open modal and fetch students from database
  const handleOpenAttendanceModal = async (session: any) => {
    setSelectedSession(session);
    setLoadingStudents(true);
    setStudents([]);
    try {
      const response = await api.get(`/attendances/reservation/${session.id}`);
      if (response.data.message === 'success') {
        const fetchedStudents = response.data.data.students || [];
        setStudents(fetchedStudents);

        // Keep record of initial status to track if we need to deduct hours.
        const statuses: Record<string, 'PRESENT' | 'ABSENT' | null> = {};
        fetchedStudents.forEach((std: AttendanceStudent) => {
          statuses[std.candidateId] = std.status;
        });
        setInitialStatuses(statuses);
      } else {
        toast.error('Erreur lors du chargement des candidats.');
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Erreur lors du chargement des candidats.');
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleStatusChange = (candidateId: string, status: 'PRESENT' | 'ABSENT') => {
    if (isAdmin) return; // Prevent admin status changes
    setStudents(prev =>
      prev.map(std => (std.candidateId === candidateId ? { ...std, status } : std))
    );
  };



  // Submit attendance records
  const handleSaveAttendance = async () => {
    if (!selectedSession || isAdmin) return;

    // Verify all candidates have been marked
    const unmarked = students.filter(s => !s.status);
    if (unmarked.length > 0) {
      toast.error('Veuillez marquer la présence pour tous les candidats.');
      return;
    }

    setSaving(true);
    try {
      // 1. Process candidate hour deductions for newly marked present candidates
      const presentDeductionPromises = students
        .filter(std => std.status === 'PRESENT' && initialStatuses[std.candidateId] !== 'PRESENT')
        .map(async std => {
          // Look up active inscription for candidate and formation
          const inscription = inscriptions.find(ins =>
            ins.candidateId === std.candidateId &&
            ins.formationId === selectedSession.formationId &&
            (ins.status === 'ACTIVE' || ins.status === 'ASSIGNED')
          );
          if (inscription) {
            const hoursToDeduct = selectedSession.duration / 60;
            try {
              await api.post(`/inscriptions/${inscription.id}/deduct-hours`, { hours: hoursToDeduct });
            } catch (err) {
              console.error(`Failed to deduct hours for inscription ${inscription.id}`, err);
            }
          }
        });

      await Promise.all(presentDeductionPromises);

      // 2. Post attendance records (this also sets reservation status to COMPLETED)
      const payload = students.map(std => ({
        candidateId: std.candidateId,
        status: std.status,
        note: std.note || ''
      }));

      const res = await api.post(`/attendances/reservation/${selectedSession.id}`, {
        attendances: payload
      });

      if (res.data.message === 'success') {
        toast.success('Présences enregistrées avec succès !');
        // Refresh context data
        await refreshPlanning();
        setSelectedSession(null);
      } else {
        toast.error('Erreur lors de l\'enregistrement.');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Erreur lors de l\'enregistrement.');
    } finally {
      setSaving(false);
    }
  };

  const handleExportPDF = () => {
    if (!selectedSession) return;
    const dateStr = selectedSession.date || 'attendance';
    const refSuffix = selectedSession.reservationCode ? `${selectedSession.reservationCode}_` : '';
    const filename = `presence_${refSuffix}${dateStr}.pdf`;
    exportPDF(`/attendances/reservation/${selectedSession.id}/pdf`, filename);
  };

  return (
    <div className="p-8">
      <div className="mb-4">
        {isAdmin && (
          <Badge className="bg-amber-100 text-amber-800 border border-amber-300 font-medium px-3 py-1 mb-3">
            Mode Consultation (Lecture seule)
          </Badge>
        )}
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isAdmin ? 'Consultation des Présences' : 'Gestion des Présences'}
        </h1>
        <p className="text-gray-500 mt-2">
          {isAdmin
            ? 'Consulter l\'historique et les feuilles de présence de toutes les séances et formations.'
            : 'Enregistrer et suivre les présences des candidats pour vos séances de cours.'}
        </p>
      </div>

      {/* Séances à marquer */}
      <Card className="mb-8 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-indigo-950">
            <CheckCircle className="text-indigo-600" size={22} />
            Séances en attente
          </CardTitle>
          <CardDescription>
            {isAdmin
              ? 'Séances passées sans marquage de présence effectué par les professeurs'
              : 'Vos séances passées en attente de marquage de présence'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pastSessions.length === 0 ? (
            <div className="text-center text-gray-500 py-10 flex flex-col items-center justify-center gap-2">
              <CheckCircle className="text-emerald-500 w-10 h-10" />
              <span>Aucune séance passée en attente.</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead>Date</TableHead>
                    <TableHead>Heure</TableHead>
                    <TableHead>Code Séance</TableHead>
                    <TableHead>Professeur</TableHead>
                    <TableHead>Formation</TableHead>
                    <TableHead>Salle</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastSessions.map((session) => {
                    const professor: any = session.professor || {};
                    const room: any = session.room || {};
                    const formation: any = session.formation || {};

                    return (
                      <TableRow key={session.id} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell className="font-semibold text-gray-700">{session.date}</TableCell>
                        <TableCell className="text-gray-600">{session.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono text-indigo-700 bg-indigo-50 border-indigo-200">
                            {session.reservationCode || 'RES-REF'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700 font-medium">
                          {professor.firstName || ''} {professor.lastName || ''}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          <div>
                            <div className="font-medium">{formation.subject || 'Cours'}</div>
                            <div className="text-xs text-gray-400 capitalize">{formation.level || ''} ({session.learningMode || 'Groupe'})</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">Salle {room.roomNumber || 'N/A'}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-all"
                            onClick={() => handleOpenAttendanceModal(session)}
                          >
                            {isAdmin ? 'Consulter' : 'Appeler / Marquer'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Historique des séances complétées */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-indigo-950">
            <FileText className="text-indigo-600" size={22} />
            Historique des présences
          </CardTitle>
          <CardDescription>
            {isAdmin
              ? 'Toutes les séances complétées archivées dans le système'
              : 'Vos séances complétées avec les présences archivées'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {completedSessions.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              Aucune séance complétée
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead>Date</TableHead>
                    <TableHead>Heure</TableHead>
                    <TableHead>Code Séance</TableHead>
                    <TableHead>Professeur</TableHead>
                    <TableHead>Formation</TableHead>
                    <TableHead>Salle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedSessions
                    .sort((a, b) => new Date(b.date + ' ' + (b.time || '00:00')).getTime() - new Date(a.date + ' ' + (a.time || '00:00')).getTime())
                    .map((session) => {
                      const professor: any = session.professor || {};
                      const room: any = session.room || {};
                      const formation: any = session.formation || {};

                      return (
                        <TableRow key={session.id} className="hover:bg-gray-50/50 transition-colors">
                          <TableCell className="font-semibold text-gray-700">{session.date}</TableCell>
                          <TableCell className="text-gray-600">{session.time}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono text-gray-600 bg-gray-50">
                              {session.reservationCode || 'RES-REF'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700 font-medium">
                            {professor.firstName || ''} {professor.lastName || ''}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            <div>
                              <div className="font-medium">{formation.subject || 'Cours'}</div>
                              <div className="text-xs text-gray-400 capitalize">{formation.level || ''} ({session.learningMode || 'Groupe'})</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">Salle {room.roomNumber || 'N/A'}</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-100 text-emerald-800 border bg-emerald-50 border-emerald-200">
                              Terminé
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 font-medium"
                              onClick={() => handleOpenAttendanceModal(session)}
                            >
                              {isAdmin ? 'Consulter' : 'Détails / Modifier'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal - Attendance Sheet (Fiche de présence) */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <Card className="w-full max-w-2xl shadow-2xl bg-white border border-gray-100 flex flex-col max-h-[90vh]">
            <CardHeader className="border-b bg-gray-50/80 rounded-t-lg">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-indigo-950 font-bold flex items-center gap-2">
                    Fiche d'Appel / Présences {isAdmin && <span className="text-sm font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded">(Lecture seule)</span>}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 mt-1">
                    Séance du {selectedSession.date} à {selectedSession.time} - {selectedSession.formation?.subject} ({selectedSession.learningMode})
                  </CardDescription>
                </div>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <span className="text-xl font-bold">&times;</span>
                </button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-6">
              {loadingStudents ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                  <span className="text-gray-500 font-medium">Chargement de la liste des candidats...</span>
                </div>
              ) : students.length === 0 ? (
                <div className="text-center py-12 text-gray-500 flex flex-col items-center justify-center gap-2">
                  <AlertCircle className="w-10 h-10 text-amber-500" />
                  <span>Aucun candidat associé à cette séance.</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Detailed metadata list for admin consultation */}
                  {isAdmin && (
                    <div className="p-4 rounded-lg bg-indigo-50/30 border border-indigo-100 grid grid-cols-2 gap-3 text-sm mb-2 text-gray-700">
                      <div><span className="font-semibold text-indigo-950">Formation:</span> {selectedSession.formation?.subject || 'N/A'}</div>
                      <div><span className="font-semibold text-indigo-950">Mode:</span> {selectedSession.learningMode || 'N/A'}</div>
                      <div><span className="font-semibold text-indigo-950">Date & heure:</span> {selectedSession.date} à {selectedSession.time}</div>
                      <div><span className="font-semibold text-indigo-950 text-indigo-950">Durée:</span> {selectedSession.duration} min</div>
                      <div><span className="font-semibold text-indigo-950">Salle:</span> Salle {selectedSession.room?.roomNumber || 'N/A'}</div>
                      <div><span className="font-semibold text-indigo-950 font-semibold text-indigo-950">Professeur:</span> {selectedSession.professor?.firstName || ''} {selectedSession.professor?.lastName || ''}</div>
                    </div>
                  )}

                  {students.map((student) => (
                    <div
                      key={student.candidateId}
                      className="p-4 rounded-xl border border-gray-100 bg-gray-50/30 flex flex-col md:flex-row justify-between gap-4 md:items-center hover:border-gray-200 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-base">
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-xs font-mono text-gray-400 mt-1">
                          Code Candidat: {student.candidateCode}
                        </div>


                      </div>

                      {/* Status display */}
                      <div className="flex items-center gap-2">
                        {isAdmin ? (
                          <div className="flex items-center">
                            {student.status === 'PRESENT' ? (
                              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-150 border border-emerald-300 font-semibold px-3.5 py-1.5 shadow-sm text-sm">
                                🟢 Présent
                              </Badge>
                            ) : student.status === 'ABSENT' ? (
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-150 border border-red-300 font-semibold px-3.5 py-1.5 shadow-sm text-sm">
                                🔴 Absent
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-150 border border-gray-300 font-semibold px-3.5 py-1.5 shadow-sm text-sm">
                                Non renseigné
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(student.candidateId, 'PRESENT')}
                              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg shadow-sm border transition-all ${student.status === 'PRESENT'
                                ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                              <UserCheck size={14} />
                              Présent
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(student.candidateId, 'ABSENT')}
                              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg shadow-sm border transition-all ${student.status === 'ABSENT'
                                ? 'bg-red-600 text-white border-red-600 hover:bg-red-700'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                              <UserX size={14} />
                              Absent
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>

            {/* Footer */}
            <div className="border-t p-6 bg-gray-50 flex justify-end gap-3 rounded-b-lg items-center">
              <Button
                variant="outline"
                onClick={handleExportPDF}
                disabled={loadingStudents || students.length === 0}
                className="text-red-600 border-red-200 hover:bg-red-50 font-medium mr-auto animate-fadeIn"
              >
                <FileText size={18} className="mr-2" />
                Exporter en PDF
              </Button>
              <Button
                variant={isAdmin ? 'default' : 'outline'}
                onClick={() => setSelectedSession(null)}
                disabled={saving}
                className={isAdmin ? 'bg-indigo-600 hover:bg-indigo-700 text-white px-6' : ''}
              >
                {isAdmin ? 'Fermer' : 'Annuler'}
              </Button>
              {!isAdmin && (
                <Button
                  onClick={handleSaveAttendance}
                  disabled={saving || loadingStudents || students.length === 0}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    'Enregistrer les présences'
                  )}
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
