import prisma from './src/config/prisma.js';
import fs from 'fs';

async function main() {
    const logs = [];
    const log = (msg) => {
        console.log(msg);
        logs.push(msg);
    };

    log('🔍 Starting database inscriptions verification...');

    const ourCodes = [
        'INS-2026-M001',
        'INS-2026-M002',
        'INS-2026-M003',
        'INS-2026-B001',
        'INS-2026-B002',
        'INS-2026-G001',
        'INS-2026-G002',
        'INS-2026-S001'
    ];

    // Fetch only the groups created by our seed
    const groups = await prisma.learningGroup.findMany({
        where: { inscriptionCode: { in: ourCodes } },
        include: { inscriptions: true }
    });

    log(`Total seeded LearningGroups found: ${groups.length}`);
    log(`Expected: 8`);

    const result = {
        MONOME: 0,
        BINOME: 0,
        GROUPE: 0,
        SPECIFIQUE: 0
    };

    let pass = true;

    for (const g of groups) {
        let mode = g.learningMode;
        if (g.groupName.toLowerCase().includes('spécifique')) {
            mode = 'SPECIFIQUE';
        }

        result[mode]++;

        const memberCount = g.inscriptions.length;
        log(`Group Name: "${g.groupName}" | Mode: ${mode} | Members Count: ${memberCount}`);

        if (mode === 'MONOME' && memberCount !== 1) {
            log(`❌ ERROR: MONOME has ${memberCount} members (expected 1)`);
            pass = false;
        } else if (mode === 'SPECIFIQUE' && memberCount !== 1) {
            log(`❌ ERROR: SPECIFIQUE has ${memberCount} members (expected 1)`);
            pass = false;
        } else if (mode === 'BINOME' && memberCount !== 2) {
            log(`❌ ERROR: BINOME has ${memberCount} members (expected 2)`);
            pass = false;
        } else if (mode === 'GROUPE' && (memberCount < 3 || memberCount > 5)) {
            log(`❌ ERROR: GROUPE has ${memberCount} members (expected 3-5)`);
            pass = false;
        }
    }

    log('\n--- Distribution Totals ---');
    log(`MONOME: ${result.MONOME} (expected 3)`);
    log(`BINOME: ${result.BINOME} (expected 2)`);
    log(`GROUPE: ${result.GROUPE} (expected 2)`);
    log(`SPECIFIQUE: ${result.SPECIFIQUE} (expected 1)`);

    if (result.MONOME === 3 && result.BINOME === 2 && result.GROUPE === 2 && result.SPECIFIQUE === 1 && pass) {
        log('\n✅ ALL DATABASE VALIDATION CHECKS PASSED!');
    } else {
        log('\n❌ DATABASE VALIDATION CHECKS FAILED!');
    }

    fs.writeFileSync('verify_results.txt', logs.join('\n'), 'utf8');
}

main().catch(console.error).finally(() => prisma.$disconnect());
