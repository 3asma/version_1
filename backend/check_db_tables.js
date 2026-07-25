import prisma from './src/config/prisma.js';

async function main() {
    const tables = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
          AND table_name NOT LIKE '_prisma_migrations';
    `;
    console.log('TABLES_IN_DB:', JSON.stringify(tables.map(t => t.table_name)));
}

main()
    .catch(err => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
