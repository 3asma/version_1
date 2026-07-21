async function test() {
    try {
        const res = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@formation.com', password: 'demo' })
        });
        const json = await res.json();
        console.log('Response status:', res.status);
        console.log('Response body:', JSON.stringify(json, null, 2));
    } catch (err) {
        console.error('Error during fetch:', err);
    }
}
test();
