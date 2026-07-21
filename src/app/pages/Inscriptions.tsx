import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Edit, Trash2, Plus, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { exportPDF } from '../services/api';
import { GestionInscriptionsDialog } from '../components/GestionInscriptionsDialog';
import { LearningGroupDetailsDialog } from '../components/LearningGroupDetailsDialog';

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

export default function Inscriptions() {
    const { inscriptions, learningGroups, formations, candidates, professors, deleteLearningGroup } = useApp();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [filterType, setFilterType] = useState<'ALL' | 'MONOME' | 'BINOME' | 'GROUPE' | 'SPECIFIQUE'>('ALL');
    const [editingInscriptionId, setEditingInscriptionId] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedInscriptionId, setSelectedInscriptionId] = useState<string | null>(null);

    // Details Popup State
    const [selectedDetailsGroup, setSelectedDetailsGroup] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const handleOpenDetails = (group: any) => {
        setSelectedDetailsGroup(group);
        setIsDetailsOpen(true);
    };

    const handleEdit = (id: string) => {
        setEditingInscriptionId(id);
        setIsAddDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setSelectedInscriptionId(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedInscriptionId) return;

        try {
            await deleteLearningGroup(selectedInscriptionId);
            toast.success('Inscription supprimée');
        } catch (error) {
            toast.error('Erreur lors de la suppression');
        }
        setIsDeleteDialogOpen(false);
        setSelectedInscriptionId(null);
    };

    const handleDialogClose = (open: boolean) => {
        setIsAddDialogOpen(open);
        if (!open) {
            setEditingInscriptionId(null);
        }
    };

    const getCandidateName = (ins: any) => {
        const cand = ins.candidate || candidates.find((c: any) => c.id === ins.candidateId);
        return cand ? `${cand.firstName} ${cand.lastName}` : 'Inconnu';
    };

    const getCandidateCode = (ins: any) => {
        const cand = ins.candidate || candidates.find((c: any) => c.id === ins.candidateId);
        return cand ? cand.candidateCode : '';
    };

    const getFormationDisplay = (ins: any) => {
        const form = ins.formation || formations.find((f: any) => f.id === ins.formationId);
        if (!form) return 'Inconnue';
        const matiere = form.matiere !== undefined ? form.matiere : (form as any).subject;
        const niveau = form.niveau !== undefined ? form.niveau : (form as any).level;
        return `${matiere} - ${niveau}`;
    };

    const getProfessorDisplay = (ins: any) => {
        const prof = ins.professor || professors.find((p: any) => p.id === ins.professorId);
        if (!prof) return 'Non affecté';
        const nom = prof.nom !== undefined ? prof.nom : (prof as any).lastName;
        const prenom = prof.prenom !== undefined ? prof.prenom : (prof as any).firstName;
        return `${nom} ${prenom}`;
    };

    const filteredInscriptions = (learningGroups || []).filter(group => {
        if (filterType === 'ALL') return true;
        if (filterType === 'SPECIFIQUE') {
            return group.groupName.toLowerCase().includes('spécifique');
        }
        if (filterType === 'GROUPE') {
            return (
                group.learningMode === 'GROUPE' &&
                !group.groupName.toLowerCase().includes('spécifique')
            );
        }
        return group.learningMode === filterType;
    });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestion des Inscriptions</h1>
                    <p className="text-gray-500 mt-2">Gérer les inscriptions de formation</p>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => exportPDF('/inscriptions/export/pdf', 'inscriptions.pdf')}
                        className="shadow-sm border-gray-300"
                    >
                        <FileText size={18} className="mr-2 text-red-650" />
                        Exporter PDF
                    </Button>

                    <Button onClick={() => setIsAddDialogOpen(true)}>
                        <Plus size={18} className="mr-2" />
                        Nouvelle inscription
                    </Button>

                    <GestionInscriptionsDialog
                        isOpen={isAddDialogOpen}
                        onOpenChange={handleDialogClose}
                        inscriptionId={editingInscriptionId}
                    />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Liste des inscriptions</CardTitle>
                    <CardDescription>Toutes les inscriptions de formation enregistrées</CardDescription>
                </CardHeader>
                <CardContent>
                    {inscriptions.length > 0 && (
                        <div className="flex items-center gap-2 mb-6 bg-gray-50 p-1 rounded-lg w-fit border border-gray-200">
                            {[
                                { id: 'ALL', label: 'Tous' },
                                { id: 'MONOME', label: 'Monômes' },
                                { id: 'BINOME', label: 'Binômes' },
                                { id: 'GROUPE', label: 'Groupes' },
                                { id: 'SPECIFIQUE', label: 'Spécifique' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setFilterType(tab.id as any)}
                                    className={`text-xs font-medium px-4 py-1.5 rounded-md transition-all ${filterType === tab.id
                                        ? 'bg-white text-indigo-705 shadow-sm border border-gray-200'
                                        : 'text-gray-600 hover:text-gray-905 border border-transparent'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}
                    {filteredInscriptions.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            {learningGroups.length === 0 ? 'Aucune inscription enregistrée' : 'Aucune inscription ne correspond à ce filtre'}
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>N° Inscription</TableHead>
                                    <TableHead>Nom Groupe</TableHead>
                                    <TableHead>Formation</TableHead>
                                    <TableHead>Professeur</TableHead>
                                    <TableHead>Mode d'apprentissage</TableHead>
                                    <TableHead>Membres</TableHead>
                                    <TableHead>Date d'inscription</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredInscriptions.map((group) => (
                                    <TableRow key={group.id}>
                                        <TableCell className="font-mono text-xs font-semibold text-gray-700">
                                            {group.inscriptionCode || `INS-${group.id.split('-')[0].toUpperCase()}`}
                                        </TableCell>
                                        <TableCell
                                            className="font-bold text-indigo-705 cursor-pointer hover:text-indigo-900 transition-colors select-none"
                                            onClick={() => handleOpenDetails(group)}
                                        >
                                            {group.groupName}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="font-medium">
                                                {getFormationDisplay(group)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-semibold text-blue-900">
                                            {getProfessorDisplay(group)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`w-fit text-[10px] ${group.learningMode === 'MONOME' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                                group.learningMode === 'BINOME' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                    group.groupName.toLowerCase().includes('spécifique') ? 'bg-green-50 text-green-700 border-green-200' :
                                                        'bg-gray-50 text-gray-700 border-gray-200'
                                                }`}>
                                                {group.learningMode === 'MONOME' ? 'Monôme' : group.learningMode === 'BINOME' ? 'Binôme' : group.groupName.toLowerCase().includes('spécifique') ? 'Spécifique' : 'Groupe'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-xs font-semibold text-indigo-705">
                                            {group.inscriptions ? `${group.inscriptions.length} membres` : '0 membre'}
                                        </TableCell>
                                        <TableCell className="text-xs text-gray-600">
                                            {group.dateInscription
                                                ? new Date(group.dateInscription).toLocaleDateString('fr-FR')
                                                : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEdit(group.inscriptions?.[0]?.id || '')}
                                                    disabled={!group.inscriptions || group.inscriptions.length === 0}
                                                    className="hover:bg-indigo-50 hover:text-indigo-650"
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDelete(group.id)}
                                                    disabled={!group.inscriptions || group.inscriptions.length === 0}
                                                    className="hover:bg-red-50 hover:text-red-650"
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

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <Trash2 className="text-red-600" />
                            Confirmer la suppression
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer cette inscription ? Cette action est irréversible.
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

            <LearningGroupDetailsDialog
                isOpen={isDetailsOpen}
                onClose={() => {
                    setIsDetailsOpen(false);
                    setSelectedDetailsGroup(null);
                }}
                group={selectedDetailsGroup}
            />
        </div>
    );
}
