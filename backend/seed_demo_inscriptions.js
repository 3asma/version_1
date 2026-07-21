import prisma from './src/config/prisma.js';
import InscriptionService from './src/services/inscriptionService.js';

async function main() {
    console.log('🌱 Starting inscriptions seeding...');

    // 1. Fetch the 15 demo candidates we created
    const candidates = await prisma.candidate.findMany({
        where: { email: { endsWith: '@demo.com' } },
        orderBy: { email: 'asc' }
    });

    if (candidates.length < 15) {
        throw new Error(`Expected at least 15 demo candidates, found ${candidates.length}. Please run candidate seed first.`);
    }

    // 2. Fetch the 5 demo professors we created
    const professors = await prisma.professor.findMany({
        where: { email: { endsWith: '@demo.com' } },
        orderBy: { email: 'asc' }
    });

    if (professors.length < 5) {
        throw new Error(`Expected at least 5 demo professors, found ${professors.length}. Please run candidate/professor seed first.`);
    }

    // 3. Fetch French and English formations
    const frenchFormations = await prisma.formation.findMany({
        where: { matiere: 'Français' },
        orderBy: { niveau: 'asc' }
    });

    const englishFormations = await prisma.formation.findMany({
        where: { matiere: 'Anglais' },
        orderBy: { niveau: 'asc' }
    });

    if (frenchFormations.length === 0 || englishFormations.length === 0) {
        throw new Error('Could not find existing Français or Anglais Formations in the database.');
    }

    // Helpers to distribute formations & professors to groups
    const getFrenchFormation = (index) => frenchFormations[index % frenchFormations.length];
    const getEnglishFormation = (index) => englishFormations[index % englishFormations.length];

    // Map:
    // Prof 0: Khadija El Yousfi (English/Anglais)
    // Prof 1: Mustapha Fadli (French)
    // Prof 2: Fatima-Zahra Chakiri (French/IT)
    // Prof 3: Rachid Bouazza (Maths) -> can teach French or English
    // Prof 4: Nora Belkhayat (Physique) -> can teach French or English

    // Group configurations matching specifications:
    // 3 MONOME (1 candidate each)
    // 2 BINOME (2 candidates each)
    // 2 GROUPE (3-5 candidates each)
    // 1 SPECIFIQUE (1 candidate)
    // Total: 15 candidate assignments
    const groupSpecs = [
        {
            code: 'INS-2026-M001',
            mode: 'MONOME',
            groupName: `Monôme ${candidates[0].firstName} ${candidates[0].lastName}`,
            candidateIndices: [0],
            formation: getFrenchFormation(0), // Français
            professor: professors[1], // Mustapha Fadli
            date: new Date('2026-07-01')
        },
        {
            code: 'INS-2026-M002',
            mode: 'MONOME',
            groupName: `Monôme ${candidates[1].firstName} ${candidates[1].lastName}`,
            candidateIndices: [1],
            formation: getEnglishFormation(0), // Anglais
            professor: professors[0], // Khadija El Yousfi
            date: new Date('2026-07-02')
        },
        {
            code: 'INS-2026-M003',
            mode: 'MONOME',
            groupName: `Monôme ${candidates[2].firstName} ${candidates[2].lastName}`,
            candidateIndices: [2],
            formation: getFrenchFormation(1), // Français
            professor: professors[2], // Fatima-Zahra Chakiri
            date: new Date('2026-07-03')
        },
        {
            code: 'INS-2026-B001',
            mode: 'BINOME',
            groupName: 'Binôme Alpha',
            candidateIndices: [3, 4],
            formation: getEnglishFormation(1), // Anglais
            professor: professors[0], // Khadija El Yousfi
            date: new Date('2026-07-04')
        },
        {
            code: 'INS-2026-B002',
            mode: 'BINOME',
            groupName: 'Binôme Beta',
            candidateIndices: [5, 6],
            formation: getFrenchFormation(2), // Français
            professor: professors[1], // Mustapha Fadli
            date: new Date('2026-07-05')
        },
        {
            code: 'INS-2026-G001',
            mode: 'GROUPE',
            groupName: 'Groupe Anglais A',
            candidateIndices: [7, 8, 9], // 3 candidates
            formation: getEnglishFormation(2), // Anglais
            professor: professors[3], // Rachid Bouazza
            date: new Date('2026-07-06')
        },
        {
            code: 'INS-2026-G002',
            mode: 'GROUPE',
            groupName: 'Groupe Débutant B',
            candidateIndices: [10, 11, 12, 13], // 4 candidates
            formation: getFrenchFormation(3), // Français
            professor: professors[4], // Nora Belkhayat
            date: new Date('2026-07-07')
        },
        {
            code: 'INS-2026-S001',
            mode: 'SPECIFIQUE',
            groupName: 'Session Spécifique Ahmed',
            candidateIndices: [14], // 1 candidate
            formation: getEnglishFormation(3), // Anglais
            professor: professors[0], // Khadija El Yousfi
            date: new Date('2026-07-08')
        }
    ];

    console.log(`Setting up ${groupSpecs.length} LearningGroups...`);

    for (const spec of groupSpecs) {
        console.log(`Setting up group [${spec.code}] mode ${spec.mode} - "${spec.groupName}"`);

        // Use InscriptionService to create the inscription of each candidate in the group.
        // It will automatically handle group creation (or linking) inside the transaction.
        for (const cIdx of spec.candidateIndices) {
            const candidate = candidates[cIdx];
            const data = {
                inscriptionCode: spec.code,
                candidateId: candidate.id,
                formationId: spec.formation.id,
                professorId: spec.professor.id,
                learningMode: spec.mode,
                groupName: spec.groupName,
                status: 'ACTIVE',
                dateInscription: spec.date,
                note: `Demo inscription for ${candidate.firstName} ${candidate.lastName} in ${spec.groupName}`,
                duration: 6,
                price: 1200,
                volumeHoraire: 72,
                remainingHours: 72
            };

            const created = await InscriptionService.createInscription(data);
            console.log(`  └ Linked candidate [${candidate.candidateCode}] ${candidate.firstName} ${candidate.lastName} to Group ID: ${created.learningGroupId}`);
        }
    }

    console.log('🎉 Seeding successfully completed!');
}

main()
    .catch((error) => {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
