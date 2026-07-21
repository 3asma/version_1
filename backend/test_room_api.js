// Backend test for Rooms endpoints

async function testRooms() {
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

        // 2. Create Room
        console.log('2. Creating a test room...');
        const createRes = await fetch('http://localhost:5000/rooms', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                numero: 'R-999-TEST',
                capacite: 30
            })
        });

        const createJson = await createRes.json();
        console.log('Create Response:', createJson);

        if (createJson.message !== 'success') {
            throw new Error(`Create failed: ${JSON.stringify(createJson)}`);
        }

        const roomId = createJson.data.id;
        console.log(`Test room created with ID: ${roomId}`);

        // 3. Get all rooms
        console.log('3. Getting all rooms...');
        const getRes = await fetch('http://localhost:5000/rooms', {
            method: 'GET',
            headers
        });
        const getJson = await getRes.json();
        const found = getJson.data.find(r => r.id === roomId);
        if (!found) {
            throw new Error('Created room not found in the list');
        }
        console.log('Room successfully retrieved in the list.');

        // 4. Update room
        console.log('4. Updating room...');
        const updateRes = await fetch(`http://localhost:5000/rooms/${roomId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
                capacite: 45
            })
        });
        const updateJson = await updateRes.json();
        console.log('Update Response:', updateJson);
        if (updateJson.data.capacite !== 45) {
            throw new Error('Failed to update capacite');
        }

        // 5. Delete room
        console.log('5. Deleting room...');
        const deleteRes = await fetch(`http://localhost:5000/rooms/${roomId}`, {
            method: 'DELETE',
            headers
        });
        const deleteJson = await deleteRes.json();
        console.log('Delete Response:', deleteJson);
        if (deleteJson.message !== 'success') {
            throw new Error('Failed to delete room');
        }

        console.log('=== ALL ROOM TESTS PASSED SUCCESSFULLY ===');
    } catch (error) {
        console.error('Test failed with error:', error);
        process.exit(1);
    }
}

testRooms();
