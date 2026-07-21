import fs from 'fs';

async function main() {
    try {
        const loginRes = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@formation.com', password: 'demo' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;

        const endpoints = [
            '/prospects',
            '/commercials',
            '/candidates',
            '/inscriptions',
            '/formations',
            '/rooms',
            '/professors',
            '/reservations',
            '/payments'
        ];

        console.log('Testing endpoints:');
        let fileContent = '';
        for (const ep of endpoints) {
            try {
                const res = await fetch(`http://localhost:5000${ep}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const body = await res.json();
                const logLine = `- ${ep}: status ${res.status}, message: ${body.message}, error: ${body.error || 'none'}\n`;
                fileContent += logLine;
                console.log(logLine.trim());
            } catch (e) {
                const logLine = `- ${ep}: ERROR ${e.message}\n`;
                fileContent += logLine;
                console.log(logLine.trim());
            }
        }
        fs.writeFileSync('endpoints_output.txt', fileContent, 'utf-8');
    } catch (error) {
        console.error('Core failure:', error);
    }
}

main();
