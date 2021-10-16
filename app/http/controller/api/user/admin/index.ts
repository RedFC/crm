import express from 'express';
import { AuthenticationMiddleware } from '../../../../middleware/auth';
export const userAdminRouter = express.Router();

import { RoleMiddleware } from '../../../../middleware/role';
import { ValidationMiddleware } from '../../../../middleware/validation';
import { PermissionMiddleware } from '../../../../middleware/permission'
import { User } from './user.admin.controller'
import { upload } from '../../../../../constants/multer';

let user_controller = new User();
let validation_controller = new ValidationMiddleware()
let auth_controller = new AuthenticationMiddleware()
let role_controller = new RoleMiddleware()
let permission_middleware = new PermissionMiddleware()

// userAdminRouter.post('/create',
// auth_controller.isAuthenticated(),
// role_controller.isAdmin(),
// validation_controller.validateRegisterUser(),
// permission_middleware.ValidationCreateUser(),
// user_controller.registerUser)

userAdminRouter.put('/update', 
auth_controller.isAuthenticated(),
permission_middleware.ValidationUpdateUser(),
upload.fields([{name:"profile",maxCount:1}]),
validation_controller.validateRegisterUpdateUser(),
user_controller.updateUser
);

userAdminRouter.delete('/delete/:id', 
auth_controller.isAuthenticated(), 
role_controller.isAdmin(), 
user_controller.deleteUser
);

userAdminRouter.put('/updatepermissions',
auth_controller.isAuthenticated(),
role_controller.isAdmin(),
validation_controller.validateUpdatePermission(),
user_controller.updatePermissions)

userAdminRouter.get('/findOne/:id',
auth_controller.isAuthenticated(),
role_controller.isAdmin(),
user_controller.getById)

userAdminRouter.get('/getAll',
auth_controller.isAuthenticated(),
role_controller.isAdmin(),
  user_controller.getByAll)


userAdminRouter.get('/filter/recentUsers',
  // auth_controller.isAuthenticated(),
  // role_controller.isAdmin(),
  user_controller.recentUsers)