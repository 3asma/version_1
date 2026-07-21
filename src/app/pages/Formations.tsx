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
import { BookOpen, Edit, Trash2, FileText } from 'lucide-react';
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

export default function Formations() {
  const { formations, addFormation, updateFormation, deleteFormation } = useApp();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingFormation, setEditingFormation] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFormationId, setSelectedFormationId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    subject: '',
    level: ''
  });

  const resetForm = () => {
    setFormData({
      subject: '',
      level: ''
    });
  };

  const handleEdit = (formationId: string) => {
    const formation = formations.find(f => f.id === formationId);
    if (formation) {
      setFormData({
        subject: formation.subject || '',
        level: formation.level || ''
      });
      setEditingFormation(formationId);
      setIsAddDialogOpen(true);
    }
  };

  const handleDelete = (formationId: string) => {
    setSelectedFormationId(formationId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedFormationId) return;

    const success = await deleteFormation(selectedFormationId);
    if (success) {
      toast.success('Formation supprimée');
    } else {
      toast.error('Impossible de supprimer : des candidats sont inscrits à cette formation');
    }
    setIsDeleteDialogOpen(false);
    setSelectedFormationId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingFormation) {
        await updateFormation(editingFormation, {
          subject: formData.subject,
          level: formData.level
        });
        toast.success('Formation mise à jour');
        setEditingFormation(null);
      } else {
        await addFormation({
          subject: formData.subject,
          level: formData.level
        });
        toast.success('Formation ajoutée');
      }
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement de la formation');
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) {
      setEditingFormation(null);
      resetForm();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Formations</h1>
          <p className="text-gray-500 mt-2">Gérer les formations proposées</p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => exportPDF('/formations/export/pdf', 'formations.pdf')}
            className="shadow-sm border-gray-300"
          >
            <FileText size={18} className="mr-2 text-red-600" />
            Exporter PDF
          </Button>

          <Dialog open={isAddDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button>
                <BookOpen size={18} className="mr-2" />
                Nouvelle formation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingFormation ? 'Modifier la formation' : 'Ajouter une nouvelle formation'}
                </DialogTitle>
                <DialogDescription>
                  Remplissez les informations de la formation
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Matière ou Langue *</Label>
                    <Input
                      id="subject"
                      placeholder="Ex: Anglais, Français, etc."
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Niveau *</Label>
                    <Input
                      id="level"
                      placeholder="Ex: A1, B2, Débutant, etc."
                      value={formData.level}
                      onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingFormation ? 'Modifier' : 'Enregistrer'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des formations</CardTitle>
          <CardDescription>Toutes les formations disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          {formations.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucune formation enregistrée</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Matière/Langue</TableHead>
                  <TableHead className="w-1/3">Niveau</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formations.map((formation) => (
                  <TableRow key={formation.id}>
                    <TableCell className="font-medium">
                      {formation.subject}
                    </TableCell>
                    <TableCell>{formation.level}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(formation.id)}
                          className="hover:bg-blue-50"
                        >
                          <Edit size={16} className="text-blue-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(formation.id)}
                          className="hover:bg-red-50"
                        >
                          <Trash2 size={16} className="text-red-600" />
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
              Êtes-vous sûr de vouloir supprimer cette formation ? Cette action est irréversible.
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
