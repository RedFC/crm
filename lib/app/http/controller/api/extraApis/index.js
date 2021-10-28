"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraApisRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../middleware/auth");
exports.extraApisRouter = express_1.default.Router();
const role_1 = require("../../../middleware/role");
const validation_1 = require("../../../middleware/validation");
const extra_controller_1 = require("./extra.controller");
const cache_1 = require("../../../middleware/cache");
let extraApis = new extra_controller_1.ExtraApisConditions();
let validation_controller = new validation_1.ValidationMiddleware();
let cache_controller = new cache_1.CacheMiddleware();
let auth_controller = new auth_1.AuthenticationMiddleware();
let role_controller = new role_1.RoleMiddleware();
exports.extraApisRouter.get('/getAdvance/:id', extraApis.getCustomerAdvance);
//# sourceMappingURL=index.js.map