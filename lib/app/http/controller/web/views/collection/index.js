"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.CollectionRouter = express_1.default.Router();
const permission_1 = require("../../../../middleware/permission");
const collection_controller_1 = require("./collection.controller");
let views_controller = new collection_controller_1.Views();
let middleware = new permission_1.PermissionMiddleware();
exports.CollectionRouter.get('/create', middleware.middleware, views_controller.create);
exports.CollectionRouter.post('/create', middleware.middleware, views_controller.set);
exports.CollectionRouter.get('/view', middleware.middleware, views_controller.view);
exports.CollectionRouter.get('/update/:id', middleware.middleware, views_controller.edit);
exports.CollectionRouter.put('/update', middleware.middleware, views_controller.update);
exports.CollectionRouter.get('/delete', middleware.middleware, views_controller.edit);
exports.CollectionRouter.delete('/delete', middleware.middleware, views_controller.edit);
//# sourceMappingURL=index.js.map