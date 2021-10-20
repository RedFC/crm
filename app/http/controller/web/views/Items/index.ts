import express from 'express';
export const ItemsRouter = express.Router();
import { PermissionMiddleware } from '../../../../middleware/permission';
import { Views } from './item.controller';
let views_controller = new Views()
let middleware = new PermissionMiddleware();

ItemsRouter.get('/create',middleware.middleware,views_controller.create)

ItemsRouter.post('/create',middleware.middleware,views_controller.set)

ItemsRouter.get('/view',middleware.middleware,views_controller.view)

ItemsRouter.get('/update/:id',middleware.middleware,views_controller.edit)

ItemsRouter.put('/update',middleware.middleware,views_controller.update)

ItemsRouter.get('/delete',middleware.middleware,views_controller.edit)

ItemsRouter.delete('/delete',middleware.middleware,views_controller.edit)


