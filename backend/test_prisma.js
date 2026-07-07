import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Trying to create a group...');
        await prisma.group.create({
            data: {
                nom: 'Test Diagnosis Group',
                type: 'GROUPE',
                formationId: 'some-non-existent-id'
            }
        });
    } catch (error) {
        console.dir(error, { depth: null });
    } finally {
        await prisma.$disconnect();
    }
}

main();
