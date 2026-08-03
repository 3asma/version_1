import prisma from './src/config/prisma.js';

async function main() {
    const result = await prisma.$queryRaw`SELECT table_name, table_schema FROM information_schema.tables WHERE table_name ILIKE '%attend%' OR table_name ILIKE '%pres%'`;
    console.log('PostgreSQL Matches:', JSON.stringify(result, null, 2));
    process.exit(0);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
