import fs from 'fs';
const content = fs.readFileSync('test_output.log', 'utf16le');
// Clean up carriage returns, control codes, etc.
const lines = content.split('\r\n');
for (const line of lines) {
    console.log(line);
}
