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
  const { professors, addProfessor, updateProfessor, deleteProfessor, formations, sessions } = useApp();
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
        firstName: professor.firstName,
        lastName: professor.lastName,
        phone: professor.phone,
        email: professor.email,
        address: professor.address,
        subjects: professor.subjects.join(', '),
        type: professor.type,
        dayOff: professor.dayOff,
        maxSessions: professor.maxSessions.toString()
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subjects = formData.subjects.split(',').map(s => s.trim()).filter(s => s);

    if (editingProfessor) {
      updateProfessor(editingProfessor, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        subjects,
        type: formData.type,
        dayOff: formData.dayOff,
        maxSessions: parseInt(formData.maxSessions)
      });
      toast.success('Professeur mis à jour');
      setEditingProfessor(null);
    } else {
      addProfessor({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        subjects,
        type: formData.type,
        dayOff: formData.dayOff,
        maxSessions: parseInt(formData.maxSessions)
      });
      toast.success('Professeur ajouté');
    }

    setIsAddDialogOpen(false);
    resetForm();
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
                    s.status === 'completed' &&
                    s.attendance === 'present'
                  );

                  const totalHours = professor.totalHoursWorked;

                  // Get current month sessions
                  const currentDate = new Date();
                  const currentMonth = currentDate.getMonth();
                  const currentYear = currentDate.getFullYear();

                  const monthSessions = professorSessions.filter(s => {
                    const sessionDate = new Date(s.date);
                    return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
                  });

                  const monthHours = monthSessions.reduce((total, session) => total + session.duration, 0);

                  return (
                    <div className="space-y-6">
                      {/* Statistiques principales */}
                      <div className="grid grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600">Heures enseignées</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
                            <p className="text-xs text-gray-500 mt-1">Total</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600">Séances</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{professorSessions.length}</div>
                            <p className="text-xs text-gray-500 mt-1">Total terminées</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600">Ce mois</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{monthHours.toFixed(1)}h</div>
                            <p className="text-xs text-gray-500 mt-1">{monthSessions.length} séances</p>
                          </CardContent>
                        </Card>
                      </div>


                      {/* Historique du mois */}
                      <div>
                        <h3 className="text-sm font-semibold mb-3">
                          Historique du mois ({currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })})
                        </h3>
                        {monthSessions.length === 0 ? (
                          <p className="text-sm text-gray-500">Aucune séance ce mois-ci</p>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Heure</TableHead>
                                <TableHead>Formation</TableHead>
                                <TableHead>Durée</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {monthSessions.map(session => {
                                const formation = formations.find(f => f.id === session.formationId);
                                return (
                                  <TableRow key={session.id}>
                                    <TableCell>{new Date(session.date).toLocaleDateString('fr-FR')}</TableCell>
                                    <TableCell>{session.time}</TableCell>
                                    <TableCell>{formation ? `${formation.subject} - ${formation.level}` : 'N/A'}</TableCell>
                                    <TableCell>{session.duration}h</TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
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
              <Button>
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

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="subjects">Matières enseignées (séparées par des virgules) *</Label>
                    <Input
                      id="subjects"
                      placeholder="Ex: Anglais, Espagnol"
                      value={formData.subjects}
                      onChange={(e) => setFormData(prev => ({ ...prev, subjects: e.target.value }))}
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
