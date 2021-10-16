import express from 'express';
export const CreditsRouter = express.Router();
import { PermissionMiddleware } from '../../../../../middleware/permission';
import { Views } from './credit.controller';
let views_controller = new Views()
let middleware = new PermissionMiddleware();

CreditsRouter.get('/create',views_controller.create)

CreditsRouter.post('/create',views_controller.set)

CreditsRouter.get('/view',views_controller.view)

CreditsRouter.get('/update/:id',views_controller.edit)

CreditsRouter.put('/update',views_controller.update)

CreditsRouter.get('/delete',views_controller.edit)

CreditsRouter.delete('/delete',views_controller.edit)


