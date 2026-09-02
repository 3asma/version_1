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
    inscriptionId?: string | null;
    candidateId?: string | null;
    onSuccess?: () => void;
}

export function GestionInscriptionsDialog({
    isOpen,
    onOpenChange,
    inscriptionId,
    candidateId,
    onSuccess
}: GestionInscriptionsDialogProps) {
    const {
        candidates,
        formations,
        inscriptions,
        professors,
        addInscription,
        updateInscription,
        updateLearningGroup
    } = useApp();

    const [formState, setFormState] = useState({
        inscriptionCode: '',
        type: 'MONOME' as 'MONOME' | 'BINOME' | 'GROUPE' | 'SPECIFIQUE',
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
            if (inscriptionId) {
                const ins = inscriptions.find(i => i.id === inscriptionId);
                if (ins) {
                    const groupInscriptions = ins.learningGroupId
                        ? inscriptions.filter(x => x.learningGroupId === ins.learningGroupId)
                        : [ins];
                    const memberIds = groupInscriptions.map(x => x.candidateId);
                    const isSpecific = ins.learningGroup?.groupName?.toLowerCase().includes('spécifique') || ins.learningGroup?.groupName?.toLowerCase().includes('specifique');

                    setFormState({
                        inscriptionCode: ins.inscriptionCode || '',
                        type: isSpecific ? 'SPECIFIQUE' : (ins.learningMode || 'MONOME'),
                        nom: ins.learningGroup?.groupName || '',
                        formationId: ins.formationId,
                        candidateIds: memberIds,
                        professorId: ins.professorId || '',
                        price: ins.price || 0,
                        duration: ins.duration || 6,
                        volumeHoraire: ins.volumeHoraire || 72,
                        startDate: ins.dateInscription
                            ? new Date(ins.dateInscription).toISOString().split('T')[0]
                            : new Date().toISOString().split('T')[0],
                        note: ins.note || ''
                    });
                }
            } else {
                // Reset form for creation
                setFormState({
                    inscriptionCode: '',
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
    }, [isOpen, inscriptionId, inscriptions, candidateId]);

    // Set defaults when Formation or Type changes
    useEffect(() => {
        if (formState.formationId && !inscriptionId) {
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
    }, [formState.formationId, formState.type, formations, inscriptionId]);

    const handleFormationChange = (newFormationId: string) => {
        setFormState(prev => ({
            ...prev,
            formationId: newFormationId,
            candidateIds: []
        }));
    };

    const handleTypeChange = (newType: 'MONOME' | 'BINOME' | 'GROUPE' | 'SPECIFIQUE') => {
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

    // Get eligible candidates for the current formation selection (no other active inscription for this formation)
    const availableCandidates = candidates.filter(candidate => {
        if (!formState.formationId) return false;

        const targetIns = inscriptionId ? inscriptions.find(x => x.id === inscriptionId) : null;
        const currentGroupCandidateIds = targetIns?.learningGroupId
            ? inscriptions.filter(x => x.learningGroupId === targetIns.learningGroupId).map(x => x.candidateId)
            : [];

        const hasOtherActiveInscription = inscriptions.some(ins =>
            ins.formationId === formState.formationId &&
            ins.candidateId === candidate.id &&
            !currentGroupCandidateIds.includes(candidate.id) &&
            String(ins.status || (ins as any).statut).toUpperCase() === 'ACTIVE'
        );

        const matchesSearch = `${candidate.firstName} ${candidate.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) || candidate.candidateCode.toLowerCase().includes(searchQuery.toLowerCase());

        const statusLower = String(candidate.status || '').toLowerCase();
        return !hasOtherActiveInscription && (statusLower === 'active' || statusLower === 'pending') && matchesSearch;
    });

    const displayCandidates = [...availableCandidates];
    formState.candidateIds.forEach(id => {
        if (!displayCandidates.some(c => c.id === id)) {
            const cand = candidates.find(c => c.id === id);
            if (cand) {
                displayCandidates.push(cand);
            }
        }
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

            // Auto-generate name for visual reference if not editing
            let suggestedName = prev.nom;
            if (!inscriptionId) {
                const selectedNames = candidates
                    .filter(c => newCandidateIds.includes(c.id))
                    .map(c => `${c.firstName} ${c.lastName.charAt(0)}.`);

                if (prev.type === 'MONOME' && selectedNames.length > 0) {
                    suggestedName = `Monôme ${selectedNames[0]}`;
                } else if (prev.type === 'BINOME' && selectedNames.length > 0) {
                    suggestedName = `Binôme ${selectedNames.slice(0, 2).join(' & ')}`;
                } else if (prev.type === 'GROUPE' || prev.type === 'SPECIFIQUE') {
                    const subject = (formations.find(f => f.id === prev.formationId) as any)?.subject || '';
                    suggestedName = prev.type === 'SPECIFIQUE' ? `Spécifique ${subject}` : `Groupe ${subject}`;
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

        const { inscriptionCode, type, nom, formationId, candidateIds, professorId, price, duration, volumeHoraire, startDate, note } = formState;

        if (!inscriptionCode || inscriptionCode.trim() === '') {
            toast.error("Veuillez saisir un numéro d'inscription.");
            return;
        }

        const trimmedCode = inscriptionCode.trim();
        if (trimmedCode.length < 3 || trimmedCode.length > 50) {
            toast.error("Le numéro d'inscription doit contenir entre 3 et 50 caractères.");
            return;
        }
        if (!/^[a-zA-Z0-9\-_/]+$/.test(trimmedCode)) {
            toast.error("Le numéro d'inscription ne peut contenir que des lettres, chiffres, tirets, underscores et slashes.");
            return;
        }

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
        if ((type === 'GROUPE' || type === 'SPECIFIQUE') && candidateIds.length < 1) {
            toast.error(type === 'SPECIFIQUE' ? 'Un groupe spécifique doit contenir au moins 1 candidat.' : 'Un groupe doit contenir au moins 1 candidat.');
            return;
        }

        setIsSubmitting(true);
        try {
            if (inscriptionId) {
                const targetIns = inscriptions.find(x => x.id === inscriptionId);
                const learningGroupId = targetIns?.learningGroupId;

                if (learningGroupId) {
                    let finalGroupName = nom || '';
                    if (!finalGroupName) {
                        const subject = (formations.find(f => f.id === formationId) as any)?.subject || '';
                        finalGroupName = type === 'SPECIFIQUE' ? `Spécifique ${subject}` : `Groupe ${subject}`;
                    }

                    await updateLearningGroup(learningGroupId, {
                        groupName: finalGroupName,
                        inscriptionCode: trimmedCode,
                        formationId,
                        professorId: professorId || null,
                        learningMode: type,
                        dateInscription: new Date(startDate).toISOString(),
                        note: note || `Mis à jour via Gestion Inscriptions`,
                        candidateIds
                    });
                } else {
                    await updateInscription(inscriptionId, {
                        inscriptionCode: trimmedCode,
                        price: Number(price),
                        duration: Number(duration),
                        volumeHoraire: Number(volumeHoraire),
                        learningMode: type === 'SPECIFIQUE' ? 'GROUPE' : type,
                        dateInscription: new Date(startDate).toISOString(),
                        professorId: professorId || null,
                        note: note || `Mis à jour via Gestion Inscriptions`
                    });
                }
            } else {
                // Creating new inscriptions
                await addInscription({
                    inscriptionCode: trimmedCode,
                    candidateId: candidateIds[0] || '',
                    candidateIds: candidateIds,
                    formationId,
                    status: 'ACTIVE',
                    duration: Number(duration),
                    price: Number(price),
                    volumeHoraire: Number(volumeHoraire),
                    remainingHours: Number(volumeHoraire),
                    learningMode: type,
                    professorId: professorId || undefined,
                    note: note || `Créé via Gestion Inscriptions`
                } as any);
            }

            toast.success(inscriptionId ? 'Inscription mise à jour avec succès.' : 'Inscription créée avec succès.');
            onOpenChange(false);
            if (onSuccess) onSuccess();
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.error || error.message || "Le numéro d'inscription existe déjà.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const activeCandidatesCount = formState.candidateIds.length;
    const isRuleRespected =
        (formState.type === 'MONOME' && activeCandidatesCount === 1) ||
        (formState.type === 'BINOME' && activeCandidatesCount === 2) ||
        ((formState.type === 'GROUPE' || formState.type === 'SPECIFIQUE') && activeCandidatesCount >= 1);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2 font-bold text-gray-900 border-b pb-2">
                        <BookOpen className="text-indigo-600" size={24} />
                        {inscriptionId ? 'Modifier Inscription' : 'Gestion des Inscriptions'}
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 pt-1">
                        Créer ou modifier une inscription
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Field 0: N° d'inscription */}
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="inscriptionCode" className="font-semibold text-gray-700 text-sm">
                                N° d'inscription *
                            </Label>
                            <Input
                                id="inscriptionCode"
                                placeholder="Ex: INS-2026-0001"
                                value={formState.inscriptionCode}
                                onChange={(e) => setFormState(prev => ({ ...prev, inscriptionCode: e.target.value }))}
                                className="h-10 rounded-lg font-mono"
                                required
                            />
                        </div>

                        {/* Field 1: Type d'inscription */}
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label htmlFor="type" className="font-semibold text-gray-700 text-sm">
                                Type d'inscription *
                            </Label>
                            <Select
                                value={formState.type}
                                onValueChange={(val: any) => handleTypeChange(val)}
                            >
                                <SelectTrigger id="type" className="h-10 rounded-lg">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MONOME">Monôme (1 candidat)</SelectItem>
                                    <SelectItem value="BINOME">Binôme (2 candidats)</SelectItem>
                                    <SelectItem value="GROUPE">Groupe (Sélection multiple)</SelectItem>
                                    <SelectItem value="SPECIFIQUE">Spécifique (Sélection multiple)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Field 2: Nom (Visual only, kept for layout) */}
                        {(formState.type === 'GROUPE' || formState.type === 'SPECIFIQUE') && (
                            <div className="space-y-2 col-span-2 sm:col-span-1">
                                <Label htmlFor="nom" className="font-semibold text-gray-700 text-sm">
                                    {formState.type === 'SPECIFIQUE' ? "Nom de l'inscription *" : 'Nom du groupe *'}
                                </Label>
                                <Input
                                    id="nom"
                                    placeholder={formState.type === 'SPECIFIQUE' ? "Ex: Session spécifique A" : "Ex: Groupe A / Classe 1"}
                                    value={formState.nom}
                                    onChange={(e) => setFormState(prev => ({ ...prev, nom: e.target.value }))}
                                    className="h-10 rounded-lg"
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
                            >
                                <SelectTrigger id="formation" className="h-10 rounded-lg">
                                    <SelectValue placeholder="Sélectionner une formation" />
                                </SelectTrigger>
                                <SelectContent>
                                    {formations.map((f) => (
                                        <SelectItem key={f.id} value={f.id}>
                                            {(f as any).subject} ({(f as any).level})
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
                                            {(p as any).firstName} {(p as any).lastName}
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
                                    {displayCandidates.map(candidate => {
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
                                    {displayCandidates.length === 0 && (
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
                                            {(formState.type === 'GROUPE' || formState.type === 'SPECIFIQUE') && "Sélectionnez au moins 1 candidat"}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
