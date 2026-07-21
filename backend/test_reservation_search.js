// Verification script for Reservation Search API using native fetch API

async function verifySearch() {
    console.log('--- STARTING RESERVATION SEARCH API VERIFICATION ---');
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

        // 2. FETCH DEPENDENT CODES (Rooms, Inscriptions, Candidates)
        const inscriptionsRes = await fetch('http://localhost:5000/inscriptions', { headers: authHeaders });
        const inscriptionsData = await inscriptionsRes.json();
        const firstInscription = inscriptionsData.data?.[0];

        const candidatesRes = await fetch('http://localhost:5000/candidates', { headers: authHeaders });
        const candidatesData = await candidatesRes.json();
        const firstCandidate = candidatesData.data?.[0];

        if (!firstInscription || !firstCandidate) {
            console.error('Missing dependent entities in database. Ensure Candidates and Inscriptions are seeded.');
            return;
        }

        const candidateCode = firstCandidate.candidateCode;
        const inscriptionCode = firstInscription.inscriptionCode;

        console.log(`Test codes found. Candidate Code: ${candidateCode}, Inscription Code: ${inscriptionCode}`);

        const candidateCodeUpper = candidateCode.toUpperCase();
        const candidateCodeLower = candidateCode.toLowerCase();
        const inscriptionCodeUpper = inscriptionCode.toUpperCase();
        const inscriptionCodeLower = inscriptionCode.toLowerCase();

        console.log(`Test codes found:\n - Candidate: ${candidateCodeUpper} / ${candidateCodeLower}\n - Inscription: ${inscriptionCodeUpper} / ${inscriptionCodeLower}`);

        // 3. TEST SEARCH BY CANDIDATE CODE (Uppercase)
        console.log(`\nTesting search by Candidate Code (Uppercase): ${candidateCodeUpper}`);
        const candidateSearchRes1 = await fetch(`http://localhost:5000/reservations/search?code=${candidateCodeUpper}`, { headers: authHeaders });
        const candidateSearchData1 = await candidateSearchRes1.json();
        console.log(`Status: ${candidateSearchRes1.status}`);
        console.log('Response payload:', JSON.stringify(candidateSearchData1, null, 2));

        // 3b. TEST SEARCH BY CANDIDATE CODE (Lowercase)
        console.log(`\nTesting search by Candidate Code (Lowercase): ${candidateCodeLower}`);
        const candidateSearchRes2 = await fetch(`http://localhost:5000/reservations/search?code=${candidateCodeLower}`, { headers: authHeaders });
        const candidateSearchData2 = await candidateSearchRes2.json();
        console.log(`Status: ${candidateSearchRes2.status}`);
        console.log('Response payload:', JSON.stringify(candidateSearchData2, null, 2));

        // 4. TEST SEARCH BY INSCRIPTION CODE (Uppercase)
        console.log(`\nTesting search by Inscription Code (Uppercase): ${inscriptionCodeUpper}`);
        const insSearchRes1 = await fetch(`http://localhost:5000/reservations/search?code=${inscriptionCodeUpper}`, { headers: authHeaders });
        const insSearchData1 = await insSearchRes1.json();
        console.log(`Status: ${insSearchRes1.status}`);
        console.log('Response payload:', JSON.stringify(insSearchData1, null, 2));

        // 4b. TEST SEARCH BY INSCRIPTION CODE (Lowercase)
        console.log(`\nTesting search by Inscription Code (Lowercase): ${inscriptionCodeLower}`);
        const insSearchRes2 = await fetch(`http://localhost:5000/reservations/search?code=${inscriptionCodeLower}`, { headers: authHeaders });
        const insSearchData2 = await insSearchRes2.json();
        console.log(`Status: ${insSearchRes2.status}`);
        console.log('Response payload:', JSON.stringify(insSearchData2, null, 2));

        // 5. TEST SEARCH BY UNKNOWN CODE
        const unknownCode = 'XYZ-UNKNOWN-999';
        console.log(`\nTesting search by Unknown Code: ${unknownCode}`);
        const unknownSearchRes = await fetch(`http://localhost:5000/reservations/search?code=${unknownCode}`, { headers: authHeaders });
        const unknownSearchData = await unknownSearchRes.json();
        console.log(`Status: ${unknownSearchRes.status}`);
        console.log('Response payload:', JSON.stringify(unknownSearchData, null, 2));

        // 6. TEST SEARCH WITH EMPTY CODE
        console.log('\nTesting search with Empty Code');
        const emptySearchRes = await fetch('http://localhost:5000/reservations/search?code=', { headers: authHeaders });
        const emptySearchData = await emptySearchRes.json();
        console.log(`Status: ${emptySearchRes.status}`);
        console.log('Response payload:', JSON.stringify(emptySearchData, null, 2));

        console.log('\n--- RESERVATION SEARCH API VERIFIED SUCCESSFULLY ---');
    } catch (error) {
        console.error('Error during search API verification:', error);
    }
}

verifySearch();
