// Backend test for Formation endpoints
// Native global fetch will be used (requires Node 18+)
async function testFormations() {
    try {
        console.log('1. Logging in as admin...');
        const loginRes = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@formation.com', password: 'demo' })
        });

        if (!loginRes.ok) {
            throw new Error(`Login failed with status ${loginRes.status}`);
        }

        const loginJson = await loginRes.json();
        const token = loginJson.token;
        console.log('Login successful. Token acquired.');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        // 2. Create Formation
        console.log('2. Creating a test formation...');
        const createRes = await fetch('http://localhost:5000/formations', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                matiere: 'Allemand Test',
                niveau: 'B1'
            })
        });

        const createJson = await createRes.json();
        console.log('Create Response:', createJson);

        if (createJson.message !== 'success') {
            throw new Error(`Create failed: ${JSON.stringify(createJson)}`);
        }

        const formationId = createJson.data.id;
        console.log(`Test formation created with ID: ${formationId}`);

        // 3. Get all formations
        console.log('3. Getting all formations...');
        const getRes = await fetch('http://localhost:5000/formations', {
            method: 'GET',
            headers
        });
        const getJson = await getRes.json();
        const found = getJson.data.find(f => f.id === formationId);
        if (!found) {
            throw new Error('Created formation not found in the list');
        }
        console.log('Formation successfully retrieved in the list.');

        // 4. Update formation
        console.log('4. Updating formation...');
        const updateRes = await fetch(`http://localhost:5000/formations/${formationId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
                niveau: 'B2'
            })
        });
        const updateJson = await updateRes.json();
        console.log('Update Response:', updateJson);
        if (updateJson.data.niveau !== 'B2') {
            throw new Error('Failed to update niveau');
        }

        // 5. Delete formation
        console.log('5. Deleting formation...');
        const deleteRes = await fetch(`http://localhost:5000/formations/${formationId}`, {
            method: 'DELETE',
            headers
        });
        const deleteJson = await deleteRes.json();
        console.log('Delete Response:', deleteJson);
        if (deleteJson.message !== 'success') {
            throw new Error('Failed to delete formation');
        }

        console.log('=== ALL TESTS PASSED SUCCESSFULLY ===');
    } catch (error) {
        console.error('Test failed with error:', error);
        process.exit(1);
    }
}

testFormations();
