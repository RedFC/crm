import express from 'express';
import { AuthenticationMiddleware } from '../../../middleware/auth';
export const extraApisRouter = express.Router();

import { upload } from "../../../../constants/multer";
import { RoleMiddleware } from '../../../middleware/role';
import { ValidationMiddleware } from '../../../middleware/validation';
import { ExtraApisConditions } from './extra.controller'
import { CacheMiddleware } from '../../../middleware/cache';

let extraApis = new ExtraApisConditions();
let validation_controller = new ValidationMiddleware()
let cache_controller = new CacheMiddleware()
let auth_controller = new AuthenticationMiddleware()
let role_controller = new RoleMiddleware()

extraApisRouter.get('/getAdvance/:id',extraApis.getCustomerAdvance)
