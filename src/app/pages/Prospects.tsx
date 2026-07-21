import { useState, useMemo } from 'react';
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
import { UserPlus, ArrowRight, User, Briefcase, Calendar, Hash, Gift, Eye, Users, ShieldAlert, CheckCircle, Edit, Trash2, BookOpen, FileText, CreditCard } from 'lucide-react';
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
    membershipNumber: '',
    firstName: '',
    lastName: '',
    age: '',
    occupation: 'student' as 'student' | 'employee',
    giftCode: '',
    observation: 'alone' as 'alone' | 'accompanied',
    firstContactId: '',
    secondContactId: 'none',
    action: '',
    gender: '' as 'MALE' | 'FEMALE' | '',
    email: '',
    phone: '',
    registrationDate: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'action') {
        updated.firstContactId = '';
        updated.secondContactId = 'none';
      }
      return updated;
    });
  };

  const resetForm = () => {
    setFormData({
      membershipNumber: '',
      firstName: '',
      lastName: '',
      age: '',
      occupation: 'student',
      giftCode: '',
      observation: 'alone',
      firstContactId: '',
      secondContactId: 'none',
      action: '',
      gender: '',
      email: '',
      phone: '',
      registrationDate: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstContactId) {
      toast.error('Le Contact 1 est obligatoire.');
      return;
    }
    if (formData.firstContactId && formData.secondContactId && formData.secondContactId !== 'none' && formData.firstContactId === formData.secondContactId) {
      toast.error('Le Contact 1 et le Contact 2 doivent être différents.');
      return;
    }

    addProspect({
      membershipNumber: formData.membershipNumber || undefined,
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: parseInt(formData.age),
      occupation: formData.occupation,
      giftCode: formData.giftCode || undefined,
      observation: formData.observation,
      firstContactId: formData.firstContactId || undefined,
      secondContactId: formData.secondContactId !== 'none' ? formData.secondContactId : undefined,
      action: formData.action || undefined,
      gender: formData.gender !== '' ? formData.gender : undefined,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      registrationDate: formData.registrationDate || undefined
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

    if (!formData.firstContactId) {
      toast.error('Le Contact 1 est obligatoire.');
      return;
    }
    if (formData.firstContactId && formData.secondContactId && formData.secondContactId !== 'none' && formData.firstContactId === formData.secondContactId) {
      toast.error('Le Contact 1 et le Contact 2 doivent être différents.');
      return;
    }

    await updateProspect(selectedProspect, {
      membershipNumber: formData.membershipNumber || undefined,
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: parseInt(formData.age),
      occupation: formData.occupation as 'student' | 'employee',
      giftCode: formData.giftCode || undefined,
      observation: formData.observation as 'alone' | 'accompanied',
      firstContactId: formData.firstContactId || undefined,
      secondContactId: formData.secondContactId !== 'none' ? formData.secondContactId : undefined,
      action: formData.action || undefined,
      gender: formData.gender !== '' ? formData.gender : undefined,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      registrationDate: formData.registrationDate || undefined
    }); toast.success('Prospect mis à jour avec succès');
    setIsEditDialogOpen(false);
    resetForm();
    setSelectedProspect(null);
  };

  // Check user permissions for transform action
  const canTransform = currentUser?.role === 'agent_reservation' || currentUser?.role === 'admin';

  const renderProspectFields = (mode: 'add' | 'edit') => {
    const uniqueActions = useMemo(() => {
      return Array.from(new Set(commercials.map(c => c.action))).filter(Boolean).sort();
    }, [commercials]);

    const getFilteredCommercialsForField = (fieldNum: 1 | 2) => {
      if (!formData.action) return [];
      let list = commercials.filter(c => c.action === formData.action);

      // Rule 5: display original contact temporarily on edit even if action doesn't match
      if (selectedProspect) {
        const prospect = prospects.find(p => p.id === selectedProspect);
        if (prospect) {
          const originalCommercialId = fieldNum === 1 ? prospect.firstContactId : prospect.secondContactId;
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
        <div className="bg-gray-50 rounded-xl p-6 space-y-6">
          <h3 className="font-semibold text-lg flex items-center gap-2 border-b pb-2">
            <User className="text-blue-600" size={20} />
            Informations du prospect
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {/* 1. Numéro d'adhésion */}
            <div className="space-y-2">
              <Label htmlFor={`${mode}-membershipNumber`} className="text-base font-semibold flex items-center gap-2">
                <CreditCard size={16} className="text-gray-600" />
                Numéro d'adhésion
              </Label>
              <Input
                id={`${mode}-membershipNumber`}
                value={formData.membershipNumber}
                onChange={(e) => handleInputChange('membershipNumber', e.target.value)}
                className="h-12 rounded-xl"
                placeholder="Ex: ADH-2026-1234"
              />
            </div>

            {/* 2. Nom */}
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

            {/* 3. Prénom */}
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

            {/* 4. Genre */}
            <div className="space-y-2">
              <Label htmlFor={`${mode}-gender`} className="text-base font-semibold flex items-center gap-2">
                <User size={16} className="text-gray-600" />
                Genre
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger className="h-12 rounded-xl bg-white">
                  <SelectValue placeholder="Sélectionner le genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Homme</SelectItem>
                  <SelectItem value="FEMALE">Femme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 5. Âge */}
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

            {/* 6. Profession */}
            <div className="space-y-2">
              <Label htmlFor={`${mode}-occupation`} className="text-base font-semibold flex items-center gap-2">
                <Briefcase size={16} className="text-gray-600" />
                Profession *
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

            {/* 7. Téléphone */}
            <div className="space-y-2">
              <Label htmlFor={`${mode}-phone`} className="text-base font-semibold flex items-center gap-2">
                <User size={16} className="text-gray-600" />
                Téléphone
              </Label>
              <Input
                id={`${mode}-phone`}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-12 rounded-xl"
                placeholder="Ex: 0612345678"
              />
            </div>

            {/* 8. Email */}
            <div className="space-y-2">
              <Label htmlFor={`${mode}-email`} className="text-base font-semibold flex items-center gap-2">
                <User size={16} className="text-gray-600" />
                Email
              </Label>
              <Input
                id={`${mode}-email`}
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-12 rounded-xl"
                placeholder="exemple@email.com"
              />
            </div>

            {/* 9. Action */}
            <div className="space-y-2">
              <Label htmlFor={`${mode}-action`} className="text-base font-semibold flex items-center gap-2">
                <Briefcase size={16} className="text-gray-600" />
                Action *
              </Label>
              <Select
                value={formData.action}
                onValueChange={(value) => handleInputChange('action', value)}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Sélectionner une action" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueActions.map((act) => (
                    <SelectItem key={act} value={act}>
                      {act}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 10. Premier contact */}
            <div className="space-y-2">
              <Label htmlFor={`${mode}-contact1`} className="text-base font-semibold flex items-center gap-2">
                <Users size={16} className="text-gray-600" />
                Premier contact *
              </Label>
              <Select
                value={formData.firstContactId}
                onValueChange={(value) => handleInputChange('firstContactId', value)}
                disabled={!formData.action}
              >
                <SelectTrigger className="h-12 rounded-xl bg-white">
                  <SelectValue placeholder={formData.action ? "Sélectionner premier contact" : "Sélectionner action"} />
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

            {/* 11. Deuxième contact */}
            <div className="space-y-2">
              <Label htmlFor={`${mode}-contact2`} className="text-base font-semibold flex items-center gap-2">
                <Users size={16} className="text-gray-600" />
                Deuxième contact (Optionnel)
              </Label>
              <Select
                value={formData.secondContactId}
                onValueChange={(value) => handleInputChange('secondContactId', value)}
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

            {/* 12. Observation */}
            <div className="space-y-2">
              <Label htmlFor={`${mode}-observation`} className="text-base font-semibold flex items-center gap-2">
                <Eye size={16} className="text-gray-600" />
                Observation *
              </Label>
              <Select
                value={formData.observation}
                onValueChange={(value) => handleInputChange('observation', value)}
              >
                <SelectTrigger className="h-12 rounded-xl bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alone">Seul</SelectItem>
                  <SelectItem value="accompanied">Accompagné</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 13. Code cadeau */}
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

            {/* 14. Date d'inscription */}
            <div className="space-y-2">
              <Label htmlFor={`${mode}-registrationDate`} className="text-base font-semibold flex items-center gap-2">
                <Calendar size={16} className="text-gray-600" />
                Date d'inscription
              </Label>
              <Input
                id={`${mode}-registrationDate`}
                type="date"
                value={formData.registrationDate}
                onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                className="h-12 rounded-xl"
              />
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
                  <TableHead className="font-semibold">N° Adhésion</TableHead>
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
                      <TableCell>{prospect.membershipNumber || '-'}</TableCell>
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
                                membershipNumber: prospect.membershipNumber || '',
                                firstName: prospect.firstName,
                                lastName: prospect.lastName,
                                age: prospect.age.toString(),
                                occupation: (prospect.occupation?.toLowerCase() || 'student') as 'student' | 'employee',
                                giftCode: prospect.giftCode || '',
                                observation: (prospect.observation?.toLowerCase() || 'alone') as 'alone' | 'accompanied',
                                firstContactId: prospect.firstContactId || '',
                                secondContactId: prospect.secondContactId || 'none',
                                action: prospect.action || '',
                                gender: prospect.gender || '',
                                email: prospect.email || '',
                                phone: prospect.phone || '',
                                registrationDate: prospect.registrationDate ? new Date(prospect.registrationDate).toISOString().substring(0, 10) : ''
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
