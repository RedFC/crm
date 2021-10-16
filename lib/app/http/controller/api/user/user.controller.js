"use strict";
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
exports.User = void 0;
const moment_1 = __importDefault(require("../../../../modules/moment"));
const user_service_1 = require("../../../services/user.service");
const redis_service_1 = require("../../../../cache/redis.service");
const auth_service_1 = require("../../../services/auth.service");
const error_service_1 = require("../../../services/error.service");
const speakeasy_1 = __importDefault(require("speakeasy"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mail_1 = require("../../../mail");
const ERRORSERVICE = error_service_1.ErrorService.handler;
const RESPONSESERVICE = error_service_1.ErrorService.response;
class User extends redis_service_1.RedisService {
    constructor() {
        super();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let Service = new user_service_1.UserService();
                let GetUser = yield Service.findOne({ email: req.body.email, password: req.body.password, blocked: false });
                if (GetUser) {
                    let myAuthService = new auth_service_1.AuthService();
                    myAuthService.generateAuthToken({ id: GetUser.id, role: GetUser.role['name'] }, (token) => __awaiter(this, void 0, void 0, function* () {
                        Service.createToken({
                            where: {
                                userId: GetUser.id,
                            },
                            update: {
                                token: token,
                            },
                            create: {
                                user: { connect: { id: GetUser.id } },
                                token: token,
                            }
                        }).then(result => {
                            Service.redisSetUserData(token, (0, moment_1.default)((0, moment_1.default)().add(48, "hours")).fromNow_seconds());
                            Service.redisUpdateUser(GetUser);
                            GetUser["access_token"] = token;
                            let success = {
                                success: true,
                                msg: "Logged in successfully",
                                user: GetUser,
                            };
                            window.localStorage.setItem('token', token);
                            RESPONSESERVICE(res, 200, success);
                        }).catch(error => {
                            ERRORSERVICE(res, 401, { success: false, raw: error.message, status: 500 });
                        });
                    }));
                }
                else {
                    ERRORSERVICE(res, 401, { success: false, raw: "Your Password Or Email Is In Correct", status: 500 });
                }
            }
            catch (error) {
                ERRORSERVICE(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
    resetget(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let myUserService = new user_service_1.UserService();
                let Token = yield myUserService.redisGetUserResetKey(req.params.token);
                if (Token) {
                    res.render('pages/reset-password', { token: Token });
                }
                else {
                    res.render('pages/response', { response: "LINK HAS BEEN EXPIRED OR INVALID" });
                }
            }
            catch (error) {
                ERRORSERVICE(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
    forget(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let myUserService = new user_service_1.UserService();
                let getUser = yield myUserService.findOne({ email: req.params.email });
                if (getUser) {
                    const temp_secret = speakeasy_1.default.generateSecret();
                    let myMailsender = new mail_1.MailSender(getUser);
                    let token = yield myUserService.generatePasswordToken(getUser.id);
                    myMailsender.sendUserForgetPasswordEmail(temp_secret, token);
                    let success = {
                        success: true,
                        msg: "Email Sent !",
                    };
                    return RESPONSESERVICE(res, 200, success);
                }
                else {
                    let success = {
                        success: false,
                        msg: "Email You Are Trying To Forget Is Not Registered",
                    };
                    return RESPONSESERVICE(res, 200, success);
                }
            }
            catch (error) {
                ERRORSERVICE(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
    resetpost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let myUserService = new user_service_1.UserService();
                var i = process.env.ISSUER_NAME;
                var s = process.env.SIGNED_BY_EMAIL;
                var a = process.env.AUDIENCE_SITE;
                var signOptions = {
                    issuer: i,
                    subject: s,
                    audience: a
                };
                var decoded = jsonwebtoken_1.default.verify(req.body.token, "RESET-TOKEN-KEY", signOptions);
                yield myUserService.updateUser({ id: decoded.id }, { password: req.body.conf_pass })
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    yield myUserService.redisDeleteKey(req.body.token);
                    res.render('pages/response', { response: "your password has been updated" });
                }))
                    .catch(error => {
                    ERRORSERVICE(res, 500, { success: false, raw: error.message, status: 500 });
                });
            }
            catch (error) {
                ERRORSERVICE(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.controller.js.map