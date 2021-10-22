import express from 'express';
export const CollectionRouter = express.Router();
import { PermissionMiddleware } from '../../../../middleware/permission';
import { Views } from './collection.controller';
let views_controller = new Views()
let middleware = new PermissionMiddleware();

CollectionRouter.get('/create',middleware.middleware,views_controller.create)

CollectionRouter.post('/create',middleware.middleware,views_controller.set)

CollectionRouter.get('/view',middleware.middleware,views_controller.view)

CollectionRouter.get('/update/:id',middleware.middleware,views_controller.edit)

CollectionRouter.put('/update',middleware.middleware,views_controller.update)

CollectionRouter.get('/delete',middleware.middleware,views_controller.edit)

CollectionRouter.delete('/delete',middleware.middleware,views_controller.edit)


