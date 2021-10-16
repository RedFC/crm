import * as _ from "lodash";
import * as fs from "fs";
import moment from "../../../../modules/moment";
import { UserService } from "../../../services/user.service";
import { RedisService } from "../../../../cache/redis.service";
import { AuthService } from "../../../services/auth.service";
import { ErrorService } from "../../../services/error.service";
import speakeasy from 'speakeasy';
import jwt from 'jsonwebtoken';
import { MailSender } from "../../../mail";
const ERRORSERVICE = ErrorService.handler
const RESPONSESERVICE = ErrorService.response
export class User extends RedisService {

    constructor() {
        super();
    }

    async login(req,res){
        try {
            let Service = new UserService();
            let GetUser = await Service.findOne({email : req.body.email,password : req.body.password,blocked:false});
            if(GetUser){
                    let myAuthService = new AuthService();
                    myAuthService.generateAuthToken(
                            { id: GetUser.id, role: GetUser.role['name']},
                            async (token) => {
                                Service.createToken({
                                    where: {
                                        userId: GetUser.id,
                                    },
                                    update: {
                                        token: token,
                                    },
                                    create: {
                                        user: {connect : {id : GetUser.id}},
                                        token: token,
                                    }
                                }).then(result => {
                                    Service.redisSetUserData(token, moment(moment().add(48, "hours")).fromNow_seconds())
                                    Service.redisUpdateUser(GetUser)
                                    GetUser["access_token"] = token;
                                    let success = {
                                        success: true,
                                        msg: "Logged in successfully",
                                        user: GetUser,
                                    };
                                    window.localStorage.setItem('token',token)
                                    RESPONSESERVICE(res,200,success)
                                }).catch(error => {
                                    ERRORSERVICE(res, 401, { success: false, raw : error.message, status: 500 });
                                })
                                
                        })
                                      
            }else{
                ERRORSERVICE(res, 401, { success: false, raw: "Your Password Or Email Is In Correct", status: 500 });
            }

        } catch (error) {
            ERRORSERVICE(res, 500, { success: false, raw: error.message, status: 500 });
        }
    }

    async resetget(req, res) {
        try {
            let myUserService = new UserService();
        let Token = await myUserService.redisGetUserResetKey(req.params.token);
        if (Token) {
            res.render('pages/reset-password',{token : Token})
        } else {
            res.render('pages/response',{response : "LINK HAS BEEN EXPIRED OR INVALID"})
        }
        } catch (error) {
            ERRORSERVICE(res, 500, { success: false, raw: error.message, status: 500 });
        }
    }

    async forget(req, res) {
        try {
            let myUserService = new UserService();
            let getUser = await myUserService.findOne({ email: req.params.email });
            if (getUser) {

                const temp_secret = speakeasy.generateSecret();
                let myMailsender = new MailSender(getUser)
                let token = await myUserService.generatePasswordToken(getUser.id);
                myMailsender.sendUserForgetPasswordEmail(temp_secret,token)
                let success = {
                    success: true,
                    msg: "Email Sent !",
                };
                return RESPONSESERVICE(res,200,success)
            } else {
                let success = {
                    success: false,
                    msg: "Email You Are Trying To Forget Is Not Registered",
                };
                return RESPONSESERVICE(res,200,success)
            }
        } catch (error) {
            ERRORSERVICE(res, 500, { success: false, raw: error.message, status: 500 });
        }
    }

    async resetpost(req, res) {
        try {
            let myUserService = new UserService();
            var i = process.env.ISSUER_NAME;
            var s = process.env.SIGNED_BY_EMAIL;
            var a = process.env.AUDIENCE_SITE;
            var signOptions = {
                issuer: i,
                subject: s,
                audience: a
            };
            var decoded = jwt.verify(req.body.token, "RESET-TOKEN-KEY", signOptions);
            await myUserService.updateUser({ id: decoded.id }, { password: req.body.conf_pass })
                .then(async (data) => {
                    await myUserService.redisDeleteKey(req.body.token)
                    res.render('pages/response',{response : "your password has been updated"})
                })
                .catch(error => {
                    ERRORSERVICE(res, 500, { success: false, raw: error.message, status: 500 });
                })
        } catch (error) {
            ERRORSERVICE(res, 500, { success: false, raw: error.message, status: 500 });
        }
    }
    
}
