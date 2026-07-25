import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// Types
export type UserRole = 'agent_reception' | 'agent_reservation' | 'professor' | 'candidate' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Prospect {
  id: string;
  membershipNumber?: string | null;
  firstName: string;
  lastName: string;
  gender?: 'MALE' | 'FEMALE' | null;
  age: number;
  occupation: 'STUDENT' | 'EMPLOYEE';
  phone?: string | null;
  email?: string | null;
  registrationDate?: string | null;
  giftCode?: string | null;
  observation: 'ALONE' | 'ACCOMPANIED';
  action?: string | null;
  firstContactId?: string | null;
  secondContactId?: string | null;
  status: string;
  freeSessionsCompleted: number;
  absences: number;
  firstContact?: Commercial | null;
  secondContact?: Commercial | null;
  createdAt: string;
  updatedAt: string;
}

export interface Commercial {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  action: string;
  createdAt: string;
  updatedAt: string;
}

export interface Candidate {
  id: string;
  candidateCode: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  age: number;
  occupation: 'STUDENT' | 'EMPLOYEE';
  observation: 'ALONE' | 'ACCOMPANIED';
  firstContactId?: string | null;
  secondContactId?: string | null;
  action?: string | null;
  firstContact?: Commercial | null;
  secondContact?: Commercial | null;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  membershipNumber?: string | null;
  gender?: 'MALE' | 'FEMALE' | null;
  registrationDate?: string | null;
  inscriptions?: Inscription[];
  createdAt: string;
  updatedAt: string;
}

