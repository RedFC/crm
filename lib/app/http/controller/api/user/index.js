"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../middleware/auth");
exports.userRouter = express_1.default.Router();
const role_1 = require("../../../middleware/role");
const validation_1 = require("../../../middleware/validation");
const user_controller_1 = require("./user.controller");
const cache_1 = require("../../../middleware/cache");
let user_controller = new user_controller_1.User();
let validation_controller = new validation_1.ValidationMiddleware();
let cache_controller = new cache_1.CacheMiddleware();
let auth_controller = new auth_1.AuthenticationMiddleware();
let role_controller = new role_1.RoleMiddleware();
exports.userRouter.post('/login', validation_controller.validateUserLogin(), user_controller.login);
exports.userRouter.get('/reset/:token', user_controller.resetget);
exports.userRouter.get('/forget/:email', user_controller.forget);
exports.userRouter.post('/reset', user_controller.resetpost);
//# sourceMappingURL=index.js.map