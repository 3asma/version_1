import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const API_URL = 'http://localhost:5000';

async function cleanUpAll() {
    console.log('--- Cleaning up database ---');
    try {
        const testProf = await prisma.professor.findUnique({ where: { email: 'dupont_test@formation.com' } });
        if (testProf) {
            await prisma.groupCandidate.deleteMany({
                where: { group: { professorId: testProf.id } }
            });
            await prisma.group.deleteMany({
                where: { professorId: testProf.id }
            });
        }
    } catch (e) {
        console.log('Warn: Clean up professor groups failed:', e.message);
    }

    try {
        const testForm = await prisma.formation.findFirst({ where: { matiere: 'Maths_TEST' } });
        if (testForm) {
            await prisma.groupCandidate.deleteMany({
                where: { group: { formationId: testForm.id } }
            });
            await prisma.inscription.deleteMany({
                where: { formationId: testForm.id }
            });
            await prisma.group.deleteMany({
                where: { formationId: testForm.id }
            });
        }
    } catch (e) {
        console.log('Warn: Clean up formation references failed:', e.message);
    }

    try {
        await prisma.groupCandidate.deleteMany({
            where: {
                OR: [
                    { candidate: { candidateCode: { in: ['CAND_A_TEST', 'CAND_B_TEST', 'CAND_C_TEST'] } } },
                    { group: { nom: { in: ['Test Monome', 'Test Binome', 'Test Group'] } } }
                ]
            }
        });
    } catch (e) { }

    try {
        await prisma.inscription.deleteMany({
            where: {
                candidate: { candidateCode: { in: ['CAND_A_TEST', 'CAND_B_TEST', 'CAND_C_TEST'] } }
            }
        });
    } catch (e) { }

    try {
        await prisma.group.deleteMany({
            where: { nom: { in: ['Test Monome', 'Test Binome', 'Test Group'] } }
        });
    } catch (e) { }

    try {
        await prisma.candidate.deleteMany({
            where: { candidateCode: { in: ['CAND_A_TEST', 'CAND_B_TEST', 'CAND_C_TEST'] } }
        });
    } catch (e) { }

    try {
        await prisma.professor.deleteMany({
            where: { email: 'dupont_test@formation.com' }
        });
    } catch (e) { }

    try {
        await prisma.formation.deleteMany({
            where: { matiere: 'Maths_TEST' }
        });
    } catch (e) { }

    try {
        await prisma.user.deleteMany({
            where: { email: 'test_admin@grouprefactor.com' }
        });
    } catch (e) { }
}

async function setupTestData() {
    console.log('--- Setting up test data via Prisma ---');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    await cleanUpAll();

    const testUser = await prisma.user.create({
        data: {
            email: 'test_admin@grouprefactor.com',
            password: hashedPassword,
            role: 'ADMIN' // Uppercase enum
        }
    });

    // Create Formation
    const formation = await prisma.formation.create({
        data: {
            matiere: 'Maths_TEST', // Changed from subject to matiere
            niveau: 'Highschool',  // Changed from level to niveau
            type: 'group',
            duration: 60,
            totalSessions: 10,
            prix: 100,             // Required or default Decimal
            volumeHoraire: 30
        }
    });

    // Create Professor
    const professor = await prisma.professor.create({
        data: {
            nom: 'Dupont',
            prenom: 'Jean',
            email: 'dupont_test@formation.com',
            telephone: '0102030405',
            adresse: '12 rue de Paris', // Changed from address to adresse
            specialite: 'Maths_TEST',
            type: 'permanent',
            dayOff: 'Sunday',
            maxSessions: 20
        }
    });

    // Create Candidates
    const candA = await prisma.candidate.create({
        data: {
            candidateCode: 'CAND_A_TEST',
            firstName: 'Alice',
            lastName: 'A',
            age: 20,
            occupation: 'STUDENT',    // Uppercase Occupation enum
            observation: 'ALONE',      // Uppercase Observation enum
            contact: ['email:alice@test.com'],
            status: 'ACTIVE'           // Uppercase CandidateStatus enum
        }
    });

    const candB = await prisma.candidate.create({
        data: {
            candidateCode: 'CAND_B_TEST',
            firstName: 'Bob',
            lastName: 'B',
            age: 21,
            occupation: 'EMPLOYEE',   // Uppercase Occupation enum
            observation: 'ALONE',      // Uppercase Observation enum
            contact: ['email:bob@test.com'],
            status: 'ACTIVE'           // Uppercase CandidateStatus enum
        }
    });

    const candC = await prisma.candidate.create({
        data: {
            candidateCode: 'CAND_C_TEST',
            firstName: 'Charlie',
            lastName: 'C',
            age: 22,
            occupation: 'STUDENT',    // Uppercase Occupation enum
            observation: 'ACCOMPANIED',// Uppercase Observation enum
            contact: ['email:charlie@test.com'],
            status: 'ACTIVE'           // Uppercase CandidateStatus enum
        }
    });

    // Inscriptions: Candidate A and B are enrolled in the Math formation. Candidate C is NOT.
    const insA = await prisma.inscription.create({
        data: {
            candidateId: candA.id,
            formationId: formation.id,
            status: 'ACTIVE',
            volumeHoraire: 30,
            remainingHours: 30
        }
    });

    const insB = await prisma.inscription.create({
        data: {
            candidateId: candB.id,
            formationId: formation.id,
            status: 'ACTIVE',
            volumeHoraire: 30,
            remainingHours: 30
        }
    });

    return {
        testUser,
        formation,
        professor,
        candidates: { candA, candB, candC },
        inscriptions: { insA, insB }
    };
}

