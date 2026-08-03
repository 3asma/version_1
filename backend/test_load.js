import fs from 'fs';

async function main() {
    try {
        console.log('Testing import of server.js...');
        await import('./src/server.js');
        console.log('Successfully imported server.js!');
    } catch (e) {
        const errorContent = `ERROR MESSAGE:\n${e.message}\n\nSTACK TRACE:\n${e.stack}`;
        fs.writeFileSync('./import_error.log', errorContent, 'utf-8');
        console.log('Wrote import_error.log');
    }
}
main();
