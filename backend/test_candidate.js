import candidateService from './src/services/candidateService.js';
import prisma from './src/config/prisma.js';

async function test() {
    console.log('--- Testing Candidate Creation ---');
    try {
        const data = {
            firstName: 'Test',
            lastName: 'Candidate',
            age: 25,
            occupation: 'student',
            observation: 'alone',
            contact: ['phone']
        };

        console.log('Attempting to create candidate...');
        const result = await candidateService.createCandidate(data);
        console.log('Success!', result.candidateCode);

        // Cleanup
        await prisma.candidate.delete({ where: { id: result.id } });
        console.log('Cleanup successful.');
    } catch (error) {
        console.error('Creation failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

test();
