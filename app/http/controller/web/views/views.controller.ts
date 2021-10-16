import path from "path";
import * as appRoot from 'app-root-path'
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";
import moment from "moment";
import { ErrorService } from "../../../services/error.service";
const ERRORSERVICE = ErrorService.handler
const RESPONSESERVICE = ErrorService.response
export class Views {
    index(req, res) {
        if(req.session.user){
            if(req.session.user.token){
                res.render(path.join(appRoot.path, "views/pages/index.ejs"));
            }
            else{
                res.redirect('/')
            }
        }else{
                res.redirect('/')
        }
    };

    loginget(req, res) {
        if(!req.session.user){
            res.render(path.join(appRoot.path, "views/pages/login.ejs"),{error:req.flash('error')});
        }else{
            if(req.session.user.token){
                res.redirect('/admin/dashboard')   
            }else{
                res.redirect('/') 
            }
        }
    };

    async loginset(req,res){
        try {
            let Service = new UserService();
            let GetUser = await Service.findOne({email : req.body.email,password : req.body.password,blocked:false});
            if(GetUser){
                    let myAuthService = new AuthService();
                    myAuthService.generateAuthToken(
                            { id: GetUser.id, role: GetUser.role['name']},
                            async (token) => {
                                    Service.redisSetUserData(token, moment(moment().add(48, "hours")).fromNow_seconds())
                                    Service.redisUpdateUser(GetUser)
                                    GetUser["access_token"] = token;
                                    let success = {
                                        success: true,
                                        msg: "Logged in successfully",
                                        user: GetUser,
                                    };
                                    var sessionData = req.session;
                                    sessionData.user = {};
                                    sessionData.user.token = token;
                                    res.redirect('/admin/dashboard')
                        })
                                      
            }else{
                req.flash('error', 'Your Email Or Password Is Incorrect');
                res.redirect('/')
            }

        } catch (error) {
            ERRORSERVICE(res, 500, { success: false, raw: error.message, status: 500 });
        }
        
    }

    not_found(req, res) {
        res.render(path.join(appRoot.path, "views/error/404.ejs"));
    };
}