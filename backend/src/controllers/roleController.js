import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from '../config/prisma.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROLES_PATH = path.join(__dirname, '../config/roles_permissions.json');
const USER_METADATA_PATH = path.join(__dirname, '../config/users_metadata.json');

const readRolesPermissions = () => {
    try {
        if (fs.existsSync(ROLES_PATH)) {
            return JSON.parse(fs.readFileSync(ROLES_PATH, 'utf-8'));
        }
    } catch (e) {
        console.error('Error reading roles permissions file:', e);
    }
    return {};
};

const writeRolesPermissions = (data) => {
    try {
        fs.writeFileSync(ROLES_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
        console.error('Error writing roles permissions file:', e);
    }
};

const readUserMetadata = () => {
    try {
        if (fs.existsSync(USER_METADATA_PATH)) {
            return JSON.parse(fs.readFileSync(USER_METADATA_PATH, 'utf-8'));
        }
    } catch (e) {
        console.error('Error reading user metadata file:', e);
    }
    return {};
};

class RoleController {
    async getAll(req, res, next) {
        try {
            const rolesData = readRolesPermissions();
            const userMeta = readUserMetadata();
            const dbUsers = await prisma.user.findMany();

            // Count users dynamically per role
            const userCounts = {};
            // Initialize count for roles in json
            Object.keys(rolesData).forEach(r => { userCounts[r] = 0; });

            dbUsers.forEach(user => {
                const meta = userMeta[user.email] || {};
                const role = meta.role || (user.role === 'ADMIN' ? 'admin' : 'candidate');
                if (userCounts[role] !== undefined) {
                    userCounts[role]++;
                } else {
                    userCounts[role] = 1;
                }
            });

            const rolesList = Object.keys(rolesData).map(roleId => {
                return {
                    id: roleId,
                    name: roleId,
                    displayName: rolesData[roleId].displayName,
                    description: rolesData[roleId].description,
                    permissions: rolesData[roleId].permissions,
                    userCount: userCounts[roleId] || 0,
                    // Assign default Tailwind badges style corresponding to role type
                    color: roleId === 'admin' ? 'bg-red-100 text-red-800 border-red-200' :
                        roleId === 'agent_reservation' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            roleId === 'agent_reception' ? 'bg-green-100 text-green-800 border-green-200' :
                                roleId === 'professor' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                                    'bg-yellow-10 border-yellow-200 text-yellow-800 border-yellow-200'
                };
            });

            res.status(200).json({ message: 'success', data: rolesList });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { roleId } = req.params;
            const { permissions, description, displayName } = req.body;

            if (!permissions || !Array.isArray(permissions)) {
                return res.status(400).json({
                    message: 'error',
                    error: 'Parameters permissions (array) is required'
                });
            }

            const rolesData = readRolesPermissions();
            if (!rolesData[roleId]) {
                rolesData[roleId] = {
                    displayName: displayName || roleId,
                    description: description || '',
                    permissions: []
                };
            }

            if (displayName) rolesData[roleId].displayName = displayName;
            if (description) rolesData[roleId].description = description;
            rolesData[roleId].permissions = permissions;

            writeRolesPermissions(rolesData);

            res.status(200).json({
                message: 'success',
                data: {
                    id: roleId,
                    name: roleId,
                    ...rolesData[roleId]
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { roleId } = req.params;
            const systemRoles = ['admin', 'agent_reservation', 'agent_reception', 'professor', 'candidate'];
            if (systemRoles.includes(roleId)) {
                return res.status(400).json({
                    message: 'error',
                    error: 'Cannot delete core system roles'
                });
            }

            const rolesData = readRolesPermissions();
            if (!rolesData[roleId]) {
                return res.status(404).json({
                    message: 'error',
                    error: 'Role not found'
                });
            }

            delete rolesData[roleId];
            writeRolesPermissions(rolesData);

            res.status(200).json({ message: 'success' });
        } catch (error) {
            next(error);
        }
    }
}

export default new RoleController();
