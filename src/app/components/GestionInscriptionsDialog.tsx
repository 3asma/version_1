import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Check, BookOpen, Clock, DollarSign, Hash, Search, AlertCircle, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface GestionInscriptionsDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    groupId?: string | null;
    candidateId?: string | null;
    onSuccess?: () => void;
}

export function GestionInscriptionsDialog({
    isOpen,
    onOpenChange,
    groupId,
    candidateId,
    onSuccess
}: GestionInscriptionsDialogProps) {
    const {
        candidates,
        formations,
        inscriptions,
        groups,
        professors,
        addInscription,
        updateInscription,
        addGroup,
        updateGroup,
        addCandidateToGroup,
        removeCandidateFromGroup
    } = useApp();

    const [formState, setFormState] = useState({
        type: 'MONOME' as 'MONOME' | 'BINOME' | 'GROUPE',
        nom: '',
        formationId: '',
        candidateIds: [] as string[],
        professorId: '',
        price: 0,
        duration: 6,
        volumeHoraire: 72,
        startDate: '',
        note: ''
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize & Edit Form State
    useEffect(() => {
        if (isOpen) {
            if (groupId) {
                const group = groups.find(g => g.id === groupId);
                if (group) {
                    const firstMemberId = group.members?.[0]?.candidateId;
                    const matchingIns = firstMemberId
                        ? inscriptions.find(ins => ins.candidateId === firstMemberId && ins.formationId === group.formationId)
                        : null;

                    setFormState({
                        type: group.type,
                        nom: group.nom,
                        formationId: group.formationId,
                        candidateIds: group.members?.map(m => m.candidateId) || [],
                        professorId: group.professorId || '',
                        price: matchingIns?.price || 0,
                        duration: matchingIns?.duration || 6,
                        volumeHoraire: matchingIns?.volumeHoraire || 72,
                        startDate: matchingIns?.dateInscription
                            ? new Date(matchingIns.dateInscription).toISOString().split('T')[0]
                            : new Date().toISOString().split('T')[0],
                        note: matchingIns?.note || ''
                    });
                }
            } else {
                // Reset form for creation
                setFormState({
                    type: 'MONOME',
                    nom: '',
                    formationId: '',
                    candidateIds: candidateId ? [candidateId] : [],
                    professorId: '',
                    price: 0,
                    duration: 6,
                    volumeHoraire: 72,
                    startDate: new Date().toISOString().split('T')[0],
                    note: ''
                });
            }
            setSearchQuery('');
        }
    }, [isOpen, groupId, groups, inscriptions, candidateId]);

    // Set defaults when Formation or Type changes
    useEffect(() => {
        if (formState.formationId && !groupId) {
            const formation = formations.find(f => f.id === formState.formationId);
            if (formation) {
                const hoursPerMonth = formState.type === 'BINOME' ? 18 : 12;
                const durationVal = formState.duration || 6;
                const computedVolume = durationVal * hoursPerMonth;

                setFormState(prev => ({
                    ...prev,
                    price: (formation as any).prix || prev.price || 0,
                    volumeHoraire: computedVolume,
                    startDate: prev.startDate || new Date().toISOString().split('T')[0]
                }));
            }
        }
    }, [formState.formationId, formState.type, formations, groupId]);

    const handleFormationChange = (newFormationId: string) => {
        setFormState(prev => ({
            ...prev,
            formationId: newFormationId,
            candidateIds: []
        }));
    };

    const handleTypeChange = (newType: 'MONOME' | 'BINOME' | 'GROUPE') => {
        setFormState(prev => {
            const hoursPerMonth = newType === 'BINOME' ? 18 : 12;
            const durationVal = prev.duration || 6;
            const filteredCandidateIds = prev.candidateIds.length > (newType === 'MONOME' ? 1 : newType === 'BINOME' ? 2 : 999)
                ? []
                : prev.candidateIds;

            return {
                ...prev,
                type: newType,
                candidateIds: filteredCandidateIds,
                volumeHoraire: durationVal * hoursPerMonth
            };
        });
    };

    const handleDurationChange = (val: number) => {
        const hoursPerMonth = formState.type === 'BINOME' ? 18 : 12;
        setFormState(prev => ({
            ...prev,
            duration: val,
            volumeHoraire: val ? val * hoursPerMonth : 0
        }));
    };

    // Get eligible candidates for the current formation selection
    const availableCandidates = candidates.filter(candidate => {
        if (!formState.formationId) return false;
        // Check if the candidate is already in another group for this same formation (excluding the current group we are editing)
        const isInOtherGroup = groups.some(g =>
            g.formationId === formState.formationId &&
            g.id !== groupId &&
            g.members?.some(m => m.candidateId === candidate.id)
        );
        // Include the candidate if they match search criteria and are active or pending
        const matchesSearch = `${candidate.firstName} ${candidate.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) || candidate.candidateCode.toLowerCase().includes(searchQuery.toLowerCase());

        return !isInOtherGroup && (candidate.status === 'active' || candidate.status === 'pending') && matchesSearch;
    });

    const handleCandidateToggle = (candId: string) => {
        setFormState(prev => {
            const isSelected = prev.candidateIds.includes(candId);
            let newCandidateIds = [...prev.candidateIds];

            if (isSelected) {
                newCandidateIds = newCandidateIds.filter(id => id !== candId);
            } else {
                if (prev.type === 'MONOME') {
                    newCandidateIds = [candId];
                } else if (prev.type === 'BINOME') {
                    if (newCandidateIds.length >= 2) {
                        toast.error('Un binôme doit contenir exactement 2 candidats.');
                        return prev;
                    }
                    newCandidateIds.push(candId);
                } else {
                    newCandidateIds.push(candId);
                }
            }

            // Auto-generate name for the group if not editing
            let suggestedName = prev.nom;
            if (!groupId) {
                const selectedNames = candidates
                    .filter(c => newCandidateIds.includes(c.id))
                    .map(c => `${c.firstName} ${c.lastName.charAt(0)}.`);

                if (prev.type === 'MONOME' && selectedNames.length > 0) {
                    suggestedName = `Monôme ${selectedNames[0]}`;
                } else if (prev.type === 'BINOME' && selectedNames.length > 0) {
                    suggestedName = `Binôme ${selectedNames.slice(0, 2).join(' & ')}`;
                } else if (prev.type === 'GROUPE') {
                    const subject = formations.find(f => f.id === prev.formationId)?.subject || '';
                    suggestedName = `Groupe ${subject}`;
                }
            }

            return {
                ...prev,
                candidateIds: newCandidateIds,
                nom: suggestedName
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { type, nom, formationId, candidateIds, professorId, price, duration, volumeHoraire, startDate, note } = formState;

        if (!formationId) {
            toast.error('Veuillez sélectionner une formation.');
            return;
        }
        if (candidateIds.length === 0) {
            toast.error('Veuillez sélectionner au moins un candidat.');
            return;
        }

        if (type === 'MONOME' && candidateIds.length !== 1) {
            toast.error('Un monôme doit contenir exactement 1 candidat.');
            return;
        }
        if (type === 'BINOME' && candidateIds.length !== 2) {
            toast.error('Un binôme doit contenir exactement 2 candidats.');
            return;
        }
        if (type === 'GROUPE' && candidateIds.length < 1) {
            toast.error('Un groupe doit contenir au moins 1 candidat.');
            return;
        }

        const groupName = type === 'MONOME'
            ? `Monôme ${candidates.find(c => c.id === candidateIds[0])?.firstName || ''} ${candidates.find(c => c.id === candidateIds[0])?.lastName || ''}`.trim()
            : type === 'BINOME'
                ? `Binôme ${candidateIds.map(id => {
                    const c = candidates.find(cand => cand.id === id);
                    return c ? `${c.firstName} ${c.lastName.charAt(0)}.` : '';
                }).join(' & ')}`
                : nom;

        if (type === 'GROUPE' && !groupName.trim()) {
            toast.error('Le nom du groupe est obligatoire pour un groupe.');
            return;
        }

        setIsSubmitting(true);
        try {
            // 1. Process candidate inscriptions
            for (const candidateId of candidateIds) {
                const existing = inscriptions.find(ins =>
                    ins.candidateId === candidateId &&
                    ins.formationId === formationId &&
                    (ins.status || ins.statut) !== 'CANCELLED'
                );

                if (existing) {
                    await updateInscription(existing.id, {
                        price: Number(price),
                        duration: Number(duration),
                        volumeHoraire: Number(volumeHoraire),
                        learningMode: type,
                        dateInscription: new Date(startDate).toISOString(),
                        note: note || `Mis à jour via Gestion Inscriptions`
                    });
                } else {
                    await addInscription({
                        candidateId,
                        formationId,
                        statut: 'ACTIVE',
                        duration: Number(duration),
                        price: Number(price),
                        volumeHoraire: Number(volumeHoraire),
                        remainingHours: Number(volumeHoraire),
                        learningMode: type,
                        professorId: professorId || undefined,
                        note: note || `Créé via Gestion Inscriptions`
                    } as any);
                }
            }

            // 2. Synchronize group / affectation
            if (type === 'MONOME') {
                if (groupId) {
                    await updateGroup(groupId, {
                        nom: groupName,
                        type: 'MONOME',
                        formationId,
                        professorId: professorId || null
                    });
                    // Sync members
                    const originalGroup = groups.find(g => g.id === groupId);
                    const originalMemberIds = originalGroup?.members?.map(m => m.candidateId) || [];
                    const toAdd = candidateIds.filter(id => !originalMemberIds.includes(id));
                    const toRemove = originalMemberIds.filter(id => !candidateIds.includes(id));

                    for (const id of toAdd) await addCandidateToGroup(groupId, id);
                    for (const id of toRemove) await removeCandidateFromGroup(groupId, id);
                }
            } else {
                if (groupId) {
                    // Editing existing group
                    await updateGroup(groupId, {
                        nom: groupName,
                        type,
                        formationId,
                        professorId: professorId || null
                    });

                    // Sync members
                    const originalGroup = groups.find(g => g.id === groupId);
                    const originalMemberIds = originalGroup?.members?.map(m => m.candidateId) || [];
                    const toAdd = candidateIds.filter(id => !originalMemberIds.includes(id));
                    const toRemove = originalMemberIds.filter(id => !candidateIds.includes(id));

                    for (const id of toAdd) {
                        await addCandidateToGroup(groupId, id);
                    }
                    for (const id of toRemove) {
                        await removeCandidateFromGroup(groupId, id);
                    }
                } else {
                    // Creating a new group
                    await addGroup({
                        nom: groupName,
                        type,
                        formationId,
                        candidateIds,
                        professorId: professorId || undefined
                    });
                }
            }

            toast.success(groupId ? 'Inscription mise à jour avec succès.' : 'Inscription créée avec succès.');
            onOpenChange(false);
            if (onSuccess) onSuccess();
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.error || "Une erreur est survenue lors de l'enregistrement.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const activeCandidatesCount = formState.candidateIds.length;
    const isRuleRespected =
        (formState.type === 'MONOME' && activeCandidatesCount === 1) ||
        (formState.type === 'BINOME' && activeCandidatesCount === 2) ||
        (formState.type === 'GROUPE' && activeCandidatesCount >= 1);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2 font-bold text-gray-900 border-b pb-2">
                        <BookOpen className="text-indigo-600" size={24} />
                        {groupId ? 'Modifier Inscription / Groupe' : 'Gestion des Inscriptions'}
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 pt-1">
                        Créer ou modifier une inscription et son groupe
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Field 1: Type d'inscription */}
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label htmlFor="type" className="font-semibold text-gray-700 text-sm">
                                Type d'inscription *
                            </Label>
                            <Select
                                value={formState.type}
                                onValueChange={(val: any) => handleTypeChange(val)}
                                disabled={!!groupId}
                            >
                                <SelectTrigger id="type" className="h-10 rounded-lg">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MONOME">Monôme (1 candidat)</SelectItem>
                                    <SelectItem value="BINOME">Binôme (2 candidats)</SelectItem>
                                    <SelectItem value="GROUPE">Groupe (Sélection multiple)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Field 2: Nom du groupe (Visible only for GROUPE) */}
                        {formState.type === 'GROUPE' && (
                            <div className="space-y-2 col-span-2 sm:col-span-1">
                                <Label htmlFor="nom" className="font-semibold text-gray-700 text-sm">
                                    Nom du groupe *
                                </Label>
                                <Input
                                    id="nom"
                                    placeholder="Ex: Groupe A / Classe 1"
                                    value={formState.nom}
                                    onChange={(e) => setFormState(prev => ({ ...prev, nom: e.target.value }))}
                                    className="h-10 rounded-lg"
                                    required
                                />
                            </div>
                        )}

                        {/* Field 3: Formation */}
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label htmlFor="formation" className="font-semibold text-gray-700 text-sm">
                                Formation *
                            </Label>
                            <Select
                                value={formState.formationId}
                                onValueChange={(val) => handleFormationChange(val)}
                                required
                                disabled={!!groupId}
                            >
                                <SelectTrigger id="formation" className="h-10 rounded-lg">
                                    <SelectValue placeholder="Sélectionner une formation" />
                                </SelectTrigger>
                                <SelectContent>
                                    {formations.map((f) => (
                                        <SelectItem key={f.id} value={f.id}>
                                            {f.subject} ({f.level})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Field 3b: Professeur */}
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label htmlFor="professor" className="font-semibold text-gray-700 text-sm">
                                Professeur (Optionnel)
                            </Label>
                            <Select
                                value={formState.professorId}
                                onValueChange={(val) => setFormState(prev => ({ ...prev, professorId: val === 'none' ? '' : val }))}
                            >
                                <SelectTrigger id="professor" className="h-10 rounded-lg">
                                    <SelectValue placeholder="Affecter un professeur" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Aucun professeur</SelectItem>
                                    {professors.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>
                                            {p.firstName} {p.lastName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Field 4: Candidat(s) */}
                    <div className="space-y-2 border rounded-xl p-4 bg-gray-50/50">
                        <Label className="block font-semibold text-sm text-gray-700 mb-1">
                            Candidat(s) *
                        </Label>

                        {!formState.formationId ? (
                            <div className="text-sm text-gray-500 italic p-4 border rounded bg-white text-center">
                                Veuillez d'abord sélectionner une formation pour voir les candidats admissibles.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Rechercher par nom ou code..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 h-9 text-xs rounded-lg bg-white"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 bg-white rounded border">
                                    {availableCandidates.map(candidate => {
                                        const isSelected = formState.candidateIds.includes(candidate.id);
                                        return (
                                            <div
                                                key={candidate.id}
                                                className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${isSelected
                                                    ? 'bg-indigo-50/70 border-indigo-200 text-indigo-900'
                                                    : 'hover:bg-gray-50 border-gray-100 bg-white text-gray-700'
                                                    }`}
                                                onClick={() => handleCandidateToggle(candidate.id)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                                                        }`}>
                                                        {isSelected && <Check size={11} className="text-white" />}
                                                    </div>
                                                    <span className="text-xs font-semibold">
                                                        {candidate.firstName} {candidate.lastName}
                                                    </span>
                                                </div>
                                                <span className="font-mono text-[9px] text-gray-400">
                                                    {candidate.candidateCode}
                                                </span>
                                            </div>
                                        );
                                    })}
                                    {availableCandidates.length === 0 && (
                                        <div className="text-xs text-gray-400 text-center py-6 italic w-full col-span-2">
                                            Aucun candidat disponible pour cette formation.
                                        </div>
                                    )}
                                </div>

                                {/* Validation Info Box */}
                                <div className="flex items-start justify-between text-xs pt-1">
                                    <span className="font-semibold text-gray-600">
                                        Sélectionnés: {activeCandidatesCount} candidat{activeCandidatesCount > 1 ? 's' : ''}
                                    </span>

                                    {!isRuleRespected && (
                                        <span className="text-amber-600 flex items-center gap-1 font-semibold">
                                            <AlertCircle size={14} />
                                            {formState.type === 'MONOME' && "Sélectionnez exactement 1 candidat"}
                                            {formState.type === 'BINOME' && "Sélectionnez exactement 2 candidats"}
                                            {formState.type === 'GROUPE' && "Sélectionnez au moins 1 candidat"}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Field 5: Prix */}
                        <div className="space-y-1">
                            <Label htmlFor="price" className="font-semibold text-gray-700 text-sm flex items-center gap-1">
                                <DollarSign size={14} className="text-gray-400" />
                                Prix total (DH) *
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={formState.price}
                                onChange={(e) => setFormState(prev => ({ ...prev, price: Number(e.target.value) }))}
                                className="h-10 rounded-lg"
                                min="0"
                                required
                            />
                        </div>

                        {/* Field 6: Durée */}
                        <div className="space-y-1">
                            <Label htmlFor="duration" className="font-semibold text-gray-700 text-sm flex items-center gap-1">
                                <Clock size={14} className="text-gray-400" />
                                Durée (mois) *
                            </Label>
                            <Input
                                id="duration"
                                type="number"
                                value={formState.duration}
                                onChange={(e) => handleDurationChange(Number(e.target.value))}
                                className="h-10 rounded-lg"
                                min="1"
                                required
                            />
                        </div>

                        {/* Field 7: Volume Horaire */}
                        <div className="space-y-1">
                            <Label htmlFor="volume" className="font-semibold text-gray-700 text-sm flex items-center gap-1">
                                <Hash size={14} className="text-gray-400" />
                                Volume Horaire (h) *
                            </Label>
                            <Input
                                id="volume"
                                type="number"
                                value={formState.volumeHoraire}
                                onChange={(e) => setFormState(prev => ({ ...prev, volumeHoraire: Number(e.target.value) }))}
                                className="h-10 rounded-lg"
                                min="1"
                                required
                            />
                        </div>

                        {/* Field 8: Date de début */}
                        <div className="space-y-1">
                            <Label htmlFor="startDate" className="font-semibold text-gray-700 text-sm flex items-center gap-1">
                                <Calendar size={14} className="text-gray-400" />
                                Date de début *
                            </Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={formState.startDate}
                                onChange={(e) => setFormState(prev => ({ ...prev, startDate: e.target.value }))}
                                className="h-10 rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    {/* Details Recap Card (Real-Time Computation) */}
                    {formState.formationId && formState.price > 0 && formState.duration > 0 && (
                        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 space-y-2">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                                <div>
                                    <p className="text-gray-500 font-medium">Prix mensuel</p>
                                    <p className="font-bold text-gray-800">
                                        {(formState.price / formState.duration).toFixed(2)} DH/mois
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 font-medium">Volume Moyen</p>
                                    <p className="font-bold text-gray-800">
                                        {(formState.volumeHoraire / formState.duration).toFixed(1)} h/mois
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 font-medium">Mode</p>
                                    <p className="font-bold text-indigo-700 capitalize">{formState.type.toLowerCase()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 font-medium">Membres</p>
                                    <p className="font-bold text-gray-800">{activeCandidatesCount} sélectionné(s)</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Annuler
                        </Button>
                        <Button type="submit" disabled={isSubmitting || !isRuleRespected} className="px-6 bg-indigo-600 hover:bg-indigo-700">
                            {isSubmitting ? 'Enregistrement...' : 'Valider'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
