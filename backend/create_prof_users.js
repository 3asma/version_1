import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import prisma from './src/config/prisma.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const METADATA_PATH = path.join(__dirname, 'src/config/users_metadata.json');

async function main() {
    console.log('🌱 Checking professors...');
    const professors = await prisma.professor.findMany();
    const existingUsers = await prisma.user.findMany({ select: { email: true } });
    const userEmails = new Set(existingUsers.map(u => u.email.toLowerCase()));

    const password = 'demo';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Read metadata
    let metadata = {};
    if (fs.existsSync(METADATA_PATH)) {
        metadata = JSON.parse(fs.readFileSync(METADATA_PATH, 'utf-8'));
    }

    let createdCount = 0;

    for (const p of professors) {
        if (!p.email) {
            console.log(`Skipping professor ${p.prenom} ${p.nom} (no email).`);
            continue;
        }

        const emailLower = p.email.toLowerCase();
        if (!userEmails.has(emailLower)) {
            console.log(`Creating user database record for ${p.prenom} ${p.nom} (${p.email})...`);
            await prisma.user.create({
                data: {
                    email: p.email,
                    password: hashedPassword,
                    role: 'USER'
                }
            });

            metadata[p.email] = {
                name: `${p.prenom} ${p.nom}`,
                status: 'active',
                role: 'professor'
            };
            createdCount++;
        } else {
            // Also ensure they are in metadata as professor
            if (!metadata[p.email] || !metadata[p.email].role) {
                metadata[p.email] = {
                    name: `${p.prenom} ${p.nom}`,
                    status: 'active',
                    role: 'professor'
                };
                createdCount++;
            }
            console.log(`User/metadata already exists for ${p.email}`);
        }
    }

    // Write back metadata
    fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2), 'utf-8');
    console.log(`✅ Completed. Created/updated ${createdCount} professor accounts.`);
}

main()
    .catch((error) => {
        console.error('❌ Script failed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
