"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.viewsRouter = express_1.default.Router();
const views_controller_1 = require("./views.controller");
let views_controller = new views_controller_1.Views();
const validation_1 = require("../../../middleware/validation");
let validation_controller = new validation_1.ValidationMiddleware();
exports.viewsRouter.get('/admin/dashboard', views_controller.index);
exports.viewsRouter.get('/', views_controller.loginget);
exports.viewsRouter.post('/', validation_controller.validateUserLogin(), views_controller.loginset);
exports.viewsRouter.get('/*', views_controller.not_found);
//# sourceMappingURL=index.js.map