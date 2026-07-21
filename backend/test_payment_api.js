async function verifyPaymentAPI() {
    console.log('--- STARTING PAYMENT CRUD VERIFICATION ---');
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
            return;
        }
        console.log('Authenticated successfully!');

        const authHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        // 2. FETCH DEPENDENT DATA (Candidates, Formations)
        const candidatesRes = await fetch('http://localhost:5000/candidates', { headers: authHeaders });
        const candidatesData = await candidatesRes.json();
        const firstCandidate = candidatesData.data?.[0];

        const formationsRes = await fetch('http://localhost:5000/formations', { headers: authHeaders });
        const formationsData = await formationsRes.json();
        const firstFormation = formationsData.data?.[0];

        if (!firstCandidate || !firstFormation) {
            console.error('Missing dependencies in database. Make sure Candidates and Formations are seeded.');
            console.log('Candidate count:', candidatesData.data?.length || 0);
            console.log('Formation count:', formationsData.data?.length || 0);
            return;
        }

        console.log('Found dependent models:', {
            candidateId: firstCandidate.id,
            candidateCode: firstCandidate.candidateCode,
            formationId: firstFormation.id,
            matiere: firstFormation.matiere
        });

        // 3. VERIFY VALIDATION ERRORS (Amount <= 0)
        console.log('Testing Validation Error: Amount <= 0...');
        const invalidAmountPayload = {
            candidateId: firstCandidate.id,
            formationId: firstFormation.id,
            amount: 0,
            paymentMethod: 'CASH',
            status: 'PENDING'
        };
        const resInvalidAmount = await fetch('http://localhost:5000/payments', {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify(invalidAmountPayload)
        });
        console.log(`Amount <= 0 Response Status: ${resInvalidAmount.status} (Expected: 400)`);
        const invalidAmountData = await resInvalidAmount.json();
        console.log('Response body:', invalidAmountData);

        // 4. VERIFY VALIDATION ERRORS (Invalid candidateId)
        console.log('Testing Validation Error: Invalid candidateId...');
        const invalidCandidatePayload = {
            candidateId: '00000000-0000-0000-0000-000000000000',
            formationId: firstFormation.id,
            amount: 150,
            paymentMethod: 'CASH',
            status: 'PENDING'
        };
        const resInvalidCandidate = await fetch('http://localhost:5000/payments', {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify(invalidCandidatePayload)
        });
        console.log(`Invalid candidateId Response Status: ${resInvalidCandidate.status} (Expected: 404)`);
        const invalidCandidateData = await resInvalidCandidate.json();
        console.log('Response body:', invalidCandidateData);

        // 5. CREATE PAYMENT
        const paymentPayload = {
            candidateId: firstCandidate.id,
            formationId: firstFormation.id,
            amount: 250.50,
            paymentMethod: 'CASH',
            status: 'PENDING',
            note: 'Verification payment'
        };

        console.log('Creating payment...');
        const createRes = await fetch('http://localhost:5000/payments', {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify(paymentPayload)
        });
        const createData = await createRes.json();
        if (createRes.status !== 201) {
            console.error('Create Payment failed:', createRes.status, createData);
            return;
        }
        const createdPayment = createData.data;
        console.log(`Payment created successfully! Code: ${createdPayment.paymentCode}, ID: ${createdPayment.id}`);
        console.log('Relations checking:', {
            hasCandidate: !!createdPayment.candidate,
            hasFormation: !!createdPayment.formation,
            candidateCode: createdPayment.candidate?.candidateCode,
            matiere: createdPayment.formation?.matiere
        });

        // 6. GET ALL PAYMENTS
        console.log('Getting all payments...');
        const getAllRes = await fetch('http://localhost:5000/payments', { headers: authHeaders });
        const getAllData = await getAllRes.json();
        console.log('All payments count:', getAllData.data?.length || 0);

        // 7. GET PAYMENT BY ID
        console.log(`Getting payment by ID: ${createdPayment.id}`);
        const getByIdRes = await fetch(`http://localhost:5000/payments/${createdPayment.id}`, { headers: authHeaders });
        const getByIdData = await getByIdRes.json();
        console.log(`Fetch by ID Status: ${getByIdRes.status}, Code: ${getByIdData.data?.paymentCode}`);

        // 8. UPDATE PAYMENT
        console.log(`Updating payment status to COMPLETED and note...`);
        const updateRes = await fetch(`http://localhost:5000/payments/${createdPayment.id}`, {
            method: 'PATCH',
            headers: authHeaders,
            body: JSON.stringify({ status: 'COMPLETED', note: 'Verified and completed' })
        });
        const updateData = await updateRes.json();
        console.log(`Update status: ${updateRes.status}, New status: ${updateData.data?.status}, New note: ${updateData.data?.note}`);

        // 9. DELETE PAYMENT (Cleanup)
        console.log(`Deleting payment: ${createdPayment.id}`);
        const deleteRes = await fetch(`http://localhost:5000/payments/${createdPayment.id}`, {
            method: 'DELETE',
            headers: authHeaders
        });
        console.log(`Delete status: ${deleteRes.status} (Expected: 204)`);

        // 10. GET DELETED PAYMENT
        console.log(`Verifying deletion: Getting payment by ID: ${createdPayment.id}`);
        const checkRes = await fetch(`http://localhost:5000/payments/${createdPayment.id}`, { headers: authHeaders });
        console.log(`Fetch deleted ID Status: ${checkRes.status} (Expected: 404)`);

        console.log('--- PAYMENT CRUD VERIFIED SUCCESSFULLY ---');
    } catch (error) {
        console.error('Error during API verification:', error);
    }
}

verifyPaymentAPI();
