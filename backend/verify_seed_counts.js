import prisma from './src/config/prisma.js';

async function main() {
    console.log('🔍 Starting database validation query...');

    // 1. Check candidates
    const candidates = await prisma.candidate.findMany();
    console.log(`Total Candidates in Database: ${candidates.length}`);

    const seededCandidates = candidates.filter(c => c.email && c.email.includes('@demo.com'));
    console.log(`Seeded Candidates (demographics): ${seededCandidates.length}`);

    // Check unique codes
    const candidateCodes = candidates.map(c => c.candidateCode);
    const uniqueCodes = new Set(candidateCodes);
    console.log(`Unique Candidate Codes Check: ${candidateCodes.length === uniqueCodes.size ? 'PASS' : 'FAIL (duplicates detected)'}`);

    // 2. Check professors
    const professors = await prisma.professor.findMany();
    console.log(`Total Professors in Database: ${professors.length}`);

    const seededProfessors = professors.filter(p => p.email && p.email.includes('@demo.com'));
    console.log(`Seeded Professors: ${seededProfessors.length}`);

    const professorEmails = professors.map(p => p.email).filter(Boolean);
    const uniqueEmails = new Set(professorEmails);
    console.log(`Unique Professor Emails Check: ${professorEmails.length === uniqueEmails.size ? 'PASS' : 'FAIL (duplicates detected)'}`);

    console.log('✅ Validation checks query completed.');
}

main()
    .catch((error) => {
        console.error('❌ Validation query failed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
