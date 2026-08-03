async function test() {
    try {
        console.log('🏁 Starting test of dynamic permission enforcement and role update API...');

        // 1. Login as Receptionist
        const recepLoginRes = await fetch('http://127.0.0.1:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'reception@formation.com', password: 'demo' })
        });
        const recepLoginData = await recepLoginRes.json();
        if (recepLoginRes.status !== 200) {
            throw new Error(`Receptionist login failed: status ${recepLoginRes.status}`);
        }
        const recepToken = recepLoginData.token;
        console.log('✅ Receptionist authenticated successfully.');

        // 2. Fetch payments as Receptionist (expected: 403 Forbidden)
        const payRes1 = await fetch('http://127.0.0.1:5000/payments', {
            headers: { 'Authorization': `Bearer ${recepToken}` }
        });
        const payData1 = await payRes1.json();
        console.log(`📡 Receptionist accessing /payments before permissions update: status = ${payRes1.status}`);
        if (payRes1.status !== 403) {
            throw new Error(`Expected 403 accessing /payments initially, but got ${payRes1.status}`);
        }
        console.log(`   └─ Error message: "${payData1.error}"`);

        // 3. Login as Admin
        const adminLoginRes = await fetch('http://127.0.0.1:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@formation.com', password: 'demo' })
        });
        const adminLoginData = await adminLoginRes.json();
        if (adminLoginRes.status !== 200) {
            throw new Error(`Admin login failed: status ${adminLoginRes.status}`);
        }
        const adminToken = adminLoginData.token;
        console.log('✅ Admin authenticated successfully.');

        // 4. Update Receptionist role permissions to allow 'view_payments'
        const patchRes = await fetch('http://127.0.0.1:5000/roles/agent_reception', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                permissions: ['view_prospects', 'manage_prospects', 'view_payments', 'manage_payments'],
                description: 'Gestion des prospects et consultation paiements',
                displayName: 'Agent de réception'
            })
        });
        const patchData = await patchRes.json();
        if (patchRes.status !== 200) {
            throw new Error(`API patch to role permissions failed: status ${patchRes.status}, error ${patchData.error}`);
        }
        console.log('✅ Admin successfully patched agent_reception permissions to add view_payments!');

        // 5. Fetch payments as Receptionist again (expected: 200 OK)
        const payRes2 = await fetch('http://127.0.0.1:5000/payments', {
            headers: { 'Authorization': `Bearer ${recepToken}` }
        });
        console.log(`📡 Receptionist accessing /payments after permissions update: status = ${payRes2.status}`);
        if (payRes2.status !== 200) {
            const errBody = await payRes2.json();
            throw new Error(`Expected 200 accessing /payments after update, but got ${payRes2.status}, error: ${JSON.stringify(errBody)}`);
        }
        console.log('✅ Receptionist successfully accessed /payments after permission granted!');

        // 6. Clean up: Revert receptionist role permissions back to default
        const cleanRes = await fetch('http://127.0.0.1:5000/roles/agent_reception', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                permissions: ['view_prospects', 'manage_prospects'],
                description: 'Gestion des prospects uniquement',
                displayName: 'Agent de réception'
            })
        });
        if (cleanRes.status !== 200) {
            throw new Error(`Clean up revert failed: status ${cleanRes.status}`);
        }
        console.log('✅ Admin successfully reverted agent_reception permissions back to default.');

        // 7. Verify receptionist blocked again (expected: 403 Forbidden)
        const payRes3 = await fetch('http://localhost:5000/payments', {
            headers: { 'Authorization': `Bearer ${recepToken}` }
        });
        console.log(`📡 Receptionist accessing /payments after revert: status = ${payRes3.status}`);
        if (payRes3.status !== 403) {
            throw new Error(`Expected 403 accessing /payments after reversion, but got ${payRes3.status}`);
        }
        console.log('🎉 Dynamic permissions integration test passed successfully!');
    } catch (e) {
        console.error('❌ Verification failed:', e.message);
        process.exit(1);
    }
}

test();
