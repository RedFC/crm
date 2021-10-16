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
const auth_service_1 = require("../../../services/auth.service");
const user_service_1 = require("../../../services/user.service");
const moment_1 = __importDefault(require("moment"));
const error_service_1 = require("../../../services/error.service");
const ERRORSERVICE = error_service_1.ErrorService.handler;
const RESPONSESERVICE = error_service_1.ErrorService.response;
class Views {
    index(req, res) {
        if (req.session.user) {
            if (req.session.user.token) {
                res.render(path_1.default.join(appRoot.path, "views/pages/index.ejs"));
            }
            else {
                res.redirect('/');
            }
        }
        else {
            res.redirect('/');
        }
    }
    ;
    loginget(req, res) {
        if (!req.session.user) {
            res.render(path_1.default.join(appRoot.path, "views/pages/login.ejs"), { error: req.flash('error') });
        }
        else {
            if (req.session.user.token) {
                res.redirect('/admin/dashboard');
            }
            else {
                res.redirect('/');
            }
        }
    }
    ;
    loginset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let Service = new user_service_1.UserService();
                let GetUser = yield Service.findOne({ email: req.body.email, password: req.body.password, blocked: false });
                if (GetUser) {
                    let myAuthService = new auth_service_1.AuthService();
                    myAuthService.generateAuthToken({ id: GetUser.id, role: GetUser.role['name'] }, (token) => __awaiter(this, void 0, void 0, function* () {
                        Service.redisSetUserData(token, (0, moment_1.default)((0, moment_1.default)().add(48, "hours")).fromNow_seconds());
                        Service.redisUpdateUser(GetUser);
                        GetUser["access_token"] = token;
                        let success = {
                            success: true,
                            msg: "Logged in successfully",
                            user: GetUser,
                        };
                        var sessionData = req.session;
                        sessionData.user = {};
                        sessionData.user.token = token;
                        res.redirect('/admin/dashboard');
                    }));
                }
                else {
                    req.flash('error', 'Your Email Or Password Is Incorrect');
                    res.redirect('/');
                }
            }
            catch (error) {
                ERRORSERVICE(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
    not_found(req, res) {
        res.render(path_1.default.join(appRoot.path, "views/error/404.ejs"));
    }
    ;
}
exports.Views = Views;
//# sourceMappingURL=views.controller.js.map