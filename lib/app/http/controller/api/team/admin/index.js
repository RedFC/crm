"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamAdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../../middleware/auth");
exports.teamAdminRouter = express_1.default.Router();
const role_1 = require("../../../../middleware/role");
const validation_1 = require("../../../../middleware/validation");
const permission_1 = require("../../../../middleware/permission");
// let team_controller = new TeamAdminController();
let validation_controller = new validation_1.ValidationMiddleware();
let auth_controller = new auth_1.AuthenticationMiddleware();
let role_controller = new role_1.RoleMiddleware();
let permission_middleware = new permission_1.PermissionMiddleware();
// teamAdminRouter.post('/',
//   auth_controller.isAuthenticated(),
//   role_controller.isAdmin(),
//   team_controller.create
// )
// teamAdminRouter.get('/:id',
//   auth_controller.isAuthenticated(),
//   role_controller.isAdmin(),
//   team_controller.readOne
// )
// teamAdminRouter.get('/',
//   auth_controller.isAuthenticated(),
//   role_controller.isAdmin(),
//   team_controller.read
// )
// teamAdminRouter.put('/:id',
//   auth_controller.isAuthenticated(),
//   role_controller.isAdmin(),
//   team_controller.update
// )
// teamAdminRouter.delete('/:id',
//   auth_controller.isAuthenticated(),
//   role_controller.isAdmin(),
//   team_controller.delete
// )
// teamAdminRouter.post('/assignAdmin/:teamId/:userId',
//   auth_controller.isAuthenticated(),
//   role_controller.isAdmin(),
//   team_controller.create
// )
//# sourceMappingURL=index.js.map