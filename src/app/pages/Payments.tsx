import { useState, useEffect } from 'react';
import { useApp, mapPaymentFromBackend } from '../context/AppContext';
import api from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { DollarSign, CreditCard, TrendingUp, AlertCircle, Plus, FileText, Download, Printer, Upload, Calendar, CheckCircle, Eye, XCircle, Clock, Pencil, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function Payments() {
  const { payments, candidates, formations, addPayment, updatePayment, deletePayment, generateInvoice, invoices, inscriptions } = useApp();

  const isCandidateActive = (candidateId: string) =>
    inscriptions.some(
      ins =>
        ins.candidateId === candidateId &&
        ins.status !== 'CANCELLED'
    );

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);


  const [candidateFormations, setCandidateFormations] = useState<any[]>([]);
  const [isLoadingFormations, setIsLoadingFormations] = useState(false);
  const [formationsErrorMessage, setFormationsErrorMessage] = useState('');
  const [paymentPlan, setPaymentPlan] = useState<any>(null);
  const [customTotalAmount, setCustomTotalAmount] = useState('');
  const [isLoadingPaymentPlan, setIsLoadingPaymentPlan] = useState(false);

  const [formData, setFormData] = useState({
    candidateId: '',
    formationId: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash' as 'cash' | 'bank_transfer' | 'check',
    status: 'pending' as 'reservation' | 'paid' | 'validated' | 'late' | 'pending',
    checkType: 'bank_check' as 'bank_check' | 'pac',
    checkDueDate: '',
    checkScan: '',
    isMonthlyPayment: false,
    totalMonths: '1',
    currentMonth: '1',
    note: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    // Only fetch for payment creation workflow (when not editing)
    if (selectedPaymentId) {
      setPaymentPlan(null);
      setCustomTotalAmount('');
      return;
    }

    const fetchPaymentPlan = async () => {
      if (!formData.candidateId || !formData.formationId) {
        setPaymentPlan(null);
        setCustomTotalAmount('');
        return;
      }
      setIsLoadingPaymentPlan(true);
      try {
        const response = await api.get('/payments/plan', {
          params: {
            candidateId: formData.candidateId,
            formationId: formData.formationId
          }
        });
        if (response.data.exists && response.data.plan) {
          setPaymentPlan(response.data.plan);
          setCustomTotalAmount(String(response.data.plan.totalAmount));
        } else {
          setPaymentPlan(null);
          setCustomTotalAmount('');
        }
      } catch (err: any) {
        setPaymentPlan(null);
        setCustomTotalAmount('');
        console.error('Failed to fetch payment plan status:', err);
      } finally {
        setIsLoadingPaymentPlan(false);
      }
    };

    fetchPaymentPlan();
  }, [formData.candidateId, formData.formationId, selectedPaymentId, payments]);

  const handleCandidateChange = async (candidateId: string) => {
    handleInputChange('formationId', '');
    if (!candidateId) {
      setCandidateFormations([]);
      setFormationsErrorMessage('');
      return;
    }

    setIsLoadingFormations(true);
    setFormationsErrorMessage('');
    try {
      const response = await api.get(`/candidates/${candidateId}/formations`);
      const list = response.data.data || [];
      setCandidateFormations(list);
      if (list.length === 0) {
        setFormationsErrorMessage("Ce candidat n'est inscrit à aucune formation.");
      }
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors du chargement des formations');
      setCandidateFormations([]);
    } finally {
      setIsLoadingFormations(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const paymentData: any = {
      candidateId: formData.candidateId,
      formationId: formData.formationId,
      amount: parseFloat(formData.amount),
      paymentDate: formData.paymentDate,
      paymentMethod: formData.paymentMethod,
      status: formData.status,
      note: formData.note
    };

    if (formData.paymentMethod === 'check') {
      if (!formData.checkDueDate) {
        toast.error("La date d'échéance du chèque est obligatoire");
        return;
      }
      const payDate = new Date(formData.paymentDate);
      const dueDate = new Date(formData.checkDueDate);
      payDate.setHours(0, 0, 0, 0);
      dueDate.setHours(0, 0, 0, 0);
      if (dueDate.getTime() < payDate.getTime()) {
        toast.error("La date d'échéance ne peut pas être antérieure à la date de paiement");
        return;
      }
      paymentData.checkDueDate = formData.checkDueDate;
    }

    if (!selectedPaymentId && customTotalAmount) {
      paymentData.totalAmount = parseFloat(customTotalAmount);
    }

    try {
      if (selectedPaymentId) {
        await updatePayment(selectedPaymentId, paymentData);
        toast.success('Paiement modifié avec succès');
      } else {
        await addPayment(paymentData);
        toast.success('Paiement enregistré avec succès');
      }
      setIsAddDialogOpen(false);
      resetForm();
      setSelectedPaymentId(null);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erreur lors de l\'enregistrement du paiement');
    }
  };

  const handleEdit = async (payment: any) => {
    setSelectedPaymentId(payment.id);
    setIsLoadingFormations(true);
    setFormationsErrorMessage('');
    try {
      const response = await api.get(`/candidates/${payment.candidateId}/formations`);
      const list = response.data.data || [];
      setCandidateFormations(list);
      if (list.length === 0) {
        setFormationsErrorMessage("Ce candidat n'est inscrit à aucune formation.");
      }
    } catch (err) {
      console.error(err);
      setCandidateFormations([]);
    } finally {
      setIsLoadingFormations(false);
    }
    setFormData({
      candidateId: payment.candidateId,
      formationId: payment.formationId,
      amount: String(payment.amount),
      paymentDate: payment.paymentDate,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      note: payment.note || '',
      checkType: payment.checkDetails?.type || 'bank_check',
      checkDueDate: payment.checkDetails?.dueDate || '',
      checkScan: payment.checkDetails?.scanScan || payment.checkDetails?.scanUrl || '',
      isMonthlyPayment: false,
      totalMonths: '1',
      currentMonth: '1'
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      try {
        await deletePayment(id);
        toast.success('Paiement supprimé avec succès');
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erreur lors de la suppression du paiement');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      candidateId: '',
      formationId: '',
      amount: '',
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'cash',
      status: 'pending',
      note: '',
      checkType: 'bank_check',
      checkDueDate: '',
      checkScan: '',
      isMonthlyPayment: false,
      totalMonths: '1',
      currentMonth: '1'
    });
    setCandidateFormations([]);
    setFormationsErrorMessage('');
    setPaymentPlan(null);
    setCustomTotalAmount('');
  };

  const handleGenerateInvoice = (paymentId: string) => {
    const invoiceNumber = generateInvoice(paymentId);
    if (invoiceNumber) {
      toast.success(`Facture ${invoiceNumber} générée avec succès`);
    } else {
      toast.error('Impossible de générer la facture');
    }
  };

  const handlePrintInvoice = (paymentId: string) => {
    const payment = payments.find(p => p.id === paymentId);
    if (payment) {
      toast.success('Impression de la facture en cours...');
      // Simulate print
      window.print();
    }
  };

  const handleDownloadInvoice = (paymentId: string) => {
    const payment = payments.find(p => p.id === paymentId);
    if (payment) {
      toast.success(`Téléchargement de la facture ${payment.invoiceNumber}...`);
    }
  };

  const handleValidatePayment = (paymentId: string) => {
    updatePayment(paymentId, { status: 'validated' });
    toast.success('Paiement validé');
  };

  const handleRejectPayment = (paymentId: string) => {
    const payment = payments.find(p => p.id === paymentId);
    if (payment?.checkDetails) {
      updatePayment(paymentId, {
        checkDetails: {
          ...payment.checkDetails,
          checkStatus: 'rejected'
        },
        status: 'late'
      });
      toast.error('Paiement rejeté');
    }
  };

  const handleValidateCheck = (paymentId: string) => {
    const payment = payments.find(p => p.id === paymentId);
    if (payment?.checkDetails) {
      updatePayment(paymentId, {
        checkDetails: {
          ...payment.checkDetails,
          checkStatus: 'validated'
        },
        status: 'validated'
      });
      toast.success('Chèque validé');
    }
  };

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment);
    setIsViewDialogOpen(true);
  };

  const getCandidate = (candidateId: string) => {
    return candidates.find(c => c.id === candidateId);
  };

  const getFormation = (formationId: string) => {
    return formations.find(f => f.id === formationId);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: any; label: string; color: string }> = {
      reservation: { variant: 'secondary', label: 'Réservation', color: 'bg-gray-100 text-gray-800' },
      paid: { variant: 'default', label: 'Payé', color: 'bg-blue-100 text-blue-800' },
      validated: { variant: 'default', label: 'Validé', color: 'bg-green-100 text-green-800' },
      late: { variant: 'destructive', label: 'En retard', color: 'bg-red-100 text-red-800' },
      pending: { variant: 'outline', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getCheckStatusBadge = (checkStatus: string) => {
    const statusConfig: Record<string, { variant: any; label: string; color: string }> = {
      pending: { variant: 'outline', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
      validated: { variant: 'default', label: 'Validé', color: 'bg-green-100 text-green-800' },
      rejected: { variant: 'destructive', label: 'Rejeté', color: 'bg-red-100 text-red-800' },
      late: { variant: 'destructive', label: 'En retard', color: 'bg-orange-100 text-orange-800' }
    };
    const config = statusConfig[checkStatus] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash':
        return <DollarSign size={16} className="text-green-600" />;
      case 'bank_transfer':
        return <TrendingUp size={16} className="text-blue-600" />;
      case 'check':
        return <CreditCard size={16} className="text-purple-600" />;
      default:
        return null;
    }
  };

  // Calculate statistics
  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);
  const latePayments = payments.filter(p => p.status === 'late').length;
  const totalChecks = payments.filter(p => p.paymentMethod === 'check').length;
  const pendingChecks = payments.filter(p => p.paymentMethod === 'check' && p.checkDetails?.checkStatus === 'pending').length;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyRevenue = payments
    .filter(p => {
      const paymentDate = new Date(p.paymentDate);
      return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
    })
    .reduce((sum, p) => sum + p.amount, 0);
  const validatedPayments = payments.filter(p => p.status === 'validated').length;
  const paymentRate = payments.length > 0 ? ((validatedPayments / payments.length) * 100).toFixed(1) : '0';

  const getStatusSearchTerms = (status: string) => {
    switch (status) {
      case 'reservation':
        return ['reservation', 'reservation'];
      case 'paid':
        return ['paid', 'paye', 'completed'];
      case 'validated':
        return ['validated', 'valide', 'completed', 'encaisse', 'cheque encaisse'];
      case 'late':
        return ['late', 'en retard', 'retard'];
      case 'pending':
        return ['pending', 'en attente', 'attente'];
      default:
        return [];
    }
  };

  const getMethodSearchTerms = (method: string) => {
    switch (method) {
      case 'cash':
        return ['cash', 'especes', 'espece'];
      case 'bank_transfer':
        return ['bank_transfer', 'virement', 'virement bancaire', 'transfert'];
      case 'check':
        return ['check', 'cheque', 'cheques'];
      default:
        return [];
    }
  };

  const normalizeStr = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const searchNormalized = normalizeStr(searchQuery);
    if (searchNormalized === '') return true;

    const candidate = getCandidate(payment.candidateId);
    const formation = getFormation(payment.formationId);

    const candidateCodeNormalized = candidate ? normalizeStr(candidate.candidateCode || '') : '';
    const firstNameNormalized = candidate ? normalizeStr(candidate.firstName || '') : '';
    const lastNameNormalized = candidate ? normalizeStr(candidate.lastName || '') : '';
    const fullNameNormalized = candidate ? normalizeStr(`${candidate.firstName || ''} ${candidate.lastName || ''}`) : '';
    const paymentRefNormalized = normalizeStr(payment.reference || '');

    const formationSubjectNormalized = formation ? normalizeStr(formation.subject || '') : '';
    const formationLevelNormalized = formation ? normalizeStr(formation.level || '') : '';
    const formationFullNormalized = formation ? normalizeStr(`${formation.subject || ''} ${formation.level || ''}`) : '';

    const statusSearchTerms = getStatusSearchTerms(payment.status);
    const matchesStatus = statusSearchTerms.some(term => term.includes(searchNormalized));

    const methodSearchTerms = getMethodSearchTerms(payment.paymentMethod);
    const matchesMethod = methodSearchTerms.some(term => term.includes(searchNormalized));

    return candidateCodeNormalized.includes(searchNormalized) ||
      firstNameNormalized.includes(searchNormalized) ||
      lastNameNormalized.includes(searchNormalized) ||
      fullNameNormalized.includes(searchNormalized) ||
      paymentRefNormalized.includes(searchNormalized) ||
      formationSubjectNormalized.includes(searchNormalized) ||
      formationLevelNormalized.includes(searchNormalized) ||
      formationFullNormalized.includes(searchNormalized) ||
      matchesStatus ||
      matchesMethod;
  });

  // Check for late payments (5 days past due date)
  useEffect(() => {
    const checkLatePayments = () => {
      const today = new Date();
      payments.forEach(payment => {
        if (payment.checkDetails && payment.checkDetails.checkStatus === 'pending') {
          const dueDate = new Date(payment.checkDetails.dueDate);
          const diffTime = today.getTime() - dueDate.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays > 5) {
            updatePayment(payment.id, {
              status: 'late',
              checkDetails: {
                ...payment.checkDetails,
                checkStatus: 'late'
              }
            });
          }
        }
      });
    };

    checkLatePayments();
  }, [payments]);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Paiements</h1>
          <p className="text-gray-500 mt-2">Suivi complet des paiements, chèques et facturation</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) {
            resetForm();
            setSelectedPaymentId(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button size="lg" className="shadow-md">
              <Plus size={20} className="mr-2" />
              Nouveau paiement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedPaymentId ? 'Modifier le paiement' : 'Ajouter un paiement'}
              </DialogTitle>
              <DialogDescription>
                {selectedPaymentId
                  ? 'Modifier les détails de ce paiement'
                  : 'Enregistrer un nouveau paiement avec tous les détails nécessaires'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="candidateId">Candidat *</Label>
                  <Select
                    value={formData.candidateId}
                    onValueChange={(value) => {
                      handleInputChange('candidateId', value);
                      handleCandidateChange(value);
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un candidat" />
                    </SelectTrigger>
                    <SelectContent>
                      {candidates.map((candidate) => (
                        <SelectItem key={candidate.id} value={candidate.id}>
                          {candidate.candidateCode} - {candidate.firstName} {candidate.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="formationId">Formation *</Label>
                  <Select
                    value={formData.formationId}
                    onValueChange={(value) => handleInputChange('formationId', value)}
                    disabled={!formData.candidateId || isLoadingFormations || candidateFormations.length === 0}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !formData.candidateId
                            ? "Sélectionnez d'abord un candidat"
                            : isLoadingFormations
                              ? "Chargement..."
                              : formationsErrorMessage
                                ? formationsErrorMessage
                                : "Sélectionner une formation"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {candidateFormations.map((formation) => (
                        <SelectItem key={formation.id} value={formation.id}>
                          {formation.subject} - {formation.level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Payment Plan Details / Total Amount */}
                {!selectedPaymentId && formData.candidateId && formData.formationId && (
                  <div className="col-span-2">
                    {paymentPlan ? (
                      <div className="grid grid-cols-3 gap-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                        <div className="space-y-1.5">
                          <Label className="text-blue-900 font-medium">Montant Global (DH)</Label>
                          <Input
                            type="text"
                            value={`${paymentPlan.totalAmount.toLocaleString()} DH`}
                            disabled
                            className="bg-blue-50 border-blue-200 text-blue-900 font-semibold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-blue-900 font-medium">Déjà réglé (DH)</Label>
                          <Input
                            type="text"
                            value={`${paymentPlan.paidAmount.toLocaleString()} DH`}
                            disabled
                            className="bg-blue-50 border-blue-200 text-blue-900 font-semibold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-blue-900 font-medium">Montant Restant (DH)</Label>
                          <Input
                            type="text"
                            value={`${paymentPlan.remainingAmount.toLocaleString()} DH`}
                            disabled
                            className={`bg-blue-50 border-blue-200 font-semibold ${paymentPlan.remainingAmount <= 0 ? 'text-green-700' : 'text-amber-800'
                              }`}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-lg border border-gray-150 w-full">
                        <div className="space-y-2">
                          <Label htmlFor="customTotalAmount">Montant Global de la formation (DH)</Label>
                          <Input
                            id="customTotalAmount"
                            type="number"
                            step="0.01"
                            value={customTotalAmount}
                            onChange={(e) => setCustomTotalAmount(e.target.value)}
                            placeholder="Saisir montant global"
                            className="bg-white border-gray-300"
                          />
                        </div>
                        <div className="flex items-center text-xs text-gray-500 pt-6">
                          <AlertCircle size={14} className="mr-1 text-gray-400" />
                          Aucun plan de paiement trouvé pour cette formation. Saisissez le montant global manuellement.
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="amount">Montant (DH) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentDate">Date de paiement *</Label>
                  <Input
                    id="paymentDate"
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) => handleInputChange('paymentDate', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Mode de paiement *</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value: any) => handleInputChange('paymentMethod', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">💵 Cash</SelectItem>
                      <SelectItem value="bank_transfer">🏦 Virement bancaire</SelectItem>
                      <SelectItem value="check">📝 Chèque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedPaymentId && (
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut *</Label>
                    <Select value={formData.status} onValueChange={(value: any) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reservation">Réservation</SelectItem>
                        <SelectItem value="paid">Payé</SelectItem>
                        <SelectItem value="validated">Validé</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="note">Note</Label>
                  <Input
                    id="note"
                    value={formData.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                    placeholder="Aucune note"
                  />
                </div>
              </div>

              {formData.paymentMethod === 'check' && (
                <div className="border-t pt-6 space-y-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="text-purple-600" size={20} />
                    <h3 className="font-semibold text-lg">Détails du chèque</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkType">Type de chèque *</Label>
                      <Select value={formData.checkType} onValueChange={(value: any) => handleInputChange('checkType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank_check">Chèque banque</SelectItem>
                          <SelectItem value="pac">PAC (Prélèvement Automatique)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="checkDueDate">Date d'échéance *</Label>
                      <Input
                        id="checkDueDate"
                        type="date"
                        value={formData.checkDueDate}
                        onChange={(e) => handleInputChange('checkDueDate', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="checkScan">Scan du chèque (URL)</Label>
                      <div className="flex gap-2">
                        <Input
                          id="checkScan"
                          value={formData.checkScan}
                          onChange={(e) => handleInputChange('checkScan', e.target.value)}
                          placeholder="https://example.com/scan-cheque.pdf"
                        />
                        <Button type="button" variant="outline">
                          <Upload size={18} className="mr-2" />
                          Importer
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">Format accepté: PDF, JPG, PNG</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isMonthlyPayment"
                        checked={formData.isMonthlyPayment}
                        onChange={(e) => handleInputChange('isMonthlyPayment', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <Label htmlFor="isMonthlyPayment" className="font-normal cursor-pointer">
                        Paiement mensuel (Échelonnement)
                      </Label>
                    </div>
                  </div>

                  {formData.isMonthlyPayment && (
                    <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-md border">
                      <div className="space-y-2">
                        <Label htmlFor="totalMonths">Nombre total de mois *</Label>
                        <Input
                          id="totalMonths"
                          type="number"
                          value={formData.totalMonths}
                          onChange={(e) => handleInputChange('totalMonths', e.target.value)}
                          min="1"
                          max="24"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currentMonth">Mois en cours *</Label>
                        <Input
                          id="currentMonth"
                          type="number"
                          value={formData.currentMonth}
                          onChange={(e) => handleInputChange('currentMonth', e.target.value)}
                          min="1"
                          max={formData.totalMonths}
                          required
                        />
                      </div>
                      <div className="col-span-2 text-sm text-gray-600">
                        <Calendar size={14} className="inline mr-1" />
                        Montant mensuel: <strong>{formData.amount ? (parseFloat(formData.amount) / parseInt(formData.totalMonths)).toFixed(2) : '0.00'} DH</strong>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                  setSelectedPaymentId(null);
                }}>
                  Annuler
                </Button>
                <Button type="submit" size="lg">
                  <CheckCircle size={18} className="mr-2" />
                  Enregistrer le paiement
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-5 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total des paiements</p>
                <p className="text-2xl font-bold text-gray-900">{totalPayments.toLocaleString()} DH</p>
                <p className="text-xs text-gray-500 mt-1">{payments.length} paiements</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-full">
                <DollarSign className="text-blue-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Paiements en retard</p>
                <p className="text-2xl font-bold text-red-600">{latePayments}</p>
                <p className="text-xs text-red-500 mt-1">Action requise</p>
              </div>
              <div className="p-4 bg-red-50 rounded-full">
                <AlertCircle className="text-red-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Chèques</p>
                <p className="text-2xl font-bold text-gray-900">{totalChecks}</p>
                <p className="text-xs text-yellow-600 mt-1">{pendingChecks} en attente</p>
              </div>
              <div className="p-4 bg-green-50 rounded-full">
                <CreditCard className="text-green-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Revenus mensuels</p>
                <p className="text-2xl font-bold text-gray-900">{monthlyRevenue.toLocaleString()} DH</p>
                <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleDateString('fr-FR', { month: 'long' })}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-full">
                <TrendingUp className="text-purple-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Taux de validation</p>
                <p className="text-2xl font-bold text-gray-900">{paymentRate}%</p>
                <p className="text-xs text-green-600 mt-1">{validatedPayments} validés</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-full">
                <CheckCircle className="text-yellow-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-2 w-full">
            <Label htmlFor="search" className="font-semibold">Rechercher</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="search"
                placeholder="Rechercher un paiement (code candidat, nom, formation, référence, méthode, statut...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 pl-10 w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Historique des paiements</CardTitle>
              <CardDescription className="mt-1">
                {filteredPayments.length} paiement{filteredPayments.length > 1 ? 's' : ''} enregistré{filteredPayments.length > 1 ? 's' : ''}
              </CardDescription>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              Total: {filteredPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} DH
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucun paiement trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Référence</TableHead>
                    <TableHead className="font-semibold">Candidat</TableHead>
                    <TableHead className="font-semibold">Formation</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Mode</TableHead>
                    <TableHead className="font-semibold">Montant</TableHead>
                    <TableHead className="font-semibold">Statut</TableHead>
                    <TableHead className="font-semibold">Facture</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => {
                    const candidate = getCandidate(payment.candidateId);
                    const formation = getFormation(payment.formationId);

                    return (
                      <TableRow key={payment.id} className="hover:bg-gray-50">
                        <TableCell className="font-mono text-sm font-medium">{payment.reference}</TableCell>
                        <TableCell className="font-medium">
                          {candidate ? `${candidate.firstName} ${candidate.lastName}` : '-'}
                          {candidate && (
                            <p className="text-xs text-gray-500">{candidate.candidateCode}</p>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formation ? (
                              <>
                                <p className="font-medium">{formation.subject}</p>
                                <p className="text-xs text-gray-500">{formation.level}</p>
                              </>
                            ) : '-'}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(payment.paymentDate).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getPaymentMethodIcon(payment.paymentMethod)}
                            <span className="text-sm">
                              {payment.paymentMethod === 'cash' && 'Cash'}
                              {payment.paymentMethod === 'bank_transfer' && 'Virement'}
                              {payment.paymentMethod === 'check' && 'Chèque'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-gray-900">{payment.amount.toLocaleString()} DH</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>
                          {payment.invoiceGenerated ? (
                            <Badge className="bg-green-100 text-green-800">
                              <FileText size={12} className="mr-1" />
                              {payment.invoiceNumber}
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Non générée</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleViewPayment(payment)}
                              title="Voir détails"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(payment)}
                              title="Modifier"
                            >
                              <Pencil size={16} className="text-blue-600" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(payment.id)}
                              title="Supprimer"
                            >
                              <Trash2 size={16} className="text-red-650" />
                            </Button>
                            {!payment.invoiceGenerated && payment.status === 'validated' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleGenerateInvoice(payment.id)}
                                title="Générer facture"
                              >
                                <FileText size={16} className="mr-1" />
                                Facture
                              </Button>
                            )}
                            {payment.invoiceGenerated && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDownloadInvoice(payment.id)}
                                  title="Télécharger PDF"
                                >
                                  <Download size={16} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePrintInvoice(payment.id)}
                                  title="Imprimer"
                                >
                                  <Printer size={16} />
                                </Button>
                              </>
                            )}
                            {(payment.status === 'pending' || payment.status === 'paid') && (
                              <Button
                                size="sm"
                                onClick={() => handleValidatePayment(payment.id)}
                                className="bg-green-600 hover:bg-green-700"
                                title="Valider paiement"
                              >
                                <CheckCircle size={16} className="mr-1" />
                                Valider
                              </Button>
                            )}
                            {payment.checkDetails && payment.checkDetails.checkStatus === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleValidateCheck(payment.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                  title="Valider chèque"
                                >
                                  <CheckCircle size={16} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleRejectPayment(payment.id)}
                                  title="Rejeter chèque"
                                >
                                  <XCircle size={16} />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Checks Management Section */}
      {payments.filter(p => p.paymentMethod === 'check').length > 0 && (
        <Card>
          <CardHeader className="bg-purple-50 border-b">
            <div className="flex items-center gap-2">
              <CreditCard className="text-purple-600" size={24} />
              <div>
                <CardTitle className="text-xl">Gestion des chèques</CardTitle>
                <CardDescription className="mt-1">
                  {totalChecks} chèque{totalChecks > 1 ? 's' : ''} enregistré{totalChecks > 1 ? 's' : ''}, {pendingChecks} en attente de validation
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Référence</TableHead>
                    <TableHead className="font-semibold">Candidat</TableHead>
                    <TableHead className="font-semibold">Type chèque</TableHead>
                    <TableHead className="font-semibold">Échéance</TableHead>
                    <TableHead className="font-semibold">Montant</TableHead>
                    <TableHead className="font-semibold">Statut</TableHead>
                    <TableHead className="font-semibold">Mensualités</TableHead>
                    <TableHead className="font-semibold">Scan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments
                    .filter(p => p.paymentMethod === 'check')
                    .map((payment) => {
                      const candidate = getCandidate(payment.candidateId);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const due = payment.checkDetails ? new Date(payment.checkDetails.dueDate) : null;
                      if (due) {
                        due.setHours(0, 0, 0, 0);
                      }
                      const diffTime = due ? due.getTime() - today.getTime() : 0;
                      const daysUntilDue = Math.round(diffTime / (1000 * 60 * 60 * 24));

                      return (
                        <TableRow key={payment.id} className="hover:bg-gray-50">
                          <TableCell className="font-mono text-sm font-medium">{payment.reference}</TableCell>
                          <TableCell className="font-medium">
                            {candidate ? `${candidate.firstName} ${candidate.lastName}` : '-'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {payment.checkDetails?.type === 'bank_check' ? '🏦 Chèque banque' : '💳 PAC'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-gray-400" />
                              <div>
                                <p className="text-sm font-medium">
                                  {payment.checkDetails && new Date(payment.checkDetails.dueDate).toLocaleDateString('fr-FR')}
                                </p>
                                {payment.status === 'validated' ? (
                                  <Badge className="mt-1 bg-green-100 text-green-850">
                                    <CheckCircle size={12} className="mr-1 text-green-600" />
                                    Chèque encaissé
                                  </Badge>
                                ) : (
                                  payment.checkDetails && (
                                    daysUntilDue < 0 ? (
                                      <Badge variant="destructive" className="mt-1">
                                        <Clock size={12} className="mr-1" />
                                        En retard de {Math.abs(daysUntilDue)} {Math.abs(daysUntilDue) > 1 ? 'jours' : 'jour'}
                                      </Badge>
                                    ) : daysUntilDue === 0 ? (
                                      <Badge className="mt-1 bg-amber-100 text-amber-800">
                                        <Clock size={12} className="mr-1" />
                                        Aujourd'hui
                                      </Badge>
                                    ) : (
                                      <Badge className="mt-1 bg-orange-100 text-orange-850">
                                        <Clock size={12} className="mr-1" />
                                        Dans {daysUntilDue} {daysUntilDue > 1 ? 'jours' : 'jour'}
                                      </Badge>
                                    )
                                  )
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-gray-900">{payment.amount.toLocaleString()} DH</TableCell>
                          <TableCell>
                            {payment.checkDetails && getCheckStatusBadge(payment.checkDetails.checkStatus)}
                          </TableCell>
                          <TableCell>
                            {payment.isMonthlyPayment && payment.monthlySchedule ? (
                              <div className="space-y-1">
                                <Badge className="bg-blue-100 text-blue-800">
                                  {payment.monthlySchedule.currentMonth}/{payment.monthlySchedule.totalMonths} mois
                                </Badge>
                                {payment.monthlySchedule.nextDueDate && (
                                  <p className="text-xs text-gray-500">
                                    Prochain: {new Date(payment.monthlySchedule.nextDueDate).toLocaleDateString('fr-FR')}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <Badge variant="secondary">Paiement unique</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {payment.checkDetails?.scanUrl ? (
                              <Button size="sm" variant="outline" onClick={() => window.open(payment.checkDetails?.scanUrl, '_blank')}>
                                <Eye size={16} className="mr-1" />
                                Voir scan
                              </Button>
                            ) : (
                              <span className="text-sm text-gray-400">Non disponible</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Détails du paiement</DialogTitle>
            <DialogDescription>
              Informations complètes sur le paiement
            </DialogDescription>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm text-gray-600">Référence</Label>
                  <p className="font-mono font-semibold">{selectedPayment.reference}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-gray-600">Statut</Label>
                  <div>{getStatusBadge(selectedPayment.status)}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-gray-600">Candidat</Label>
                  <p className="font-medium">
                    {getCandidate(selectedPayment.candidateId)?.firstName} {getCandidate(selectedPayment.candidateId)?.lastName}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-gray-600">Formation</Label>
                  <p className="font-medium">
                    {getFormation(selectedPayment.formationId)?.subject} - {getFormation(selectedPayment.formationId)?.level}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-gray-600">Montant</Label>
                  <p className="text-2xl font-bold text-green-600">{selectedPayment.amount.toLocaleString()} DH</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-gray-600">Date de paiement</Label>
                  <p className="font-medium">{new Date(selectedPayment.paymentDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-gray-600">Mode de paiement</Label>
                  <div className="flex items-center gap-2">
                    {getPaymentMethodIcon(selectedPayment.paymentMethod)}
                    <span className="font-medium">
                      {selectedPayment.paymentMethod === 'cash' && 'Cash'}
                      {selectedPayment.paymentMethod === 'bank_transfer' && 'Virement bancaire'}
                      {selectedPayment.paymentMethod === 'check' && 'Chèque'}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-gray-600">Facture</Label>
                  <p className="font-medium">
                    {selectedPayment.invoiceGenerated ? selectedPayment.invoiceNumber : 'Non générée'}
                  </p>
                </div>
              </div>

              {selectedPayment.checkDetails && (
                <div className="border-t pt-4 space-y-4 bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <CreditCard className="text-purple-600" />
                    Détails du chèque
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm text-gray-600">Type</Label>
                      <p className="font-medium">
                        {selectedPayment.checkDetails.type === 'bank_check' ? 'Chèque banque' : 'PAC'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-gray-600">Date d'échéance</Label>
                      <p className="font-medium">
                        {new Date(selectedPayment.checkDetails.dueDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-gray-600">Statut du chèque</Label>
                      <div>{getCheckStatusBadge(selectedPayment.checkDetails.checkStatus)}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-gray-600">Scan</Label>
                      {selectedPayment.checkDetails.scanUrl ? (
                        <Button size="sm" variant="outline" onClick={() => window.open(selectedPayment.checkDetails.scanUrl, '_blank')}>
                          <Eye size={16} className="mr-1" />
                          Voir le scan
                        </Button>
                      ) : (
                        <p className="text-sm text-gray-400">Non disponible</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selectedPayment.isMonthlyPayment && selectedPayment.monthlySchedule && (
                <div className="border-t pt-4 space-y-4 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Calendar className="text-blue-600" />
                    Paiement mensuel
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm text-gray-600">Mensualité actuelle</Label>
                      <p className="text-xl font-bold text-blue-600">
                        {selectedPayment.monthlySchedule.currentMonth}/{selectedPayment.monthlySchedule.totalMonths}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-gray-600">Montant mensuel</Label>
                      <p className="text-xl font-bold">
                        {(selectedPayment.amount / selectedPayment.monthlySchedule.totalMonths).toFixed(2)} DH
                      </p>
                    </div>
                    {selectedPayment.monthlySchedule.nextDueDate && (
                      <div className="space-y-1">
                        <Label className="text-sm text-gray-600">Prochaine échéance</Label>
                        <p className="font-medium">
                          {new Date(selectedPayment.monthlySchedule.nextDueDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Fermer
                </Button>
                {!selectedPayment.invoiceGenerated && selectedPayment.status === 'validated' && (
                  <Button onClick={() => {
                    handleGenerateInvoice(selectedPayment.id);
                    setIsViewDialogOpen(false);
                  }}>
                    <FileText size={16} className="mr-2" />
                    Générer facture
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
