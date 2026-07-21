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

        const res = await fetch('http://localhost:5000/candidates', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const status = res.status;
        const body = await res.json();
        fs.writeFileSync('api_debug.txt', JSON.stringify({ status, body }, null, 2), 'utf-8');
        console.log('Done writing api_debug.txt');
    } catch (error) {
        fs.writeFileSync('api_debug.txt', error.stack || String(error), 'utf-8');
        console.error('Error:', error);
    }
}

main();
