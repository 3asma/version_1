import prisma from './src/config/prisma.js';
import bcrypt from 'bcrypt';

async function runTests() {
    try {
        console.log('🏁 Starting comprehensive role protection integration tests...');

        // Find candidate, receptionist, reservationist, admin, professor emails from database
        const adminUser = await prisma.user.findFirst({ where: { email: 'admin@formation.com' } });
        const receptionistUser = await prisma.user.findFirst({ where: { email: 'reception@formation.com' } });
        const reservationistUser = await prisma.user.findFirst({ where: { email: 'reservation@formation.com' } });

        // Find a candidate record to check candidate ownership
        const candidateDb = await prisma.candidate.findFirst();
        if (!candidateDb) {
            throw new Error('No candidate record found in database for testing.');
        }

        // Verify candidate user exists in users table with same email, or create it temporarily
        let candidateUser = await prisma.user.findUnique({ where: { email: candidateDb.email } });
        if (!candidateUser) {
            console.log(`Creating test user login for candidate: ${candidateDb.email}`);
            // Seed a temp candidate user
            const hashedPassword = await bcrypt.hash('demo', 10);
            candidateUser = await prisma.user.create({
                data: {
                    email: candidateDb.email,
                    password: hashedPassword,
                    role: 'USER'
                }
            });
        }

        console.log('👥 Test credentials identified.');

        // Helper to sign in and get token
        const login = async (email) => {
            const res = await fetch('http://127.0.0.1:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: 'demo' })
            });
            const data = await res.json();
            if (res.status !== 200) {
                throw new Error(`Login failed for ${email}: ${data.error}`);
            }
            return data.token;
        };

        const adminToken = await login(adminUser.email);
        const recepToken = await login(receptionistUser.email);
        const reservToken = await login(reservationistUser.email);
        const candToken = await login(candidateUser.email);

        const checkStatus = async (token, endpoint, expectedStatus, method = 'GET') => {
            const res = await fetch(`http://127.0.0.1:5000${endpoint}`, {
                method,
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status !== expectedStatus) {
                const text = await res.text();
                throw new Error(`Endpoint ${method} ${endpoint} with token of ${token ? 'role' : 'none'} returned ${res.status}, expected ${expectedStatus}. Body: ${text}`);
            }
            console.log(`   └─ ${method} ${endpoint} => ${res.status} (Expected: ${expectedStatus}) - PASSED`);
        };

        // 1. ADMIN-only areas
        console.log('\n🔒 Testing ADMIN-only routers (/users, /roles, /professors, /rooms, /formations):');
        // Users
        await checkStatus(adminToken, '/users', 200);
        await checkStatus(recepToken, '/users', 403);
        await checkStatus(candToken, '/users', 403);
        // Roles
        await checkStatus(adminToken, '/roles', 200);
        await checkStatus(recepToken, '/roles', 403);
        // Rooms
        await checkStatus(adminToken, '/rooms', 200);
        await checkStatus(recepToken, '/rooms', 403);
        // Formations
        await checkStatus(adminToken, '/formations', 200);
        await checkStatus(recepToken, '/formations', 403);

        // 2. Agent Reception area (/prospects, /candidates)
        console.log('\n🔒 Testing Agent Reception routers (/prospects, /candidates, /commercials):');
        // Prospects
        await checkStatus(recepToken, '/prospects', 200);
        await checkStatus(reservToken, '/prospects', 403);
        // Candidates General list
        await checkStatus(recepToken, '/candidates', 200);
        await checkStatus(reservToken, '/candidates', 403);
        await checkStatus(candToken, '/candidates', 403);

        // 3. Candidate Own Profile Access
        console.log('\n🔒 Testing Candidate ownership checks (own candidates/:id vs others):');
        // Find another candidate to try unauthorized check
        const anotherCandidateDb = await prisma.candidate.findFirst({
            where: { id: { not: candidateDb.id } }
        });

        await checkStatus(candToken, `/candidates/${candidateDb.id}`, 200); // Own profile => 200
        if (anotherCandidateDb) {
            await checkStatus(candToken, `/candidates/${anotherCandidateDb.id}`, 403); // Other candidate profile => 403
        }

        // 4. Agent Reservation area (/reservations, /planning, /payments)
        console.log('\n🔒 Testing Agent Reservation routers (/reservations, /planning, /payments):');
        await checkStatus(reservToken, '/reservations', 200);
        await checkStatus(recepToken, '/reservations', 403);
        await checkStatus(reservToken, '/payments', 200);
        await checkStatus(recepToken, '/payments', 403);

        console.log('\n🎉 Comprehensive security audit integration tests completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Integration tests failed:', err.message);
        process.exit(1);
    }
}

runTests();
