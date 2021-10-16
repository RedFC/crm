import express from 'express';
export const ItemsRouter = express.Router();
import { PermissionMiddleware } from '../../../../middleware/permission';
import { Views } from './item.controller';
let views_controller = new Views()
let middleware = new PermissionMiddleware();

ItemsRouter.get('/create',middleware.redirectMiddleware,views_controller.create)

ItemsRouter.post('/create',middleware.redirectMiddleware,views_controller.set)

ItemsRouter.get('/view',middleware.redirectMiddleware,views_controller.view)

ItemsRouter.get('/update/:id',middleware.redirectMiddleware,views_controller.edit)

ItemsRouter.put('/update',middleware.redirectMiddleware,views_controller.update)

ItemsRouter.get('/delete',middleware.redirectMiddleware,views_controller.edit)

ItemsRouter.delete('/delete',middleware.redirectMiddleware,views_controller.edit)


