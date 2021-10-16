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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const user_service_1 = require("../../../../services/user.service");
const redis_service_1 = require("../../../../../cache/redis.service");
const error_service_1 = require("../../../../services/error.service");
class User extends redis_service_1.RedisService {
    constructor() {
        super();
    }
    // async registerUser(req,res){
    //     try {
    //         const myUserService = new UserService();
    //         let Permissions = req.permissions;
    //         let _schema = {
    //             email: req.body.email,
    //             blocked: false,
    //             password : req.body.password,
    //             role : {connect : {id : req.body.roleId}},
    //             profile : {
    //                 create : {
    //                     name : req.body.name,
    //                     phoneNo : req.body.phoneNumber,
    //                     gender : req.body.gender
    //                 }
    //             },
    //             Team: req.body.team ? { connect: { id : req.body.team} } : undefined,
    //             Permissions : {
    //             create : {
    //                 ...Permissions
    //                 }
    //             }
    //         }
    //         // let registeruser =  await myUserService.registerUser(_schema)
    //         if(registeruser){
    //             const temp_secret = speakeasy.generateSecret();
    //             let myMailsender = new MailSender(registeruser)
    //             let creds = {
    //                 email : registeruser.email,
    //                 password : req.body.password
    //             }
    //             let token = await myUserService.generatePasswordToken(registeruser.id);
    //             myMailsender.sendUserInvitationEmail(temp_secret,creds,token)
    //             let success = {
    //                 success: true,
    //                 msg: "User Created Successfully",
    //                 user: registeruser,
    //             };
    //             return res.send(success)
    //         }
    //     } catch (error) {
    //         console.trace(error)
    //         ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
    //     }
    // }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myUserService = new user_service_1.UserService();
                let _schema = {
                    email: req.body.email,
                    blocked: req.body.blocked ? JSON.parse(req.body.blocked) : undefined,
                    password: req.body.password,
                    role: req.body.roleId ? { connect: { id: req.body.roleId } } : undefined,
                    profile: {
                        update: {
                            name: req.body.name,
                            phoneNo: req.body.phoneNumber,
                            gender: req.body.gender
                        }
                    }
                };
                let findOne = yield myUserService.updateUser({ id: req.body.user }, _schema);
                let success = {
                    success: true,
                    msg: "SuccessFully Fetched",
                    data: findOne,
                };
                return res.send(success);
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
    updatePermissions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myUserService = new user_service_1.UserService();
                let { user, permissions } = req.body;
                let UpdatePermissions = yield myUserService.updatePermissions({ userId: user }, Object.assign({}, permissions));
                if (UpdatePermissions) {
                    let GetToken = yield myUserService.getToken({ userId: user });
                    if (GetToken) {
                        myUserService.redisDeleteKey(GetToken.token);
                        let success = {
                            success: true,
                            msg: "Permissions Updated Successfully",
                            user: UpdatePermissions,
                        };
                        return res.send(success);
                    }
                    else {
                        let success = {
                            success: true,
                            msg: "Permissions Updated Successfully",
                            user: UpdatePermissions,
                        };
                        return res.send(success);
                    }
                }
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
    getByAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myUserService = new user_service_1.UserService();
                let where = { blocked: false };
                req.query.roleId ? where['roleId'] = req.query.roleId : {};
                let getCount = yield myUserService.countUsers(where);
                function calculatePagesCount(pageSize, totalCount) {
                    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
                }
                let recordsprPage = req.query.limit ? Number(req.query.limit) : 100000;
                var pagesCount = calculatePagesCount(recordsprPage, getCount);
                let Pages = pagesCount - 1;
                let SKIPANDTAKE = null;
                if (req.query.page && req.query.page > Pages || req.query.page && req.query.page < 0) {
                    error_service_1.ErrorService.handler(res, 500, { success: false, raw: "Pagination Error", status: 500 });
                }
                if (req.query.page) {
                    SKIPANDTAKE = req.query.page * recordsprPage;
                }
                let filter = yield myUserService.findAll(req.query.page ? SKIPANDTAKE : 0, req.query.page ? (SKIPANDTAKE == 0 ? recordsprPage : SKIPANDTAKE) : recordsprPage, where);
                let success = {
                    success: true,
                    msg: "SuccesFully Fetched",
                    data: filter,
                    totalRecord: getCount,
                    totalPages: pagesCount - 1,
                    currentPage: req.query.page ? req.query.page : 0
                };
                return res.send(success);
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
    recentUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myUserService = new user_service_1.UserService();
                let recentUsers = yield myUserService
                    .findAll(0, 10, {
                    NOT: { roleId: "e6895e69-bb65-4f92-8989-6aae24defc84" }
                }, {
                    createdAt: "desc"
                });
                let success = {
                    success: true,
                    msg: "SuccesFully Fetched",
                    data: recentUsers
                };
                return res.send(success);
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
    getAllBlockedUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myUserService = new user_service_1.UserService();
                let where = { blocked: true };
                req.query.roleId ? where['roleId'] = req.query.roleId : {};
                let getCount = yield myUserService.countUsers(where);
                function calculatePagesCount(pageSize, totalCount) {
                    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
                }
                let recordsprPage = req.query.limit ? Number(req.query.limit) : 100000;
                var pagesCount = calculatePagesCount(recordsprPage, getCount);
                let Pages = pagesCount - 1;
                let SKIPANDTAKE = null;
                if (req.query.page && req.query.page > Pages || req.query.page && req.query.page < 0) {
                    error_service_1.ErrorService.handler(res, 500, { success: false, raw: "Pagination Error", status: 500 });
                }
                if (req.query.page) {
                    SKIPANDTAKE = req.query.page * recordsprPage;
                }
                let filter = yield myUserService.findAll(req.query.page ? SKIPANDTAKE : 0, req.query.page ? (SKIPANDTAKE == 0 ? recordsprPage : SKIPANDTAKE) : recordsprPage, where);
                let success = {
                    success: true,
                    msg: "SuccesFully Fetched",
                    data: filter,
                    totalRecord: getCount,
                    totalPages: pagesCount - 1,
                    currentPage: req.query.page ? req.query.page : 0
                };
                return res.send(success);
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myUserService = new user_service_1.UserService();
                let findOne = yield myUserService.findOne({ id: req.params.id });
                let success = {
                    success: true,
                    msg: "SuccesFully Fetched",
                    data: findOne,
                };
                return res.send(success);
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myUserService = new user_service_1.UserService();
                let findOne = yield myUserService.deleteUser(req.params.id);
                let success = {
                    success: true,
                    msg: "SuccesFully deleted",
                    data: findOne,
                };
                return res.send(success);
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
    filter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myUserService = new user_service_1.UserService();
                let filter = yield myUserService.filter({
                    roleId: req.params.roleId,
                    OR: [
                        {
                            email: {
                                startsWith: req.query.search
                            },
                        },
                        {
                            email: {
                                endsWith: req.query.search
                            },
                        },
                        {
                            profile: {
                                name: {
                                    startsWith: req.query.search
                                }
                            }
                        },
                        {
                            profile: {
                                name: {
                                    endsWith: req.query.search
                                }
                            }
                        },
                        {
                            profile: {
                                gender: {
                                    startsWith: req.query.search
                                }
                            }
                        },
                        {
                            profile: {
                                gender: {
                                    endsWith: req.query.search
                                }
                            }
                        }
                    ]
                });
                let success = {
                    success: true,
                    msg: "SuccesFully Fetched",
                    data: filter,
                };
                return res.send(success);
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
            }
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.admin.controller.js.map