import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { Search, UserPlus, Pencil, Trash2, User, Briefcase, Hash, Gift, Eye, Users, BookOpen, Calendar, DollarSign, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { exportPDF } from '../services/api';


export default function Candidates() {
  const { currentUser, candidates, inscriptions, formations, commercials, addCandidate, updateCandidate, deleteCandidate, addCandidateAssignment, deleteInscription } = useApp();

  const isCandidateActive = (candidateId: string) =>
    inscriptions.some(
      ins =>
        ins.candidateId === candidateId &&
        (ins.status || ins.statut) !== 'CANCELLED'
    );

  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState<typeof candidates[0] | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    occupation: 'student' as 'student' | 'employee',
    giftCode: '',
    observation: 'alone' as 'alone' | 'accompanied',
    contact: [] as string[],
    action: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    const candidate = candidates.find(c => c.candidateCode.toLowerCase() === searchCode.toLowerCase());
    setSearchResult(candidate || null);
    if (!candidate) {
      toast.error(`Aucun candidat trouvé avec le code "${searchCode}"`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addCandidate({
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: parseInt(formData.age),
        occupation: formData.occupation,
        giftCode: formData.giftCode || undefined,
        observation: formData.observation,
        contact: formData.contact.length > 0 ? formData.contact : undefined,
        action: formData.action || undefined
      });

      toast.success('Candidat ajouté avec succès');
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erreur lors de l\'ajout du candidat');
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      occupation: 'student',
      giftCode: '',
      observation: 'alone',
      contact: [],
      action: ''
    });
  };



  const handleEdit = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setFormData({
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        age: candidate.age.toString(),
        occupation: candidate.occupation,
        giftCode: candidate.giftCode || '',
        observation: candidate.observation,
        contact: candidate.contact || [],
        action: candidate.action || ''
      });
      setSelectedCandidate(candidateId);
      setIsEditDialogOpen(true);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCandidate) return;

    try {
      const candidate = candidates.find(c => c.id === selectedCandidate);
      await updateCandidate(selectedCandidate, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: parseInt(formData.age),
        occupation: formData.occupation,
        giftCode: formData.giftCode || undefined,
        observation: formData.observation,
        contact: formData.contact.length > 0 ? formData.contact : undefined,
        action: formData.action || undefined
      });

      toast.success('Candidat modifié avec succès');
      setIsEditDialogOpen(false);
      setSelectedCandidate(null);
      resetForm();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erreur lors de la modification du candidat');
    }
  };



  const handleDeleteClick = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCandidate) return;

    try {
      await deleteCandidate(selectedCandidate);
      toast.success('Candidat supprimé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression du candidat');
    }

    setIsDeleteDialogOpen(false);
    setSelectedCandidate(null);
  };

  const handleDeleteInscription = async (inscriptionId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) {
      await deleteInscription(inscriptionId);
    }
  };

  const getFormation = (formationId: string) => {
    return formations.find(f => f.id === formationId);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Candidats</h1>
          <p className="text-gray-500 mt-2">Recherche, consultation et gestion des candidats inscrits</p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => exportPDF('/candidates/export/pdf', 'candidates.pdf')}
            className="shadow-sm border-gray-300"
          >
            <FileText size={20} className="mr-2 text-red-600" />
            Exporter Candidats PDF
          </Button>



          {(currentUser?.role === 'agent_reservation' || currentUser?.role === 'admin') && (

            <>

              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="shadow-md">
                    <UserPlus size={20} className="mr-2" />
                    Nouveau candidat
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Ajouter un nouveau candidat</DialogTitle>
                    <DialogDescription>
                      Remplissez les informations du candidat pour créer sa fiche
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Section Informations principales */}
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <User className="text-blue-600" size={20} />
                        Informations principales
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-base font-semibold flex items-center gap-2">
                            <User size={16} className="text-gray-600" />
                            Prénom *
                          </Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="h-12 rounded-xl"
                            placeholder="Entrez le prénom"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-base font-semibold flex items-center gap-2">
                            <User size={16} className="text-gray-600" />
                            Nom *
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="h-12 rounded-xl"
                            placeholder="Entrez le nom"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="occupation" className="text-base font-semibold flex items-center gap-2">
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
                          <Label htmlFor="age" className="text-base font-semibold flex items-center gap-2">
                            <Hash size={16} className="text-gray-600" />
                            Âge *
                          </Label>
                          <Input
                            id="age"
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

                    {/* Section Informations complémentaires */}
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Gift className="text-purple-600" size={20} />
                        Informations complémentaires
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="giftCode" className="text-base font-semibold flex items-center gap-2">
                            <Gift size={16} className="text-gray-600" />
                            Code cadeau
                          </Label>
                          <Input
                            id="giftCode"
                            value={formData.giftCode}
                            onChange={(e) => handleInputChange('giftCode', e.target.value)}
                            className="h-12 rounded-xl"
                            placeholder="Ex: PROMO2026"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="observation" className="text-base font-semibold flex items-center gap-2">
                            <Eye size={16} className="text-gray-600" />
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
                          <Label htmlFor="action" className="text-base font-semibold flex items-center gap-2">
                            <Briefcase size={16} className="text-gray-600" />
                            Action *
                          </Label>
                          <Select
                            value={formData.action}
                            onValueChange={(value) => {
                              handleInputChange('action', value);
                              setFormData(prev => ({ ...prev, contact: [] }));
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

                        <div className="space-y-2">
                          <Label htmlFor="contact" className="text-base font-semibold flex items-center gap-2">
                            <Users size={16} className="text-gray-600" />
                            Contact {formData.action && '*'}
                          </Label>
                          {formData.action ? (
                            <div className="border rounded-xl p-4 space-y-2 max-h-32 overflow-y-auto bg-white">
                              {commercials
                                .filter(c => c.action === formData.action)
                                .map((commercial) => (
                                  <div key={commercial.id} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id={`commercial-${commercial.id}`}
                                      checked={formData.contact.includes(commercial.id)}
                                      onChange={(e) => {
                                        const newContacts = e.target.checked
                                          ? [...formData.contact, commercial.id]
                                          : formData.contact.filter(id => id !== commercial.id);
                                        setFormData(prev => ({ ...prev, contact: newContacts }));
                                      }}
                                      className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <label
                                      htmlFor={`commercial-${commercial.id}`}
                                      className="text-sm cursor-pointer flex-1"
                                    >
                                      {commercial.firstName} {commercial.lastName}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <div className="border rounded-xl p-4 text-sm text-gray-500 bg-white h-12 flex items-center">
                              Sélectionnez d'abord une action
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

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
                        Enregistrer le candidat
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>

      {/* Search Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="searchCode" className="text-base font-semibold flex items-center gap-2">
                <Search size={18} className="text-gray-600" />
                Rechercher un candidat par code
              </Label>
              <Input
                id="searchCode"
                placeholder="Ex: CAND001"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} size="lg" className="h-12">
                <Search size={18} className="mr-2" />
                Rechercher
              </Button>
            </div>
          </div>

          {searchResult && (
            <div className="mt-6 p-6 bg-white rounded-xl border border-blue-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                Résultat de la recherche
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Nom complet</p>
                  <p className="font-semibold text-lg">{searchResult.firstName} {searchResult.lastName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Code candidat</p>
                  <p className="font-mono font-semibold text-lg">{searchResult.candidateCode}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Statut</p>
                  <Badge className={isCandidateActive(searchResult.id) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {isCandidateActive(searchResult.id) ? 'Actif' : 'Non actif'}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Formation</p>
                  <p className="font-medium">{getFormation(searchResult.formationId)?.subject || 'Non affecté'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Niveau</p>
                  <p className="font-medium">{getFormation(searchResult.formationId)?.level || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium capitalize">{getFormation(searchResult.formationId)?.type || '-'}</p>
                </div>
              </div>

              {searchResult.formationId !== 'unassigned' && (() => {
                const activeIns = inscriptions.find(ins => ins.candidateId === searchResult.id && ins.statut === 'ACTIVE');
                if (activeIns && activeIns.volumeHoraire) {
                  return (
                    <div className="space-y-1 mt-4 pt-4 border-t border-blue-100">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                          <Clock size={16} className="text-orange-500" />
                          Progression de la formation
                        </p>
                        <p className="text-sm font-bold text-orange-600">{activeIns.remainingHours}h restantes sur {activeIns.volumeHoraire}h</p>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2.5 overflow-hidden shadow-sm border border-blue-200">
                        <div
                          className="bg-gradient-to-r from-orange-400 to-orange-600 h-full transition-all duration-500"
                          style={{ width: `${Math.max(0, Math.min(100, (1 - activeIns.remainingHours / activeIns.volumeHoraire) * 100))}%` }}
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}

          {searchCode && !searchResult && searchCode.length > 0 && (
            <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200 text-red-700 flex items-center gap-2">
              <XCircle size={20} />
              <span>Aucun candidat trouvé avec le code "{searchCode}"</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Candidates Table */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Tous les candidats</CardTitle>
              <CardDescription className="mt-1">
                {(() => {
                  const count = candidates.filter(c => isCandidateActive(c.id)).length;
                  return `${count} candidat${count > 1 ? 's' : ''} actif${count > 1 ? 's' : ''}`;
                })()}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {candidates.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucun candidat enregistré</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Nom</TableHead>
                  <TableHead className="font-semibold">Âge</TableHead>
                  <TableHead className="font-semibold">Fonction</TableHead>
                  <TableHead className="font-semibold">Observation</TableHead>
                  <TableHead className="font-semibold">Formation</TableHead>
                  <TableHead className="font-semibold text-center">Heures</TableHead>
                  <TableHead className="font-semibold">Code</TableHead>
                  <TableHead className="font-semibold">Statut</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{candidate.firstName} {candidate.lastName}</p>
                          <p className="text-xs text-gray-500">{candidate.occupation === 'student' ? 'Étudiant' : 'Employé'}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.age} ans</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {candidate.occupation === 'student' ? 'Étudiant' : 'Employé'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {candidate.observation === 'alone' ? 'Seul' : 'Accompagné'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-blue-700">
                      <div className="flex flex-col gap-1">
                        {inscriptions.filter(ins => ins.candidateId === candidate.id).length > 0 ? (
                          inscriptions
                            .filter(ins => ins.candidateId === candidate.id)
                            .map((ins) => (
                              <div key={ins.id} className="flex items-center gap-1">
                                <Badge
                                  variant={ins.statut === 'ACTIVE' ? 'default' : 'outline'}
                                  className={`text-[10px] px-1 h-4 ${ins.statut === 'ACTIVE' ? 'bg-blue-600' :
                                    ins.statut === 'COMPLETED' ? 'bg-green-100 text-green-700 border-green-200' :
                                      'bg-gray-100 text-gray-400 border-gray-200'
                                    }`}
                                >
                                  {ins.statut}
                                </Badge>
                                <span className="text-xs">
                                  {(() => {
                                    const form = getFormation(ins.formationId);
                                    return form ? `${form.subject} - ${form.level}` : ins.formationId;
                                  })()}
                                </span>
                              </div>
                            ))
                        ) : (
                          <span className="text-gray-400 text-xs italic">Aucune formation</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 min-w-[100px]">
                        {inscriptions
                          .filter(ins => ins.candidateId === candidate.id && ins.statut === 'ACTIVE')
                          .map((ins) => (
                            <div key={ins.id} className="space-y-1">
                              <div className="flex justify-between text-[10px] leading-tight">
                                <span className="font-bold text-orange-600">{ins.remainingHours}h</span>
                                <span className="text-gray-400">/ {ins.volumeHoraire}h</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden border border-gray-200/50">
                                <div
                                  className="bg-gradient-to-r from-orange-400 to-orange-500 h-full transition-all"
                                  style={{ width: `${ins.volumeHoraire ? Math.max(0, Math.min(100, (1 - ins.remainingHours / ins.volumeHoraire) * 100)) : 0}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        {inscriptions.filter(ins => ins.candidateId === candidate.id && ins.statut === 'ACTIVE').length === 0 && (
                          <div className="text-center">
                            <span className="text-[10px] text-gray-300 italic">-</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm font-semibold text-blue-700">
                      {candidate.candidateCode}
                    </TableCell>
                    <TableCell>
                      <Badge className={isCandidateActive(candidate.id) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {isCandidateActive(candidate.id) ? 'Actif' : 'Non actif'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => handleEdit(candidate.id)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteClick(candidate.id)}
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide">
          <DialogHeader>
            <DialogTitle className="text-2xl">Modifier le candidat</DialogTitle>
            <DialogDescription>
              Modifiez les informations du candidat
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Même structure que le formulaire d'ajout */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User className="text-blue-600" size={20} />
                Informations principales
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="edit-firstName" className="text-base font-semibold flex items-center gap-2">
                    <User size={16} className="text-gray-600" />
                    Prénom *
                  </Label>
                  <Input
                    id="edit-firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-lastName" className="text-base font-semibold flex items-center gap-2">
                    <User size={16} className="text-gray-600" />
                    Nom *
                  </Label>
                  <Input
                    id="edit-lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-occupation" className="text-base font-semibold flex items-center gap-2">
                    <Briefcase size={16} className="text-gray-600" />
                    Fonction *
                  </Label>
                  <Select value={formData.occupation} onValueChange={(value) => handleInputChange('occupation', value)}>
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
                  <Label htmlFor="edit-age" className="text-base font-semibold flex items-center gap-2">
                    <Hash size={16} className="text-gray-600" />
                    Âge *
                  </Label>
                  <Input
                    id="edit-age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="h-12 rounded-xl"
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
                  <Label htmlFor="edit-giftCode" className="text-base font-semibold flex items-center gap-2">
                    <Gift size={16} className="text-gray-600" />
                    Code cadeau
                  </Label>
                  <Input
                    id="edit-giftCode"
                    value={formData.giftCode}
                    onChange={(e) => handleInputChange('giftCode', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-observation" className="text-base font-semibold flex items-center gap-2">
                    <Eye size={16} className="text-gray-600" />
                    Observation *
                  </Label>
                  <Select value={formData.observation} onValueChange={(value) => handleInputChange('observation', value)}>
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
                  <Label htmlFor="edit-action" className="text-base font-semibold flex items-center gap-2">
                    <Briefcase size={16} className="text-gray-600" />
                    Action *
                  </Label>
                  <Select
                    value={formData.action}
                    onValueChange={(value) => {
                      handleInputChange('action', value);
                      setFormData(prev => ({ ...prev, contact: [] }));
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

                <div className="space-y-2">
                  <Label htmlFor="edit-contact" className="text-base font-semibold flex items-center gap-2">
                    <Users size={16} className="text-gray-600" />
                    Contact {formData.action && '*'}
                  </Label>
                  {formData.action ? (
                    <div className="border rounded-xl p-4 space-y-2 max-h-32 overflow-y-auto bg-white">
                      {commercials
                        .filter(c => c.action === formData.action)
                        .map((commercial) => (
                          <div key={commercial.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`edit-commercial-${commercial.id}`}
                              checked={formData.contact.includes(commercial.id)}
                              onChange={(e) => {
                                const newContacts = e.target.checked
                                  ? [...formData.contact, commercial.id]
                                  : formData.contact.filter(id => id !== commercial.id);
                                setFormData(prev => ({ ...prev, contact: newContacts }));
                              }}
                              className="w-4 h-4 rounded border-gray-300"
                            />
                            <label
                              htmlFor={`edit-commercial-${commercial.id}`}
                              className="text-sm cursor-pointer flex-1"
                            >
                              {commercial.firstName} {commercial.lastName}
                            </label>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="border rounded-xl p-4 text-sm text-gray-500 bg-white h-12 flex items-center">
                      Sélectionnez d'abord une action
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Section Formations & Inscriptions */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <BookOpen className="text-orange-600" size={20} />
                Formations & Inscriptions
              </h3>
              <div className="space-y-3">
                {inscriptions.filter(ins => ins.candidateId === selectedCandidate).length > 0 ? (
                  <div className="grid gap-3">
                    {inscriptions
                      .filter(ins => ins.candidateId === selectedCandidate)
                      .map((ins) => (
                        <div key={ins.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="p-2 bg-orange-50 rounded-lg">
                              <BookOpen size={18} className="text-orange-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">{getFormation(ins.formationId)?.subject}</p>
                              <div className="flex gap-2 items-center">
                                <Badge variant="outline" className="text-[10px] h-4">
                                  {ins.statut}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {new Date(ins.dateInscription).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                              {ins.volumeHoraire && (
                                <div className="mt-2 space-y-1">
                                  <div className="flex justify-between text-[10px] text-gray-500">
                                    <span className="font-medium text-orange-600">{ins.remainingHours}h restantes</span>
                                    <span>Total: {ins.volumeHoraire}h</span>
                                  </div>
                                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div
                                      className="bg-orange-500 h-full transition-all"
                                      style={{ width: `${Math.max(0, Math.min(100, (1 - ins.remainingHours / ins.volumeHoraire) * 100))}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteInscription(ins.id)}
                          >
                            <Trash2 size={16} />
                            <span className="ml-2">Éliminer</span>
                          </Button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 italic bg-white rounded-xl border border-dashed">
                    Aucune inscription active
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  resetForm();
                }}
              >
                Annuler
              </Button>
              <Button type="submit" size="lg">
                <CheckCircle size={18} className="mr-2" />
                Enregistrer les modifications
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="text-red-600" />
              Confirmer la suppression
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce candidat ? Le candidat sera marqué comme inactif.
              Cette action peut être annulée en modifiant le statut du candidat.
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
