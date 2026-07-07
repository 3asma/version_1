import prisma from './src/config/prisma.js';

async function main() {
    try {
        const migrations = await prisma.$queryRaw`SELECT * FROM "_prisma_migrations" ORDER BY "applied_steps_count" DESC`;
        console.log('Applied Migrations in DB:', migrations);
    } catch (error) {
        console.error('Error querying migrations:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
