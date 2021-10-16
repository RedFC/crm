"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../middleware/auth");
exports.settingsRouter = express_1.default.Router();
const role_1 = require("../../../middleware/role");
const validation_1 = require("../../../middleware/validation");
const settings_controller_1 = require("./settings.controller");
const cache_1 = require("../../../middleware/cache");
let setting_controller = new settings_controller_1.Settings();
let validation_controller = new validation_1.ValidationMiddleware();
let cache_controller = new cache_1.CacheMiddleware();
let auth_controller = new auth_1.AuthenticationMiddleware();
let role_controller = new role_1.RoleMiddleware();
//# sourceMappingURL=index.js.map