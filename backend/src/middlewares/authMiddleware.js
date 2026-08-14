import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import prisma from '../config/prisma.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development_only';
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

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'error',
                error: 'Access denied. No token provided.'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
        });

        if (!user) {
            return res.status(401).json({
                message: 'error',
                error: 'User not found or invalid token.'
            });
        }

        // Check user status in metadata
        const userMeta = getUserMetadata(user.email);
        if (userMeta && userMeta.status === 'inactive') {
            return res.status(401).json({
                message: 'error',
                error: 'Account disabled. Please contact your administrator.'
            });
        }

        // Attach user to request (excluding password)
        const { password, ...userWithoutPassword } = user;

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

        req.user = {
            ...userWithoutPassword,
            role: resolvedRole.toUpperCase(),
            professorId
        };

        next();
    } catch (error) {
        let errorMessage = 'Invalid token.';
        if (error.name === 'TokenExpiredError') {
            errorMessage = 'Token expired.';
        }

        return res.status(401).json({
            message: 'error',
            error: errorMessage
        });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        return res.status(403).json({
            message: 'error',
            error: 'Access denied. Admin role required.'
        });
    }
};

export const requirePermission = (permission, options = {}) => {
    return async (req, res, next) => {
        // ADMIN gets full access automatically
        if (req.user && req.user.role === 'ADMIN') {
            return next();
        }

        if (!req.user || !req.user.role) {
            return res.status(403).json({
                message: 'error',
                error: 'Access denied. No role profile found.'
            });
        }

        const role = req.user.role;

        // Special case: CANDIDATE own profile access
        if (role === 'CANDIDATE' && options.allowOwnCandidate) {
            try {
                const candidateId = req.params.id;
                if (candidateId) {
                    const candidate = await prisma.candidate.findUnique({
                        where: { id: candidateId }
                    });
                    if (candidate && candidate.email && req.user.email &&
                        candidate.email.toLowerCase() === req.user.email.toLowerCase()) {
                        return next();
                    }
                }
            } catch (err) {
                console.error('Error checking own candidate profile:', err);
            }
        }

        const roleStr = req.user.role.toLowerCase();

        try {
            const rolesPermsPath = path.join(__dirname, '../config/roles_permissions.json');
            if (fs.existsSync(rolesPermsPath)) {
                const rolesPerms = JSON.parse(fs.readFileSync(rolesPermsPath, 'utf-8'));
                const activeRoleConfig = rolesPerms[roleStr];
                if (activeRoleConfig && activeRoleConfig.permissions.includes(permission)) {
                    return next();
                }
            }
        } catch (e) {
            console.error('Error verifying permission:', e);
        }

        return res.status(403).json({
            message: 'error',
            error: `Access denied. Insufficient permissions. Required: ${permission}`
        });
    };
};

export const requireRole = (allowedRoles, options = {}) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'error', error: 'Unauthorized.' });
        }

        const role = req.user.role;
        const normalizedAllowed = allowedRoles.map(r => r.toUpperCase());

        const isCandidateExcepted = role === 'CANDIDATE' && options.allowOwnCandidate;
        const isProfessorExcepted = role === 'PROFESSOR' && options.allowOwnPlanning;

        if (normalizedAllowed.includes(role)) {
            if (!isCandidateExcepted && !isProfessorExcepted) {
                return next();
            }
        }

        // Special case: CANDIDATE own profile access
        if (role === 'CANDIDATE' && options.allowOwnCandidate) {
            try {
                const candidateId = req.params.id;
                if (candidateId) {
                    const candidate = await prisma.candidate.findUnique({
                        where: { id: candidateId }
                    });
                    if (candidate && candidate.email && req.user.email &&
                        candidate.email.toLowerCase() === req.user.email.toLowerCase()) {
                        return next();
                    }
                }
            } catch (err) {
                console.error('Error checking own candidate profile:', err);
            }
        }

        // Special case: PROFESSOR own planning access
        if (role === 'PROFESSOR' && options.allowOwnPlanning) {
            return next();
        }

        return res.status(403).json({
            message: 'error',
            error: 'Access denied. Insufficient permissions.'
        });
    };
};
