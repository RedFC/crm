"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Views = void 0;
const path_1 = __importDefault(require("path"));
const appRoot = __importStar(require("app-root-path"));
const user_service_1 = require("../../../../services/user.service");
class Views {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let myUserservice = new user_service_1.UserService();
            let get = yield myUserservice.getCustomers();
            res.render(path_1.default.join(appRoot.path, "views/pages/collection/create.ejs"), { data: get });
        });
    }
    ;
    set(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let myUserservice = new user_service_1.UserService();
                let schema = {
                    name: req.body.name,
                    email: req.body.email,
                    type: req.body.type,
                    address: req.body.address,
                    phonenumber: req.body.phone
                };
                let create = yield myUserservice.createCustomer(schema);
                if (create) {
                    res.redirect('/admin/collection/view');
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let myUserservice = new user_service_1.UserService();
                let get = yield myUserservice.getCustomers();
                if (get) {
                    res.render(path_1.default.join(appRoot.path, "views/pages/collection/view.ejs"), { data: get });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ;
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let myUserservice = new user_service_1.UserService();
                let get = yield myUserservice.getCustomer({ id: req.params.id });
                if (get) {
                    res.render(path_1.default.join(appRoot.path, "views/pages/collection/edit.ejs"), { data: get });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ;
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let myUserservice = new user_service_1.UserService();
                let get = yield myUserservice.getCustomers();
                if (get) {
                    res.render(path_1.default.join(appRoot.path, "views/pages/collection/view.ejs"), { data: get });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ;
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let myUserservice = new user_service_1.UserService();
                let get = yield myUserservice.getCustomers();
                if (get) {
                    res.render(path_1.default.join(appRoot.path, "views/pages/collection/view.ejs"), { data: get });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ;
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let myUserservice = new user_service_1.UserService();
                let get = yield myUserservice.getCustomers();
                if (get) {
                    res.render(path_1.default.join(appRoot.path, "views/pages/collection/view.ejs"), { data: get });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ;
}
exports.Views = Views;
//# sourceMappingURL=collection.controller.js.map