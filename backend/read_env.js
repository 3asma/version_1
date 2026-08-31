import fs from 'fs';
const envContent = fs.readFileSync('.env', 'utf8');
console.log('LENGTH:', envContent.length);
console.log('LINES:');
envContent.split('\n').forEach((line, index) => {
    console.log(`[Line ${index + 1}]: ${line}`);
});
