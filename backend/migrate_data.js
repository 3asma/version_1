import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('--- Migrating existing active inscriptions ---');
    try {
        const inscriptions = await prisma.inscription.findMany();
        console.log(`Found ${inscriptions.length} inscriptions.`);
        for (const ins of inscriptions) {
            let newStatus = ins.status;
            let newGroupId = ins.groupId;

            // Check if they are in a Group for this formation via GroupCandidate
            const candidateInGroup = await prisma.groupCandidate.findFirst({
                where: {
                    candidateId: ins.candidateId,
                    group: { formationId: ins.formationId }
                },
                include: {
                    group: true
                }
            });

            if (ins.status === 'ACTIVE') {
                if (candidateInGroup) {
                    newStatus = 'ASSIGNED';
                    newGroupId = candidateInGroup.groupId;
                    console.log(`Mapping active Inscription ${ins.id} -> ASSIGNED (group: ${candidateInGroup.group.nom})`);
                } else {
                    newStatus = 'WAITING';
                    console.log(`Mapping active Inscription ${ins.id} -> WAITING`);
                }
            } else {
                console.log(`Inscription ${ins.id} has status ${ins.status}. Keeping as is.`);
            }

            await prisma.inscription.update({
                where: { id: ins.id },
                data: {
                    status: newStatus,
                    groupId: newGroupId,
                    learningMode: ins.learningMode || 'GROUPE'
                }
            });
        }
        console.log('--- Inscription data migration finished successfully ---');
    } catch (e) {
        console.error('Migration failed:', e);
    }
}

main()
    .catch(e => {
        console.error('Uncaught error in migration:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
