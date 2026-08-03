import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from '../config/prisma.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const METADATA_PATH = path.join(__dirname, '../config/users_metadata.json');

const readMetadata = () => {
    try {
        if (fs.existsSync(METADATA_PATH)) {
            return JSON.parse(fs.readFileSync(METADATA_PATH, 'utf-8'));
        }
    } catch (e) {
        console.error('Error reading metadata file:', e);
    }
    return {};
};

const writeMetadata = (data) => {
    try {
        fs.writeFileSync(METADATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
        console.error('Error writing metadata file:', e);
    }
};

class UserController {
    async getAll(req, res, next) {
        try {
            const users = await prisma.user.findMany({
                orderBy: { createdAt: 'desc' }
            });

            const metadata = readMetadata();

            const responseUsers = users.map(user => {
                const userMeta = metadata[user.email] || {};
                return {
                    id: user.id,
                    email: user.email,
                    role: userMeta.role || (user.role === 'ADMIN' ? 'admin' : 'candidate'),
                    name: userMeta.name || user.email.split('@')[0],
                    status: userMeta.status || 'active',
                    createdAt: user.createdAt
                };
            });

            res.status(200).json({ message: 'success', data: responseUsers });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({ where: { id } });

            if (!user) {
                return res.status(404).json({ message: 'error', error: 'User not found' });
            }

            const metadata = readMetadata();
            const userMeta = metadata[user.email] || {};

            const responseUser = {
                id: user.id,
                email: user.email,
                role: userMeta.role || (user.role === 'ADMIN' ? 'admin' : 'candidate'),
                name: userMeta.name || user.email.split('@')[0],
                status: userMeta.status || 'active',
                createdAt: user.createdAt
            };

            res.status(200).json({ message: 'success', data: responseUser });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const { email, password, name, role, status } = req.body;

            // Validation
            if (!email || !password || !name || !role || !status) {
                return res.status(400).json({
                    message: 'error',
                    error: 'Parameters email, password, name, role, and status are required'
                });
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({ message: 'error', error: 'Invalid email format' });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    message: 'error',
                    error: 'Password must be at least 6 characters long'
                });
            }

            const validRoles = ['admin', 'agent_reservation', 'agent_reception', 'professor', 'candidate'];
            if (!validRoles.includes(role)) {
                return res.status(400).json({ message: 'error', error: 'Invalid role' });
            }

            const validStatuses = ['active', 'inactive'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ message: 'error', error: 'Invalid status' });
            }

            // Check if user email is unique
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ message: 'error', error: 'Email already in use' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create in database
            const dbRole = role === 'admin' ? 'ADMIN' : 'USER';
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: dbRole
                }
            });

            // Write metadata
            const metadata = readMetadata();
            metadata[email] = { name, status, role };
            writeMetadata(metadata);

            res.status(201).json({
                message: 'success',
                data: {
                    id: user.id,
                    email: user.email,
                    role,
                    name,
                    status,
                    createdAt: user.createdAt
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { email, password, name, role, status } = req.body;

            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) {
                return res.status(404).json({ message: 'error', error: 'User not found' });
            }

            const metadata = readMetadata();
            const oldEmail = user.email;

            // Validation if email changes
            if (email && email !== oldEmail) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    return res.status(400).json({ message: 'error', error: 'Invalid email format' });
                }
                const existingUser = await prisma.user.findUnique({ where: { email } });
                if (existingUser) {
                    return res.status(409).json({ message: 'error', error: 'Email already in use' });
                }
            }

            const updateData = {};
            if (email) updateData.email = email;
            if (password) {
                if (password.length < 6) {
                    return res.status(400).json({
                        message: 'error',
                        error: 'Password must be at least 6 characters long'
                    });
                }
                const salt = await bcrypt.genSalt(10);
                updateData.password = await bcrypt.hash(password, salt);
            }

            if (role) {
                const validRoles = ['admin', 'agent_reservation', 'agent_reception', 'professor', 'candidate'];
                if (!validRoles.includes(role)) {
                    return res.status(400).json({ message: 'error', error: 'Invalid role' });
                }
                updateData.role = role === 'admin' ? 'ADMIN' : 'USER';
            }

            if (status) {
                const validStatuses = ['active', 'inactive'];
                if (!validStatuses.includes(status)) {
                    return res.status(400).json({ message: 'error', error: 'Invalid status' });
                }
            }

            // Perform DB update
            const updatedUser = await prisma.user.update({
                where: { id },
                data: updateData
            });

            // Update Metadata
            const currentMetadata = metadata[oldEmail] || {
                name: oldEmail.split('@')[0],
                status: 'active',
                role: user.role === 'ADMIN' ? 'admin' : 'candidate'
            };

            const updatedMeta = {
                name: name !== undefined ? name : currentMetadata.name,
                status: status !== undefined ? status : currentMetadata.status,
                role: role !== undefined ? role : currentMetadata.role
            };

            if (oldEmail !== updatedUser.email) {
                delete metadata[oldEmail];
            }
            metadata[updatedUser.email] = updatedMeta;
            writeMetadata(metadata);

            res.status(200).json({
                message: 'success',
                data: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    role: updatedMeta.role,
                    name: updatedMeta.name,
                    status: updatedMeta.status,
                    createdAt: updatedUser.createdAt
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) {
                return res.status(404).json({ message: 'error', error: 'User not found' });
            }

            // Prevent self-deletion of currently authenticated administrator
            if (user.id === req.user.id) {
                return res.status(400).json({
                    message: 'error',
                    error: 'Cannot delete currently authenticated administrator'
                });
            }

            // Perform delete
            await prisma.user.delete({ where: { id } });

            // Clear metadata
            const metadata = readMetadata();
            delete metadata[user.email];
            writeMetadata(metadata);

            res.status(200).json({ message: 'success' });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
