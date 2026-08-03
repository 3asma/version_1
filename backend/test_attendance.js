import prisma from './src/config/prisma.js';

const BASE_URL = 'http://localhost:5000';

async function logResponse(res) {
    const text = await res.text();
    console.log(`Status: ${res.status}`);
    try {
        console.log('Body:', JSON.stringify(JSON.parse(text), null, 2));
    } catch {
        console.log('Body:', text);
    }
}

async function test() {
    console.log('--- Attendance API Internal Integration Tests ---');

    // 1. Get credentials for Rachid Bouazza (Professor)
    // From create_bouazza_user.js, Rachid's email is rachid.bouazza@demo.com, password is demo
    console.log('\nTesting Auth Login...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'rachid.bouazza@demo.com',
            password: 'demo'
        })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    const professorId = loginData.user?.professorId;
    console.log(`Log in success. Professor Id: ${professorId}`);

    // Get Admin credentials for access tests
    // Let's check admin email. Usually admin@demo.com or there is another admin user.
    // Let's find one user with admin role.
    const adminUser = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
    });
    let adminToken = '';
    if (adminUser) {
        console.log(`\nFound Admin User: ${adminUser.email}. Logging in...`);
        // Let's assume password is 'demo' or try to login.
        // Wait, if it doesn't succeed we'll know, or we can just fetch via token if we can login.
        // Let's try log in for admin.
        const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: adminUser.email,
                password: 'demo'
            })
        });
        const adminLoginData = await adminLoginRes.json();
        adminToken = adminLoginData.token || '';
        console.log(`Admin log in status: ${adminLoginRes.status}. Got Token: ${!!adminToken}`);
    }

    // 2. Fetch reservations belonging to Rachid
    const rachidReservations = await prisma.reservation.findMany({
        where: { professorId },
        include: {
            inscription: {
                include: {
                    members: true
                }
            }
        }
    });

    if (rachidReservations.length === 0) {
        console.log('WARNING: No reservations found for Professor Rachid. Please seed or check db.');
        process.exit(1);
    }

    const myReservation = rachidReservations[0];
    console.log(`\nUsing Rachid Reservation: ${myReservation.id} (Code: ${myReservation.reservationCode})`);

    // 3. Find another reservation NOT belonging to Rachid (to test 403 Forbidden)
    const otherReservation = await prisma.reservation.findFirst({
        where: {
            professorId: { not: professorId }
        },
        include: {
            inscription: true
        }
    });

    if (!otherReservation) {
        console.log('WARNING: Only one professor exists or no other reservations. Creating simulated second reservation/professor...');
        // We can create a simulated reservation or skip 403 test for different professor,
        // but we should verify if there are any other ones.
    } else {
        console.log(`Using Other Professor Reservation: ${otherReservation.id} (Professor: ${otherReservation.professorId})`);
    }

    // --- TEST 1: GET Reservation Attendance for Owned Reservation (Must Succeed) ---
    console.log('\n[TEST 1] GET attendance for own reservation:');
    const t1 = await fetch(`${BASE_URL}/attendances/reservation/${myReservation.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    await logResponse(t1);

    // --- TEST 2: GET Reservation Attendance for Other Reservation (Must return 403 Forbidden) ---
    if (otherReservation) {
        console.log('\n[TEST 2] GET attendance for other reservation (Should fail 403):');
        const t2 = await fetch(`${BASE_URL}/attendances/reservation/${otherReservation.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        await logResponse(t2);

        // --- TEST 3: Admin GET Attendance for Other Reservation (Must Succeed) ---
        if (adminToken) {
            console.log('\n[TEST 3] Admin GET attendance for other reservation (Should succeed):');
            const t3 = await fetch(`${BASE_URL}/attendances/reservation/${otherReservation.id}`, {
                headers: { 'Authorization': `Bearer ${adminToken}` }
            });
            await logResponse(t3);
        }
    }

    // --- TEST 4: POST Save Attendance for Owned Reservation ---
    console.log('\n[TEST 4] POST save attendance on my reservation:');
    // We need candidate IDs associated with the reservation.
    const candId = myReservation.inscription.candidateId;
    const members = myReservation.inscription.members || [];
    const attendancesPayload = [
        { candidateId: candId, status: 'PRESENT' },
        ...members.map(m => ({ candidateId: m.candidateId, status: 'ABSENT' }))
    ];

    const t4 = await fetch(`${BASE_URL}/attendances/reservation/${myReservation.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ attendances: attendancesPayload })
    });
    await logResponse(t4);

    // --- TEST 5: POST Save Attendance with invalid Candidate (Should return 400) ---
    console.log('\n[TEST 5] POST save attendance with invalid candidate ID (Should fail 400):');
    const t5 = await fetch(`${BASE_URL}/attendances/reservation/${myReservation.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            attendances: [
                { candidateId: 'invalid-uuid-candidate-id-here', status: 'PRESENT' }
            ]
        })
    });
    await logResponse(t5);

    // --- TEST 6: POST Save Attendance for Other Reservation (Should fail 403) ---
    if (otherReservation) {
        console.log('\n[TEST 6] POST save attendance on other reservation (Should fail 403):');
        const t6 = await fetch(`${BASE_URL}/attendances/reservation/${otherReservation.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ attendances: [] })
        });
        await logResponse(t6);
    }

    // --- TEST 7: PATCH Attendance Record (Owned) ---
    // Fetch the attendance records we just created
    const createdAttendances = await prisma.attendance.findMany({
        where: { reservationId: myReservation.id }
    });

    if (createdAttendances.length > 0) {
        const attId = createdAttendances[0].id;
        console.log(`\n[TEST 7] PATCH attendance record ${attId} status to ABSENT:`);
        const t7 = await fetch(`${BASE_URL}/attendances/${attId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: 'ABSENT', note: 'Modified note' })
        });
        await logResponse(t7);
    }

    // --- TEST 8: PATCH Attendance Record (Other - Should fail 403) ---
    if (otherReservation) {
        // Let's create an attendance record for otherReservation if not exists, to test 403 patch
        let otherAtt = await prisma.attendance.findFirst({
            where: { reservationId: otherReservation.id }
        });
        if (!otherAtt) {
            otherAtt = await prisma.attendance.create({
                data: {
                    reservationId: otherReservation.id,
                    candidateId: otherReservation.inscription.candidateId,
                    status: 'PRESENT'
                }
            });
        }

        console.log(`\n[TEST 8] PATCH other attendance record ${otherAtt.id} (Should fail 403):`);
        const t8 = await fetch(`${BASE_URL}/attendances/${otherAtt.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: 'ABSENT' })
        });
        await logResponse(t8);
    }

    console.log('\n--- All integration tests completed! ---');
    process.exit(0);
}

test().catch(e => {
    console.error('Test run failed:', e);
    process.exit(1);
});
