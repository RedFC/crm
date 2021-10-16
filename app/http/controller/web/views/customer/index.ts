import express from 'express';
export const CustomerRouter = express.Router();
import { PermissionMiddleware } from '../../../../middleware/permission';
import { Views } from './customer.controller';
let views_controller = new Views()
let middleware = new PermissionMiddleware();

CustomerRouter.get('/create',middleware.redirectMiddleware,views_controller.create)

CustomerRouter.post('/create',middleware.redirectMiddleware,views_controller.set)

CustomerRouter.get('/view',middleware.redirectMiddleware,views_controller.view)

CustomerRouter.get('/update/:id',middleware.redirectMiddleware,views_controller.edit)

CustomerRouter.put('/update',middleware.redirectMiddleware,views_controller.update)

CustomerRouter.get('/delete',middleware.redirectMiddleware,views_controller.edit)

CustomerRouter.delete('/delete',middleware.redirectMiddleware,views_controller.edit)


