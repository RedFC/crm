"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditsRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.CreditsRouter = express_1.default.Router();
const permission_1 = require("../../../../../middleware/permission");
const credit_controller_1 = require("./credit.controller");
let views_controller = new credit_controller_1.Views();
let middleware = new permission_1.PermissionMiddleware();
exports.CreditsRouter.get('/create', views_controller.create);
exports.CreditsRouter.post('/create', views_controller.set);
exports.CreditsRouter.get('/view', views_controller.view);
exports.CreditsRouter.get('/update/:id', views_controller.edit);
exports.CreditsRouter.put('/update', views_controller.update);
exports.CreditsRouter.get('/delete', views_controller.edit);
exports.CreditsRouter.delete('/delete', views_controller.edit);
//# sourceMappingURL=index.js.map