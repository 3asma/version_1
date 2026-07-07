import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
    const allCandidates = await prisma.candidate.findMany({
        include: { inscriptions: true },
        orderBy: { createdAt: 'desc' }
    });

    console.log(`Total Candidates in DB: ${allCandidates.length}`);
    allCandidates.forEach(c => {
        console.log(`- ${c.firstName} ${c.lastName}: ${c.inscriptions.length} inscriptions | Status: ${c.status}`);
    });

    await prisma.$disconnect();
}
run();
