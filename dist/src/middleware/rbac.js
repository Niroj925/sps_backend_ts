"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = (role) => {
    return (req, res, next) => {
        const userRole = req.user ? req.user.role : 'anonymous';
        //   const userPermissions = new Permissions().getPermissionsByRoleName(userRole);
        if (role == userRole) {
            return next();
        }
        else {
            return res.status(403).json({ error: 'Access denied' });
        }
    };
};
