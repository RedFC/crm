"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.ItemsRouter = express_1.default.Router();
const permission_1 = require("../../../../middleware/permission");
const item_controller_1 = require("./item.controller");
let views_controller = new item_controller_1.Views();
let middleware = new permission_1.PermissionMiddleware();
exports.ItemsRouter.get('/create', views_controller.create);
exports.ItemsRouter.post('/create', views_controller.set);
exports.ItemsRouter.get('/view', views_controller.view);
exports.ItemsRouter.get('/update/:id', views_controller.edit);
exports.ItemsRouter.put('/update', views_controller.update);
exports.ItemsRouter.get('/delete', views_controller.edit);
exports.ItemsRouter.delete('/delete', views_controller.edit);
//# sourceMappingURL=index.js.map