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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { UserPlus, ArrowRight, User, Briefcase, Calendar, Hash, Gift, Eye, Users, ShieldAlert, CheckCircle, Edit, Trash2, BookOpen, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { exportPDF } from '../services/api';


export default function Prospects() {
  const { currentUser, prospects, addProspect, updateProspect, deleteProspect, transformToCandidate, formations, commercials } = useApp();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isTransformAlertOpen, setIsTransformAlertOpen] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce prospect ?')) {
      await deleteProspect(id);
      toast.success('Prospect supprimé avec succès');
    }
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    occupation: 'student' as 'student' | 'employee',
    subject: '',
    giftCode: '',
    observation: 'alone' as 'alone' | 'accompanied',
    contact1: '',
    contact2: 'none',
    action: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      occupation: 'student',
      subject: '',
      giftCode: '',
      observation: 'alone',
      contact1: '',
      contact2: 'none',
      action: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.contact1) {
      toast.error('Le Contact 1 est obligatoire.');
      return;
    }
    if (formData.contact1 && formData.contact2 && formData.contact2 !== 'none' && formData.contact1 === formData.contact2) {
      toast.error('Le Contact 1 et le Contact 2 doivent être différents.');
      return;
    }

    addProspect({
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: parseInt(formData.age),
      occupation: formData.occupation,
      subject: 'Non affecté',
      giftCode: formData.giftCode || undefined,
      observation: formData.observation,
      contact: formData.contact2 && formData.contact2 !== 'none' ? [formData.contact1, formData.contact2] : [formData.contact1],
      action: formData.action || undefined
    });

    toast.success('Prospect ajouté avec succès');
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleTransformClick = (prospectId: string) => {
    // Vérifier les permissions - Seul l'agent de réservation peut transformer
    if (currentUser?.role !== 'agent_reservation' && currentUser?.role !== 'admin') {
      toast.error('Seul l\'Agent de réservation peut transformer un prospect en candidat');
      return;
    }

    const prospect = prospects.find(p => p.id === prospectId);
    if (!prospect) return;

    const remainingSessions = 5 - prospect.freeSessionsCompleted - (prospect.absences || 0);
    if (remainingSessions > 0) {
      toast.error(`Le prospect doit compléter toutes ses séances gratuites (${remainingSessions} restantes)`);
      return;
    }

    setSelectedProspect(prospectId);
    setIsTransformAlertOpen(true);
  };

  const handleMarkSession = (prospectId: string) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (prospect) {
      updateProspect(prospectId, {
        freeSessionsCompleted: prospect.freeSessionsCompleted + 1
      });
      toast.success('Séance marquée comme complétée');
    }
  };

  const handleMarkAbsence = (prospectId: string) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (prospect) {
      updateProspect(prospectId, {
        absences: (prospect.absences || 0) + 1
      });
      toast.error('Absence enregistrée');
    }
  };

  const confirmTransform = () => {
    if (!selectedProspect) return;

    // Transformation simple - l'agent doit ensuite affecter une formation
    const candidateCode = transformToCandidate(selectedProspect, 'f1'); // Formation par défaut

    if (candidateCode) {
      toast.success(`Prospect transformé en candidat avec le code ${candidateCode}`);
    } else {
      toast.error('Erreur lors de la transformation');
    }

    setIsTransformAlertOpen(false);
    setSelectedProspect(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProspect) return;

    if (!formData.contact1) {
      toast.error('Le Contact 1 est obligatoire.');
      return;
    }
    if (formData.contact1 && formData.contact2 && formData.contact2 !== 'none' && formData.contact1 === formData.contact2) {
      toast.error('Le Contact 1 et le Contact 2 doivent être différents.');
      return;
    }

    await updateProspect(selectedProspect, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: parseInt(formData.age),
      occupation: formData.occupation as 'student' | 'employee',
      subject: formData.subject,
      giftCode: formData.giftCode || undefined,
      observation: formData.observation as 'alone' | 'accompanied',
      contact: formData.contact2 && formData.contact2 !== 'none' ? [formData.contact1, formData.contact2] : [formData.contact1],
      action: formData.action || undefined
    });

    toast.success('Prospect mis à jour avec succès');
    setIsEditDialogOpen(false);
    resetForm();
    setSelectedProspect(null);
  };

  // Check user permissions for transform action
  const canTransform = currentUser?.role === 'agent_reservation' || currentUser?.role === 'admin';

  const renderProspectFields = (mode: 'add' | 'edit') => {
    const getFilteredCommercialsForField = (fieldNum: 1 | 2) => {
      let list = commercials.filter(c => c.action === formData.action);

      // Rule 5: display original contact temporarily on edit even if action doesn't match
      if (selectedProspect) {
        const prospect = prospects.find(p => p.id === selectedProspect);
        if (prospect && prospect.contact) {
          const originalCommercialId = prospect.contact[fieldNum - 1];
          if (originalCommercialId && originalCommercialId !== 'none' && !list.some(c => c.id === originalCommercialId)) {
            const savedCommercial = commercials.find(c => c.id === originalCommercialId);
            if (savedCommercial) {
              list = [...list, savedCommercial];
            }
          }
        }
      }
      return list;
    };

    const commercials1 = getFilteredCommercialsForField(1);
    const commercials2 = getFilteredCommercialsForField(2);

    return (
      <>
        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <User className="text-blue-600" size={20} />
            Informations principales
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`${mode}-firstName`} className="text-base font-semibold flex items-center gap-2">
                <User size={16} className="text-gray-600" />
                Prénom *
              </Label>
              <Input
                id={`${mode}-firstName`}
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="h-12 rounded-xl"
                placeholder="Entrez le prénom"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${mode}-lastName`} className="text-base font-semibold flex items-center gap-2">
                <User size={16} className="text-gray-600" />
                Nom *
              </Label>
              <Input
                id={`${mode}-lastName`}
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="h-12 rounded-xl"
                placeholder="Entrez le nom"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${mode}-occupation`} className="text-base font-semibold flex items-center gap-2">
                <Briefcase size={16} className="text-gray-600" />
                Fonction *
              </Label>
              <Select
                value={formData.occupation}
                onValueChange={(value) => handleInputChange('occupation', value)}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Étudiant</SelectItem>
                  <SelectItem value="employee">Employé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${mode}-age`} className="text-base font-semibold flex items-center gap-2">
                <Hash size={16} className="text-gray-600" />
                Âge *
              </Label>
              <Input
                id={`${mode}-age`}
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="h-12 rounded-xl"
                placeholder="Ex: 25"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Gift className="text-purple-600" size={20} />
            Informations complémentaires
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`${mode}-giftCode`} className="text-base font-semibold flex items-center gap-2">
                <Gift size={16} className="text-gray-600" />
                Code cadeau
              </Label>
              <Input
                id={`${mode}-giftCode`}
                value={formData.giftCode}
                onChange={(e) => handleInputChange('giftCode', e.target.value)}
                className="h-12 rounded-xl"
                placeholder="Ex: PROMO2026"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${mode}-observation`} className="text-base font-semibold flex items-center gap-2">
                <Eye size={16} className="text-gray-650" />
                Observation *
              </Label>
              <Select
                value={formData.observation}
                onValueChange={(value) => handleInputChange('observation', value)}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alone">Seul</SelectItem>
                  <SelectItem value="accompanied">Accompagné</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${mode}-action`} className="text-base font-semibold flex items-center gap-2">
                <Briefcase size={16} className="text-gray-600" />
                Action *
              </Label>
              <Select
                value={formData.action}
                onValueChange={(value) => {
                  handleInputChange('action', value);
                  // Clear contact1 and contact2 if they are no longer valid for the new action
                  const validIds = commercials.filter(c => c.action === value).map(c => c.id);
                  setFormData(prev => ({
                    ...prev,
                    contact1: validIds.includes(prev.contact1) ? prev.contact1 : '',
                    contact2: validIds.includes(prev.contact2) ? prev.contact2 : 'none'
                  }));
                }}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Sélectionner une action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="action1">Action 1</SelectItem>
                  <SelectItem value="action2">Action 2</SelectItem>
                  <SelectItem value="action3">Action 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4 col-span-2">
              <div className="space-y-2">
                <Label htmlFor={`${mode}-contact1`} className="text-base font-semibold flex items-center gap-2">
                  <Users size={16} className="text-gray-600" />
                  Contact 1 *
                </Label>
                <Select
                  value={formData.contact1}
                  onValueChange={(value) => handleInputChange('contact1', value)}
                  disabled={!formData.action}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-white">
                    <SelectValue placeholder={formData.action ? "Sélectionner contact 1" : "Sélectionner action"} />
                  </SelectTrigger>
                  <SelectContent>
                    {commercials1.map((commercial) => (
                      <SelectItem key={commercial.id} value={commercial.id}>
                        {commercial.firstName} {commercial.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${mode}-contact2`} className="text-base font-semibold flex items-center gap-2">
                  <Users size={16} className="text-gray-600" />
                  Contact 2 (Optionnel)
                </Label>
                <Select
                  value={formData.contact2}
                  onValueChange={(value) => handleInputChange('contact2', value)}
                  disabled={!formData.action}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-white">
                    <SelectValue placeholder={formData.action ? "Aucun" : "Sélectionner action"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Aucun</SelectItem>
                    {commercials2.map((commercial) => (
                      <SelectItem key={commercial.id} value={commercial.id}>
                        {commercial.firstName} {commercial.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-8 space-y-8">
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Modifier le prospect</DialogTitle>
            <DialogDescription>
              Modifiez toutes les informations du prospect
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-6">
            {renderProspectFields('edit')}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" size="lg" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
              <Button type="submit" size="lg">Enregistrer les modifications</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Prospects</h1>
          <p className="text-gray-500 mt-2">Gérer et suivre tous les prospects du centre de formation</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => exportPDF('/prospects/export/pdf', 'prospects.pdf')}
            className="shadow-sm border-gray-300"
          >
            <FileText size={20} className="mr-2 text-red-600" />
            Exporter PDF
          </Button>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-md">
                <UserPlus size={20} className="mr-2" />
                Nouveau prospect
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Ajouter un nouveau prospect</DialogTitle>
                <DialogDescription>
                  Remplissez les informations du prospect pour créer sa fiche
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                {renderProspectFields('add')}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" size="lg">
                    <CheckCircle size={18} className="mr-2" />
                    Enregistrer le prospect
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tableau des prospects */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Liste des prospects</CardTitle>
              <CardDescription className="mt-1">
                {prospects.length} prospect{prospects.length > 1 ? 's' : ''} enregistré{prospects.length > 1 ? 's' : ''}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {prospects.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucun prospect enregistré</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Nom</TableHead>
                  <TableHead className="font-semibold">Âge</TableHead>
                  <TableHead className="font-semibold">Fonction</TableHead>
                  <TableHead className="font-semibold">Matière</TableHead>
                  <TableHead className="font-semibold text-center">Séances faites</TableHead>
                  <TableHead className="font-semibold text-center">Absences</TableHead>
                  <TableHead className="font-semibold text-center">Séances restantes</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prospects.map((prospect) => {
                  const remainingSessions = 5 - prospect.freeSessionsCompleted - (prospect.absences || 0);
                  const canBeTransformed = remainingSessions <= 0;

                  return (
                    <TableRow key={prospect.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User size={18} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold">{prospect.firstName} {prospect.lastName}</p>
                            <p className="text-xs text-gray-500">{prospect.occupation === 'student' ? 'Étudiant' : 'Employé'}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{prospect.age} ans</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {prospect.occupation === 'student' ? 'Étudiant' : 'Employé'}
                        </Badge>
                      </TableCell>
                      <TableCell>{prospect.subject}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={canBeTransformed ? 'default' : 'secondary'} className={canBeTransformed ? 'bg-green-100 text-green-800' : ''}>
                          {prospect.freeSessionsCompleted}/5
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="destructive" className="bg-red-100 text-red-800">
                          {prospect.absences || 0}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={remainingSessions > 0 ? 'text-blue-600 border-blue-200' : 'text-green-600 border-green-200'}>
                          {remainingSessions > 0 ? remainingSessions : 0}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {canTransform && canBeTransformed && (
                            <Button
                              size="sm"
                              onClick={() => handleTransformClick(prospect.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <ArrowRight size={16} className="mr-1" />
                              Transformer
                            </Button>
                          )}

                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => {
                              setFormData({
                                firstName: prospect.firstName,
                                lastName: prospect.lastName,
                                age: prospect.age.toString(),
                                occupation: (prospect.occupation?.toLowerCase() || 'student') as 'student' | 'employee',
                                subject: prospect.subject,
                                giftCode: prospect.giftCode || '',
                                observation: (prospect.observation?.toLowerCase() || 'alone') as 'alone' | 'accompanied',
                                contact1: prospect.contact?.[0] || '',
                                contact2: prospect.contact?.[1] || 'none',
                                action: prospect.action || ''
                              });
                              setSelectedProspect(prospect.id);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit size={16} />
                          </Button>

                          {(currentUser?.role === 'admin' || currentUser?.role === 'agent_reception') && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(prospect.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Alert de transformation */}
      <AlertDialog open={isTransformAlertOpen} onOpenChange={setIsTransformAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ArrowRight className="text-green-600" />
              Transformer en candidat
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir transformer ce prospect en candidat ? Cette action est irréversible.
              Le prospect aura terminé ses 5 séances gratuites et sera prêt à être inscrit à une formation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmTransform} className="bg-green-600 hover:bg-green-700">
              Confirmer la transformation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
