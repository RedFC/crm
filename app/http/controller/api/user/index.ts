import express from 'express';
import { AuthenticationMiddleware } from '../../../middleware/auth';
export const userRouter = express.Router();

import { upload } from "../../../../constants/multer";
import { RoleMiddleware } from '../../../middleware/role';
import { ValidationMiddleware } from '../../../middleware/validation';
import { User } from './user.controller'
import { CacheMiddleware } from '../../../middleware/cache';
import { UserService } from '../../../services/user.service'
import { resolveSoa } from 'dns';

let user_controller = new User();
let validation_controller = new ValidationMiddleware()
let cache_controller = new CacheMiddleware()
let auth_controller = new AuthenticationMiddleware()
let role_controller = new RoleMiddleware()

userRouter.post('/login', validation_controller.validateUserLogin(), user_controller.login);

userRouter.get('/reset/:token',user_controller.resetget)

userRouter.get('/forget/:email', user_controller.forget)

userRouter.post('/reset',user_controller.resetpost)