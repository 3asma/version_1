import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const API_URL = 'http://localhost:5000';

async function cleanUp() {
    console.log('--- Cleaning up database ---');
    try {
        // Find test candidate & formation
        const candidate = await prisma.candidate.findFirst({
            where: { candidateCode: { in: ['CAND_TEST_INS_A', 'CAND_TEST_INS_B'] } }
        });
        const formation = await prisma.formation.findFirst({
            where: { matiere: 'Matiere_INS_TEST' }
        });

        if (candidate) {
            await prisma.inscription.deleteMany({ where: { candidateId: candidate.id } });
            await prisma.groupCandidate.deleteMany({ where: { candidateId: candidate.id } });
        }
        if (formation) {
            await prisma.groupCandidate.deleteMany({ where: { group: { formationId: formation.id } } });
            await prisma.group.deleteMany({ where: { formationId: formation.id } });
            await prisma.inscription.deleteMany({ where: { formationId: formation.id } });
            await prisma.formation.delete({ where: { id: formation.id } });
        }

        await prisma.candidate.deleteMany({
            where: { candidateCode: { in: ['CAND_TEST_INS_A', 'CAND_TEST_INS_B'] } }
        });
        await prisma.user.deleteMany({ where: { email: 'admin_ins_test@formation.com' } });
    } catch (e) {
        console.log('Cleanup warning:', e.message);
    }
}

async function setupTestData() {
    await cleanUp();

    console.log('--- Seeding test user, candidate, and formation ---');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const testUser = await prisma.user.create({
        data: {
            email: 'admin_ins_test@formation.com',
            password: hashedPassword,
            role: 'ADMIN'
        }
    });

    const formation = await prisma.formation.create({
        data: {
            matiere: 'Matiere_INS_TEST',
            niveau: 'Intermediate',
            type: 'group',
            duration: 60,
            totalSessions: 12,
            prix: 150,
            volumeHoraire: 36
        }
    });

    const candA = await prisma.candidate.create({
        data: {
            candidateCode: 'CAND_TEST_INS_A',
            firstName: 'Alice',
            lastName: 'Inscription',
            age: 25,
            occupation: 'STUDENT',
            observation: 'ALONE',
            contact: ['email:alice.ins@test.com'],
            status: 'ACTIVE'
        }
    });

    const candB = await prisma.candidate.create({
        data: {
            candidateCode: 'CAND_TEST_INS_B',
            firstName: 'Bob',
            lastName: 'Inscription',
            age: 26,
            occupation: 'EMPLOYEE',
            observation: 'ALONE',
            contact: ['email:bob.ins@test.com'],
            status: 'ACTIVE'
        }
    });

    return { testUser, formation, candA, candB };
}

async function testAll() {
    const data = await setupTestData();
    let token = '';

    console.log('\n--- 1. Authenticating admin ---');
    try {
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin_ins_test@formation.com',
            password: 'password123'
        });
        token = loginRes.data.token;
        console.log('Authentication success.');
    } catch (e) {
        console.error('Auth failed:', e.response?.data || e.message);
        process.exit(1);
    }

    const headers = { headers: { Authorization: `Bearer ${token}` } };

    console.log('\n--- 2. Verifying JWT protection ---');
    try {
        await axios.get(`${API_URL}/inscriptions`);
        console.error('FAIL: Endpoint worked without token!');
        process.exit(1);
    } catch (e) {
        if (e.response?.status === 401 || e.response?.status === 403) {
            console.log('PASS: JWT protection verified successfully.');
        } else {
            console.error('FAIL: Unexpected status code:', e.response?.status);
            process.exit(1);
        }
    }

    console.log('\n--- 3. Registering BINOME Inscription ---');
    try {
        const res = await axios.post(`${API_URL}/inscriptions`, {
            candidateId: data.candA.id,
            formationId: data.formation.id,
            learningMode: 'BINOME',
            volumeHoraire: 36
        }, headers);

        const ins = res.data.data;
        if (ins.status === 'WAITING' && ins.groupId === null && ins.learningMode === 'BINOME') {
            console.log('PASS: BINOME inscription created. Status: WAITING, groupId: null.');
        } else {
            console.error('FAIL: Incorrect default properties for BINOME:', ins);
            process.exit(1);
        }
    } catch (e) {
        console.error('FAIL: Creating BINOME inscription failed:', e.response?.data || e.message);
        process.exit(1);
    }

    console.log('\n--- 4. Registering Duplicate active Inscription to block ---');
    try {
        await axios.post(`${API_URL}/inscriptions`, {
            candidateId: data.candA.id,
            formationId: data.formation.id,
            learningMode: 'GROUPE',
            volumeHoraire: 36
        }, headers);
        console.error('FAIL: Allowed duplicate active Inscription!');
        process.exit(1);
    } catch (e) {
        if (e.response?.status === 409 || e.response?.data?.error === 'DUPLICATE_ACTIVE_INSCRIPTION') {
            console.log('PASS: Blocked duplicate active inscription correctly.');
        } else {
            console.error('FAIL: Unexpected response for duplicate block:', e.response?.data);
            process.exit(1);
        }
    }

    console.log('\n--- 5. Registering MONOME Inscription ---');
    try {
        const res = await axios.post(`${API_URL}/inscriptions`, {
            candidateId: data.candB.id,
            formationId: data.formation.id,
            learningMode: 'MONOME',
            volumeHoraire: 36
        }, headers);

        const ins = res.data.data;
        if (ins.status === 'ASSIGNED' && ins.groupId !== null && ins.learningMode === 'MONOME') {
            console.log(`PASS: MONOME inscription created. Status: ASSIGNED, groupId: ${ins.groupId}.`);

            // Verify the group exists and has 1 member
            const grp = await prisma.group.findUnique({
                where: { id: ins.groupId },
                include: { members: true }
            });
            if (grp && grp.type === 'MONOME' && grp.effectif === 1 && grp.members.length === 1) {
                console.log(`PASS: Associated Group "${grp.nom}" exists with type MONOME and effectif 1.`);
            } else {
                console.error('FAIL: Group attributes are incorrect:', grp);
                process.exit(1);
            }
        } else {
            console.error('FAIL: Incorrect properties for MONOME auto-grouping:', ins);
            process.exit(1);
        }
    } catch (e) {
        console.error('FAIL: Creating MONOME inscription failed:', e.response?.data || e.message);
        process.exit(1);
    }

    await cleanUp();
    console.log('\nAll integration tests passed successfully!');
}

testAll()
    .catch(e => {
        console.error('Test execution failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