export interface Professor {
  id: string;
  nom: string;
  prenom: string;
  firstName?: string;
  lastName?: string;
  email?: string | null;
  telephone?: string | null;
  phone?: string | null;
  adresse?: string | null;
  address?: string | null;
  type: string;
  dayOff: string;
  maxSessions: number;
  subjects?: string[];
  totalHoursWorked?: number;
  inscriptions?: Inscription[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Room {
  id: string;
  numero?: string;
  capacite?: number;
  roomNumber?: string;
  capacity?: number;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Formation {
  id: string;
  matiere?: string;
  niveau?: string;
  subject?: string;
  level?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Session {
  id: string;
  candidateId: string;
  professorId: string;
  roomId: string;
  formationId: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  attendance?: 'present' | 'absent';
  learningMode?: string;
  candidate?: {
    firstName: string;
    lastName: string;
  } | null;
  inscriptionCode?: string;
  reservationCode?: string;
  formation?: {
    subject: string;
    level: string;
  } | null;
  professor?: {
    firstName: string;
    lastName: string;
  } | null;
  room?: {
    roomNumber: string;
  } | null;
  startTimeText?: string;
  endTimeText?: string;
  reservationDate?: string;
  startTime?: string;
  endTime?: string;
}

export const mapReservationToSession = (r: any): Session => {
  const dateObj = new Date(r.reservationDate);
  const date = dateObj.toISOString().split('T')[0];
  const start = new Date(r.startTime);
  const end = new Date(r.endTime);
  const time = start.toISOString().split('T')[1].substring(0, 5);
  const duration = Math.round((end.getTime() - start.getTime()) / 60000);

  let status: 'scheduled' | 'completed' | 'cancelled' = 'scheduled';
  if (r.status === 'CANCELLED') status = 'cancelled';
  else if (r.status === 'COMPLETED') status = 'completed';

  return {
    id: r.id,
    candidateId: r.inscription?.candidateId || '',
    professorId: r.professorId,
    roomId: r.roomId,
    formationId: r.inscription?.formationId || '',
    date,
    time,
    duration,
    status,
    reservationDate: r.reservationDate,
    startTime: r.startTime,
    endTime: r.endTime,
    attendance: r.status === 'COMPLETED' ? 'present' : undefined,
    learningMode: r.inscription?.learningMode || '',
    candidate: r.inscription?.candidate ? {
      firstName: r.inscription.candidate.firstName,
      lastName: r.inscription.candidate.lastName
    } : null,
    inscriptionCode: r.inscription?.inscriptionCode || '',
    reservationCode: r.reservationCode,
    formation: r.inscription?.formation ? {
      subject: r.inscription.formation.matiere,
      level: r.inscription.formation.niveau
    } : null,
    professor: r.professor ? {
      firstName: r.professor.prenom,
      lastName: r.professor.nom
    } : null,
    room: r.room ? {
      roomNumber: r.room.numero
    } : null,
    startTimeText: time,
    endTimeText: end.toISOString().split('T')[1].substring(0, 5)
  };
};

export const mapPaymentFromBackend = (p: any): Payment => {
  const generatedInvoices = JSON.parse(localStorage.getItem('generated_invoices') || '{}');
  const invoiceNumber = generatedInvoices[p.id];
  const paymentMethodMap: Record<string, string> = {
    CASH: 'cash',
    BANK_TRANSFER: 'bank_transfer',
    CHEQUE: 'check',
    CARD: 'cash'
  };
  const statusMap: Record<string, string> = {
    PENDING: 'pending',
    COMPLETED: 'validated',
    FAILED: 'pending',
    REFUNDED: 'pending'
  };

  return {
    id: p.id,
    reference: p.paymentCode,
    candidateId: p.candidateId,
    formationId: p.formationId,
    amount: p.amount,
    paymentDate: p.paymentDate?.split('T')[0] || p.paymentDate || '',
    paymentMethod: (paymentMethodMap[p.paymentMethod?.toUpperCase()] || 'cash') as any,
    status: (statusMap[p.status?.toUpperCase()] || 'pending') as any,
    invoiceGenerated: !!invoiceNumber,
    invoiceNumber: invoiceNumber || undefined,
    checkDetails: p.paymentMethod?.toUpperCase() === 'CHEQUE' ? {
      type: 'bank_check',
      dueDate: p.paymentDate?.split('T')[0] || p.paymentDate || '',
      checkStatus: (p.status === 'COMPLETED' ? 'validated' : 'pending')
    } : undefined,
    isMonthlyPayment: false,
    createdAt: p.createdAt
  };
};

export interface ReservationRequest {
  id: string;
  professorId: string;
  candidateId: string;
  roomId: string;
  formationId?: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'professor_cancellation' | 'candidate_request' | 'candidate_cancellation';
  sessionId?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  reference: string;
  candidateId: string;
  formationId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'cash' | 'bank_transfer' | 'check';
  status: 'reservation' | 'paid' | 'validated' | 'late' | 'pending';
  invoiceGenerated: boolean;
  invoiceNumber?: string;
  checkDetails?: {
    type: 'bank_check' | 'pac';
    dueDate: string;
    scanUrl?: string;
    checkStatus: 'pending' | 'validated' | 'rejected' | 'late';
  };
  isMonthlyPayment: boolean;
  monthlySchedule?: {
    totalMonths: number;
    currentMonth: number;
    nextDueDate?: string;
  };
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  paymentId: string;
  candidateId: string;
  amount: number;
  generatedDate: string;
  year: number;
}

export interface Inscription {
  id: string;
  inscriptionCode: string;
  dateInscription: string;
  status: 'WAITING' | 'ASSIGNED' | 'ACTIVE' | 'CANCELLED' | 'COMPLETED';
  note?: string | null;
  duration?: number | null;
  price?: number | null;
  volumeHoraire?: number | null;
  remainingHours: number;
  learningMode: 'MONOME' | 'BINOME' | 'GROUPE';
  candidateId: string;
  formationId: string;
  professorId?: string | null;
  learningGroupId?: string | null;
  learningGroup?: any;
  candidate?: Candidate;
  formation?: Formation;
  professor?: Professor | null;
  createdAt: string;
  updatedAt: string;
}

interface AppContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Prospects
  prospects: Prospect[];
  addProspect: (prospect: Omit<Prospect, 'id' | 'status' | 'freeSessionsCompleted' | 'absences' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProspect: (id: string, prospect: Partial<Prospect>) => Promise<void>;
  deleteProspect: (id: string) => Promise<void>;
  transformToCandidate: (prospectId: string, formationId: string) => Promise<string | null>;

  // Commercials
  commercials: Commercial[];
  addCommercial: (commercial: Omit<Commercial, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean; error?: string }>;
  updateCommercial: (id: string, commercial: Partial<Commercial>) => Promise<{ success: boolean; error?: string }>;
  deleteCommercial: (id: string) => Promise<void>;

  // Candidates
  candidates: Candidate[];
  addCandidate: (candidate: Omit<Candidate, 'id' | 'candidateCode' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCandidate: (id: string, updates: Partial<Candidate>) => Promise<void>;
  deleteCandidate: (id: string) => Promise<void>;

  // Inscriptions
  inscriptions: Inscription[];
  learningGroups: any[];
  addInscription: (inscription: Omit<Inscription, 'id' | 'dateInscription' | 'createdAt' | 'updatedAt'> & { candidateIds?: string[] }) => Promise<void>;
  updateInscriptionStatus: (id: string, statut: Inscription['status']) => Promise<void>;
  updateInscription: (id: string, updates: Partial<Inscription>) => Promise<void>;
  updateLearningGroup: (groupId: string, data: any) => Promise<void>;
  deleteInscription: (id: string) => Promise<void>;
  deleteLearningGroup: (id: string) => Promise<void>;

  // Professors
  professors: Professor[];
  addProfessor: (professor: Omit<Professor, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProfessor: (id: string, updates: Partial<Professor>) => Promise<void>;
  deleteProfessor: (id: string) => Promise<boolean>;

  // Rooms
  rooms: Room[];
  addRoom: (room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateRoom: (id: string, updates: Partial<Room>) => Promise<void>;
  deleteRoom: (id: string) => Promise<boolean>;

  // Formations
  formations: Formation[];
  addFormation: (formation: Omit<Formation, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateFormation: (id: string, updates: Partial<Formation>) => Promise<void>;
  deleteFormation: (id: string) => Promise<boolean>;

  // Sessions
  sessions: Session[];
  addSession: (session: Omit<Session, 'id' | 'status'>) => boolean;
  cancelSession: (id: string) => Promise<void> | void;
  markAttendance: (id: string, attendance: 'present' | 'absent') => void;
  refreshPlanning: () => Promise<Session[] | undefined>;

  // Reservation Requests
  reservationRequests: ReservationRequest[];
  addReservationRequest: (request: Omit<ReservationRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateReservationRequest: (id: string, status: 'approved' | 'rejected') => void;

  // Payments
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id' | 'reference' | 'createdAt'>) => Promise<void> | void;
  updatePayment: (id: string, updates: Partial<Payment>) => Promise<void> | void;
  deletePayment: (id: string) => Promise<void> | void;

  // Invoices
  invoices: Invoice[];
  generateInvoice: (paymentId: string) => string | null;
  isLoadingSession: boolean;

  // Keep compatibility for destructured but unused route prop
  addCandidateAssignment?: any;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const mockUsers: User[] = [
  { id: '1', email: 'reception@formation.com', name: 'Agent Réception', role: 'agent_reception' },
  { id: '2', email: 'reservation@formation.com', name: 'Agent Réservation', role: 'agent_reservation' },
  { id: '3', email: 'prof@formation.com', name: 'Marie Dupont', role: 'professor' },
  { id: '4', email: 'candidat@formation.com', name: 'Jean Martin', role: 'candidate' },
  { id: '5', email: 'admin@formation.com', name: 'Administrateur', role: 'admin' },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  // Data states
  const [commercials, setCommercials] = useState<Commercial[]>([]);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [learningGroups, setLearningGroups] = useState<any[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);

  // Sessions and other local state mocks
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 's1',
      candidateId: 'c1',
      professorId: 'p1',
      roomId: 'r1',
      formationId: 'f1',
      date: '2026-03-13',
      time: '10:00',
      duration: 60,
      status: 'scheduled'
    },
    {
      id: 's2',
      candidateId: 'c2',
      professorId: 'p2',
      roomId: 'r2',
      formationId: 'f2',
      date: '2026-03-13',
      time: '14:00',
      duration: 90,
      status: 'scheduled'
    },
    {
      id: 's3',
      candidateId: 'c1',
      professorId: 'p1',
      roomId: 'r1',
      formationId: 'f1',
      date: '2026-03-10',
      time: '10:00',
      duration: 60,
      status: 'completed',
      attendance: 'present'
    },
    {
      id: 's4',
      candidateId: 'c2',
      professorId: 'p3',
      roomId: 'r3',
      formationId: 'f2',
      date: '2026-03-14',
      time: '09:00',
      duration: 90,
      status: 'scheduled'
    },
    {
      id: 's5',
      candidateId: 'c1',
      professorId: 'p1',
      roomId: 'r1',
      formationId: 'f1',
      date: '2026-03-11',
      time: '14:00',
      duration: 60,
      status: 'scheduled'
    },
    {
      id: 's6',
      candidateId: 'c2',
      professorId: 'p1',
      roomId: 'r2',
      formationId: 'f2',
      date: '2026-03-11',
      time: '10:00',
      duration: 90,
      status: 'scheduled'
    }
  ]);

  const [reservationRequests, setReservationRequests] = useState<ReservationRequest[]>([
    {
      id: 'rr1',
      professorId: 'p1',
      candidateId: 'c1',
      roomId: 'r1',
      date: '2026-03-15',
      time: '11:00',
      status: 'pending',
      type: 'candidate_request',
      createdAt: '2026-03-12T08:00:00Z'
    }
  ]);

  const [payments, setPayments] = useState<Payment[]>([]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'inv1',
      invoiceNumber: 'INV-2026-001',
      paymentId: 'pay1',
      candidateId: 'c1',
      amount: 2500,
      generatedDate: '2026-04-15T10:30:00Z',
      year: 2026
    }
  ]);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      if (token && !currentUser) {
        try {
          const response = await api.get('/auth/me');
          if (response.data.message === 'success') {
            const { user } = response.data;
            const mockUser = mockUsers.find(mu => mu.email === user.email);
            setCurrentUser({
              id: user.id,
              email: user.email,
              name: mockUser ? mockUser.name : user.email.split('@')[0],
              role: mockUser ? mockUser.role : (user.role.toLowerCase() as UserRole)
            });
          }
        } catch (error) {
          console.error('Session restoration failed:', error);
          localStorage.removeItem('token');
        } finally {
          setIsLoadingSession(false);
        }
      } else {
        setIsLoadingSession(false);
      }
    };
    restoreSession();
  }, [currentUser]);

  // Inactivity Timeout (30 minutes)
  useEffect(() => {
    if (!currentUser) return;

    const TIMEOUT = 30 * 60 * 1000;
    let timeoutId: any;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logout();
      }, TIMEOUT);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, [currentUser]);

  const refreshInscriptions = async () => {
    try {
      const [response, candidatesRes] = await Promise.all([
        api.get('/inscriptions'),
        api.get('/candidates')
      ]);
      if (response.data.message === 'success') {
        const groups = response.data.data;
        setLearningGroups(groups);
        const flattened = groups.flatMap((group: any) =>
          (group.inscriptions || []).map((ins: any) => ({
            ...ins,
            learningGroup: {
              id: group.id,
              groupName: group.groupName,
              inscriptionCode: group.inscriptionCode,
              learningMode: group.learningMode,
              formationId: group.formationId,
              professorId: group.professorId,
              dateInscription: group.dateInscription,
              note: group.note
            },
            formation: group.formation,
            professor: group.professor
          }))
        );
        setInscriptions(flattened);
      }
      if (candidatesRes && candidatesRes.data.message === 'success') {
        setCandidates(candidatesRes.data.data);
      }
    } catch (error) {
      console.error('Failed to refresh inscriptions:', error);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      try {
        const results = await Promise.allSettled([
          api.get('/prospects'),
          api.get('/commercials'),
          api.get('/candidates'),
          api.get('/inscriptions'),
          api.get('/formations'),
          api.get('/rooms'),
          api.get('/professors'),
          api.get('/reservations'),
          api.get('/payments')
        ]);

        const prospectsRes = results[0];
        const commercialsRes = results[1];
        const candidatesRes = results[2];
        const inscriptionsRes = results[3];
        const formationsRes = results[4];
        const roomsRes = results[5];
        const professorsRes = results[6];
        const reservationsRes = results[7];
        const paymentsRes = results[8];

        if (prospectsRes.status === 'fulfilled' && prospectsRes.value.data.message === 'success') {
          const normalized = prospectsRes.value.data.data.map((p: any) => ({
            ...p,
            occupation: p.occupation,
            observation: p.observation
          }));
          setProspects(normalized);
        } else {
          console.error('Failed to load prospects:', prospectsRes.status === 'rejected' ? prospectsRes.reason : 'Invalid data format');
        }

        if (commercialsRes.status === 'fulfilled' && commercialsRes.value.data.message === 'success') {
          setCommercials(commercialsRes.value.data.data);
        } else {
          console.error('Failed to load commercials:', commercialsRes.status === 'rejected' ? commercialsRes.reason : 'Invalid data format');
        }

        let activeInscriptions: any[] = [];
        if (inscriptionsRes.status === 'fulfilled' && inscriptionsRes.value.data.message === 'success') {
          const groups = inscriptionsRes.value.data.data;
          setLearningGroups(groups);
          const flattened = groups.flatMap((group: any) =>
            (group.inscriptions || []).map((ins: any) => ({
              ...ins,
              learningGroup: {
                id: group.id,
                groupName: group.groupName,
                inscriptionCode: group.inscriptionCode,
                learningMode: group.learningMode,
                formationId: group.formationId,
                professorId: group.professorId,
                dateInscription: group.dateInscription,
                note: group.note
              },
              formation: group.formation,
              professor: group.professor
            }))
          );
          setInscriptions(flattened);
          activeInscriptions = flattened.filter((ins: any) => ins.status === 'ACTIVE' || ins.statut === 'ACTIVE');
        } else {
          console.error('Failed to load inscriptions:', inscriptionsRes.status === 'rejected' ? inscriptionsRes.reason : 'Invalid data format');
        }

        if (formationsRes.status === 'fulfilled' && formationsRes.value.data.message === 'success') {
          const mapped = formationsRes.value.data.data.map((f: any) => ({
            ...f,
            subject: f.matiere,
            level: f.niveau
          }));
          setFormations(mapped);
        } else {
          console.error('Failed to load formations:', formationsRes.status === 'rejected' ? formationsRes.reason : 'Invalid data format');
        }

        if (roomsRes.status === 'fulfilled' && roomsRes.value.data.message === 'success') {
          const mapped = roomsRes.value.data.data.map((r: any) => ({
            ...r,
            roomNumber: r.numero,
            capacity: r.capacite
          }));
          setRooms(mapped);
        } else {
          console.error('Failed to load rooms:', roomsRes.status === 'rejected' ? roomsRes.reason : 'Invalid data format');
        }

        if (professorsRes.status === 'fulfilled' && professorsRes.value.data.message === 'success') {
          const mapped = professorsRes.value.data.data.map((p: any) => ({
            ...p,
            firstName: p.prenom,
            lastName: p.nom,
            phone: p.telephone,
            email: p.email,
            address: p.adresse,
            subjects: p.specialite ? p.specialite.split(', ').map((s: string) => s.trim()) : [],
            totalHoursWorked: Number(p.totalHoursWorked || 0)
          }));
          setProfessors(mapped);
        } else {
          console.error('Failed to load professors:', professorsRes.status === 'rejected' ? professorsRes.reason : 'Invalid data format');
        }

        if (candidatesRes.status === 'fulfilled' && candidatesRes.value.data.message === 'success') {
          const normalized = candidatesRes.value.data.data.map((c: any) => {
            const activeIns = activeInscriptions.find((ins: any) => ins.candidateId === c.id);
            return {
              ...c,
              formationId: activeIns ? activeIns.formationId : 'unassigned'
            };
          });
          setCandidates(normalized);
        } else {
          console.error('Failed to load candidates:', candidatesRes.status === 'rejected' ? candidatesRes.reason : 'Invalid data format');
        }

        if (reservationsRes.status === 'fulfilled' && reservationsRes.value.data.message === 'success') {
          const mapped = reservationsRes.value.data.data.map(mapReservationToSession);
          setSessions(mapped);
        } else {
          console.error('Failed to load reservations:', reservationsRes.status === 'rejected' ? reservationsRes.reason : 'Invalid data format');
        }

        if (paymentsRes.status === 'fulfilled' && paymentsRes.value.data.message === 'success') {
          setPayments(paymentsRes.value.data.data.map(mapPaymentFromBackend));
        } else {
          console.error('Failed to load payments:', paymentsRes.status === 'rejected' ? paymentsRes.reason : 'Invalid data format');
        }
      } catch (error) {
        console.error('Failed to fetch initial application data:', error);
      }
    };
    fetchData();
  }, [currentUser]);

  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.message === 'success') {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        const mockUser = mockUsers.find(mu => mu.email === user.email);
        setCurrentUser({
          id: user.id,
          email: user.email,
          name: mockUser ? mockUser.name : user.email.split('@')[0],
          role: mockUser ? mockUser.role : (user.role.toLowerCase() as UserRole)
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  // Commercial functions
  const addCommercial = async (commercial: Omit<Commercial, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post('/commercials', commercial);
      if (response.data.message === 'success') {
        setCommercials(prev => [...prev, response.data.data]);
        return { success: true };
      }
      return { success: false, error: response.data.error || 'Erreur inconnue' };
    } catch (error: any) {
      console.error('Failed to add commercial:', error);
      throw error;
    }
  };

  const updateCommercial = async (id: string, updates: Partial<Commercial>) => {
    try {
      const response = await api.patch(`/commercials/${id}`, updates);
      if (response.data.message === 'success') {
        setCommercials(prev => prev.map(c => c.id === id ? response.data.data : c));
        return { success: true };
      }
      return { success: false, error: response.data.error || 'Erreur inconnue' };
    } catch (error: any) {
      console.error('Failed to update commercial:', error);
      throw error;
    }
  };

  const deleteCommercial = async (id: string) => {
    try {
      const response = await api.delete(`/commercials/${id}`);
      if (response.data.message === 'success') {
        setCommercials(prev => prev.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete commercial:', error);
      throw error;
    }
  };

  // Prospect functions
  const addProspect = async (prospect: Omit<Prospect, 'id' | 'status' | 'freeSessionsCompleted' | 'absences' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post('/prospects', {
        membershipNumber: prospect.membershipNumber || null,
        firstName: prospect.firstName,
        lastName: prospect.lastName,
        gender: prospect.gender || null,
        age: Number(prospect.age),
        occupation: prospect.occupation,
        phone: prospect.phone || null,
        email: prospect.email || null,
        registrationDate: prospect.registrationDate ? new Date(prospect.registrationDate).toISOString() : null,
        giftCode: prospect.giftCode || null,
        observation: prospect.observation,
        action: prospect.action || null,
        firstContactId: prospect.firstContactId || null,
        secondContactId: prospect.secondContactId || null
      });
      if (response.data.message === 'success') {
        setProspects(prev => [response.data.data, ...prev]);
      }
    } catch (error) {
      console.error('Failed to add prospect:', error);
      throw error;
    }
  };

  const updateProspect = async (id: string, updates: Partial<Prospect>) => {
    try {
      const response = await api.patch(`/prospects/${id}`, {
        membershipNumber: updates.membershipNumber,
        firstName: updates.firstName,
        lastName: updates.lastName,
        gender: updates.gender,
        age: updates.age !== undefined ? Number(updates.age) : undefined,
        occupation: updates.occupation,
        phone: updates.phone,
        email: updates.email,
        registrationDate: updates.registrationDate ? new Date(updates.registrationDate).toISOString() : undefined,
        giftCode: updates.giftCode,
        observation: updates.observation,
        action: updates.action,
        firstContactId: updates.firstContactId,
        secondContactId: updates.secondContactId,
        freeSessionsCompleted: updates.freeSessionsCompleted !== undefined ? Number(updates.freeSessionsCompleted) : undefined,
        absences: updates.absences !== undefined ? Number(updates.absences) : undefined
      });
      if (response.data.message === 'success') {
        setProspects(prev => prev.map(p => p.id === id ? response.data.data : p));
      }
    } catch (error) {
      console.error('Failed to update prospect:', error);
      throw error;
    }
  };

  const deleteProspect = async (id: string) => {
    try {
      const response = await api.delete(`/prospects/${id}`);
      if (response.data.message === 'success') {
        setProspects(prev => prev.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete prospect:', error);
      throw error;
    }
  };

  const transformToCandidate = async (prospectId: string, formationId: string): Promise<string | null> => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (!prospect) return null;

    try {
      const response = await api.post('/candidates', {
        firstName: prospect.firstName,
        lastName: prospect.lastName,
        age: Number(prospect.age),
        occupation: prospect.occupation,
        observation: prospect.observation,
        firstContactId: prospect.firstContactId || null,
        secondContactId: prospect.secondContactId || null,
        action: prospect.action || null,
        gender: prospect.gender || null,
        email: prospect.email || null,
        phone: prospect.phone || null,
        registrationDate: prospect.registrationDate ? new Date(prospect.registrationDate).toISOString() : null,
        status: 'ACTIVE'
      });
      if (response.data.message === 'success') {
        const added = response.data.data;
        const normalizedAdded = {
          ...added,
          formationId
        };
        setCandidates(prev => [normalizedAdded, ...prev]);

        // Delete from prospects
        await api.delete(`/prospects/${prospectId}`);
        setProspects(prev => prev.filter(p => p.id !== prospectId));

        // Create Default Inscription
        const defaultCode = added.candidateCode ? added.candidateCode.replace('CAN-', 'INS-') : `INS-TRANS-${Date.now()}`;
        await addInscription({
          inscriptionCode: defaultCode,
          candidateId: added.id,
          formationId,
          status: 'ACTIVE',
          learningMode: 'GROUPE',
          remainingHours: 0
        });

        return added.candidateCode;
      }
      return null;
    } catch (error) {
      console.error('Transformation to candidate failed:', error);
      throw error;
    }
  };

  // Candidate functions
  const addCandidate = async (candidate: Omit<Candidate, 'id' | 'candidateCode' | 'status' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post('/candidates', {
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email || null,
        phone: candidate.phone || null,
        age: Number(candidate.age),
        occupation: candidate.occupation,
        observation: candidate.observation,
        firstContactId: candidate.firstContactId || null,
        secondContactId: candidate.secondContactId || null,
        action: candidate.action || null,
        gender: candidate.gender || null,
        membershipNumber: candidate.membershipNumber || null,
        registrationDate: candidate.registrationDate ? new Date(candidate.registrationDate).toISOString() : null
      });
      if (response.data.message === 'success') {
        const added = {
          ...response.data.data,
          formationId: 'unassigned'
        };
        setCandidates(prev => [added, ...prev]);
      }
    } catch (error) {
      console.error('Failed to add candidate:', error);
      throw error;
    }
  };

  const updateCandidate = async (id: string, updates: Partial<Candidate>) => {
    try {
      const response = await api.patch(`/candidates/${id}`, {
        firstName: updates.firstName,
        lastName: updates.lastName,
        email: updates.email,
        phone: updates.phone,
        age: updates.age !== undefined ? Number(updates.age) : undefined,
        occupation: updates.occupation,
        observation: updates.observation,
        firstContactId: updates.firstContactId,
        secondContactId: updates.secondContactId,
        action: updates.action,
        status: updates.status,
        gender: updates.gender,
        membershipNumber: updates.membershipNumber,
        registrationDate: updates.registrationDate ? new Date(updates.registrationDate).toISOString() : undefined
      });
      if (response.data.message === 'success') {
        const updated = response.data.data;
        setCandidates(prev => prev.map(c => c.id === id ? {
          ...c,
          ...updated
        } : c));
      }
    } catch (error) {
      console.error('Failed to update candidate:', error);
      throw error;
    }
  };

  const deleteCandidate = async (id: string) => {
    try {
      const response = await api.delete(`/candidates/${id}`);
      if (response.data.message === 'success') {
        setCandidates(prev => prev.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete candidate:', error);
      throw error;
    }
  };

  // Inscription functions
  const addInscription = async (inscription: Omit<Inscription, 'id' | 'dateInscription' | 'createdAt' | 'updatedAt'> & { candidateIds?: string[] }) => {
    try {
      const response = await api.post('/inscriptions', {
        inscriptionCode: inscription.inscriptionCode,
        candidateId: inscription.candidateId,
        candidateIds: inscription.candidateIds,
        formationId: inscription.formationId,
        status: inscription.status,
        note: inscription.note || null,
        duration: inscription.duration !== undefined ? Number(inscription.duration) : null,
        price: inscription.price !== undefined ? Number(inscription.price) : null,
        volumeHoraire: inscription.volumeHoraire !== undefined ? Number(inscription.volumeHoraire) : null,
        remainingHours: inscription.remainingHours !== undefined ? Number(inscription.remainingHours) : 0,
        learningMode: inscription.learningMode,
        professorId: inscription.professorId || null
      });
      if (response.data.message === 'success') {
        const added = response.data.data;
        await refreshInscriptions();

        // Dynamically update corresponding candidate formationId in state
        if (added.status === 'ACTIVE') {
          setCandidates(prev => prev.map(c => c.id === added.candidateId ? { ...c, formationId: added.formationId } : c));
        }
      }
    } catch (error) {
      console.error('Failed to add inscription:', error);
      throw error;
    }
  };

  const updateInscriptionStatus = async (id: string, status: Inscription['status']) => {
    try {
      await updateInscription(id, { status });
    } catch (error) {
      console.error('Failed to update inscription status:', error);
      throw error;
    }
  };

  const updateInscription = async (id: string, updates: Partial<Inscription>) => {
    try {
      const response = await api.patch(`/inscriptions/${id}`, {
        inscriptionCode: updates.inscriptionCode,
        status: updates.status,
        note: updates.note,
        duration: updates.duration !== undefined ? Number(updates.duration) : undefined,
        price: updates.price !== undefined ? Number(updates.price) : undefined,
        volumeHoraire: updates.volumeHoraire !== undefined ? Number(updates.volumeHoraire) : undefined,
        remainingHours: updates.remainingHours !== undefined ? Number(updates.remainingHours) : undefined,
        learningMode: updates.learningMode,
        professorId: updates.professorId,
        dateInscription: updates.dateInscription ? new Date(updates.dateInscription).toISOString() : undefined
      });
      if (response.data.message === 'success') {
        const updated = response.data.data;
        await refreshInscriptions();

        // Sync candidate formationId in case status was toggled
        if (updated.status === 'ACTIVE') {
          setCandidates(prev => prev.map(c => c.id === updated.candidateId ? { ...c, formationId: updated.formationId } : c));
        } else if (updated.status === 'CANCELLED') {
          setCandidates(prev => prev.map(c => c.id === updated.candidateId ? { ...c, formationId: 'unassigned' } : c));
        }
      }
    } catch (error) {
      console.error('Failed to update inscription:', error);
      throw error;
    }
  };

  const deleteInscription = async (id: string) => {
    try {
      const target = inscriptions.find(ins => ins.id === id);
      const response = await api.delete(`/inscriptions/${id}`);
      if (response.data.message === 'success') {
        await refreshInscriptions();
        if (target && target.status === 'ACTIVE') {
          setCandidates(prev => prev.map(c => c.id === target.candidateId ? { ...c, formationId: 'unassigned' } : c));
        }
      }
    } catch (error) {
      console.error('Failed to delete inscription:', error);
      throw error;
    }
  };

  const deleteLearningGroup = async (id: string) => {
    try {
      const response = await api.delete(`/learning-groups/${id}`);
      if (response.data.message === 'success') {
        await refreshInscriptions();
      }
    } catch (error) {
      console.error('Failed to delete learning group:', error);
      throw error;
    }
  };

  const updateLearningGroup = async (groupId: string, data: any) => {
    try {
      const response = await api.put(`/inscriptions/groups/${groupId}`, data);
      if (response.data.message === 'success') {
        await refreshInscriptions();
      }
    } catch (error) {
      console.error('Failed to update learning group:', error);
      throw error;
    }
  };

  // Professor functions
  const addProfessor = async (professor: Omit<Professor, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post('/professors', {
        prenom: professor.prenom || (professor as any).firstName,
        nom: professor.nom || (professor as any).lastName,
        telephone: professor.telephone || (professor as any).phone || null,
        email: professor.email || null,
        adresse: professor.adresse || (professor as any).address || null,
        type: professor.type || 'permanent',
        dayOff: professor.dayOff || 'Sunday',
        maxSessions: professor.maxSessions !== undefined ? parseInt(String(professor.maxSessions)) : 25
      });
      if (response.data.message === 'success') {
        const newProf = response.data.data;
        const mapped = {
          ...newProf,
          firstName: newProf.prenom,
          lastName: newProf.nom,
          phone: newProf.telephone,
          email: newProf.email,
          address: newProf.adresse,
          subjects: newProf.specialite ? newProf.specialite.split(', ').map((s: string) => s.trim()) : [],
          totalHoursWorked: Number(newProf.totalHoursWorked || 0)
        };
        setProfessors(prev => [...prev, mapped]);
      }
    } catch (error) {
      console.error('Failed to add professor:', error);
      throw error;
    }
  };

  const updateProfessor = async (id: string, updates: Partial<Professor>) => {
    try {
      const nom = updates.nom || (updates as any).lastName;
      const prenom = updates.prenom || (updates as any).firstName;
      const telephone = updates.telephone || (updates as any).phone;
      const adresse = updates.adresse || (updates as any).address;

      const payload: any = {};
      if (nom !== undefined) payload.nom = nom;
      if (prenom !== undefined) payload.prenom = prenom;
      if (updates.email !== undefined) payload.email = updates.email;
      if (telephone !== undefined) payload.telephone = telephone;
      if (adresse !== undefined) payload.adresse = adresse;
      if (updates.type !== undefined) payload.type = updates.type;
      if (updates.dayOff !== undefined) payload.dayOff = updates.dayOff;
      if (updates.maxSessions !== undefined) payload.maxSessions = parseInt(String(updates.maxSessions));

      const response = await api.patch(`/professors/${id}`, payload);
      if (response.data.message === 'success') {
        const updated = response.data.data;
        const mapped = {
          ...updated,
          firstName: updated.prenom,
          lastName: updated.nom,
          phone: updated.telephone,
          email: updated.email,
          address: updated.adresse,
          subjects: updated.specialite ? updated.specialite.split(', ').map((s: string) => s.trim()) : [],
          totalHoursWorked: Number(updated.totalHoursWorked || 0)
        };
        setProfessors(prev => prev.map(p => p.id === id ? mapped : p));
      }
    } catch (error) {
      console.error('Failed to update professor:', error);
      throw error;
    }
  };

  const deleteProfessor = async (id: string): Promise<boolean> => {
    try {
      const response = await api.delete(`/professors/${id}`);
      if (response.data.message === 'success') {
        setProfessors(prev => prev.filter(p => p.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to delete professor:', error);
      throw error;
    }
  };

  // Room functions
  const addRoom = async (room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const numero = room.numero || (room as any).roomNumber;
      const capacite = room.capacite !== undefined ? room.capacite : (room as any).capacity;
      const response = await api.post('/rooms', {
        numero,
        capacite: parseInt(String(capacite))
      });
      if (response.data.message === 'success') {
        const newRoom = response.data.data;
        const mapped = {
          ...newRoom,
          roomNumber: newRoom.numero,
          capacity: newRoom.capacite
        };
        setRooms(prev => [...prev, mapped]);
      }
    } catch (error) {
      console.error('Failed to add room:', error);
      throw error;
    }
  };

  const updateRoom = async (id: string, updates: Partial<Room>) => {
    try {
      const numero = updates.numero !== undefined ? updates.numero : updates.roomNumber;
      const capacite = updates.capacite !== undefined ? updates.capacite : updates.capacity;

      const payload: any = {};
      if (numero !== undefined) payload.numero = numero;
      if (capacite !== undefined) payload.capacite = parseInt(String(capacite));

      const response = await api.patch(`/rooms/${id}`, payload);
      if (response.data.message === 'success') {
        const updated = response.data.data;
        const mapped = {
          ...updated,
          roomNumber: updated.numero,
          capacity: updated.capacite
        };
        setRooms(prev => prev.map(r => r.id === id ? mapped : r));
      }
    } catch (error) {
      console.error('Failed to update room:', error);
      throw error;
    }
  };

  const deleteRoom = async (id: string): Promise<boolean> => {
    try {
      const response = await api.delete(`/rooms/${id}`);
      if (response.data.message === 'success') {
        setRooms(prev => prev.filter(r => r.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to delete room:', error);
      throw error;
    }
  };

  // Formation functions
  const addFormation = async (formation: Omit<Formation, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const matiere = formation.matiere || (formation as any).subject;
      const niveau = formation.niveau || (formation as any).level;
      const response = await api.post('/formations', {
        matiere,
        niveau
      });
      if (response.data.message === 'success') {
        const newFormation = response.data.data;
        const mapped = {
          ...newFormation,
          subject: newFormation.matiere,
          level: newFormation.niveau
        };
        setFormations(prev => [...prev, mapped]);
      }
    } catch (error) {
      console.error('Failed to add formation:', error);
      throw error;
    }
  };

  const updateFormation = async (id: string, updates: Partial<Formation>) => {
    try {
      const matiere = updates.matiere !== undefined ? updates.matiere : updates.subject;
      const niveau = updates.niveau !== undefined ? updates.niveau : updates.level;
      const payload: any = {};
      if (matiere !== undefined) payload.matiere = matiere;
      if (niveau !== undefined) payload.niveau = niveau;

      const response = await api.patch(`/formations/${id}`, payload);
      if (response.data.message === 'success') {
        const updated = response.data.data;
        const mapped = {
          ...updated,
          subject: updated.matiere,
          level: updated.niveau
        };
        setFormations(prev => prev.map(f => f.id === id ? mapped : f));
      }
    } catch (error) {
      console.error('Failed to update formation:', error);
      throw error;
    }
  };

  const deleteFormation = async (id: string): Promise<boolean> => {
    try {
      const response = await api.delete(`/formations/${id}`);
      if (response.data.message === 'success') {
        setFormations(prev => prev.filter(f => f.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to delete formation:', error);
      throw error;
    }
  };

  // Session functions
  const addSession = (session: Omit<Session, 'id' | 'status'>): boolean => {
    const candidate = candidates.find(c => c.id === session.candidateId);
    const professor = professors.find(p => p.id === session.professorId);
    const room = rooms.find(r => r.id === session.roomId);
    const formation = formations.find(f => f.id === session.formationId);

    if (!candidate || !professor || !room || !formation) {
      return false;
    }

    const hasConflict = sessions.some(s =>
      s.date === session.date &&
      s.time === session.time &&
      s.status === 'scheduled' &&
      (s.professorId === session.professorId || s.roomId === session.roomId)
    );

    if (hasConflict) {
      return false;
    }

    const newSession: Session = {
      ...session,
      id: `s${sessions.length + 1}`,
      status: 'scheduled'
    };

    setSessions([...sessions, newSession]);
    return true;
  };

  const refreshPlanning = async () => {
    try {
      const res = await api.get('/reservations', { params: { t: Date.now() } });
      if (res.data.message === 'success') {
        const mapped = res.data.data.map(mapReservationToSession);
        setSessions(mapped);
        return mapped;
      }
    } catch (error) {
      console.error('Failed to refresh planning:', error);
    }
  };

  const cancelSession = async (id: string) => {
    try {
      await api.delete(`/reservations/${id}`);
      await refreshPlanning();
    } catch (error) {
      console.error('Failed to cancel session:', error);
    }
  };

  const markAttendance = (id: string, attendance: 'present' | 'absent') => {
    const session = sessions.find(s => s.id === id);

    if (session) {
      const professor = professors.find(p => p.id === session.professorId);
      if (professor && attendance === 'present') {
        const hoursToAdd = session.duration / 60;
        updateProfessor(professor.id, {
          nom: professor.nom,
          prenom: professor.prenom,
          type: professor.type,
          dayOff: professor.dayOff,
          maxSessions: professor.maxSessions
        });
      }

      setSessions(sessions.map(s =>
        s.id === id ? { ...s, status: 'completed' as const, attendance } : s
      ));

      if (attendance === 'present') {
        const inscription = inscriptions.find(ins =>
          ins.candidateId === session.candidateId &&
          ins.formationId === session.formationId &&
          ins.status === 'ACTIVE'
        );
        if (inscription) {
          const hoursToDeduct = session.duration / 60;
          api.post(`/inscriptions/${inscription.id}/deduct-hours`, { hours: hoursToDeduct })
            .then(response => {
              if (response.data.message === 'success') {
                const updated = response.data.data;
                setInscriptions(prev => prev.map(ins =>
                  ins.id === inscription.id ? updated : ins
                ));
              }
            })
            .catch(error => console.error("Error deducting hours:", error));
        }
      }
    }
  };

  // Reservation Request functions
  const addReservationRequest = (request: Omit<ReservationRequest, 'id' | 'status' | 'createdAt'>) => {
    const newRequest: ReservationRequest = {
      ...request,
      id: `rr${reservationRequests.length + 1}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setReservationRequests([...reservationRequests, newRequest]);
  };

  const updateReservationRequest = (id: string, status: 'approved' | 'rejected') => {
    const request = reservationRequests.find(r => r.id === id);

    if (request && status === 'approved' && request.type === 'candidate_request') {
      const candidate = candidates.find(c => c.id === request.candidateId);
      if (candidate) {
        const activeIns = inscriptions.find(ins => ins.candidateId === request.candidateId && ins.status === 'ACTIVE');
        if (activeIns) {
          addSession({
            candidateId: request.candidateId,
            professorId: request.professorId,
            roomId: request.roomId,
            formationId: activeIns.formationId,
            date: request.date,
            time: request.time,
            duration: 60
          });
        }
      }
    }

    if (request && status === 'approved' && (request.type === 'professor_cancellation' || request.type === 'candidate_cancellation')) {
      if (request.sessionId) {
        cancelSession(request.sessionId);
      } else {
        const session = sessions.find(s =>
          s.candidateId === request.candidateId &&
          s.professorId === request.professorId &&
          s.date === request.date &&
          s.time === request.time
        );
        if (session) {
          cancelSession(session.id);
        }
      }
    }

    setReservationRequests(reservationRequests.map(r =>
      r.id === id ? { ...r, status } : r
    ));
  };

  const refreshPayments = async () => {
    try {
      const res = await api.get('/payments');
      if (res.data.message === 'success') {
        setPayments(res.data.data.map(mapPaymentFromBackend));
      }
    } catch (error) {
      console.error('Failed to refresh payments:', error);
    }
  };

  // Payment functions
  const addPayment = async (payment: Omit<Payment, 'id' | 'reference' | 'createdAt'>) => {
    const paymentMethodMap: Record<string, string> = {
      cash: 'CASH',
      bank_transfer: 'BANK_TRANSFER',
      check: 'CHEQUE'
    };
    const statusMap: Record<string, string> = {
      reservation: 'PENDING',
      pending: 'PENDING',
      paid: 'COMPLETED',
      validated: 'COMPLETED'
    };

    const payload = {
      candidateId: payment.candidateId,
      formationId: payment.formationId,
      amount: Number(payment.amount),
      paymentMethod: paymentMethodMap[payment.paymentMethod] || 'CASH',
      status: statusMap[payment.status] || 'PENDING',
      paymentDate: payment.paymentDate ? new Date(payment.paymentDate).toISOString() : new Date().toISOString(),
      note: (payment as any).note || ''
    };

    try {
      const response = await api.post('/payments', payload);
      if (response.data.message === 'success') {
        await refreshPayments();
      }
    } catch (error) {
      console.error('Failed to add payment:', error);
      throw error;
    }
  };

  const updatePayment = async (id: string, updates: Partial<Payment>) => {
    const paymentMethodMap: Record<string, string> = {
      cash: 'CASH',
      bank_transfer: 'BANK_TRANSFER',
      check: 'CHEQUE'
    };
    const statusMap: Record<string, string> = {
      reservation: 'PENDING',
      pending: 'PENDING',
      paid: 'COMPLETED',
      validated: 'COMPLETED'
    };

    const payload: any = {};
    if (updates.candidateId !== undefined) payload.candidateId = updates.candidateId;
    if (updates.formationId !== undefined) payload.formationId = updates.formationId;
    if (updates.amount !== undefined) payload.amount = Number(updates.amount);
    if (updates.paymentMethod !== undefined) payload.paymentMethod = paymentMethodMap[updates.paymentMethod] || 'CASH';
    if (updates.status !== undefined) payload.status = statusMap[updates.status] || 'PENDING';
    if (updates.paymentDate !== undefined) payload.paymentDate = updates.paymentDate ? new Date(updates.paymentDate).toISOString() : undefined;
    if ((updates as any).note !== undefined) payload.note = (updates as any).note;

    try {
      const response = await api.patch(`/payments/${id}`, payload);
      if (response.data.message === 'success') {
        await refreshPayments();
      }
    } catch (error) {
      console.error('Failed to update payment:', error);
      throw error;
    }
  };

  const deletePayment = async (id: string) => {
    try {
      const response = await api.delete(`/payments/${id}`);
      if (response.data.message === 'success' || response.status === 204) {
        await refreshPayments();
      }
    } catch (error) {
      console.error('Failed to delete payment:', error);
      throw error;
    }
  };

  const generateInvoice = (paymentId: string): string | null => {
    const payment = payments.find(p => p.id === paymentId);
    if (!payment || payment.invoiceGenerated) {
      return null;
    }

    const year = new Date().getFullYear();
    const invoiceNumber = `INV-${year}-${String(invoices.length + 1).padStart(3, '0')}`;

    const newInvoice: Invoice = {
      id: `inv${invoices.length + 1}`,
      invoiceNumber,
      paymentId,
      candidateId: payment.candidateId,
      amount: payment.amount,
      generatedDate: new Date().toISOString(),
      year
    };

    const generatedInvoices = JSON.parse(localStorage.getItem('generated_invoices') || '{}');
    generatedInvoices[paymentId] = invoiceNumber;
    localStorage.setItem('generated_invoices', JSON.stringify(generatedInvoices));

    setInvoices([...invoices, newInvoice]);
    setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, invoiceGenerated: true, invoiceNumber } : p));

    return invoiceNumber;
  };

  const value: AppContextType = {
    currentUser,
    login,
    logout,
    commercials,
    addCommercial,
    updateCommercial,
    deleteCommercial,
    prospects,
    addProspect,
    updateProspect,
    deleteProspect,
    transformToCandidate,
    candidates,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    inscriptions,
    learningGroups,
    addInscription,
    updateInscriptionStatus,
    updateInscription,
    updateLearningGroup,
    deleteInscription,
    deleteLearningGroup,
    professors,
    addProfessor,
    updateProfessor,
    deleteProfessor,
    rooms,
    addRoom,
    updateRoom,
    deleteRoom,
    formations,
    addFormation,
    updateFormation,
    deleteFormation,
    sessions,
    addSession,
    cancelSession,
    refreshPlanning,
    markAttendance,
    reservationRequests,
    addReservationRequest,
    updateReservationRequest,
    payments,
    addPayment,
    updatePayment,
    deletePayment,
    invoices,
    generateInvoice,
    isLoadingSession
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
