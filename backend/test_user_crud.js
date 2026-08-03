import fs from 'fs';

async function test() {
    try {
        console.log('🏁 Starting User CRUD backend verification...');

        // 1. Login as Admin
        const loginRes = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@formation.com', password: 'demo' })
        });
        const loginData = await loginRes.json();
        if (loginRes.status !== 200 || !loginData.token) {
            throw new Error(`Admin login failed: ${JSON.stringify(loginData)}`);
        }
        const token = loginData.token;
        const adminId = loginData.user.id;
        console.log('✅ Admin authenticated successfully.');

        // 2. Fetch all users
        const getRes = await fetch('http://localhost:5000/users', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const getData = await getRes.json();
        if (getRes.status !== 200) {
            throw new Error(`GET /users failed: status ${getRes.status}, data: ${JSON.stringify(getData)}`);
        }
        console.log(`✅ GET /users returned 200. Total users found: ${getData.data.length}`);

        // 3. Create a new user
        const createEmail = `test_crud_${Date.now()}@formation.com`;
        const createRes = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: createEmail,
                password: 'password123',
                name: 'Test CRUD User',
                role: 'agent_reception',
                status: 'active'
            })
        });
        const createData = await createRes.json();
        if (createRes.status !== 201) {
            throw new Error(`POST /users failed: status ${createRes.status}, data: ${JSON.stringify(createData)}`);
        }
        const testUserId = createData.data.id;
        console.log(`✅ User created via POST /users. ID: ${testUserId}`);

        // 4. Disable the user
        const patchRes = await fetch(`http://localhost:5000/users/${testUserId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: 'inactive'
            })
        });
        const patchData = await patchRes.json();
        if (patchRes.status !== 200 || patchData.data.status !== 'inactive') {
            throw new Error(`PATCH /users/:id failed to deactivate: status ${patchRes.status}, data: ${JSON.stringify(patchData)}`);
        }
        console.log('✅ User deactivated via PATCH /users/:id.');

        // 5. Test logging in with deactivated user
        const testLoginRes = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: createEmail, password: 'password123' })
        });
        const testLoginData = await testLoginRes.json();
        if (testLoginRes.status !== 403) {
            throw new Error(`Deactivated user login check failed: expected 403, got ${testLoginRes.status}. Data: ${JSON.stringify(testLoginData)}`);
        }
        console.log(`✅ Login blocked successfully for deactivated user (status: ${testLoginRes.status}, block msg: "${testLoginData.error}").`);

        // 6. Attempt deleting self (admin)
        const deleteSelfRes = await fetch(`http://localhost:5000/users/${adminId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const deleteSelfData = await deleteSelfRes.json();
        if (deleteSelfRes.status !== 400) {
            throw new Error(`Admin self-deletion prevention failed: expected 400, got ${deleteSelfRes.status}`);
        }
        console.log(`✅ Admin self-deletion prevented successfully (status: ${deleteSelfRes.status}, msg: "${deleteSelfData.error}").`);

        // 7. Delete test user
        const deleteRes = await fetch(`http://localhost:5000/users/${testUserId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const deleteData = await deleteRes.json();
        if (deleteRes.status !== 200) {
            throw new Error(`DELETE /users/:id failed: status ${deleteRes.status}, data: ${JSON.stringify(deleteData)}`);
        }
        console.log('✅ Test user deleted successfully using DELETE /users/:id.');

        console.log('🎉 All backend tests passed successfully!');
    } catch (e) {
        console.error('❌ Verification script failed:', e.message);
        process.exit(1);
    }
}

test();
