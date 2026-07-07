import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
    const allCandidates = await prisma.candidate.findMany({
        include: { inscriptions: true },
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    console.log('Last 10 candidates:');
    allCandidates.forEach(c => {
        console.log(`- ${c.firstName} ${c.lastName}: ${c.inscriptions.length} inscriptions (${c.status})`);
    });

    await prisma.$disconnect();
}
run();
