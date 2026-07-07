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
  firstName: string;
  lastName: string;
  age: number;
  occupation: 'student' | 'employee';
  subject: string;
  giftCode?: string;
  observation: 'alone' | 'accompanied';
  contact?: string[];
  action?: string;
  status: 'prospect';
  freeSessionsCompleted: number;
  absences: number;
  createdAt: string;
}

export interface Commercial {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  action: string;
  createdAt: string;
}

export interface Candidate {
  id: string;
  candidateCode: string;
  firstName: string;
  lastName: string;
  age: number;
  occupation: 'student' | 'employee';
  giftCode?: string;
  observation: 'alone' | 'accompanied';
  contact?: string[];
  formationId?: string;
  action?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

export interface CandidateAssignment {
  id: string;
  candidateId: string;
  formationId: string;
  assignmentType: 'inscription' | 'réaffectation';
  duration: number;
  price: number;
  volumeHoraire: number;
  date: string;
  createdAt: string;
}

export interface Professor {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  subjects: string[];
  type: 'permanent' | 'temporary';
  dayOff: string;
  maxSessions: number;
  totalHoursWorked: number;
}


export interface Room {
  id: string;
  roomNumber: string;
  type: string;
  capacity: number;
  available: boolean;
}

export interface Formation {
  id: string;
  subject: string;
  level: string;
  type: 'group' | 'pair' | 'individual';
  duration: number; // minutes
  totalSessions: number;
}

export interface Group {
  id: string;
  nom: string;
  type: 'MONOME' | 'BINOME' | 'GROUPE';
  effectif: number;
  description?: string;
  formationId: string;
  createdAt: string;
  members?: {
    id: string;
    candidateId: string;
    candidate: Candidate;
  }[];
  professorId?: string | null;
  professor?: Professor | null;
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
}

export interface ReservationRequest {
  id: string;
  professorId: string;
  candidateId: string;
  roomId: string;
  formationId?: string; // Added to track which formation for the reservation
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'professor_cancellation' | 'candidate_request' | 'candidate_cancellation';
  sessionId?: string; // For cancellation requests
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

interface AppContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Prospects
  prospects: Prospect[];
  addProspect: (prospect: Omit<Prospect, 'id' | 'status' | 'freeSessionsCompleted' | 'absences' | 'createdAt'>) => Promise<void>;
  updateProspect: (id: string, prospect: Partial<Prospect>) => Promise<void>;
  deleteProspect: (id: string) => Promise<void>;
  transformToCandidate: (prospectId: string, formationId: string) => Promise<string | null>;

  // Commercials
  commercials: Commercial[];
  addCommercial: (commercial: Omit<Commercial, 'id' | 'createdAt'>) => void;
  updateCommercial: (id: string, commercial: Partial<Commercial>) => void;
  deleteCommercial: (id: string) => void;

  // Candidates
  candidates: Candidate[];
  addCandidate: (candidate: Omit<Candidate, 'id' | 'candidateCode' | 'status' | 'createdAt'>) => Promise<void>;
  updateCandidate: (id: string, updates: Partial<Candidate>) => Promise<void>;
  deleteCandidate: (id: string) => Promise<void>;

  // Candidate Assignments
  candidateAssignments: CandidateAssignment[];
  addCandidateAssignment: (assignment: Omit<CandidateAssignment, 'id' | 'createdAt'>) => void;
  getCandidateAssignments: (candidateId: string) => CandidateAssignment[];

  // Professors
  professors: Professor[];
  addProfessor: (professor: Omit<Professor, 'id'>) => Promise<void>;
  updateProfessor: (id: string, updates: Partial<Professor>) => Promise<void>;
  deleteProfessor: (id: string) => Promise<boolean>;

  // Inscriptions
  inscriptions: Inscription[];
  addInscription: (inscription: Omit<Inscription, 'id' | 'dateInscription'>) => Promise<void>;
  updateInscriptionStatus: (id: string, statut: Inscription['statut']) => Promise<void>;
  updateInscription: (id: string, updates: Partial<Inscription>) => Promise<void>;
  deleteInscription: (id: string) => Promise<void>;

  // Rooms
  rooms: Room[];
  addRoom: (room: Omit<Room, 'id'>) => Promise<void>;
  updateRoom: (id: string, updates: Partial<Room>) => Promise<void>;
  deleteRoom: (id: string) => Promise<boolean>;

