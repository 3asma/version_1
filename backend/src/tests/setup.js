import dotenv from 'dotenv';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load configuration from backend/.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const testUrl = process.env.DATABASE_URL_TEST;

if (!testUrl || testUrl.trim() === '') {
    console.error('\n========================================================================');
    console.error('FATAL ERROR: DATABASE_URL_TEST is not configured in backend/.env!');
    console.error('To protect the development database, tests cannot be executed.');
    console.error('========================================================================\n');
    throw new Error('DATABASE_URL_TEST is missing or empty.');
}

// Strictly override current DATABASE_URL
process.env.DATABASE_URL = testUrl;

// Deploy migrations dynamically in the test environment (once per process)
if (!global.__PRISMA_MIGRATED__) {
    console.log('\n[TEST SETUP] ========================================================');
    console.log('[TEST SETUP] Overriding DATABASE_URL to DATABASE_URL_TEST.');
    console.log(`[TEST SETUP] Target Database URL: ${process.env.DATABASE_URL}`);
    try {
        console.log('[TEST SETUP] Pushing schemas using Prisma db push...');
        execSync('npx prisma db push --accept-data-loss --skip-generate', {
            cwd: path.resolve(__dirname, '../../'),
            stdio: 'inherit',
            env: {
                ...process.env,
                DATABASE_URL: testUrl
            }
        });

        console.log('[TEST SETUP] Seeding baseline database records...');
        execSync('node prisma/seed.js', {
            cwd: path.resolve(__dirname, '../../'),
            stdio: 'inherit',
            env: {
                ...process.env,
                DATABASE_URL: testUrl
            }
        });

        global.__PRISMA_MIGRATED__ = true;
        console.log('\n[TEST SETUP] Prisma migrations deployed and database seeded successfully.\n');
    } catch (e) {
        console.error('\n[TEST SETUP] Failed to deploy migrations:', e.message);
        throw e;
    }
}