async function verifyAllRules() {
    const data = await setupTestData();
    console.log('Test data initialized successfully.');

    let token = '';

    // 1. Get JWT Token
    console.log('\n--- 1. Authenticating test admin ---');
    try {
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'test_admin@grouprefactor.com',
            password: 'password123'
        });
        token = loginRes.data.token;
        console.log('Login success: Token received.');
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        process.exit(1);
    }

    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

    // 2. Verify JWT Protection
    console.log('\n--- 2. Verifying JWT Protection ---');
    try {
        await axios.get(`${API_URL}/groups`);
        console.error('FAIL: Allowed request without Authorization header!');
        process.exit(1);
    } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.log('PASS: HTTP GET /groups rejected with 401/403 (unauthenticated) as expected.');
        } else {
            console.error('FAIL: Unexpected error:', error.message);
            process.exit(1);
        }
    }

    // 3. Create MONOME
    console.log('\n--- 3. Creating MONOME ---');
    let monomeId = '';
    try {
        const res = await axios.post(`${API_URL}/groups`, {
            nom: 'Test Monome',
            type: 'MONOME',
            formationId: data.formation.id,
            candidateIds: [data.candidates.candA.id]
        }, authHeaders);
        monomeId = res.data.data.id;
        console.log(`PASS: Created MONOME with 1 candidate. Res nom: ${res.data.data.nom}, id: ${monomeId}`);
    } catch (error) {
        console.error('FAIL: Could not create MONOME:', error.response?.data || error.message);
        process.exit(1);
    }

    // 4. Enforce MONOME Candidate Limits
    console.log('\n--- 4. Enforcing MONOME Candidate Limits ---');
    try {
        await axios.post(`${API_URL}/groups/${monomeId}/add-candidate`, {
            candidateId: data.candidates.candB.id
        }, authHeaders);
        console.error('FAIL: Added a second candidate to MONOME!');
        process.exit(1);
    } catch (error) {
        if (error.response?.data?.error === 'MONOME_LIMIT_EXCEEDED') {
            console.log('PASS: Adding second candidate to MONOME was blocked with MONOME_LIMIT_EXCEEDED.');
        } else {
            console.error('FAIL: Unexpected error response:', error.response?.data || error.message);
            process.exit(1);
        }
    }

    // 5. Verify Inscription Requirement (Candidate C has no active Inscription)
    console.log('\n--- 5. Verifying Inscription Requirement ---');
    let groupeId = '';
    try {
        const res = await axios.post(`${API_URL}/groups`, {
            nom: 'Test Group',
            type: 'GROUPE',
            formationId: data.formation.id
        }, authHeaders);
        groupeId = res.data.data.id;
    } catch (error) {
        console.error('Failed to create test group:', error.message);
        process.exit(1);
    }

    try {
        await axios.post(`${API_URL}/groups/${groupeId}/add-candidate`, {
            candidateId: data.candidates.candC.id
        }, authHeaders);
        console.error('FAIL: Added Candidate C (no inscription) to group!');
        process.exit(1);
    } catch (error) {
        if (error.response?.data?.error === 'CANDIDATE_NO_ACTIVE_INSCRIPTION') {
            console.log('PASS: Blocked Candidate C due to no active inscription.');
        } else {
            console.error('FAIL: Unexpected error response:', error.response?.data || error.message);
            process.exit(1);
        }
    }

    // 6. Create BINOME
    console.log('\n--- 6. Creating BINOME ---');
    let binomeId = '';
    try {
        const res = await axios.post(`${API_URL}/groups`, {
            nom: 'Test Binome',
            type: 'BINOME',
            formationId: data.formation.id,
            candidateIds: [data.candidates.candA.id, data.candidates.candB.id]
        }, authHeaders);
        binomeId = res.data.data.id;
        console.log(`PASS: Created BINOME with 2 candidates. Effectif: ${res.data.data.effectif}`);
    } catch (error) {
        console.error('FAIL: Could not create BINOME:', error.response?.data || error.message);
        process.exit(1);
    }

    console.log('Enrolling Candidate C to Formation...');
    const insC = await prisma.inscription.create({
        data: {
            candidateId: data.candidates.candC.id,
            formationId: data.formation.id,
            status: 'ACTIVE',
            volumeHoraire: 30,
            remainingHours: 35
        }
    });

    try {
        await axios.post(`${API_URL}/groups/${binomeId}/add-candidate`, {
            candidateId: data.candidates.candC.id
        }, authHeaders);
        console.error('FAIL: Added a third candidate to BINOME!');
        process.exit(1);
    } catch (error) {
        if (error.response?.data?.error === 'BINOME_LIMIT_EXCEEDED') {
            console.log('PASS: Correctly blocked third candidate in BINOME.');
        } else {
            console.error('FAIL: Unexpected error response:', error.response?.data || error.message);
            process.exit(1);
        }
    }

    // 7. Verify Duplicate Membership prevention
    console.log('\n--- 7. Verifying Duplicate Membership ---');
    try {
        await axios.post(`${API_URL}/groups/${groupeId}/add-candidate`, {
            candidateId: data.candidates.candA.id
        }, authHeaders);
        // Add again
        await axios.post(`${API_URL}/groups/${groupeId}/add-candidate`, {
            candidateId: data.candidates.candA.id
        }, authHeaders);
        console.error('FAIL: Allowed duplicate membership!');
        process.exit(1);
    } catch (error) {
        if (error.response?.data?.error === 'CANDIDATE_ALREADY_IN_GROUP') {
            console.log('PASS: Prevented duplicate candidate membership.');
        } else {
            console.error('FAIL: Unexpected error response:', error.response?.data || error.message);
            process.exit(1);
        }
    }

    // 8. Assign Professor
    console.log('\n--- 8. Assigning Professor ---');
    try {
        const res = await axios.post(`${API_URL}/groups/${groupeId}/assign-professor`, {
            professorId: data.professor.id
        }, authHeaders);
        if (res.data.data.professorId === data.professor.id) {
            console.log('PASS: Assigned professor directly to Group.');
        } else {
            console.error('FAIL: Professor ID did not match.');
            process.exit(1);
        }
    } catch (error) {
        console.error('FAIL: Could not assign professor:', error.response?.data || error.message);
        process.exit(1);
    }

    // 9. Remove Professor
    console.log('\n--- 9. Removing Professor ---');
    try {
        const res = await axios.delete(`${API_URL}/groups/${groupeId}/remove-professor`, authHeaders);
        if (res.data.data.professorId === null) {
            console.log('PASS: Removed professor directly from Group.');
        } else {
            console.error('FAIL: Professor ID was not set to null.');
            process.exit(1);
        }
    } catch (error) {
        console.error('FAIL: Could not remove professor:', error.response?.data || error.message);
        process.exit(1);
    }

    // 10. Automatically update effectif check (should be 1 after candidate A is added to Groupe)
    console.log('\n--- 10. Checking automatically updated effectif ---');
    try {
        const getRes = await axios.get(`${API_URL}/groups/${groupeId}`, authHeaders);
        if (getRes.data.data.effectif === 1) {
            console.log(`PASS: Effectif is correct (${getRes.data.data.effectif}).`);
        } else {
            console.error(`FAIL: Effectif is incorrect (${getRes.data.data.effectif}). Expected 1.`);
            process.exit(1);
        }
    } catch (error) {
        console.error('FAIL: Could not get group:', error.response?.data || error.message);
        process.exit(1);
    }

    await cleanUpAll();
    console.log('Database cleaned. Integration tests passed perfectly!');
}

verifyAllRules()
    .catch(err => {
        console.error('Verification failed with uncaught exception:', err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
