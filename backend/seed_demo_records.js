import prisma from './src/config/prisma.js';

async function generateCandidateCode() {
    const year = new Date().getFullYear();
    let code;
    let exists = true;
    let attempts = 0;
    while (exists && attempts < 10) {
        const random = Math.floor(1000 + Math.random() * 9000);
        code = `CAN-${year}-${random}`;
        const found = await prisma.candidate.findUnique({ where: { candidateCode: code } });
        exists = !!found;
        attempts++;
    }
    if (exists) throw new Error('CANDIDATE_CODE_GENERATION_FAILED');
    return code;
}

async function main() {
    console.log('🌱 Starting demo data seeding...');

    // 1. Generate 15 candidates
    const dummyCandidates = [
        { firstName: 'Yasmine', lastName: 'El Mansouri', email: 'yasmine.mansouri@demo.com', phone: '+212661234567', age: 22, occupation: 'STUDENT', observation: 'ALONE', status: 'ACTIVE', gender: 'FEMALE', membershipNumber: 'MEM-2026-0001' },
        { firstName: 'Amine', lastName: 'Rachidi', email: 'amine.rachidi@demo.com', phone: '+212662987654', age: 25, occupation: 'EMPLOYEE', observation: 'ACCOMPANIED', status: 'ACTIVE', gender: 'MALE', membershipNumber: 'MEM-2026-0002' },
        { firstName: 'Sarah', lastName: 'Bennani', email: 'sarah.bennani@demo.com', phone: '+212663456789', age: 20, occupation: 'STUDENT', observation: 'ALONE', status: 'PENDING', gender: 'FEMALE', membershipNumber: 'MEM-2026-0003' },
        { firstName: 'Omar', lastName: 'Tazi', email: 'omar.tazi@demo.com', phone: '+212664567890', age: 28, occupation: 'EMPLOYEE', observation: 'ALONE', status: 'ACTIVE', gender: 'MALE', membershipNumber: 'MEM-2026-0004' },
        { firstName: 'Sofia', lastName: 'Alaoui', email: 'sofia.alaoui@demo.com', phone: '+212665678901', age: 21, occupation: 'STUDENT', observation: 'ACCOMPANIED', status: 'ACTIVE', gender: 'FEMALE', membershipNumber: 'MEM-2026-0005' },
        { firstName: 'Mehdi', lastName: 'El Fassi', email: 'mehdi.fassi@demo.com', phone: '+212666789012', age: 30, occupation: 'EMPLOYEE', observation: 'ALONE', status: 'PENDING', gender: 'MALE', membershipNumber: 'MEM-2026-0006' },
        { firstName: 'Salma', lastName: 'Ouazzani', email: 'salma.ouazzani@demo.com', phone: '+212667890123', age: 23, occupation: 'STUDENT', observation: 'ALONE', status: 'ACTIVE', gender: 'FEMALE', membershipNumber: 'MEM-2026-0007' },
        { firstName: 'Anas', lastName: 'Kabbaj', email: 'anas.kabbaj@demo.com', phone: '+212668901234', age: 26, occupation: 'EMPLOYEE', observation: 'ACCOMPANIED', status: 'ACTIVE', gender: 'MALE', membershipNumber: 'MEM-2026-0008' },
        { firstName: 'Meriem', lastName: 'Slaoui', email: 'meriem.slaoui@demo.com', phone: '+212669012345', age: 19, occupation: 'STUDENT', observation: 'ALONE', status: 'PENDING', gender: 'FEMALE', membershipNumber: 'MEM-2026-0009' },
        { firstName: 'Youssef', lastName: 'Berrada', email: 'youssef.berrada@demo.com', phone: '+212670123456', age: 32, occupation: 'EMPLOYEE', observation: 'ALONE', status: 'ACTIVE', gender: 'MALE', membershipNumber: 'MEM-2026-0010' },
        { firstName: 'Lina', lastName: 'Chraibi', email: 'lina.chraibi@demo.com', phone: '+212671234567', age: 24, occupation: 'STUDENT', observation: 'ACCOMPANIED', status: 'ACTIVE', gender: 'FEMALE', membershipNumber: 'MEM-2026-0011' },
        { firstName: 'Tariq', lastName: 'El Amrani', email: 'tariq.amrani@demo.com', phone: '+212672345678', age: 27, occupation: 'EMPLOYEE', observation: 'ALONE', status: 'ACTIVE', gender: 'MALE', membershipNumber: 'MEM-2026-0012' },
        { firstName: 'Nizar', lastName: 'Benjelloun', email: 'nizar.benjelloun@demo.com', phone: '+212673456789', age: 31, occupation: 'EMPLOYEE', observation: 'ALONE', status: 'PENDING', gender: 'MALE', membershipNumber: 'MEM-2026-0013' },
        { firstName: 'Ghita', lastName: 'Filali', email: 'ghita.filali@demo.com', phone: '+212674567890', age: 20, occupation: 'STUDENT', observation: 'ALONE', status: 'ACTIVE', gender: 'FEMALE', membershipNumber: 'MEM-2026-0014' },
        { firstName: 'Zaid', lastName: 'Semlali', email: 'zaid.semlali@demo.com', phone: '+212675678901', age: 29, occupation: 'EMPLOYEE', observation: 'ACCOMPANIED', status: 'ACTIVE', gender: 'MALE', membershipNumber: 'MEM-2026-0015' }
    ];

    console.log(`Creating ${dummyCandidates.length} new candidates...`);
    for (const c of dummyCandidates) {
        // Double check uniqueness of email
        const existingEmail = c.email ? await prisma.candidate.findUnique({ where: { email: c.email } }) : null;

        if (existingEmail) {
            console.log(`Skipping candidate ${c.firstName} ${c.lastName} (already exists).`);
            continue;
        }

        const code = await generateCandidateCode();
        const created = await prisma.candidate.create({
            data: {
                firstName: c.firstName,
                lastName: c.lastName,
                email: c.email,
                phone: c.phone,
                age: c.age,
                occupation: c.occupation,
                observation: c.observation,
                status: c.status,
                candidateCode: code
            }
        });
        console.log(`✅ Candidate [${created.candidateCode}] ${created.firstName} ${created.lastName} created.`);
    }

    // 2. Generate 5 professors
    const dummyProfessors = [
        { prenom: 'Khadija', nom: 'El Yousfi', email: 'khadija.yousfi@demo.com', telephone: '+212651111111', adresse: 'Casablanca, Maroc', type: 'permanent', dayOff: 'Sunday', maxSessions: 25 },
        { prenom: 'Mustapha', nom: 'Fadli', email: 'mustapha.fadli@demo.com', telephone: '+212652222222', adresse: 'Rabat, Maroc', type: 'vacataire', dayOff: 'Monday', maxSessions: 15 },
        { prenom: 'Fatima-Zahra', nom: 'Chakiri', email: 'fz.chakiri@demo.com', telephone: '+212653333333', adresse: 'Fès, Maroc', type: 'permanent', dayOff: 'Sunday', maxSessions: 20 },
        { prenom: 'Rachid', nom: 'Bouazza', email: 'rachid.bouazza@demo.com', telephone: '+212654444444', adresse: 'Marrakech, Maroc', type: 'permanent', dayOff: 'Sunday', maxSessions: 30 },
        { prenom: 'Nora', nom: 'Belkhayat', email: 'nora.belkhayat@demo.com', telephone: '+212655555555', adresse: 'Tangier, Maroc', type: 'vacataire', dayOff: 'Friday', maxSessions: 12 }
    ];

    console.log(`Creating ${dummyProfessors.length} new professors...`);
    for (const p of dummyProfessors) {
        const existingEmail = p.email ? await prisma.professor.findUnique({ where: { email: p.email } }) : null;

        if (existingEmail) {
            console.log(`Skipping professor ${p.prenom} ${p.nom} (already exists).`);
            continue;
        }

        const created = await prisma.professor.create({
            data: {
                nom: p.nom,
                prenom: p.prenom,
                email: p.email,
                telephone: p.telephone,
                adresse: p.adresse,
                type: p.type,
                dayOff: p.dayOff,
                maxSessions: p.maxSessions
            }
        });
        console.log(`✅ Professor ${created.prenom} ${created.nom} created.`);
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
