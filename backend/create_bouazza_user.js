import prisma from './src/config/prisma.js';
import bcrypt from 'bcrypt';

async function main() {
    console.log('--- CREATING USER ACCOUNT FOR PROFESSOR BOUAZZA RACHID ---');

    // 1. Find or create Professor record
    let prof = await prisma.professor.findFirst({
        where: {
            nom: 'Bouazza',
            prenom: 'Rachid'
        }
    });

    if (!prof) {
        console.log('Professor Rachid Bouazza not found. Creating record...');
        prof = await prisma.professor.create({
            data: {
                prenom: 'Rachid',
                nom: 'Bouazza',
                email: 'rachid.bouazza@demo.com',
                telephone: '+212654444444',
                adresse: 'Marrakech, Maroc',
                type: 'permanent',
                dayOff: 'Sunday',
                maxSessions: 30
            }
        });
        console.log('✅ Created Professor record.');
    } else {
        console.log(`Professor Rachid Bouazza exists with ID: ${prof.id} and Email: ${prof.email}`);
    }

    const email = prof.email || 'rachid.bouazza@demo.com';
    const rawPassword = 'demo';

    // 2. Check if User record exists
    let user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        console.log(`User account for ${email} not found. Creating...`);
        const hashedPassword = await bcrypt.hash(rawPassword, 10);
        user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: 'USER'
            }
        });
        console.log('✅ Created User record.');
    } else {
        console.log(`User account for ${email} already exists.`);
    }

    console.log('\n--- LOGIN INFORMATION ---');
    console.log(`Email/Login: ${email}`);
    console.log(`Password: ${rawPassword}`);
    console.log('------------------------');
}

main()
    .catch(err => {
        console.error('Error creating user:', err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
