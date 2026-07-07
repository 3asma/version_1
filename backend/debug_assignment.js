import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
    const memberships = await prisma.groupCandidate.findMany({
        include: {
            group: { include: { formation: true } },
            candidate: true
        }
    });

    console.log(`Total memberships in DB: ${memberships.length}`);
    memberships.forEach(m => {
        console.log(`- Group: ${m.group.nom} (${m.group.formation.subject}) | Candidate: ${m.candidate.firstName} ${m.candidate.lastName}`);
    });

    const latestGroups = await prisma.group.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { members: { include: { candidate: true } } }
    });

    console.log('\nLast 5 Groups:');
    latestGroups.forEach(g => {
        console.log(`- ${g.nom} (ID: ${g.id}, Effectif: ${g.effectif})`);
        console.log(`  Members: ${g.members.map(m => m.candidate.firstName + ' ' + m.candidate.lastName).join(', ') || 'NONE'}`);
    });

    await prisma.$disconnect();
}
run();
