import fs from 'fs';
import prisma from './src/config/prisma.js';

const BASE_URL = 'http://localhost:5000';
const LOG_FILE = 'test_assigned_candidates.log';

fs.writeFileSync(LOG_FILE, '');

function logToFile(msg) {
    fs.appendFileSync(LOG_FILE, msg + '\n');
    console.log(msg);
}

async function test() {
    logToFile('=== Assigned Candidates Integration Test ===');

    // 1. Login as Professor Rachid Bouazza
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

    if (!token) {
        logToFile('Error: Login token not found.');
        process.exit(1);
    }

    // 2. Fetch candidates as Professor
    logToFile('Fetching candidates list for Professor...');
    const candidatesRes = await fetch(`${BASE_URL}/candidates`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const candData = await candidatesRes.json();
    logToFile(`GET /candidates status: ${candidatesRes.status}`);

    if (candidatesRes.status !== 200) {
        logToFile(`Error: Unexpected status code: ${candidatesRes.status}`);
        process.exit(1);
    }

    const list = candData.data || [];
    logToFile(`Number of candidates retrieved: ${list.length}`);
    list.forEach((c, idx) => {
        logToFile(`[Candidate ${idx + 1}] Code: ${c.candidateCode}, Name: ${c.firstName} ${c.lastName}`);
    });

    // 3. Verify total candidates assigned in database via InscriptionCandidate relation
    const expectedCandidates = await prisma.candidate.findMany({
        where: {
            inscriptionCandidates: {
                some: {
                    inscription: {
                        professorId: professorId
                    }
                }
            }
        }
    });

    logToFile(`Expected count from direct database query: ${expectedCandidates.length}`);

    if (list.length === expectedCandidates.length) {
        logToFile('SUCCESS: Candidate count retrieved via API matches database expectation.');
    } else {
        logToFile('FAILURE: Mismatch between API candidate list and database expectation!');
        process.exit(1);
    }

    // 4. Test PDF Export
    logToFile('Testing PDF Export route for Professor...');
    const exportRes = await fetch(`${BASE_URL}/candidates/export/pdf`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    logToFile(`GET /candidates/export/pdf status: ${exportRes.status}`);
    if (exportRes.status === 200) {
        logToFile('SUCCESS: PDF export returned 200 OK.');
    } else {
        logToFile('FAILURE: PDF export failed.');
        process.exit(1);
    }

    logToFile('=== Test Finished Successfully ===');
}

test().catch(err => {
    logToFile(`Uncaught error during test: ${err.message}`);
    process.exit(1);
});
