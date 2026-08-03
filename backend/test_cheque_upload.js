import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTests() {
    console.log('--- STARTING CHEQUE UPLOAD API VERIFICATION ---');
    try {
        // 1. LOGIN
        const loginRes = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@formation.com', password: 'demo' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        if (!token) {
            console.error('Authentication failed, no token received');
            return;
        }
        console.log('Authenticated successfully!');

        // 2. FETCH DEPENDENT DATA
        const authHeaders = { 'Authorization': `Bearer ${token}` };
        const candidatesRes = await fetch('http://localhost:5000/candidates', { headers: authHeaders });
        const candidatesData = await candidatesRes.json();
        const candidateId = candidatesData.data?.[0]?.id;

        const formationsRes = await fetch('http://localhost:5000/formations', { headers: authHeaders });
        const formationsData = await formationsRes.json();
        const formationId = formationsData.data?.[0]?.id;

        if (!candidateId || !formationId) {
            console.error('Candidate or Formation data missing. Populate them first.');
            return;
        }
        console.log(`Found candidateId: ${candidateId}, formationId: ${formationId}`);

        // Helper to format multipart request manually for maximum compatibility
        function createMultipartRequest(fields, files) {
            const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
            const parts = [];

            for (const [key, val] of Object.entries(fields)) {
                parts.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${val}\r\n`));
            }

            for (const [key, file] of Object.entries(files)) {
                parts.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"; filename="${file.filename}"\r\nContent-Type: ${file.contentType}\r\n\r\n`));
                parts.push(file.buffer);
                parts.push(Buffer.from('\r\n'));
            }

            parts.push(Buffer.from(`--${boundary}--\r\n`));
            return {
                headers: {
                    ...authHeaders,
                    'Content-Type': `multipart/form-data; boundary=${boundary}`
                },
                body: Buffer.concat(parts)
            };
        }

        // Test Case A: Create cheque payment WITHOUT PDF file
        console.log('\n--- Test A: CHEQUE payment without PDF file ---');
        const fieldsA = {
            candidateId,
            formationId,
            amount: '350',
            paymentMethod: 'CHEQUE',
            checkDueDate: new Date().toISOString()
        };
        const reqA = createMultipartRequest(fieldsA, {});
        const resA = await fetch('http://localhost:5000/payments', {
            method: 'POST',
            headers: reqA.headers,
            body: reqA.body
        });
        console.log('Status:', resA.status);
        const dataA = await resA.json();
        console.log('Response:', dataA);
        if (resA.status === 400 && dataA.error === 'Cheque PDF file is required') {
            console.log('SUCCESS: Missing PDF request correctly rejected!');
        } else {
            console.error('FAIL: Missing PDF request verification failed.');
        }

        // Test Case B: Create cheque payment with INVALID file format (e.g. TEXT file instead of PDF)
        console.log('\n--- Test B: CHEQUE payment with invalid file format (text/plain) ---');
        const textBuffer = Buffer.from('this is a text file content');
        const reqB = createMultipartRequest(fieldsA, {
            chequeFile: {
                filename: 'test_cheque.txt',
                contentType: 'text/plain',
                buffer: textBuffer
            }
        });
        const resB = await fetch('http://localhost:5000/payments', {
            method: 'POST',
            headers: reqB.headers,
            body: reqB.body
        });
        console.log('Status:', resB.status);
        const dataB = await resB.json();
        console.log('Response:', dataB);
        if (resB.status === 400 && dataB.error === 'INVALID_FILE_TYPE') {
            console.log('SUCCESS: Text file upload correctly rejected!');
        } else {
            console.error('FAIL: Text file upload verification failed.');
        }

        // Test Case C: Create cheque payment with TOO LARGE file (>10MB)
        console.log('\n--- Test C: CHEQUE payment with file > 10MB ---');
        // Let's create an 11MB buffer (11 * 1024 * 1024 bytes)
        const largeBuffer = Buffer.alloc(11 * 1024 * 1024, 'X');
        const reqC = createMultipartRequest(fieldsA, {
            chequeFile: {
                filename: 'large_cheque.pdf',
                contentType: 'application/pdf',
                buffer: largeBuffer
            }
        });
        const resC = await fetch('http://localhost:5000/payments', {
            method: 'POST',
            headers: reqC.headers,
            body: reqC.body
        });
        console.log('Status:', resC.status);
        const dataC = await resC.json();
        console.log('Response:', dataC);
        if (resC.status === 400 && dataC.error.includes('10 MB')) {
            console.log('SUCCESS: Large PDF file upload correctly rejected!');
        } else {
            console.error('FAIL: Large PDF file upload verification failed.');
        }

        // Test Case D: Create cheque payment with VALID PDF file (<10MB)
        console.log('\n--- Test D: CHEQUE payment with valid PDF file ---');
        const validPDFBuffer = Buffer.from('%PDF-1.4 ... valid mock PDF content');
        const reqD = createMultipartRequest(fieldsA, {
            chequeFile: {
                filename: 'valid_cheque.pdf',
                contentType: 'application/pdf',
                buffer: validPDFBuffer
            }
        });
        const resD = await fetch('http://localhost:5000/payments', {
            method: 'POST',
            headers: reqD.headers,
            body: reqD.body
        });
        console.log('Status:', resD.status);
        const dataD = await resD.json();
        console.log('Response:', dataD);
        if (resD.status === 201 && dataD.data && dataD.data.chequeFile) {
            console.log('SUCCESS: Cheque payment and PDF uploaded successfully!');
            const savedPath = dataD.data.chequeFile;
            console.log('Saved cheque path in DB:', savedPath);

            // Test Case E: Verify file access
            console.log('\n--- Test E: Access uploaded cheque file ---');
            const fileRes = await fetch(`http://localhost:5000/${savedPath}`);
            console.log(`Access Status: ${fileRes.status} (Expected: 200)`);
            if (fileRes.status === 200) {
                console.log('SUCCESS: Uploaded cheque file is accessible!');
            } else {
                console.error('FAIL: Uploaded cheque file is not accessible.');
            }

            // Cleanup/Delete the test payment
            console.log('\nCleaning up created test records from DB...');
            const cleanupRes = await fetch(`http://localhost:5000/payments/${dataD.data.id}`, {
                method: 'DELETE',
                headers: authHeaders
            });
            console.log(`Cleanup/Delete Status: ${cleanupRes.status} (Expected: 204 or 200)`);

            // Delete local physical file if it remains
            const absoluteSavedPath = path.resolve(__dirname, savedPath);
            if (fs.existsSync(absoluteSavedPath)) {
                fs.unlinkSync(absoluteSavedPath);
                console.log('SUCCESS: Cleaned up physical file from disk.');
            }
        } else {
            console.error('FAIL: Valid cheque payment creation failed.');
        }

    } catch (e) {
        console.error('Error during testing:', e);
    }
}

runTests();
