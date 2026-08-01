// Backend test for Planning endpoints

async function testPlanning() {
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

        // We will create a temporary reservation to test planning mapping
        console.log('2. Preparing a test reservation...');
        // Let's find first inscription, room, and professor to link to.
        const [inscriptionsRes, roomsRes, professorsRes] = await Promise.all([
            fetch('http://localhost:5000/inscriptions', { headers }),
            fetch('http://localhost:5000/rooms', { headers }),
            fetch('http://localhost:5000/professors', { headers })
        ]);

        const inscriptions = (await inscriptionsRes.json()).data;
        const rooms = (await roomsRes.json()).data;
        const professors = (await professorsRes.json()).data;

        if (!inscriptions || inscriptions.length === 0) throw new Error('No inscriptions available to link reservation');
        if (!rooms || rooms.length === 0) throw new Error('No rooms available to link reservation');
        if (!professors || professors.length === 0) throw new Error('No professors available to link reservation');

        const testDate = '2026-07-20'; // Reference date is Monday July 20, 2026

        const startResTime = '2026-07-20T09:00:00.000Z';
        const endResTime = '2026-07-20T10:00:00.000Z';

        const reservationPayload = {
            reservationCode: 'RES-PLANNING-TEST-123',
            reservationDate: new Date(testDate).toISOString(),
            startTime: startResTime,
            endTime: endResTime,
            inscriptionId: inscriptions[0].inscription?.id || inscriptions[0].id,
            professorId: professors[0].id,
            roomId: rooms[0].id
        };

        console.log('3. Creating test reservation...');
        const createRes = await fetch('http://localhost:5000/reservations', {
            method: 'POST',
            headers,
            body: JSON.stringify(reservationPayload)
        });

        const createJson = await createRes.json();
        console.log('Create Response:', createJson);

        if (createJson.message !== 'success') {
            throw new Error(`Reservation creation failed: ${JSON.stringify(createJson)}`);
        }
        const createdId = createJson.data.id;

        // 4. Test GET /planning/week?date=2026-07-20
        console.log('4. Testing GET /planning/week?date=2026-07-20...');
        const weekRes = await fetch(`http://localhost:5000/planning/week?date=${testDate}`, { headers });
        const weekJson = await weekRes.json();
        console.log('Weekly Planning Response status:', weekRes.status);
        console.log('Weekly Planning count of records:', weekJson.data?.length);

        if (!weekJson.data || weekJson.data.length === 0) {
            throw new Error('Weekly planning returned empty dataset');
        }

        const weekMatch = weekJson.data.find(s => s.id === createdId);
        if (!weekMatch) {
            throw new Error('Created reservation not found in weekly planning response');
        }
        console.log('Weekly planning mapping validation successful:', weekMatch);

        // 5. Test GET /planning/day?date=2026-07-20
        console.log('5. Testing GET /planning/day?date=2026-07-20...');
        const dayRes = await fetch(`http://localhost:5000/planning/day?date=${testDate}`, { headers });
        const dayJson = await dayRes.json();
        console.log('Daily Planning Response status:', dayRes.status);
        console.log('Daily Planning count of records:', dayJson.data?.length);

        const dayMatch = dayJson.data.find(s => s.id === createdId);
        if (!dayMatch) {
            throw new Error('Created reservation not found in daily planning response');
        }
        console.log('Daily planning mapping validation successful:', dayMatch);

        // Cleanup: remove temporary reservation
        console.log('6. Cleaning up test reservation...');
        const deleteRes = await fetch(`http://localhost:5000/reservations/${createdId}`, {
            method: 'DELETE',
            headers
        });
        console.log('Delete status:', deleteRes.status);

        console.log('=== ALL PLANNING MODULE TESTS PASSED EXCELLENTLY ===');
    } catch (error) {
        console.error('Test failed with error:', error);
        process.exit(1);
    }
}

testPlanning();
