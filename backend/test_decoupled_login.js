async function test() {
    try {
        console.log('🏁 Starting test of decoupled role resolution via Auth API...');

        const testAccounts = [
            { email: 'admin@formation.com', expectedRole: 'admin' },
            { email: 'reception@formation.com', expectedRole: 'agent_reception' },
            { email: 'reservation@formation.com', expectedRole: 'agent_reservation' },
            { email: 'prof@formation.com', expectedRole: 'professor' },
            { email: 'candidat@formation.com', expectedRole: 'candidate' }
        ];

        for (const account of testAccounts) {
            const loginRes = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: account.email, password: 'demo' })
            });
            const loginData = await loginRes.json();
            if (loginRes.status !== 200) {
                throw new Error(`Login failed for ${account.email}: status ${loginRes.status}`);
            }

            const { token, user } = loginData;
            console.log(`📡 Login successful for: ${user.email}`);
            console.log(`   └─ Returned Role: "${user.role}" (Expected: "${account.expectedRole}")`);
            console.log(`   └─ Returned Name: "${user.name}"`);

            if (user.role !== account.expectedRole) {
                throw new Error(`Role mismatch for ${account.email}: expected ${account.expectedRole}, got ${user.role}`);
            }

            // Verify auth/me endpoint
            const meRes = await fetch('http://localhost:5000/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const meData = await meRes.json();
            if (meRes.status !== 200) {
                throw new Error(`GET /auth/me failed for ${account.email}: status ${meRes.status}`);
            }
            console.log(`   └─ GET /auth/me Role: "${meData.user.role}"`);
            if (meData.user.role !== account.expectedRole) {
                throw new Error(`Auth/me role mismatch for ${account.email}`);
            }
        }

        console.log('🎉 Decoupled Role login verification passed successfully!');
    } catch (e) {
        console.error('❌ Verification failed:', e.message);
        process.exit(1);
    }
}

test();
