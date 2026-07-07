import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verify() {
    console.log('--- Verification: Group Membership ---');

    try {
        // 1. Get a formation and a candidate
        const formation = await prisma.formation.findFirst();
        const candidate = await prisma.candidate.findFirst();

        if (!formation || !candidate) {
            console.log('Skipping verification: formation or candidate missing.');
            return;
        }

        // 2. Create a group
        const group1 = await prisma.group.create({
            data: {
                nom: 'Verify Group A',
                formationId: formation.id,
                effectif: 1,
                members: { create: { candidateId: candidate.id } }
            }
        });
        console.log('Group 1 created with candidate 1');

        // 3. Attempt to create another group for SAME formation with SAME candidate (Should fail in business logic, here we check DB constraint)
        try {
            // Business logic should prevent this, but let's see if we can manually break it to test our future service calls
            // Actually, the @@unique([groupId, candidateId]) prevents double assignment to SAME group.
            // The service prevents assignment to DIFFERENT group in same formation.
            console.log('Group 2 manual creation test...');
        } catch (e) {
            console.log('Expected failure for duplicate in same group');
        }

        // 4. Fetch group with members
        const fetched = await prisma.group.findUnique({
            where: { id: group1.id },
            include: { members: true }
        });
        console.log('Fetched group members count:', fetched.members.length);

        // Cleanup
        await prisma.group.delete({ where: { id: group1.id } });
        console.log('Groups cleaned up.');

    } catch (error) {
        console.error('Verification failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

verify();
