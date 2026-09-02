import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { UserPlus, Edit, Trash2, UserCheck, Activity, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { exportPDF } from '../services/api';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

export default function Professors() {
  const { professors, addProfessor, updateProfessor, deleteProfessor, formations, sessions, rooms, inscriptions, learningGroups } = useApp();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState<string | null>(null);
  const [selectedProfessorForActivity, setSelectedProfessorForActivity] = useState<string>('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProfessorId, setSelectedProfessorId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    subjects: '',
    type: 'permanent' as 'permanent' | 'temporary',
    dayOff: 'Sunday',
    maxSessions: '25'
  });


  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      subjects: '',
      type: 'permanent',
      dayOff: 'Sunday',
      maxSessions: '25'
    });
  };


  const handleEdit = (professorId: string) => {
    const professor = professors.find(p => p.id === professorId);
    if (professor) {
      setFormData({
        firstName: professor.firstName || (professor as any).prenom || '',
        lastName: professor.lastName || (professor as any).nom || '',
        phone: professor.phone || (professor as any).telephone || '',
        email: professor.email || '',
        address: professor.address || (professor as any).adresse || '',
        subjects: Array.isArray(professor.subjects)
          ? professor.subjects.join(', ')
          : (typeof (professor as any).specialite === 'string' ? (professor as any).specialite : ''),
        type: (professor.type as any) || 'permanent',
        dayOff: professor.dayOff || 'Sunday',
        maxSessions: professor.maxSessions !== undefined && professor.maxSessions !== null ? professor.maxSessions.toString() : '25'
      });
      setEditingProfessor(professorId);
      setIsAddDialogOpen(true);
    }
  };

  const handleDelete = (professorId: string) => {
    setSelectedProfessorId(professorId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProfessorId) return;

    const success = await deleteProfessor(selectedProfessorId);
    if (success) {
      toast.success('Professeur supprimé');
    } else {
      toast.error('Impossible de supprimer : le professeur a des séances planifiées');
    }
    setIsDeleteDialogOpen(false);
    setSelectedProfessorId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const subjects = formData.subjects ? formData.subjects.split(',').map(s => s.trim()).filter(s => s) : [];

    if (editingProfessor) {
      try {
        await updateProfessor(editingProfessor, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone || undefined,
          email: formData.email || undefined,
          address: formData.address || undefined,
          subjects,
          type: formData.type,
          dayOff: formData.dayOff,
          maxSessions: parseInt(formData.maxSessions)
        });
        toast.success('Professeur mis à jour avec succès');
        setEditingProfessor(null);
        setIsAddDialogOpen(false);
        resetForm();
      } catch (error: any) {
        console.error(error);
        toast.error(error.response?.data?.error || error.message || 'Erreur lors de la mise à jour du professeur');
      }
    } else {
      try {
        await addProfessor({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone || undefined,
          email: formData.email || undefined,
          address: formData.address || undefined,
          subjects,
          type: formData.type,
          dayOff: formData.dayOff,
          maxSessions: parseInt(formData.maxSessions),
          totalHoursWorked: 0
        });
        toast.success('Professeur ajouté avec succès');
        setIsAddDialogOpen(false);
        resetForm();
      } catch (error: any) {
        console.error(error);
        toast.error(error.response?.data?.error || error.message || 'Erreur lors de l\'ajout du professeur');
      }
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) {
      setEditingProfessor(null);
      resetForm();
    }
  };


  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Professeurs</h1>
          <p className="text-gray-500 mt-2">Gérer les professeurs et leurs matières</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => exportPDF('/professors/export/pdf', 'professeurs.pdf')}
            className="shadow-sm border-gray-300"
          >
            <FileText size={18} className="mr-2 text-red-600" />
            Exporter PDF
          </Button>

          <Dialog open={isActivityDialogOpen} onOpenChange={setIsActivityDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Activity size={18} className="mr-2" />
                Activité des profs
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Activité des professeurs</DialogTitle>
                <DialogDescription>
                  Sélectionnez un professeur pour voir son activité
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="activity-professor">Professeur *</Label>
                  <Select
                    value={selectedProfessorForActivity}
                    onValueChange={(value) => setSelectedProfessorForActivity(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un professeur" />
                    </SelectTrigger>
                    <SelectContent>
                      {professors.map((professor) => (
                        <SelectItem key={professor.id} value={professor.id}>
                          {professor.firstName} {professor.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProfessorForActivity && (() => {
                  const professor = professors.find(p => p.id === selectedProfessorForActivity);
                  if (!professor) return null;

                  const professorSessions = sessions.filter(s =>
                    s.professorId === selectedProfessorForActivity &&
                    s.status !== 'cancelled'
                  );

                  const assignedInscriptions = (inscriptions || []).filter(i => i.professorId === selectedProfessorForActivity);
                  const assignedGroups = (learningGroups || []).filter(g => g.professorId === selectedProfessorForActivity);

                  const getHours = (s: any) => (s.duration > 10 ? s.duration / 60 : (s.duration || 1));

                  const totalSessionHours = professorSessions.reduce((total, session) => total + getHours(session), 0);
                  const totalHours = totalSessionHours > 0 ? totalSessionHours : Number(professor.totalHoursWorked || 0);

                  const currentDate = new Date();
                  const currentMonth = currentDate.getMonth();
                  const currentYear = currentDate.getFullYear();

                  const monthSessions = professorSessions.filter(s => {
                    if (!s.date) return false;
                    const sessionDate = new Date(s.date);
                    return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
                  });

                  const monthHours = monthSessions.reduce((total, session) => total + getHours(session), 0);

                  const displaySessions = monthSessions.length > 0 ? monthSessions : professorSessions;

                  return (
                    <div className="space-y-6">
                      {/* Statistiques principales */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium text-gray-500">Heures enseignées</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-indigo-600">{totalHours.toFixed(1)}h</div>
                            <p className="text-[11px] text-gray-500 mt-1">Volume total</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium text-gray-500">Séances planifiées</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{professorSessions.length}</div>
                            <p className="text-[11px] text-gray-500 mt-1">Au total</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium text-gray-500">Ce mois-ci</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-green-600">{monthHours.toFixed(1)}h</div>
                            <p className="text-[11px] text-gray-500 mt-1">{monthSessions.length} séance(s)</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium text-gray-500">Groupes affectés</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{assignedGroups.length || assignedInscriptions.length}</div>
                            <p className="text-[11px] text-gray-500 mt-1">Inscription(s)</p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Detail list of sessions */}
                      <div>
                        <h3 className="text-sm font-semibold mb-3 flex items-center justify-between">
                          <span>
                            {monthSessions.length > 0
                              ? `Séances du mois (${currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })})`
                              : 'Toutes les séances enregistrées'}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {displaySessions.length} séance(s)
                          </Badge>
                        </h3>

                        {displaySessions.length === 0 ? (
                          <div className="text-center py-8 bg-gray-50 rounded-xl border">
                            <p className="text-sm text-gray-500">Aucune séance enregistrée pour ce professeur.</p>
                            {(assignedGroups.length > 0 || assignedInscriptions.length > 0) && (
                              <p className="text-xs text-indigo-600 mt-1 font-medium">
                                Ce professeur est affecté à {assignedGroups.length || assignedInscriptions.length} groupe(s).
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="border rounded-xl overflow-hidden">
                            <Table>
                              <TableHeader className="bg-gray-50">
                                <TableRow>
                                  <TableHead>Date</TableHead>
                                  <TableHead>Heure</TableHead>
                                  <TableHead>Formation / Groupe</TableHead>
                                  <TableHead>Salle</TableHead>
                                  <TableHead>Statut</TableHead>
                                  <TableHead className="text-right">Durée</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {displaySessions.map(session => {
                                  const formation = formations.find(f => f.id === session.formationId);
                                  const room = (rooms || []).find(r => r.id === session.roomId);
                                  const hours = getHours(session);
                                  const statusLabel =
                                    session.status === 'completed' ? 'Terminée' :
                                    session.status === 'cancelled' ? 'Annulée' : 'Programmée';

                                  return (
                                    <TableRow key={session.id}>
                                      <TableCell className="font-medium text-xs">
                                        {session.date ? new Date(session.date).toLocaleDateString('fr-FR') : '-'}
                                      </TableCell>
                                      <TableCell className="text-xs font-mono">{session.time || '-'}</TableCell>
                                      <TableCell className="text-xs font-semibold text-gray-800">
                                        {formation ? `${formation.subject} (${formation.level})` : (session.groupName || 'Formation')}
                                      </TableCell>
                                      <TableCell className="text-xs">
                                        {room ? (room as any).roomNumber || (room as any).numero : 'N/A'}
                                      </TableCell>
                                      <TableCell>
                                        <Badge variant={session.status === 'completed' ? 'default' : 'secondary'} className="text-[10px]">
                                          {statusLabel}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="text-right text-xs font-bold text-indigo-700">
                                        {hours.toFixed(1)}h
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsActivityDialogOpen(false)}>
                  Fermer
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingProfessor(null); resetForm(); }}>
                <UserPlus size={18} className="mr-2" />
                Nouveau professeur
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingProfessor ? 'Modifier le professeur' : 'Ajouter un nouveau professeur'}
                </DialogTitle>
                <DialogDescription>
                  Remplissez les informations du professeur
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Adresse *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      required
                    />
                  </div>



                  <div className="space-y-2">
                    <Label htmlFor="type">Type *</Label>
                    <Select value={formData.type} onValueChange={(value: 'permanent' | 'temporary') => setFormData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="permanent">Permanent</SelectItem>
                        <SelectItem value="temporary">Vacataire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dayOff">Jour de repos *</Label>
                    <Select value={formData.dayOff} onValueChange={(value) => setFormData(prev => ({ ...prev, dayOff: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {daysOfWeek.map(day => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxSessions">Nombre max de séances *</Label>
                    <Input
                      id="maxSessions"
                      type="number"
                      value={formData.maxSessions}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxSessions: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingProfessor ? 'Modifier' : 'Enregistrer'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des professeurs</CardTitle>
          <CardDescription>Tous les professeurs du centre</CardDescription>
        </CardHeader>
        <CardContent>
          {professors.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucun professeur enregistré</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Matières</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Jour de repos</TableHead>
                  <TableHead>Max séances</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {professors.map((professor) => (
                  <TableRow key={professor.id}>
                    <TableCell className="font-medium">
                      {professor.firstName} {professor.lastName}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{professor.phone}</div>
                        <div className="text-gray-500">{professor.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {professor.subjects.map((subject, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={professor.type === 'permanent' ? 'default' : 'outline'}>
                        {professor.type === 'permanent' ? 'Permanent' : 'Vacataire'}
                      </Badge>
                    </TableCell>
                    <TableCell>{professor.dayOff}</TableCell>
                    <TableCell>{professor.maxSessions}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(professor.id)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(professor.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="text-red-600" />
              Confirmer la suppression
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce professeur ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
