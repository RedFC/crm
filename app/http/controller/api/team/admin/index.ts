import express from 'express';
import { AuthenticationMiddleware } from '../../../../middleware/auth';
export const teamAdminRouter = express.Router();

import { RoleMiddleware } from '../../../../middleware/role';
import { ValidationMiddleware } from '../../../../middleware/validation';
import { PermissionMiddleware } from '../../../../middleware/permission'
// import { TeamAdminController } from './team.admin.controller'
import { upload } from '../../../../../constants/multer';

// let team_controller = new TeamAdminController();
let validation_controller = new ValidationMiddleware()
let auth_controller = new AuthenticationMiddleware()
let role_controller = new RoleMiddleware()
let permission_middleware = new PermissionMiddleware()

// teamAdminRouter.post('/',
//   auth_controller.isAuthenticated(),
//   role_controller.isAdmin(),
//   team_controller.create
// )

// teamAdminRouter.get('/:id',
//   auth_controller.isAuthenticated(),
//   role_controller.isAdmin(),
//   team_controller.readOne
// )

// teamAdminRouter.get('/',
//   auth_controller.isAuthenticated(),
//   role_controller.isAdmin(),
//   team_controller.read
// )

// teamAdminRouter.put('/:id',
//   auth_controller.isAuthenticated(),
//   role_controller.isAdmin(),
//   team_controller.update
// )

// teamAdminRouter.delete('/:id',
//   auth_controller.isAuthenticated(),
//   role_controller.isAdmin(),
//   team_controller.delete
// )

// teamAdminRouter.post('/assignAdmin/:teamId/:userId',
//   auth_controller.isAuthenticated(),
//   role_controller.isAdmin(),
//   team_controller.create
// )

