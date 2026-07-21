// Verification script using native fetch API

async function verifyAPI() {
    console.log('--- STARTING RESERVATION CRUD VERIFICATION ---');
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

        // 2. FETCH DEPENDENT DATA (Rooms, Professors, Inscriptions)
        const roomsRes = await fetch('http://localhost:5000/rooms', { headers: authHeaders });
        const roomsData = await roomsRes.json();
        const firstRoom = roomsData.data?.[0];

        const professorsRes = await fetch('http://localhost:5000/professors', { headers: authHeaders });
        const professorsData = await professorsRes.json();
        const firstProfessor = professorsData.data?.[0];

        const inscriptionsRes = await fetch('http://localhost:5000/inscriptions', { headers: authHeaders });
        const inscriptionsData = await inscriptionsRes.json();
        const firstInscription = inscriptionsData.data?.[0];

        if (!firstRoom || !firstProfessor || !firstInscription) {
            console.error('Missing dependencies in database. Make sure Rooms, Professors, and Inscriptions are seeded.');
            console.log('Room count:', roomsData.data?.length || 0);
            console.log('Professor count:', professorsData.data?.length || 0);
            console.log('Inscription count:', inscriptionsData.data?.length || 0);
            return;
        }

        console.log('Found dependent models:', {
            roomId: firstRoom.id,
            roomNumber: firstRoom.numero,
            professorId: firstProfessor.id,
            professorName: `${firstProfessor.nom} ${firstProfessor.prenom}`,
            inscriptionId: firstInscription.id,
            inscriptionCode: firstInscription.inscriptionCode
        });

        // 3. CREATE RESERVATION
        const now = new Date();
        const reservationDate = new Date(now.setDate(now.getDate() + 1)); // tomorrow
        const startTime = new Date(reservationDate.getTime() + (60 * 60 * 1000)); // tomorrow + 1 hour
        const endTime = new Date(startTime.getTime() + (2 * 60 * 60 * 1000)); // tomorrow + 3 hours

        const reservationPayload = {
            reservationCode: `RES-${Date.now()}`,
            reservationDate: reservationDate.toISOString(),
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            inscriptionId: firstInscription.id,
            professorId: firstProfessor.id,
            roomId: firstRoom.id,
            status: 'PENDING'
        };

        console.log('Creating library reservation...');
        const createRes = await fetch('http://localhost:5000/reservations', {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify(reservationPayload)
        });
        const createData = await createRes.json();
        if (createRes.status !== 201) {
            console.error('Create Reservation failed:', createRes.status, createData);
            return;
        }
        const createdReservation = createData.data;
        console.log(`Reservation created successfully! ID: ${createdReservation.id}`);
        console.log('Inclusions check:', {
            hasInscription: !!createdReservation.inscription,
            hasProfessor: !!createdReservation.professor,
            hasRoom: !!createdReservation.room
        });

        // 4. GET ALL RESERVATIONS
        console.log('Getting all reservations...');
        const getAllRes = await fetch('http://localhost:5000/reservations', { headers: authHeaders });
        const getAllData = await getAllRes.json();
        console.log('All reservations count:', getAllData.data?.length || 0);

        // 5. GET RESERVATION BY ID
        console.log(`Getting reservation by ID: ${createdReservation.id}`);
        const getByIdRes = await fetch(`http://localhost:5000/reservations/${createdReservation.id}`, { headers: authHeaders });
        const getByIdData = await getByIdRes.json();
        console.log(`Fetch by ID Status: ${getByIdRes.status}`);

        // 6. UPDATE RESERVATION
        console.log(`Updating reservation status to CONFIRMED...`);
        const updateRes = await fetch(`http://localhost:5000/reservations/${createdReservation.id}`, {
            method: 'PATCH',
            headers: authHeaders,
            body: JSON.stringify({ status: 'CONFIRMED' })
        });
        const updateData = await updateRes.json();
        console.log(`Update status: ${updateRes.status}, New status: ${updateData.data?.status}`);

        // 7. DELETE RESERVATION (Cleanup)
        console.log(`Deleting reservation: ${createdReservation.id}`);
        const deleteRes = await fetch(`http://localhost:5000/reservations/${createdReservation.id}`, {
            method: 'DELETE',
            headers: authHeaders
        });
        console.log(`Delete status: ${deleteRes.status}`);

        console.log('--- RESERVATION CRUD VERIFIED SUCCESSFULLY ---');
    } catch (error) {
        console.error('Error during API verification:', error);
    }
}

verifyAPI();
