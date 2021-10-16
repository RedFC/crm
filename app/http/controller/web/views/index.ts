import express from 'express';
export const viewsRouter = express.Router();

import { Views } from './views.controller';
let views_controller = new Views()
import passport from "../../../middleware/passport";
import { ValidationMiddleware } from '../../../middleware/validation';
let validation_controller = new ValidationMiddleware()


viewsRouter.get('/admin/dashboard', views_controller.index);

viewsRouter.get('/',views_controller.loginget);
viewsRouter.post('/', validation_controller.validateUserLogin(),views_controller.loginset);

viewsRouter.get('/*', views_controller.not_found);
