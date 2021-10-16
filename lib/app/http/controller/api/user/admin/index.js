"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../../middleware/auth");
exports.userAdminRouter = express_1.default.Router();
const role_1 = require("../../../../middleware/role");
const validation_1 = require("../../../../middleware/validation");
const permission_1 = require("../../../../middleware/permission");
const user_admin_controller_1 = require("./user.admin.controller");
const multer_1 = require("../../../../../constants/multer");
let user_controller = new user_admin_controller_1.User();
let validation_controller = new validation_1.ValidationMiddleware();
let auth_controller = new auth_1.AuthenticationMiddleware();
let role_controller = new role_1.RoleMiddleware();
let permission_middleware = new permission_1.PermissionMiddleware();
// userAdminRouter.post('/create',
// auth_controller.isAuthenticated(),
// role_controller.isAdmin(),
// validation_controller.validateRegisterUser(),
// permission_middleware.ValidationCreateUser(),
// user_controller.registerUser)
exports.userAdminRouter.put('/update', auth_controller.isAuthenticated(), permission_middleware.ValidationUpdateUser(), multer_1.upload.fields([{ name: "profile", maxCount: 1 }]), validation_controller.validateRegisterUpdateUser(), user_controller.updateUser);
exports.userAdminRouter.delete('/delete/:id', auth_controller.isAuthenticated(), role_controller.isAdmin(), user_controller.deleteUser);
exports.userAdminRouter.put('/updatepermissions', auth_controller.isAuthenticated(), role_controller.isAdmin(), validation_controller.validateUpdatePermission(), user_controller.updatePermissions);
exports.userAdminRouter.get('/findOne/:id', auth_controller.isAuthenticated(), role_controller.isAdmin(), user_controller.getById);
exports.userAdminRouter.get('/getAll', auth_controller.isAuthenticated(), role_controller.isAdmin(), user_controller.getByAll);
exports.userAdminRouter.get('/filter/recentUsers', 
// auth_controller.isAuthenticated(),
// role_controller.isAdmin(),
user_controller.recentUsers);
//# sourceMappingURL=index.js.map