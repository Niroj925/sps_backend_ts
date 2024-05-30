import { roleType } from "../helper/type/type";

const validateRole = (role:roleType) => {
    return (req:any, res:any, next:any) => {
      const userRole = req.user ? req.user.role : 'anonymous';
    //   const userPermissions = new Permissions().getPermissionsByRoleName(userRole);
  
      if (role==userRole) {
        return next();
      } else {
        return res.status(403).json({ error: 'Access denied' });
      }
    };
  };

  export default validateRole