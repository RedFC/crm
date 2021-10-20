import express from 'express';
export const CustomerRouter = express.Router();
import { PermissionMiddleware } from '../../../../middleware/permission';
import { Views } from './customer.controller';
let views_controller = new Views()
let middleware = new PermissionMiddleware();

CustomerRouter.get('/create',middleware.middleware,views_controller.create)

CustomerRouter.post('/create',middleware.middleware,views_controller.set)

CustomerRouter.get('/view',middleware.middleware,views_controller.view)

CustomerRouter.get('/update/:id',middleware.middleware,views_controller.edit)

CustomerRouter.put('/update',middleware.middleware,views_controller.update)

CustomerRouter.get('/delete',middleware.middleware,views_controller.edit)

CustomerRouter.delete('/delete',middleware.middleware,views_controller.edit)


