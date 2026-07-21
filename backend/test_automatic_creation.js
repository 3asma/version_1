// Script to verify automatic LearningGroup creation for all learning modes.
import prisma from './src/config/prisma.js';
import InscriptionService from './src/services/inscriptionService.js';

async function runTests() {
    console.log('=== STARTING AUTOMATIC LEARNINGGROUP TESTS ===');
    try {
        // 1. Find or create a Formation
        let formation = await prisma.formation.findFirst({
            where: { matiere: 'Test Formation' }
        });
        if (!formation) {
            formation = await prisma.formation.create({
                data: {
                    matiere: 'Test Formation',
                    niveau: 'Intermediate'
                }
            });
        }
        console.log(`Using Formation: ${formation.id} - ${formation.matiere}`);

        // 2. Create 8 candidates for our test inscriptions
        const candidates = [];
        for (let i = 0; i < 8; i++) {
            const code = `TST-C-${Date.now()}-${i}`;
            const candidate = await prisma.candidate.create({
                data: {
                    candidateCode: code,
                    firstName: `TestFN_${i}`,
                    lastName: `TestLN_${i}`,
                    email: `${code}@test.com`,
                    age: 20 + i,
                    occupation: 'STUDENT',
                    observation: 'ALONE'
                }
            });
            candidates.push(candidate);
        }
        console.log(`Created 8 candidates: ${candidates.map(c => c.candidateCode).join(', ')}`);

        // ============================================
        // TEST MODULE 1: MONOME
        // ============================================
        console.log('\n--- 1. Testing MONOME ---');
        const monomeCode = `M-${Date.now()}`;
        const monomeIns = await InscriptionService.createInscription({
            inscriptionCode: monomeCode,
            candidateId: candidates[0].id,
            formationId: formation.id,
            learningMode: 'MONOME',
            volumeHoraire: 30,
            price: 500,
            duration: 3,
            note: 'Monome Note'
        });

        console.log(`Inscription created. ID: ${monomeIns.id}, learningGroupId: ${monomeIns.learningGroupId}`);
        if (!monomeIns.learningGroupId) {
            throw new Error('FAIL: MONOME Inscription is missing learningGroupId');
        }
        const monomeGroup = await prisma.learningGroup.findUnique({
            where: { id: monomeIns.learningGroupId },
            include: { inscriptions: true }
        });
        console.log(`LearningGroup: name="${monomeGroup.groupName}", mode="${monomeGroup.learningMode}", inscriptionsCount=${monomeGroup.inscriptions.length}`);
        if (monomeGroup.learningMode !== 'MONOME') {
            throw new Error(`FAIL: Expected group mode 'MONOME', got ${monomeGroup.learningMode}`);
        }
        if (monomeGroup.inscriptions.length !== 1) {
            throw new Error('FAIL: MONOME group should have exactly 1 inscription');
        }
        console.log('SUCCESS: MONOME OK');

        // ============================================
        // TEST MODULE 2: BINOME
        // ============================================
        console.log('\n--- 2. Testing BINOME ---');
        const binomeCode = `B-${Date.now()}`;
        // Create first candidate inscription
        const binomeIns1 = await InscriptionService.createInscription({
            inscriptionCode: binomeCode,
            candidateId: candidates[1].id,
            formationId: formation.id,
            learningMode: 'BINOME',
            volumeHoraire: 36,
            price: 600,
            duration: 3,
            note: 'Binome Note'
        });
        // Create second candidate inscription
        const binomeIns2 = await InscriptionService.createInscription({
            inscriptionCode: binomeCode,
            candidateId: candidates[2].id,
            formationId: formation.id,
            learningMode: 'BINOME',
            volumeHoraire: 36,
            price: 600,
            duration: 3,
            note: 'Binome Note'
        });

        console.log(`Inscription 1 created. ID: ${binomeIns1.id}, learningGroupId: ${binomeIns1.learningGroupId}`);
        console.log(`Inscription 2 created. ID: ${binomeIns2.id}, learningGroupId: ${binomeIns2.learningGroupId}`);

        if (binomeIns1.learningGroupId !== binomeIns2.learningGroupId) {
            throw new Error('FAIL: BINOME Inscriptions do not point to the same learningGroupId');
        }
        const binomeGroup = await prisma.learningGroup.findUnique({
            where: { id: binomeIns1.learningGroupId },
            include: { inscriptions: true }
        });
        console.log(`LearningGroup: name="${binomeGroup.groupName}", mode="${binomeGroup.learningMode}", inscriptionsCount=${binomeGroup.inscriptions.length}`);
        if (binomeGroup.learningMode !== 'BINOME') {
            throw new Error(`FAIL: Expected group mode 'BINOME', got ${binomeGroup.learningMode}`);
        }
        if (binomeGroup.inscriptions.length !== 2) {
            throw new Error('FAIL: BINOME group should have exactly 2 inscriptions');
        }
        console.log('SUCCESS: BINOME OK');

        // ============================================
        // TEST MODULE 3: GROUPE
        // ============================================
        console.log('\n--- 3. Testing GROUPE ---');
        const groupeCode = `G-${Date.now()}`;
        const insIds = [];
        for (let i = 3; i < 6; i++) {
            const ins = await InscriptionService.createInscription({
                inscriptionCode: groupeCode,
                candidateId: candidates[i].id,
                formationId: formation.id,
                learningMode: 'GROUPE',
                volumeHoraire: 40,
                price: 450,
                duration: 4,
                note: 'Groupe Note'
            });
            insIds.push(ins);
        }

        const groupIds = insIds.map(i => i.learningGroupId);
        console.log(`Created 3 Groupe inscriptions with group IDs: ${groupIds.join(', ')}`);
        const allSame = groupIds.every(id => id && id === groupIds[0]);
        if (!allSame) {
            throw new Error('FAIL: GROUPE Inscriptions do not point to the same learningGroupId');
        }

        const groupeGroup = await prisma.learningGroup.findUnique({
            where: { id: groupIds[0] },
            include: { inscriptions: true }
        });
        console.log(`LearningGroup: name="${groupeGroup.groupName}", mode="${groupeGroup.learningMode}", inscriptionsCount=${groupeGroup.inscriptions.length}`);
        if (groupeGroup.learningMode !== 'GROUPE') {
            throw new Error(`FAIL: Expected group mode 'GROUPE', got ${groupeGroup.learningMode}`);
        }
        if (groupeGroup.inscriptions.length !== 3) {
            throw new Error('FAIL: GROUPE group should have exactly 3 inscriptions');
        }
        console.log('SUCCESS: GROUPE OK');

        // ============================================
        // TEST MODULE 4: SPECIFIQUE
        // ============================================
        console.log('\n--- 4. Testing SPECIFIQUE ---');
        const specifiqueCode = `S-${Date.now()}`;
        const specInsIds = [];
        for (let i = 6; i < 8; i++) {
            const ins = await InscriptionService.createInscription({
                inscriptionCode: specifiqueCode,
                candidateId: candidates[i].id,
                formationId: formation.id,
                learningMode: 'SPECIFIQUE',
                volumeHoraire: 50,
                price: 800,
                duration: 5,
                note: 'Specifique Note'
            });
            specInsIds.push(ins);
        }

        const specGroupIds = specInsIds.map(i => i.learningGroupId);
        console.log(`Created 2 SPECIFIQUE inscriptions with group IDs: ${specGroupIds.join(', ')}`);
        const allSpecSame = specGroupIds.every(id => id && id === specGroupIds[0]);
        if (!allSpecSame) {
            throw new Error('FAIL: SPECIFIQUE Inscriptions do not point to the same learningGroupId');
        }

        const specGroup = await prisma.learningGroup.findUnique({
            where: { id: specGroupIds[0] },
            include: { inscriptions: true }
        });
        console.log(`LearningGroup: name="${specGroup.groupName}", mode="${specGroup.learningMode}", inscriptionsCount=${specGroup.inscriptions.length}`);
        // SPECIFIQUE learning mode maps to GROUPE in db
        if (specGroup.learningMode !== 'GROUPE') {
            throw new Error(`FAIL: Expected group mode 'GROUPE', got ${specGroup.learningMode}`);
        }
        if (specGroup.inscriptions.length !== 2) {
            throw new Error('FAIL: SPECIFIQUE group should have exactly 2 inscriptions');
        }
        console.log('SUCCESS: SPECIFIQUE OK');

        // ============================================
        // CLEANUP
        // ============================================
        console.log('\n--- Cleanup ---');
        // Delete inscriptions
        const allCreatedIns = [...insIds, ...specInsIds, monomeIns, binomeIns1, binomeIns2];
        for (const ins of allCreatedIns) {
            await prisma.inscription.delete({ where: { id: ins.id } });
        }
        // Delete Groups
        const groupsToDelete = [monomeIns.learningGroupId, binomeIns1.learningGroupId, groupIds[0], specGroupIds[0]];
        for (const gid of groupsToDelete) {
            if (gid) {
                await prisma.learningGroup.delete({ where: { id: gid } });
            }
        }
        // Delete candidates
        for (const cand of candidates) {
            await prisma.candidate.delete({ where: { id: cand.id } });
        }
        console.log('Cleanup completed successfully.');
        console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===');
    } catch (err) {
        console.error('\n!!! TEST FAILED !!!');
        console.error(err);
        process.exit(1);
    }
}

runTests();
