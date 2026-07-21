import prisma from './src/config/prisma.js';
import fs from 'fs';

async function main() {
    const formations = await prisma.formation.findMany({
        select: { id: true, matiere: true, niveau: true }
    });
    fs.writeFileSync('formations_list.json', JSON.stringify(formations, null, 2));
    console.log('Done writing formations_list.json');
}

main().catch(console.error).finally(() => prisma.$disconnect());
