import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
    Users,
    User,
    Calendar,
    BookOpen,
    Hash,
    Layers,
    FileText,
    GraduationCap,
    Clock,
} from 'lucide-react';

interface LearningGroupDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    group: any;
}

export function LearningGroupDetailsDialog({ isOpen, onClose, group }: LearningGroupDetailsDialogProps) {
    if (!group) return null;

    const groupName = group.groupName || '';
    const isSpecific = groupName.toLowerCase().includes('spécifique');
    const displayMode = group.learningMode === 'MONOME' ? 'Monôme' :
        group.learningMode === 'BINOME' ? 'Binôme' :
            isSpecific ? 'Spécifique' : 'Groupe';

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl border border-gray-100 p-6 bg-white">
                <DialogHeader className="border-b pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-705">
                            <Users size={24} />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold text-gray-900">
                                {groupName || 'Détails du Groupe'}
                            </DialogTitle>
                            <DialogDescription className="text-gray-500 mt-1">
                                Fiche d'information et membres du groupe
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* General Information Grid */}
                    <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Layers size={14} className="text-gray-400" />
                            Informations Générales
                        </h3>

                        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                            <div className="space-y-1">
                                <span className="text-gray-500 flex items-center gap-1.5">
                                    <Hash size={15} className="text-gray-400" />
                                    N° Inscription
                                </span>
                                <span className="font-semibold font-mono text-gray-900 block bg-white px-3 py-1.5 rounded-lg border border-gray-200/60 w-fit">
                                    {group.inscriptionCode || '-'}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <span className="text-gray-500 flex items-center gap-1.5">
                                    <Layers size={15} className="text-gray-400" />
                                    Mode d'apprentissage
                                </span>
                                <div>
                                    <Badge variant="outline" className={`mt-1 font-semibold text-xs px-2.5 py-1 ${group.learningMode === 'MONOME' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                            group.learningMode === 'BINOME' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                isSpecific ? 'bg-green-50 text-green-700 border-green-200' :
                                                    'bg-blue-50 text-blue-700 border-blue-200'
                                        }`}>
                                        {displayMode}
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <span className="text-gray-500 flex items-center gap-1.5">
                                    <BookOpen size={15} className="text-gray-400" />
                                    Formation
                                </span>
                                <span className="font-semibold text-gray-900 block">
                                    {group.formation
                                        ? `${group.formation.matiere} - ${group.formation.niveau}`
                                        : 'Non assignée'}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <span className="text-gray-500 flex items-center gap-1.5">
                                    <GraduationCap size={15} className="text-gray-400" />
                                    Professeur
                                </span>
                                <span className="font-semibold text-gray-900 block">
                                    {group.professor
                                        ? `${group.professor.nom} ${group.professor.prenom}`
                                        : 'Non affecté'}
                                </span>
                            </div>

                            <div className="space-y-1 col-span-2">
                                <span className="text-gray-500 flex items-center gap-1.5">
                                    <Calendar size={15} className="text-gray-400" />
                                    Date de création
                                </span>
                                <span className="font-semibold text-gray-900 block">
                                    {group.dateInscription
                                        ? new Date(group.dateInscription).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                        : '-'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Note section */}
                    <div className="bg-ash-50/20 rounded-xl p-5 border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <FileText size={14} className="text-gray-400" />
                            Note / Observation
                        </h3>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200/40 italic">
                            {group.note || 'Aucune observation enregistrée.'}
                        </p>
                    </div>

                    {/* Members List */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2 px-1">
                            <Users size={14} className="text-gray-400" />
                            Membres ({group.inscriptions ? group.inscriptions.length : 0})
                        </h3>

                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                            {group.inscriptions && group.inscriptions.length > 0 ? (
                                group.inscriptions.map((ins: any) => {
                                    const candidate = ins.candidate || {};
                                    return (
                                        <div
                                            key={ins.id}
                                            className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200/80 shadow-xs hover:border-indigo-100 hover:bg-indigo-50/10 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-705 flex items-center justify-center font-bold text-xs">
                                                    {candidate.firstName ? candidate.firstName[0].toUpperCase() : <User size={14} />}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">
                                                        {candidate.firstName || ''} {candidate.lastName || ''}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 capitalize">
                                                        {candidate.occupation === 'student' ? 'Étudiant' : 'Employé'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <span className="font-mono text-xs font-semibold text-indigo-705 block bg-indigo-50/50 px-2 py-1 rounded-md border border-indigo-100/50">
                                                    {candidate.candidateCode || '-'}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-center text-sm text-gray-450 italic py-4">Aucun membre enregistré.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 mt-6 border-t">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 rounded-xl text-sm font-semibold"
                        variant="secondary"
                    >
                        Fermer
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
