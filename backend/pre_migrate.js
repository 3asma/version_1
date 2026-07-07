import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('--- Executing safe pre-migration SQL ---');

    try {
        await prisma.$executeRawUnsafe('ALTER TABLE "Inscription" RENAME COLUMN "statut" TO "status";');
        console.log('SUCCESS: Renamed column "statut" to "status" in Inscription.');
    } catch (e) {
        console.log('INFO: Column "statut" already renamed or not found:', e.message);
    }

    try {
        await prisma.$executeRawUnsafe("ALTER TYPE \"InscriptionStatus\" ADD VALUE 'WAITING';");
        console.log('SUCCESS: Added WAITING to InscriptionStatus enum.');
    } catch (e) {
        console.log('INFO: WAITING already exists or failed:', e.message);
    }

    try {
        await prisma.$executeRawUnsafe("ALTER TYPE \"InscriptionStatus\" ADD VALUE 'ASSIGNED';");
        console.log('SUCCESS: Added ASSIGNED to InscriptionStatus enum.');
    } catch (e) {
        console.log('INFO: ASSIGNED already exists or failed:', e.message);
    }

    console.log('--- Pre-migration SQL finished ---');
}

main()
    .catch(e => {
        console.error('Pre-migration error:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
