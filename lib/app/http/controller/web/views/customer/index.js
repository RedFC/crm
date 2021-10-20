"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.CustomerRouter = express_1.default.Router();
const permission_1 = require("../../../../middleware/permission");
const customer_controller_1 = require("./customer.controller");
let views_controller = new customer_controller_1.Views();
let middleware = new permission_1.PermissionMiddleware();
exports.CustomerRouter.get('/create', middleware.middleware, views_controller.create);
exports.CustomerRouter.post('/create', middleware.middleware, views_controller.set);
exports.CustomerRouter.get('/view', middleware.middleware, views_controller.view);
exports.CustomerRouter.get('/update/:id', middleware.middleware, views_controller.edit);
exports.CustomerRouter.put('/update', middleware.middleware, views_controller.update);
exports.CustomerRouter.get('/delete', middleware.middleware, views_controller.edit);
exports.CustomerRouter.delete('/delete', middleware.middleware, views_controller.edit);
//# sourceMappingURL=index.js.map