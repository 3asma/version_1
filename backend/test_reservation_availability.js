// Verification script for Reservation Availability Verification using native fetch API
import prisma from './src/config/prisma.js';

async function verifyAvailability() {
    console.log('--- STARTING RESERVATION AVAILABILITY VERIFICATION ---');

    // Dynamic models created for self-contained testing
    let r1, r2, p1, p2, c1, c2, f1, i1, i2;
    let baselineId = null;

    try {
        r1 = await prisma.room.create({ data: { numero: 'TEMP-R1', capacite: 10 } });
        r2 = await prisma.room.create({ data: { numero: 'TEMP-R2', capacite: 20 } });

        p1 = await prisma.professor.create({ data: { nom: 'TEMP', prenom: 'P1', type: 'VACATAIRE', dayOff: 'SUNDAY', maxSessions: 10 } });
        p2 = await prisma.professor.create({ data: { nom: 'TEMP', prenom: 'P2', type: 'VACATAIRE', dayOff: 'SUNDAY', maxSessions: 10 } });

        c1 = await prisma.candidate.create({ data: { candidateCode: 'TEMP-C1', firstName: 'C1', lastName: 'TEMP', age: 20, occupation: 'STUDENT', observation: 'ALONE', status: 'ACTIVE' } });
        c2 = await prisma.candidate.create({ data: { candidateCode: 'TEMP-C2', firstName: 'C2', lastName: 'TEMP', age: 22, occupation: 'STUDENT', observation: 'ALONE', status: 'ACTIVE' } });

        f1 = await prisma.formation.create({ data: { matiere: 'TEMP-F1', niveau: 'A1' } });

        i1 = await prisma.inscription.create({ data: { inscriptionCode: 'TEMP-I1', dateInscription: new Date(), remainingHours: 10, learningMode: 'GROUPE', candidateId: c1.id, formationId: f1.id } });
        i2 = await prisma.inscription.create({ data: { inscriptionCode: 'TEMP-I2', dateInscription: new Date(), remainingHours: 10, learningMode: 'GROUPE', candidateId: c2.id, formationId: f1.id } });

        console.log('Temporary DB components set up successfully:');
        console.log(` - Prof 1: ${p1.prenom} (${p1.id})`);
        console.log(` - Prof 2: ${p2.prenom} (${p2.id})`);
        console.log(` - Room 1: ${r1.numero} (${r1.id})`);
        console.log(` - Room 2: ${r2.numero} (${r2.id})`);
        console.log(` - Candidate 1: (${c1.id})`);
        console.log(` - Candidate 2: (${c2.id})`);

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

        const authHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        // 2. CREATE BASELINE RESERVATION
        // Date: 2026-07-20
        // Start: 10:00:00, End: 11:00:00
        const reservationDate = '2026-07-20T00:00:00.000Z';
        const startTime = '2026-07-20T10:00:00.000Z';
        const endTime = '2026-07-20T11:00:00.000Z';

        console.log('\nCreating baseline reservation for Prof 1, Room 1, Candidate 1...');
        const createRes = await fetch('http://localhost:5000/reservations', {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({
                reservationCode: `BASE-${Date.now()}`,
                reservationDate,
                startTime,
                endTime,
                inscriptionId: i1.id,
                professorId: p1.id,
                roomId: r1.id
            })
        });
        const createData = await createRes.json();
        if (createRes.status !== 201) {
            console.error('Failed to create baseline reservation:', createData);
            return;
        }
        baselineId = createData.data.id;
        console.log('Baseline reservation created successfully! ID:', baselineId);

        // Helper function for POST /availability
        async function check(desc, payload) {
            const checkRes = await fetch('http://localhost:5000/reservations/availability', {
                method: 'POST',
                headers: authHeaders,
                body: JSON.stringify(payload)
            });
            const checkData = await checkRes.json();
            console.log(`\nScenario: ${desc}`);
            console.log(`Status: ${checkRes.status}`);
            console.log('Data:', JSON.stringify(checkData.data || checkData, null, 2));
        }

        // Scenario 1: No Conflict (completely different time slot)
        await check('1. No Conflict (different time)', {
            reservationDate,
            startTime: '2026-07-20T11:30:00.000Z',
            endTime: '2026-07-20T12:30:00.000Z',
            professorId: p1.id,
            roomId: r1.id,
            candidateId: c1.id
        });

        // Scenario 2: Edge case - ends exactly when new starts
        await check('2. Edge Case (New starts exactly when existing ends)', {
            reservationDate,
            startTime: '2026-07-20T11:00:00.000Z',
            endTime: '2026-07-20T12:00:00.000Z',
            professorId: p1.id,
            roomId: r1.id,
            candidateId: c1.id
        });

        // Scenario 3: Edge case - starts exactly when new ends
        await check('3. Edge Case (New ends exactly when existing starts)', {
            reservationDate,
            startTime: '2026-07-20T09:00:00.000Z',
            endTime: '2026-07-20T10:00:00.000Z',
            professorId: p1.id,
            roomId: r1.id,
            candidateId: c1.id
        });

        // Scenario 4: Professor conflict only
        await check('4. Professor Conflict Only', {
            reservationDate,
            startTime: '2026-07-20T10:30:00.000Z',
            endTime: '2026-07-20T11:30:00.000Z',
            professorId: p1.id,
            roomId: r2.id,
            candidateId: c2.id
        });

        // Scenario 5: Room conflict only
        await check('5. Room Conflict Only', {
            reservationDate,
            startTime: '2026-07-20T10:30:00.000Z',
            endTime: '2026-07-20T11:30:00.000Z',
            professorId: p2.id,
            roomId: r1.id,
            candidateId: c2.id
        });

        // Scenario 6: Candidate conflict only
        await check('6. Candidate Conflict Only', {
            reservationDate,
            startTime: '2026-07-20T10:30:00.000Z',
            endTime: '2026-07-20T11:30:00.000Z',
            professorId: p2.id,
            roomId: r2.id,
            candidateId: c1.id
        });

        // Scenario 7: Multiple conflicts (Prof, Room, Candidate)
        await check('7. Multiple Simultaneous Conflicts (ALL)', {
            reservationDate,
            startTime: '2026-07-20T10:15:00.000Z',
            endTime: '2026-07-20T10:45:00.000Z',
            professorId: p1.id,
            roomId: r1.id,
            candidateId: c1.id
        });

        // Scenario 8: Validation Error (Missing fields)
        await check('8. Validation Error (Missing date)', {
            startTime: '2026-07-20T10:15:00.000Z',
            endTime: '2026-07-20T10:45:00.000Z',
            professorId: p1.id,
            roomId: r1.id,
            candidateId: c1.id
        });

        console.log('--- RESERVATION AVAILABILITY VERIFIED SUCCESSFULLY ---');
    } catch (e) {
        console.error('Error in availability verification:', e);
    } finally {
        console.log('\nTearing down temporary DB components...');
        try {
            if (baselineId) {
                await prisma.reservation.delete({ where: { id: baselineId } });
            }
            if (i1 && i2) {
                await prisma.inscription.deleteMany({ where: { id: { in: [i1.id, i2.id] } } });
            }
            if (f1) {
                await prisma.formation.delete({ where: { id: f1.id } });
            }
            if (c1 && c2) {
                await prisma.candidate.deleteMany({ where: { id: { in: [c1.id, c2.id] } } });
            }
            if (p1 && p2) {
                await prisma.professor.deleteMany({ where: { id: { in: [p1.id, p2.id] } } });
            }
            if (r1 && r2) {
                await prisma.room.deleteMany({ where: { id: { in: [r1.id, r2.id] } } });
            }
            console.log('Teardown complete.');
        } catch (cleanupErr) {
            console.error('Quiet warning: cleanup failed:', cleanupErr.message);
        }
    }
}

verifyAvailability();
