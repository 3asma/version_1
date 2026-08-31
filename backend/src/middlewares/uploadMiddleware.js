import multer from 'multer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const rawDir = process.env.NODE_ENV === 'test' ? 'uploads/cheques_test' : 'uploads/cheques';
        const uploadDir = path.resolve(rawDir);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, rawDir);
    },
    filename: (req, file, cb) => {
        const uuid = crypto.randomUUID();
        cb(null, `CHEQUE_${uuid}.pdf`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('INVALID_FILE_TYPE'), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    }
});

