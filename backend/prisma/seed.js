import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = 'demo';
    const hashedPassword = await bcrypt.hash(password, 10);

    const users = [
        { email: 'admin@formation.com', role: 'ADMIN' },
        { email: 'reception@formation.com', role: 'USER' },
        { email: 'reservation@formation.com', role: 'USER' },
        { email: 'prof@formation.com', role: 'USER' },
        { email: 'candidat@formation.com', role: 'USER' },
    ];

    console.log('🌱 Seeding users...');

    for (const u of users) {
        await prisma.user.upsert({
            where: { email: u.email },
            update: {
                password: hashedPassword
            },
            create: {
                email: u.email,
                password: hashedPassword,
                role: u.role,
            },
        });
    }

    console.log('✅ Seed finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
