async function testPaymentSearch() {
    console.log('--- STARTING PAYMENT SEARCH VERIFICATION ---');
    try {
        // 1. LOGIN
        const loginRes = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@formation.com', password: 'demo' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        if (!token) {
            console.error('Authentication failed, no token received');
            process.exit(1);
        }
        console.log('Authenticated successfully!');

        const authHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        // 2. GET ALL PAYMENTS
        console.log('Fetching all payments (GET /payments)...');
        const allRes = await fetch('http://localhost:5000/payments', { headers: authHeaders });
        if (allRes.status !== 200) {
            console.error('Failed to fetch all payments:', allRes.status);
            process.exit(1);
        }
        const allData = await allRes.json();
        const payments = allData.data;
        console.log(`Fetched ${payments.length} payments.`);

        if (payments.length === 0) {
            console.log('No payments exist in the database. Please make sure there is seed data.');
            process.exit(1);
        }

        // Check if returned data maintains relations schema
        const samplePayment = payments[0];
        console.log('Sample payment properties check:');
        console.log('- candidate present:', !!samplePayment.candidate);
        console.log('- formation present:', !!samplePayment.formation);

        // 3. FILTER BY EXISTING CANDIDATE ID
        const targetCandidateId = samplePayment.candidateId;
        console.log(`Filtering by candidateId: ${targetCandidateId} (GET /payments?candidateId=${targetCandidateId})...`);
        const filterRes = await fetch(`http://localhost:5000/payments?candidateId=${targetCandidateId}`, { headers: authHeaders });
        if (filterRes.status !== 200) {
            console.error('Failed to filter payments:', filterRes.status);
            process.exit(1);
        }
        const filterData = await filterRes.json();
        const filteredPayments = filterData.data;
        console.log(`Fetched ${filteredPayments.length} payments for candidate.`);

        // Validate that all returned payments belong to the target candidate
        const incorrectPayment = filteredPayments.find(p => p.candidateId !== targetCandidateId);
        if (incorrectPayment) {
            console.error('VERIFICATION FAILED: Candidate ID filter returned mismatching payment:', incorrectPayment);
            process.exit(1);
        }
        console.log('Candidate filter successfully returned only matching payments!');

        // 4. FILTER BY NON-EXISTENT CANDIDATE ID
        const fakeCandidateId = '00000000-0000-0000-0000-000000000000';
        console.log(`Filtering by unknown candidateId (GET /payments?candidateId=${fakeCandidateId})...`);
        const fakeRes = await fetch(`http://localhost:5000/payments?candidateId=${fakeCandidateId}`, { headers: authHeaders });
        if (fakeRes.status !== 200) {
            console.error(`Expected 200 status for unknown candidateId, but got: ${fakeRes.status}`);
            process.exit(1);
        }
        const fakeData = await fakeRes.json();
        const fakePayments = fakeData.data;
        console.log(`Fetched ${fakePayments.length} payments for unknown candidate.`);
        if (!Array.isArray(fakePayments) || fakePayments.length !== 0) {
            console.error('VERIFICATION FAILED: Unknown candidate ID must return an empty array []');
            process.exit(1);
        }
        console.log('Unknown candidate filter successfully returned empty array []!');

        console.log('--- ALL PAYMENT SEARCH TESTS PASSED V1 ---');
    } catch (error) {
        console.error('Error during payment search verification:', error);
        process.exit(1);
    }
}

testPaymentSearch();
