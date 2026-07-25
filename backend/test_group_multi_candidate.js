import prisma from './src/config/prisma.js';
import inscriptionService from './src/services/inscriptionService.js';

async function testGroupInscriptionCreation() {
    console.log('--- STARTING GROUP INSCRIPTION CREATION TEST ---');

    // 1. Fetch some candidates and formation
    const candidates = await prisma.candidate.findMany({ take: 3 });
    const formation = await prisma.formation.findFirst();

    if (candidates.length < 3 || !formation) {
        console.error('Test prerequisites failed: Ensure at least 3 candidates and 1 formation exist.');
        return;
    }

    const candidateIds = candidates.map(c => c.id);
    const code = `TEST-GRP-${Date.now()}`;

    console.log('Creating group inscription for candidate IDs:', candidateIds, 'Code:', code);

    // 2. Call service method
    const groupInscription = await inscriptionService.createInscription({
        inscriptionCode: code,
        candidateIds: candidateIds,
        formationId: formation.id,
        learningMode: 'GROUPE',
        status: 'ACTIVE',
        volumeHoraire: 30
    });

    console.log('Created group inscription response keys:', Object.keys(groupInscription));

    // 3. Query DB to verify row counts
    const dbInscriptions = await prisma.inscription.findMany({
        where: {
            members: {
                some: {
                    candidateId: { in: candidateIds }
                }
            }
        },
        include: {
            group: true,
            members: true
        }
    });

    // Find the specific one by matching the group name/code
    const matched = dbInscriptions.find(ins => ins.group && ins.group.nom.includes(code));

    if (!matched) {
        console.error('FAILED: No inscription with group matching the code found.');
        return;
    }

    console.log('SUCCESS: Generated 1 Inscription with ID:', matched.id);
    console.log('SUCCESS: Generated 1 Group with name:', matched.group.nom);
    console.log('SUCCESS: Generated InscriptionCandidate rows count:', matched.members.length);

    if (matched.members.length === candidateIds.length) {
        console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
    } else {
        console.error(`FAILED: Expected ${candidateIds.length} members but got ${matched.members.length}`);
    }
}

testGroupInscriptionCreation()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
