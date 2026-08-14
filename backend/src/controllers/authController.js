import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development_only';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const METADATA_PATH = path.join(__dirname, '../config/users_metadata.json');

const getUserMetadata = (email) => {
    try {
        if (fs.existsSync(METADATA_PATH)) {
            const metadata = JSON.parse(fs.readFileSync(METADATA_PATH, 'utf-8'));
            return metadata[email];
        }
    } catch (e) {
        console.error('Error reading metadata file:', e);
    }
    return null;
};

const writeUserMetadata = (email, data) => {
    try {
        let metadata = {};
        if (fs.existsSync(METADATA_PATH)) {
            metadata = JSON.parse(fs.readFileSync(METADATA_PATH, 'utf-8'));
        }
        metadata[email] = data;
        fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2), 'utf-8');
    } catch (e) {
        console.error('Error writing metadata file:', e);
    }
};

export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                message: 'error',
                error: 'Email and password are required.'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'error',
                error: 'Password must be at least 6 characters long.'
            });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: 'error',
                error: 'Email already used.'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const requestedRole = role || 'candidate';
        const dbRole = requestedRole === 'admin' ? 'ADMIN' : 'USER';
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: dbRole
            }
        });

        // Write metadata
        writeUserMetadata(email, {
            name: email.split('@')[0],
            status: 'active',
            role: requestedRole
        });

        // Generate token
        const token = jwt.sign(
            { userId: user.id, role: requestedRole },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Response
        return res.status(201).json({
            message: 'success',
            token,
            user: {
                id: user.id,
                email: user.email,
                role: requestedRole
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'error',
                error: 'Email and password are required.'
            });
        }

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({
                message: 'error',
                error: 'User not found.'
            });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({
                message: 'error',
                error: 'Invalid credentials.'
            });
        }

        // Check user status in metadata
        const userMeta = getUserMetadata(user.email);
        if (userMeta && userMeta.status === 'inactive') {
            return res.status(403).json({
                message: 'error',
                error: 'Account disabled. Please contact your administrator.'
            });
        }

        let resolvedRole = userMeta ? userMeta.role : (user.role === 'ADMIN' ? 'admin' : 'candidate');
        let professorId = null;

        if (resolvedRole === 'professor') {
            const professor = await prisma.professor.findFirst({
                where: { email: user.email }
            });
            if (professor) {
                professorId = professor.id;
            }
        }

        // Generate token
        const token = jwt.sign(
            { userId: user.id, role: resolvedRole },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        const permissions = readPermissionsForRole(resolvedRole);

        // Response
        return res.status(200).json({
            message: 'success',
            token,
            user: {
                id: user.id,
                email: user.email,
                role: resolvedRole,
                name: userMeta ? userMeta.name : user.email.split('@')[0],
                permissions,
                ...(professorId ? { professorId } : {})
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
};


const ROLES_PERMS_PATH = path.join(__dirname, '../config/roles_permissions.json');

const readPermissionsForRole = (role) => {
    try {
        if (fs.existsSync(ROLES_PERMS_PATH)) {
            const rolesData = JSON.parse(fs.readFileSync(ROLES_PERMS_PATH, 'utf-8'));
            return rolesData[role.toLowerCase()]?.permissions || [];
        }
    } catch (e) {
        console.error('Error reading roles permissions file:', e);
    }
    return [];
};

export const getMe = async (req, res) => {
    try {
        // req.user is populated by verifyToken middleware (using uppercase role)
        const userMeta = getUserMetadata(req.user.email);
        const resolvedRole = userMeta ? userMeta.role : req.user.role.toLowerCase();
        const permissions = readPermissionsForRole(resolvedRole);

        return res.status(200).json({
            message: 'success',
            user: {
                id: req.user.id,
                email: req.user.email,
                role: resolvedRole,
                name: userMeta ? userMeta.name : req.user.email.split('@')[0],
                permissions,
                ...(req.user.professorId ? { professorId: req.user.professorId } : {})
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'error', error: 'Name is required.' });
        }

        const userMeta = getUserMetadata(req.user.email);
        const nextMeta = {
            name,
            status: userMeta ? userMeta.status : 'active',
            role: userMeta ? userMeta.role : (req.user.role === 'ADMIN' ? 'admin' : 'candidate')
        };
        writeUserMetadata(req.user.email, nextMeta);

        return res.status(200).json({
            message: 'success',
            user: {
                id: req.user.id,
                email: req.user.email,
                role: nextMeta.role,
                name: nextMeta.name
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'error', error: error.message });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: 'error',
                error: 'Current password and new password are required.'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: 'error',
                error: 'New password must be at least 6 characters long.'
            });
        }

        const user = await prisma.user.findUnique({ where: { email: req.user.email } });
        if (!user) {
            return res.status(404).json({ message: 'error', error: 'User not found.' });
        }

        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return res.status(400).json({ message: 'error', error: 'Invalid current password.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await prisma.user.update({
            where: { email: req.user.email },
            data: { password: hashedPassword }
        });

        return res.status(200).json({ message: 'success' });
    } catch (error) {
        return res.status(500).json({ message: 'error', error: error.message });
    }
};
