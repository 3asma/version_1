import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Edit, Trash2, Plus, Check, UserCheck, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { exportPDF } from '../services/api';
import { GestionInscriptionsDialog } from '../components/GestionInscriptionsDialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function Groups() {
    const { groups, formations, candidates, inscriptions, professors, addGroup, updateGroup, deleteGroup, addCandidateToGroup, removeCandidateFromGroup } = useApp();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [filterType, setFilterType] = useState<'ALL' | 'MONOME' | 'BINOME' | 'GROUPE'>('ALL');
    const [editingGroup, setEditingGroup] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

    const handleEdit = (groupId: string) => {
        setEditingGroup(groupId);
        setIsAddDialogOpen(true);
    };

    const handleDelete = (groupId: string) => {
        setSelectedGroupId(groupId);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedGroupId) return;

        try {
            await deleteGroup(selectedGroupId);
            toast.success('Inscription supprimée');
        } catch (error) {
            toast.error('Erreur lors de la suppression');
        }
        setIsDeleteDialogOpen(false);
        setSelectedGroupId(null);
    };

    const handleDialogClose = (open: boolean) => {
        setIsAddDialogOpen(open);
        if (!open) {
            setEditingGroup(null);
        }
    };

    const getFormationSubject = (id: string) => {
        return formations.find(f => f.id === id)?.subject || 'Inconnue';
    };

    const getActiveProfessor = (group: any) => {
        return group.professor;
    };

    // All candidates for selection (we'll show which ones are eligible for the formation)
    const availableCandidates = candidates;

    const filteredGroups = groups.filter(g => {
        if (filterType === 'ALL') return true;
        return g.type === filterType;
    });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestion des Inscriptions</h1>
                    <p className="text-gray-500 mt-2">Gérer les inscriptions et les groupes</p>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => exportPDF('/groups/export/pdf', 'groupes.pdf')}
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
                        groupId={editingGroup}
                    />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Liste des inscriptions</CardTitle>
                    <CardDescription>Toutes les inscriptions de formation et leurs effectifs</CardDescription>
                </CardHeader>
                <CardContent>
                    {groups.length > 0 && (
                        <div className="flex items-center gap-2 mb-6 bg-gray-50 p-1 rounded-lg w-fit border border-gray-200">
                            {[
                                { id: 'ALL', label: 'Tous' },
                                { id: 'MONOME', label: 'Monômes' },
                                { id: 'BINOME', label: 'Binômes' },
                                { id: 'GROUPE', label: 'Groupes' }
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
                    {filteredGroups.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            {groups.length === 0 ? 'Aucune inscription enregistrée' : 'Aucune inscription ne correspond à ce filtre'}
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Formation</TableHead>
                                    <TableHead>Membres</TableHead>
                                    <TableHead>Professeur Actuel</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredGroups.map((group) => (
                                    <TableRow key={group.id}>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold text-gray-900">{group.nom}</span>
                                                <Badge variant="outline" className={`w-fit text-[10px] ${group.type === 'MONOME' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                                    group.type === 'BINOME' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                        'bg-gray-50 text-gray-700 border-gray-200'
                                                    }`}>
                                                    {group.type === 'MONOME' ? 'Monôme' : group.type === 'BINOME' ? 'Binôme' : 'Groupe'}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="font-medium">
                                                {getFormationSubject(group.formationId)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-2">
                                                {group.members && group.members.length > 0 ? (
                                                    <div className="text-xs text-gray-600 space-y-2 mt-1">
                                                        {group.members.map(m => {
                                                            const c = m.candidate;
                                                            if (!c) return null;
                                                            const matchingIns = inscriptions.find(ins =>
                                                                ins.candidateId === c.id &&
                                                                ins.formationId === group.formationId &&
                                                                (ins.status || ins.statut) !== 'CANCELLED'
                                                            );
                                                            const f = matchingIns ? formations.find(form => form.id === matchingIns.formationId) : null;
                                                            return (
                                                                <div key={m.id} className="space-y-0.5">
                                                                    <div className="font-semibold text-gray-800">{c.firstName} {c.lastName}</div>
                                                                    {f && (
                                                                        <div className="text-[10px] text-indigo-600 font-medium pl-1">
                                                                            {f.subject} - {f.level}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">Aucun membre</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {(() => {
                                                const activeProf = getActiveProfessor(group) as any;
                                                return activeProf ? (
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-semibold text-blue-900">
                                                            {activeProf.prenom || activeProf.firstName} {activeProf.nom || activeProf.lastName}
                                                        </span>
                                                        <Badge variant="outline" className="w-fit text-[10px] bg-blue-50 text-blue-700 border-blue-200">Actif</Badge>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400 italic">Non affecté</span>
                                                );
                                            })()}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                                            {group.description || '-'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEdit(group.id)}
                                                    className="hover:bg-indigo-50 hover:text-indigo-600"
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDelete(group.id)}
                                                    className="hover:bg-red-50 hover:text-red-600"
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
        </div>
    );
}
