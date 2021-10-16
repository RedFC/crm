import * as _ from "lodash";
import { UserService } from "../../../../services/user.service";
import { RedisService } from "../../../../../cache/redis.service";
import { ErrorService } from "../../../../services/error.service";
import { ProductImages } from "../../ImageUploder/image.controller";
import { MailSender } from "../../../../mail/index"
import speakeasy from "speakeasy"
export class User extends RedisService {
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


    async updateUser(req,res){
        try {
            const myUserService = new UserService();
            let _schema = {
                    email: req.body.email,
                    blocked: req.body.blocked ? JSON.parse(req.body.blocked) : undefined,
                    password : req.body.password,
                    role : req.body.roleId ? {connect : {id : req.body.roleId}} : undefined,
                    profile : {
                        update: {
                            name : req.body.name,
                            phoneNo : req.body.phoneNumber,
                            gender : req.body.gender
                        }
                    }
                }
                let findOne = await myUserService.updateUser({id : req.body.user},_schema);
                let success = {
                    success: true,
                    msg: "SuccessFully Fetched",
                    data: findOne,
                };
                return res.send(success)
        } catch (error) {
            ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
        }
    }

    async updatePermissions(req,res){
        try {
            const myUserService = new UserService();
            let {user,permissions} = req.body
            let UpdatePermissions = await myUserService.updatePermissions({userId : user},{...permissions})
            if(UpdatePermissions){
                let GetToken = await myUserService.getToken({userId : user});
                if(GetToken){
                    myUserService.redisDeleteKey(GetToken.token)
                    let success = {
                        success: true,
                        msg: "Permissions Updated Successfully",
                        user: UpdatePermissions,
                    };
                    return res.send(success)
                }else{
                    let success = {
                        success: true,
                        msg: "Permissions Updated Successfully",
                        user: UpdatePermissions,
                    };
                    return res.send(success)
                }
                
            }     
        } catch (error) {
            ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
        }
    }

    async getByAll(req,res){
        try {
            const myUserService = new UserService();
            let where = {blocked:false}
            req.query.roleId ? where['roleId'] = req.query.roleId  : {}
            let getCount = await myUserService.countUsers(where);
            function calculatePagesCount(pageSize, totalCount){
                return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
            }
            let recordsprPage = req.query.limit ? Number(req.query.limit) : 100000;
            var pagesCount = calculatePagesCount(recordsprPage, getCount);
            let Pages = pagesCount-1
            let SKIPANDTAKE = null
            if(req.query.page && req.query.page > Pages || req.query.page && req.query.page < 0){
                ErrorService.handler(res, 500, { success: false, raw: "Pagination Error", status: 500 });
                
            }
            if(req.query.page){
                SKIPANDTAKE = req.query.page * recordsprPage
            }

            let filter = await myUserService.findAll(req.query.page ? SKIPANDTAKE : 0,req.query.page ? (SKIPANDTAKE == 0 ? recordsprPage : SKIPANDTAKE) : recordsprPage,where);
            let success = {
                success: true,
                msg: "SuccesFully Fetched",
                data: filter,
                totalRecord : getCount,
                totalPages: pagesCount-1,
                currentPage : req.query.page ? req.query.page : 0
            };
            return res.send(success)
        } catch (error) {
            ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
        }
    }


    async recentUsers(req,res){
        try {
            const myUserService = new UserService();
            
            let recentUsers = await myUserService
                .findAll(0, 10,
                    {
                        NOT: { roleId: "e6895e69-bb65-4f92-8989-6aae24defc84" }
                    },
                    {
                        createdAt: "desc"
                    })

            let success = {
                success: true,
                msg: "SuccesFully Fetched",
                data: recentUsers
            };
            return res.send(success)
        } catch (error) {
            ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
        }
    }


    async getAllBlockedUsers(req,res){
        try {
            const myUserService = new UserService();
            let where = {blocked : true}
            req.query.roleId ? where['roleId'] = req.query.roleId  : {}
            let getCount = await myUserService.countUsers(where);
            function calculatePagesCount(pageSize, totalCount){
                return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
            }
            let recordsprPage = req.query.limit ? Number(req.query.limit) : 100000;
            var pagesCount = calculatePagesCount(recordsprPage, getCount);
            let Pages = pagesCount-1
            let SKIPANDTAKE = null
            if(req.query.page && req.query.page > Pages || req.query.page && req.query.page < 0){
                ErrorService.handler(res, 500, { success: false, raw: "Pagination Error", status: 500 });
                
            }
            if(req.query.page){
                SKIPANDTAKE = req.query.page * recordsprPage
            }

            let filter = await myUserService.findAll(req.query.page ? SKIPANDTAKE : 0,req.query.page ? (SKIPANDTAKE == 0 ? recordsprPage : SKIPANDTAKE) : recordsprPage,where);
            let success = {
                success: true,
                msg: "SuccesFully Fetched",
                data: filter,
                totalRecord : getCount,
                totalPages: pagesCount-1,
                currentPage : req.query.page ? req.query.page : 0
            };
            return res.send(success)
        } catch (error) {
            ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
        }
    }


    async getById(req,res){
        try {
            const myUserService = new UserService();
            let findOne = await myUserService.findOne({id : req.params.id});
            let success = {
                success: true,
                msg: "SuccesFully Fetched",
                data: findOne,
            };
            return res.send(success)
        } catch (error) {
            ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
        }
    }

    

    async deleteUser(req,res){
        try {
            const myUserService = new UserService();
            let findOne = await myUserService.deleteUser(req.params.id);
            let success = {
                success: true,
                msg: "SuccesFully deleted",
                data: findOne,
            };
            return res.send(success)
        } catch (error) {
            ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
        }
    }


    async filter(req,res){
        try {
            const myUserService = new UserService();
            let filter = await myUserService.filter({
                roleId : req.params.roleId,
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
                    profile: 
                    { 
                        name : {
                            startsWith: req.query.search
                        } 
                    }    
                }
                ,
                { 
                    profile: 
                    { 
                        name : {
                            endsWith: req.query.search
                        } 
                    }    
                },
                { 
                    profile: 
                    { 
                        gender : {
                            startsWith: req.query.search
                        } 
                    }    
                }
                ,
                { 
                    profile: 
                    { 
                        gender : {
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
            return res.send(success)
        } catch (error) {
            ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
        }
    }

}