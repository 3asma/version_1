import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
    const candidates = await prisma.candidate.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { inscriptions: true }
    });
    console.log('Last 5 candidates and their inscriptions:');
    candidates.forEach(c => {
        console.log(`${c.firstName} ${c.lastName}: ${c.inscriptions.length} inscriptions`);
        c.inscriptions.forEach(i => console.log(`  - Formation ID: ${i.formationId}, Status: ${i.status}`));
    });
    await prisma.$disconnect();
}
run();
