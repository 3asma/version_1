import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { DoorOpen, Edit, Trash2, FileText } from 'lucide-react';
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

export default function Rooms() {
  const { rooms, addRoom, updateRoom, deleteRoom } = useApp();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    roomNumber: '',
    type: '',
    capacity: '',
    available: true
  });

  const resetForm = () => {
    setFormData({
      roomNumber: '',
      type: '',
      capacity: '',
      available: true
    });
  };

  const handleEdit = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setFormData({
        roomNumber: room.roomNumber,
        type: room.type,
        capacity: room.capacity.toString(),
        available: room.available
      });
      setEditingRoom(roomId);
      setIsAddDialogOpen(true);
    }
  };

  const handleDelete = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRoomId) return;

    const success = await deleteRoom(selectedRoomId);
    if (success) {
      toast.success('Salle supprimée');
    } else {
      toast.error('Impossible de supprimer : la salle a des séances planifiées');
    }
    setIsDeleteDialogOpen(false);
    setSelectedRoomId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingRoom) {
      updateRoom(editingRoom, {
        roomNumber: formData.roomNumber,
        type: formData.type,
        capacity: parseInt(formData.capacity),
        available: formData.available
      });
      toast.success('Salle mise à jour');
      setEditingRoom(null);
    } else {
      addRoom({
        roomNumber: formData.roomNumber,
        type: formData.type,
        capacity: parseInt(formData.capacity),
        available: formData.available
      });
      toast.success('Salle ajoutée');
    }

    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleDialogClose = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) {
      setEditingRoom(null);
      resetForm();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Salles</h1>
          <p className="text-gray-500 mt-2">Gérer les salles de formation</p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => exportPDF('/rooms/export/pdf', 'salles.pdf')}
            className="shadow-sm border-gray-300"
          >
            <FileText size={18} className="mr-2 text-red-600" />
            Exporter PDF
          </Button>

          <Dialog open={isAddDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button>
                <DoorOpen size={18} className="mr-2" />
                Nouvelle salle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingRoom ? 'Modifier la salle' : 'Ajouter une nouvelle salle'}
                </DialogTitle>
                <DialogDescription>
                  Remplissez les informations de la salle
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="roomNumber">Numéro de salle *</Label>
                  <Input
                    id="roomNumber"
                    placeholder="Ex: 101"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, roomNumber: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type de salle *</Label>
                  <Input
                    id="type"
                    placeholder="Ex: Individuel, Binôme, Groupe"
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacité *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="Nombre de personnes"
                    value={formData.capacity}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="available">Disponible</Label>
                  <Switch
                    id="available"
                    checked={formData.available}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, available: checked }))}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingRoom ? 'Modifier' : 'Enregistrer'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des salles</CardTitle>
          <CardDescription>Toutes les salles du centre</CardDescription>
        </CardHeader>
        <CardContent>
          {rooms.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucune salle enregistrée</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacité</TableHead>
                  <TableHead>Disponibilité</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium text-lg">
                      {room.roomNumber}
                    </TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {room.capacity} personnes
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={room.available ? 'default' : 'secondary'}>
                        {room.available ? 'Disponible' : 'Indisponible'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(room.id)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(room.id)}
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
              Êtes-vous sûr de vouloir supprimer cette salle ? Cette action est irréversible.
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