  // Formations
  formations: Formation[];
  addFormation: (formation: Omit<Formation, 'id'>) => Promise<void>;
  updateFormation: (id: string, updates: Partial<Formation>) => Promise<void>;
  deleteFormation: (id: string) => Promise<boolean>;

  // Groups
  groups: Group[];
  addGroup: (group: Omit<Group, 'id' | 'createdAt' | 'members' | 'effectif'> & { candidateIds?: string[] }) => Promise<void>;
  updateGroup: (id: string, updates: Partial<Group>) => Promise<void>;
  deleteGroup: (id: string) => Promise<void>;
  addCandidateToGroup: (groupId: string, candidateId: string) => Promise<void>;
  removeCandidateFromGroup: (groupId: string, candidateId: string) => Promise<void>;
  assignProfessorToGroup: (groupId: string, professorId: string) => Promise<void>;
  removeProfessorFromGroup: (groupId: string) => Promise<void>;

  // Sessions
  sessions: Session[];
  addSession: (session: Omit<Session, 'id' | 'status'>) => boolean;
  cancelSession: (id: string) => void;
  markAttendance: (id: string, attendance: 'present' | 'absent') => void;

  // Reservation Requests
  reservationRequests: ReservationRequest[];
  addReservationRequest: (request: Omit<ReservationRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateReservationRequest: (id: string, status: 'approved' | 'rejected') => void;

  // Payments
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id' | 'reference' | 'createdAt'>) => void;
  updatePayment: (id: string, updates: Partial<Payment>) => void;

  // Invoices
  invoices: Invoice[];
  generateInvoice: (paymentId: string) => string | null;
  isLoadingSession: boolean;
}

export interface Inscription {
  id: string;
  candidateId: string;
  formationId: string;
  statut: 'ACTIVE' | 'CANCELLED' | 'COMPLETED' | 'WAITING' | 'ASSIGNED';
  status?: string;
  dateInscription: string;
  duration?: number;
  price?: number;
  volumeHoraire?: number;
  remainingHours: number;
  note?: string;
  candidate?: Candidate;
  formation?: Formation;
  learningMode?: 'MONOME' | 'BINOME' | 'GROUPE';
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock users
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

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      if (token && !currentUser) {
        try {
          const response = await api.get('/auth/me');
          if (response.data.message === 'success') {
            const { user } = response.data;
            setCurrentUser({
              id: user.id,
              email: user.email,
              name: user.email.split('@')[0],
              role: user.role.toLowerCase() as UserRole
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

    const TIMEOUT = 30 * 60 * 1000; // 30 minutes
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

  // Fetch prospects on mount
  useEffect(() => {
    const fetchProspects = async () => {
      if (currentUser) {
        try {
          const response = await api.get('/prospects');
          if (response.data.message === 'success') {
            setProspects(response.data.data);
          }
        } catch (error) {
          console.error('Failed to fetch prospects:', error);
        }
      }
    };
    fetchProspects();
  }, [currentUser]);

  // Fetch commercials on mount
  useEffect(() => {
    const fetchCommercials = async () => {
      if (currentUser) {
        try {
          const response = await api.get('/commercials');
          if (response.data.message === 'success') {
            setCommercials(response.data.data);
          }
        } catch (error) {
          console.error('Failed to fetch commercials:', error);
        }
      }
    };
    fetchCommercials();
  }, [currentUser]);

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);

  // Fetch candidates on mount
  useEffect(() => {
    const fetchCandidates = async () => {
      if (currentUser) {
        try {
          const response = await api.get('/candidates');
          const inscriptionsRes = await api.get('/inscriptions');

          if (response.data.message === 'success') {
            const activeInscriptions = inscriptionsRes.data.message === 'success'
              ? inscriptionsRes.data.data.filter((ins: any) => {
                const s = ins.status || ins.statut;
                return s && s !== 'CANCELLED';
              })
              : [];

            const normalized = response.data.data.map((c: any) => {
              const activeIns = activeInscriptions.find((ins: any) => ins.candidateId === c.id);
              return {
                ...c,
                occupation: c.occupation?.toLowerCase(),
                observation: c.observation?.toLowerCase(),
                status: c.status?.toLowerCase(),
                formationId: activeIns ? activeIns.formationId : 'unassigned'
              };
            });
            setCandidates(normalized);
          }

          if (inscriptionsRes.data.message === 'success') {
            const mapped = inscriptionsRes.data.data.map((ins: any) => ({
              ...ins,
              statut: ins.status || ins.statut
            }));
            setInscriptions(mapped);
          }
        } catch (error) {
          console.error('Failed to fetch candidates/inscriptions:', error);
        }
      }
    };
    fetchCandidates();
  }, [currentUser]);

  const [groups, setGroups] = useState<Group[]>([]);

  // Fetch groups on mount
  useEffect(() => {
    const fetchGroups = async () => {
      if (currentUser) {
        try {
          const response = await api.get('/groups');
          if (response.data.message === 'success') {
            setGroups(response.data.data);
          }
        } catch (error) {
          console.error('Failed to fetch groups:', error);
        }
      }
    };
    fetchGroups();
  }, [currentUser]);

  const [professors, setProfessors] = useState<Professor[]>([]);

  const [rooms, setRooms] = useState<Room[]>([]);

  const [formations, setFormations] = useState<Formation[]>([]);

  // Fetch formations on mount
  useEffect(() => {
    const fetchFormations = async () => {
      if (currentUser) {
        try {
          const response = await api.get('/formations');
          if (response.data.message === 'success') {
            const mapped = response.data.data.map((f: any) => ({
              ...f,
              subject: f.matiere,
              level: f.niveau
            }));
            setFormations(mapped);
          }
        } catch (error) {
          console.error('Failed to fetch formations:', error);
        }
      }
    };
    fetchFormations();

    const fetchRooms = async () => {
      if (currentUser) {
        try {
          const response = await api.get('/rooms');
          if (response.data.message === 'success') {
            const mapped = response.data.data.map((r: any) => ({
              ...r,
              roomNumber: r.numero,
              capacity: r.capacite
            }));
            setRooms(mapped);
          }
        } catch (error) {
          console.error('Failed to fetch rooms:', error);
        }
      }
    };
    fetchRooms();

    const fetchProfessors = async () => {
      if (currentUser) {
        try {
          const response = await api.get('/professors');
          if (response.data.message === 'success') {
            const mapped = response.data.data.map((p: any) => ({
              ...p,
              firstName: p.prenom,
              lastName: p.nom,
              phone: p.telephone,
              email: p.email,
              address: p.adresse,
              subjects: p.specialite ? p.specialite.split(', ').map((s: string) => s.trim()) : [],
              totalHoursWorked: 0
            }));
            setProfessors(mapped);
          }
        } catch (error) {
          console.error('Failed to fetch professors:', error);
        }
      }
    };
    fetchProfessors();
  }, [currentUser]);

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

  const [candidateAssignments, setCandidateAssignments] = useState<CandidateAssignment[]>([
    {
      id: 'ca1',
      candidateId: 'c1',
      formationId: 'f1',
      assignmentType: 'inscription',
      duration: 6,
      price: 2500,
      volumeHoraire: 72,
      date: '2026-02-15',
      createdAt: '2026-02-15T09:00:00Z'
    },
    {
      id: 'ca2',
      candidateId: 'c2',
      formationId: 'f2',
      assignmentType: 'inscription',
      duration: 3,
      price: 1500,
      volumeHoraire: 36,
      date: '2026-02-20',
      createdAt: '2026-02-20T14:00:00Z'
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

  // Generate unique candidate code
  const generateCandidateCode = (): string => {
    const num = candidates.length + 1;
    return `CAND${num.toString().padStart(3, '0')}`;
  };

  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data.message === 'success') {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setCurrentUser({
          id: user.id,
          email: user.email,
          name: user.email.split('@')[0], // Fallback name
          role: user.role.toLowerCase() as UserRole
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

  const addCommercial = async (commercial: Omit<Commercial, 'id' | 'createdAt'>) => {
    try {
      const response = await api.post('/commercials', commercial);
      if (response.data.message === 'success') {
        setCommercials([...commercials, response.data.data]);
        return { success: true };
      }
      return { success: false, error: response.data.error || 'Erreur inconnue' };
    } catch (error: any) {
      console.error('Failed to add commercial:', error);
      return { success: false, error: error.response?.data?.error || 'Erreur lors de l\'ajout' };
    }
  };

  const updateCommercial = async (id: string, updates: Partial<Commercial>) => {
    try {
      const response = await api.patch(`/commercials/${id}`, updates);
      if (response.data.message === 'success') {
        setCommercials(commercials.map(c => c.id === id ? response.data.data : c));
        return { success: true };
      }
      return { success: false, error: response.data.error || 'Erreur inconnue' };
    } catch (error: any) {
      console.error('Failed to update commercial:', error);
      return { success: false, error: error.response?.data?.error || 'Erreur lors de la modification' };
    }
  };

  const deleteCommercial = async (id: string) => {
    try {
      const response = await api.delete(`/commercials/${id}`);
      if (response.data.message === 'success') {
        setCommercials(commercials.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete commercial:', error);
    }
  };

  // Prospect functions
  const addProspect = async (prospect: Omit<Prospect, 'id' | 'status' | 'freeSessionsCompleted' | 'absences' | 'createdAt'>) => {
    try {
      const response = await api.post('/prospects', prospect);
      if (response.data.message === 'success') {
        setProspects([response.data.data, ...prospects]);
      }
    } catch (error) {
      console.error('Failed to add prospect:', error);
    }
  };

  const updateProspect = async (id: string, updates: Partial<Prospect>) => {
    try {
      const response = await api.patch(`/prospects/${id}`, updates);
      if (response.data.message === 'success') {
        // Normalize backend Enums (UPPERCASE) to frontend types (lowercase)
        const normalizedData = {
          ...response.data.data,
          occupation: response.data.data.occupation.toLowerCase(),
          observation: response.data.data.observation.toLowerCase()
        };
        setProspects(prospects.map(p => p.id === id ? normalizedData : p));
      }
    } catch (error) {
      console.error('Failed to update prospect:', error);
    }
  };

  const deleteProspect = async (id: string) => {
    try {
      const response = await api.delete(`/prospects/${id}`);
      if (response.data.message === 'success') {
        setProspects(prospects.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete prospect:', error);
    }
  };

  const transformToCandidate = async (prospectId: string, formationId: string): Promise<string | null> => {
    const prospect = prospects.find(p => p.id === prospectId);
    const formation = formations.find(f => f.id === formationId);

    if (!prospect || !formation) {
      return null;
    }

    const remainingSessions = 5 - prospect.freeSessionsCompleted - (prospect.absences || 0);

    if (remainingSessions > 0) {
      return null;
    }

    try {
      const candidateCode = generateCandidateCode();
      const newCandidate: Candidate = {
        id: `c${candidates.length + 1}`,
        candidateCode,
        firstName: prospect.firstName,
        lastName: prospect.lastName,
        age: prospect.age,
        occupation: prospect.occupation.toLowerCase() as 'student' | 'employee',
        giftCode: prospect.giftCode,
        observation: prospect.observation.toLowerCase() as 'alone' | 'accompanied',
        contact: prospect.contact,
        formationId,
        action: prospect.action,
        status: 'active',
        createdAt: new Date().toISOString()
      };

      setCandidates([...candidates, newCandidate]);

      // Delete prospect from backend
      await deleteProspect(prospectId);

      return candidateCode;
    } catch (error) {
      console.error('Transformation failed:', error);
      return null;
    }
  };

  // Candidate functions
  const addCandidate = async (candidate: Omit<Candidate, 'id' | 'candidateCode' | 'status' | 'createdAt'>) => {
    try {
      const response = await api.post('/candidates', candidate);
      if (response.data.message === 'success') {
        const newCandidate = {
          ...response.data.data,
          occupation: response.data.data.occupation?.toLowerCase(),
          observation: response.data.data.observation?.toLowerCase(),
          status: response.data.data.status?.toLowerCase()
        };
        setCandidates(prev => [newCandidate, ...prev]);
      }
    } catch (error) {
      console.error('Failed to add candidate:', error);
      throw error;
    }
  };

  const updateCandidate = async (id: string, updates: Partial<Candidate>) => {
    try {
      const response = await api.patch(`/candidates/${id}`, updates);
      if (response.data.message === 'success') {
        const updated = {
          ...response.data.data,
          occupation: response.data.data.occupation?.toLowerCase(),
          observation: response.data.data.observation?.toLowerCase(),
          status: response.data.data.status?.toLowerCase()
        };
        setCandidates(prev => prev.map(c => c.id === id ? updated : c));
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
  const addInscription = async (inscription: Omit<Inscription, 'id' | 'dateInscription'>) => {
    try {
      const response = await api.post('/inscriptions', inscription);
      if (response.data.message === 'success') {
        const newIns = {
          ...response.data.data,
          statut: response.data.data.status || response.data.data.statut
        };
        setInscriptions(prev => [newIns, ...prev]);

        // Update candidate's formationId in state for UI consistency
        if (newIns.statut && newIns.statut !== 'CANCELLED') {
          setCandidates(prev => prev.map(c =>
            c.id === newIns.candidateId ? { ...c, formationId: newIns.formationId } : c
          ));
        }
      }
    } catch (error) {
      console.error('Failed to add inscription:', error);
    }
  };

  const updateInscriptionStatus = async (id: string, statut: Inscription['statut']) => {
    try {
      const response = await api.patch(`/inscriptions/${id}`, { status: statut });
      if (response.data.message === 'success') {
        const updated = {
          ...response.data.data,
          statut: response.data.data.status || response.data.data.statut
        };
        setInscriptions(prev => prev.map(ins => ins.id === id ? updated : ins));

        // If it was the active one and was cancelled, or if a new one became active, update candidates
        if (updated.statut === 'CANCELLED') {
          setCandidates(prev => prev.map(c =>
            c.id === updated.candidateId ? { ...c, formationId: 'unassigned' } : c
          ));
        } else {
          setCandidates(prev => prev.map(c =>
            c.id === updated.candidateId ? { ...c, formationId: updated.formationId } : c
          ));
        }
      }
    } catch (error) {
      console.error('Failed to update inscription status:', error);
    }
  };

  const updateInscription = async (id: string, updates: Partial<Inscription>) => {
    try {
      const response = await api.patch(`/inscriptions/${id}`, updates);
      if (response.data.message === 'success') {
        const updated = {
          ...response.data.data,
          statut: response.data.data.status || response.data.data.statut
        };
        setInscriptions(prev => prev.map(ins => ins.id === id ? updated : ins));
      }
    } catch (error) {
      console.error('Failed to update inscription:', error);
      throw error;
    }
  };

  const deleteInscription = async (id: string) => {
    try {
      const insToDelete = inscriptions.find(i => i.id === id);
      const response = await api.delete(`/inscriptions/${id}`);
      if (response.data.message === 'success') {
        setInscriptions(prev => prev.filter(ins => ins.id !== id));
        if (insToDelete && (insToDelete.status || insToDelete.statut) !== 'CANCELLED') {
          setCandidates(prev => prev.map(c =>
            c.id === insToDelete.candidateId ? { ...c, formationId: 'unassigned' } : c
          ));
        }
      }
    } catch (error) {
      console.error('Failed to delete inscription:', error);
    }
  };

  // Override addCandidateAssignment to use backend inscriptions
  const addCandidateAssignment = async (assignment: Omit<CandidateAssignment, 'id' | 'createdAt'>) => {
    // If formationId is present, create an inscription
    if (assignment.formationId && assignment.formationId !== 'unassigned') {
      await addInscription({
        candidateId: assignment.candidateId,
        formationId: assignment.formationId,
        statut: 'ACTIVE',
        duration: assignment.duration,
        price: assignment.price,
        volumeHoraire: assignment.volumeHoraire,
        remainingHours: assignment.volumeHoraire,
        note: `Affectation via ${assignment.assignmentType}`,
        learningMode: 'GROUPE'
      });
    }
  };

  const getCandidateAssignments = (candidateId: string): CandidateAssignment[] => {
    return candidateAssignments.filter(ca => ca.candidateId === candidateId);
  };

  // Professor functions
  const addProfessor = async (professor: Omit<Professor, 'id'>) => {
    try {
      const response = await api.post('/professors', {
        prenom: professor.firstName,
        nom: professor.lastName,
        telephone: professor.phone,
        email: professor.email,
        adresse: professor.address,
        specialite: Array.isArray(professor.subjects) ? professor.subjects.join(', ') : professor.subjects,
        type: professor.type,
        dayOff: professor.dayOff,
        maxSessions: professor.maxSessions
      });
      if (response.data.message === 'success') {
        const newProf = response.data.data;
        setProfessors([...professors, {
          ...newProf,
          firstName: newProf.prenom,
          lastName: newProf.nom,
          phone: newProf.telephone,
          email: newProf.email,
          address: newProf.adresse,
          subjects: newProf.specialite ? newProf.specialite.split(', ').map((s: string) => s.trim()) : [],
          totalHoursWorked: 0
        }]);
      }
    } catch (error) {
      console.error('Failed to add professor:', error);
    }
  };

  const updateProfessor = async (id: string, updates: Partial<Professor>) => {
    try {
      const backendUpdates: any = { ...updates };
      if (updates.firstName) backendUpdates.prenom = updates.firstName;
      if (updates.lastName) backendUpdates.nom = updates.lastName;
      if (updates.phone) backendUpdates.telephone = updates.phone;
      if (updates.address) backendUpdates.adresse = updates.address;
      if (updates.subjects) backendUpdates.specialite = Array.isArray(updates.subjects) ? updates.subjects.join(', ') : updates.subjects;

      const response = await api.patch(`/professors/${id}`, backendUpdates);
      if (response.data.message === 'success') {
        const updated = response.data.data;
        setProfessors(professors.map(p => p.id === id ? {
          ...updated,
          firstName: updated.prenom,
          lastName: updated.nom,
          phone: updated.telephone,
          email: updated.email,
          address: updated.adresse,
          subjects: updated.specialite ? updated.specialite.split(', ').map((s: string) => s.trim()) : [],
          totalHoursWorked: 0
        } : p));
      }
    } catch (error) {
      console.error('Failed to update professor:', error);
    }
  };

  const deleteProfessor = async (id: string): Promise<boolean> => {
    const hasScheduledSessions = sessions.some(
      s => s.professorId === id && s.status === 'scheduled'
    );

    if (hasScheduledSessions) {
      return false;
    }

    try {
      const response = await api.delete(`/professors/${id}`);
      if (response.data.message === 'success') {
        setProfessors(professors.filter(p => p.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to delete professor:', error);
      return false;
    }
  };


  // Room functions
  const addRoom = async (room: Omit<Room, 'id'>) => {
    try {
      const response = await api.post('/rooms', {
        numero: room.roomNumber,
        capacite: room.capacity,
        type: room.type,
        available: room.available
      });
      if (response.data.message === 'success') {
        const newRoom = response.data.data;
        setRooms([...rooms, {
          ...newRoom,
          roomNumber: newRoom.numero,
          capacity: newRoom.capacite
        }]);
      }
    } catch (error) {
      console.error('Failed to add room:', error);
    }
  };

  const updateRoom = async (id: string, updates: Partial<Room>) => {
    try {
      const backendUpdates: any = { ...updates };
      if (updates.roomNumber) backendUpdates.numero = updates.roomNumber;
      if (updates.capacity) backendUpdates.capacite = updates.capacity;

      const response = await api.patch(`/rooms/${id}`, backendUpdates);
      if (response.data.message === 'success') {
        const updated = response.data.data;
        setRooms(rooms.map(r => r.id === id ? {
          ...updated,
          roomNumber: updated.numero,
          capacity: updated.capacite
        } : r));
      }
    } catch (error) {
      console.error('Failed to update room:', error);
    }
  };

  const deleteRoom = async (id: string): Promise<boolean> => {
    const hasScheduledSessions = sessions.some(
      s => s.roomId === id && s.status === 'scheduled'
    );

    if (hasScheduledSessions) {
      return false;
    }

    try {
      const response = await api.delete(`/rooms/${id}`);
      if (response.data.message === 'success') {
        setRooms(rooms.filter(r => r.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to delete room:', error);
      return false;
    }
  };

  // Formation functions
  const addFormation = async (formation: Omit<Formation, 'id'>) => {
    try {
      // Map frontend fields (subject) to backend fields (matiere) if needed
      // Actually, looking at Formation interface in AppContext.tsx:
      // subject, level, prix, volumeHoraire, description
      // Wait, let's check the Formation interface again.
      const response = await api.post('/formations', {
        matiere: (formation as any).subject || (formation as any).matiere,
        niveau: formation.level || (formation as any).niveau,
        prix: (formation as any).prix || 0,
        volumeHoraire: (formation as any).volumeHoraire || (formation as any).duration || 0,
        description: (formation as any).description || ''
      });
      if (response.data.message === 'success') {
        const newFormation = response.data.data;
        setFormations([...formations, {
          ...newFormation,
          subject: newFormation.matiere,
          level: newFormation.niveau
        }]);
      }
    } catch (error) {
      console.error('Failed to add formation:', error);
    }
  };

  const updateFormation = async (id: string, updates: Partial<Formation>) => {
    try {
      const backendUpdates: any = { ...updates };
      if (updates.subject) backendUpdates.matiere = updates.subject;
      if (updates.level) backendUpdates.niveau = updates.level;

      const response = await api.patch(`/formations/${id}`, backendUpdates);
      if (response.data.message === 'success') {
        const updated = response.data.data;
        setFormations(formations.map(f => f.id === id ? {
          ...updated,
          subject: updated.matiere,
          level: updated.niveau
        } : f));
      }
    } catch (error) {
      console.error('Failed to update formation:', error);
    }
  };

  const deleteFormation = async (id: string): Promise<boolean> => {
    const hasActiveCandidates = candidates.some(c => c.formationId === id);

    if (hasActiveCandidates) {
      return false;
    }

    try {
      const response = await api.delete(`/formations/${id}`);
      if (response.data.message === 'success') {
        setFormations(formations.filter(f => f.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to delete formation:', error);
      return false;
    }
  };

  const addGroup = async (group: Omit<Group, 'id' | 'createdAt' | 'members' | 'effectif'> & { candidateIds?: string[] }) => {
    try {
      const response = await api.post('/groups', group);
      if (response.data.message === 'success') {
        setGroups([...groups, response.data.data]);
      }
    } catch (error) {
      console.error('Failed to add group:', error);
      throw error;
    }
  };

  const updateGroup = async (id: string, updates: Partial<Group>) => {
    try {
      const response = await api.patch(`/groups/${id}`, updates);
      if (response.data.message === 'success') {
        setGroups(groups.map(g => g.id === id ? response.data.data : g));
      }
    } catch (error) {
      console.error('Failed to update group:', error);
      throw error;
    }
  };

  const deleteGroup = async (id: string) => {
    try {
      const response = await api.delete(`/groups/${id}`);
      if (response.data.message === 'success') {
        setGroups(groups.filter(g => g.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete group:', error);
      throw error;
    }
  };

  const addCandidateToGroup = async (groupId: string, candidateId: string) => {
    try {
      const response = await api.post(`/groups/${groupId}/add-candidate`, { candidateId });
      if (response.data.message === 'success') {
        setGroups(groups.map(g => g.id === groupId ? response.data.data : g));
      }
    } catch (error) {
      console.error('Failed to add candidate to group:', error);
      throw error;
    }
  };

  const removeCandidateFromGroup = async (groupId: string, candidateId: string) => {
    try {
      const response = await api.delete(`/groups/${groupId}/candidate/${candidateId}`);
      if (response.data.message === 'success') {
        setGroups(groups.map(g => g.id === groupId ? response.data.data : g));
      }
    } catch (error) {
      console.error('Failed to remove candidate from group:', error);
      throw error;
    }
  };

  const assignProfessorToGroup = async (groupId: string, professorId: string) => {
    try {
      const response = await api.post(`/groups/${groupId}/assign-professor`, { professorId });
      if (response.data.message === 'success') {
        setGroups(groups.map(g => g.id === groupId ? response.data.data : g));
      }
    } catch (error) {
      console.error("Error assigning professor to group:", error);
      throw error;
    }
  };

  const removeProfessorFromGroup = async (groupId: string) => {
    try {
      const response = await api.delete(`/groups/${groupId}/remove-professor`);
      if (response.data.message === 'success') {
        setGroups(groups.map(g => g.id === groupId ? response.data.data : g));
      }
    } catch (error) {
      console.error("Error removing professor from group:", error);
      throw error;
    }
  };

  // Session functions
  const addSession = (session: Omit<Session, 'id' | 'status'>): boolean => {
    const candidate = candidates.find(c => c.id === session.candidateId);
    const professor = professors.find(p => p.id === session.professorId);
    const room = rooms.find(r => r.id === session.roomId);
    const formation = formations.find(f => f.id === session.formationId);

    // Validations (RG-RES-01 to RG-RES-08)
    if (!candidate || !professor || !room || !formation) {
      return false;
    }

    if (!professor.subjects.includes(formation.subject)) {
      return false;
    }

    // Check for conflicts
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

  const cancelSession = (id: string) => {
    setSessions(sessions.map(s =>
      s.id === id ? { ...s, status: 'cancelled' as const } : s
    ));
  };

  const markAttendance = (id: string, attendance: 'present' | 'absent') => {
    const session = sessions.find(s => s.id === id);

    if (session) {
      // Update professor hours worked
      const professor = professors.find(p => p.id === session.professorId);
      if (professor && attendance === 'present') {
        const hoursToAdd = session.duration / 60; // Convert minutes to hours
        updateProfessor(professor.id, {
          totalHoursWorked: professor.totalHoursWorked + hoursToAdd
        });
      }

      // Mark the session as completed
      setSessions(sessions.map(s =>
        s.id === id ? { ...s, status: 'completed' as const, attendance } : s
      ));

      // Update remaining hours for candidate's inscription
      if (attendance === 'present') {
        const inscription = inscriptions.find(ins =>
          ins.candidateId === session.candidateId &&
          ins.formationId === session.formationId &&
          ins.statut === 'ACTIVE'
        );
        if (inscription) {
          const hoursToDeduct = session.duration / 60;
          api.post(`/inscriptions/${inscription.id}/deduct-hours`, { hours: hoursToDeduct })
            .then(response => {
              if (response.data.message === 'success') {
                setInscriptions(prev => prev.map(ins =>
                  ins.id === inscription.id ? response.data.data : ins
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
        const formation = formations.find(f => f.id === candidate.formationId);
        if (formation) {
          addSession({
            candidateId: request.candidateId,
            professorId: request.professorId,
            roomId: request.roomId,
            formationId: candidate.formationId,
            date: request.date,
            time: request.time,
            duration: formation.duration
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

  // Payment functions
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 'pay1',
      reference: 'PAY-2026-001',
      candidateId: 'c1',
      formationId: 'f1',
      amount: 2500,
      paymentDate: '2026-04-15',
      paymentMethod: 'bank_transfer',
      status: 'validated',
      invoiceGenerated: true,
      invoiceNumber: 'INV-2026-001',
      isMonthlyPayment: false,
      createdAt: '2026-04-15T10:00:00Z'
    },
    {
      id: 'pay2',
      reference: 'PAY-2026-002',
      candidateId: 'c2',
      formationId: 'f2',
      amount: 1800,
      paymentDate: '2026-05-01',
      paymentMethod: 'check',
      status: 'pending',
      invoiceGenerated: false,
      checkDetails: {
        type: 'bank_check',
        dueDate: '2026-05-20',
        checkStatus: 'pending'
      },
      isMonthlyPayment: true,
      monthlySchedule: {
        totalMonths: 3,
        currentMonth: 1,
        nextDueDate: '2026-06-01'
      },
      createdAt: '2026-05-01T09:00:00Z'
    }
  ]);

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

  const generateInvoiceNumber = (year: number): string => {
    const yearInvoices = invoices.filter(inv => inv.year === year);
    const nextNumber = yearInvoices.length + 1;
    return `INV-${year}-${String(nextNumber).padStart(3, '0')}`;
  };

  const addPayment = (payment: Omit<Payment, 'id' | 'reference' | 'createdAt'>) => {
    const newPayment: Payment = {
      ...payment,
      id: `pay${payments.length + 1}`,
      reference: `PAY-${new Date().getFullYear()}-${String(payments.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString()
    };
    setPayments([...payments, newPayment]);
  };

  const updatePayment = (id: string, updates: Partial<Payment>) => {
    setPayments(payments.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const generateInvoice = (paymentId: string): string | null => {
    const payment = payments.find(p => p.id === paymentId);
    if (!payment || payment.invoiceGenerated) {
      return null;
    }

    const year = new Date().getFullYear();
    const invoiceNumber = generateInvoiceNumber(year);

    const newInvoice: Invoice = {
      id: `inv${invoices.length + 1}`,
      invoiceNumber,
      paymentId,
      candidateId: payment.candidateId,
      amount: payment.amount,
      generatedDate: new Date().toISOString(),
      year
    };

    setInvoices([...invoices, newInvoice]);
    updatePayment(paymentId, { invoiceGenerated: true, invoiceNumber });

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
    candidateAssignments,
    addCandidateAssignment,
    getCandidateAssignments,
    inscriptions,
    addInscription,
    updateInscriptionStatus,
    updateInscription,
    deleteInscription,
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
    groups,
    addGroup,
    updateGroup,
    deleteGroup,
    addCandidateToGroup,
    removeCandidateFromGroup,
    assignProfessorToGroup,
    removeProfessorFromGroup,
    sessions,
    addSession,
    cancelSession,
    markAttendance,
    reservationRequests,
    addReservationRequest,
    updateReservationRequest,
    payments,
    addPayment,
    updatePayment,
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
