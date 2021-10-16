"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsettingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../../middleware/auth");
exports.AdminsettingsRouter = express_1.default.Router();
const role_1 = require("../../../../middleware/role");
const validation_1 = require("../../../../middleware/validation");
const settings_admin_controller_1 = require("./settings.admin.controller");
const cache_1 = require("../../../../middleware/cache");
let adminsetting_controller = new settings_admin_controller_1.AdminSettings();
let validation_controller = new validation_1.ValidationMiddleware();
let cache_controller = new cache_1.CacheMiddleware();
let auth_controller = new auth_1.AuthenticationMiddleware();
let role_controller = new role_1.RoleMiddleware();
exports.AdminsettingsRouter.post('/terms', auth_controller.isAuthenticated(), role_controller.isAdmin, adminsetting_controller.createTerms);
exports.AdminsettingsRouter.post('/aboutus/', auth_controller.isAuthenticated(), adminsetting_controller.createAboutus);
//# sourceMappingURL=index.js.map