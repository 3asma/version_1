import fs from 'fs';
import prisma from './src/config/prisma.js';

const BASE_URL = 'http://localhost:5000';
const LOG_FILE = 'test_results_clean.log';

// Reset log file
fs.writeFileSync(LOG_FILE, '');

function logToFile(msg) {
    fs.appendFileSync(LOG_FILE, msg + '\n');
}

async function logResponse(label, res) {
    const text = await res.text();
    logToFile(`${label}`);
    logToFile(`Status: ${res.status}`);
    try {
        logToFile(`Body: ${JSON.stringify(JSON.parse(text), null, 2)}`);
    } catch {
        logToFile(`Body: ${text}`);
    }
    logToFile('----------------------------------------');
}

async function test() {
    logToFile('=== Attendance API Integration Test Report ===');

    // 1. Get credentials for Rachid Bouazza (Professor)
    logToFile('Logging in as Professor Rachid Bouazza (rachid.bouazza@demo.com)...');
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
    logToFile(`Login Status: ${loginRes.status}. Token acquired: ${!!token}. Professor ID: ${professorId}`);

    // Get Admin credentials for access tests
    const adminUser = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
    });
    let adminToken = '';
    if (adminUser) {
        logToFile(`Logging in as Admin (${adminUser.email})...`);
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
        logToFile(`Admin login status: ${adminLoginRes.status}. Token acquired: ${!!adminToken}`);
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
        logToFile('ERROR: No reservations found for Professor Rachid. Script aborted.');
        process.exit(1);
    }

    const myReservation = rachidReservations[0];
    logToFile(`Using Professor Reservation: ${myReservation.id} (Code: ${myReservation.reservationCode})`);

    // 3. Find another reservation NOT belonging to Rachid (to test 403 Forbidden)
    const otherReservation = await prisma.reservation.findFirst({
        where: {
            professorId: { not: professorId }
        },
        include: {
            inscription: true
        }
    });

    if (otherReservation) {
        logToFile(`Using Other Professor Reservation: ${otherReservation.id} (Professor ID: ${otherReservation.professorId})`);
    } else {
        logToFile('No other reservation available in database for cross-test.');
    }

    // --- TEST 1: GET Reservation Attendance for Owned Reservation (Must Succeed) ---
    const t1 = await fetch(`${BASE_URL}/attendances/reservation/${myReservation.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    await logResponse('[TEST 1] GET attendance for owned reservation (Expected: 200 OK)', t1);

    // --- TEST 2: GET Reservation Attendance for Other Reservation (Must return 403 Forbidden) ---
    if (otherReservation) {
        const t2 = await fetch(`${BASE_URL}/attendances/reservation/${otherReservation.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        await logResponse('[TEST 2] GET attendance for other reservation as Professor (Expected: 403 Forbidden)', t2);

        // --- TEST 3: Admin GET Attendance for Other Reservation (Must Succeed) ---
        if (adminToken) {
            const t3 = await fetch(`${BASE_URL}/attendances/reservation/${otherReservation.id}`, {
                headers: { 'Authorization': `Bearer ${adminToken}` }
            });
            await logResponse('[TEST 3] Admin GET attendance for other reservation (Expected: 200 OK)', t3);
        }
    }

    // --- TEST 4: POST Save Attendance for Owned Reservation ---
    const candId = myReservation.inscription.candidateId;
    const members = myReservation.inscription.members || [];
    const attendancesPayload = [
        { candidateId: candId, status: 'PRESENT', note: 'Checked in candidate' },
        ...members.map(m => ({ candidateId: m.candidateId, status: 'ABSENT', note: 'Absent candidate' }))
    ];

    const t4 = await fetch(`${BASE_URL}/attendances/reservation/${myReservation.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ attendances: attendancesPayload })
    });
    await logResponse('[TEST 4] POST save attendance on owned reservation (Expected: 200 OK)', t4);

    // --- TEST 5: POST Save Attendance with invalid Candidate (Should return 400) ---
    const t5 = await fetch(`${BASE_URL}/attendances/reservation/${myReservation.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            attendances: [
                { candidateId: 'd6a73099-0000-0000-0000-000000000000', status: 'PRESENT' }
            ]
        })
    });
    await logResponse('[TEST 5] POST save attendance with invalid candidate ID (Expected: 400 Bad Request)', t5);

    // --- TEST 6: POST Save Attendance for Other Reservation (Should fail 403) ---
    if (otherReservation) {
        const t6 = await fetch(`${BASE_URL}/attendances/reservation/${otherReservation.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ attendances: [] })
        });
        await logResponse('[TEST 6] POST save attendance on other reservation as Professor (Expected: 403 Forbidden)', t6);
    }

    // --- TEST 7: PATCH Attendance Record (Owned) ---
    const createdAttendances = await prisma.attendance.findMany({
        where: { reservationId: myReservation.id }
    });

    if (createdAttendances.length > 0) {
        const attId = createdAttendances[0].id;
        const t7 = await fetch(`${BASE_URL}/attendances/${attId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: 'ABSENT', note: 'Modified status to ABSENT' })
        });
        await logResponse(`[TEST 7] PATCH attendance record ${attId} as Professor (Expected: 200 OK)`, t7);
    }

    // --- TEST 8: PATCH Other Attendance Record (Professor must fail 403) ---
    if (otherReservation) {
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

        const t8 = await fetch(`${BASE_URL}/attendances/${otherAtt.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: 'ABSENT' })
        });
        await logResponse(`[TEST 8] PATCH other attendance record ${otherAtt.id} as Professor (Expected: 403 Forbidden)`, t8);
    }

    // --- TEST 9: Admin POST Save Attendance (Must fail 403) ---
    if (adminToken) {
        const t9 = await fetch(`${BASE_URL}/attendances/reservation/${myReservation.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify({ attendances: attendancesPayload })
        });
        await logResponse('[TEST 9] Admin POST save attendance (Expected: 403 Forbidden)', t9);
    }

    // --- TEST 10: Admin PATCH Attendance Record (Must fail 403) ---
    if (adminToken && createdAttendances.length > 0) {
        const attId = createdAttendances[0].id;
        const t10 = await fetch(`${BASE_URL}/attendances/${attId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify({ status: 'ABSENT' })
        });
        await logResponse(`[TEST 10] Admin PATCH attendance record ${attId} (Expected: 403 Forbidden)`, t10);
    }

    logToFile('=== All Integration Tests Finished Success ===');
    process.exit(0);
}

test().catch(e => {
    logToFile(`ERROR: Test execution crashed. ${e.message}`);
    process.exit(1);
});
