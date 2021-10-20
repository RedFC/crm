"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionMiddleware = void 0;
const composable_middleware_1 = __importDefault(require("composable-middleware"));
const user_service_1 = require("../services/user.service");
// import { TeamService } from "../services/Items.service";
// const TEAMSERVICE = new TeamService();
class PermissionMiddleware {
    constructor() {
        this.middleware = (req, res, next) => {
            if (req.session.user) {
                next();
            }
            else {
                req.flash('error', 'Login Please To Go Forward');
                res.redirect('/');
                return;
            }
        };
    }
    // ValidationCreateUser() {
    //     return (
    //         compose()
    //             .use((req, res, next) => {
    //                 if(req.body.roleId == "e6895e69-bb65-4f92-8989-6aae24defc84")
    //                 {
    //                     if(req.user.permissions.INVITE){
    //                         req.permissions = AdminPermission
    //                         next()
    //                     }else{
    //                         res.status(401).send({ success: false, msg: "Insufficient privileges." });
    //                         return
    //                     }
    //                 }
    //                 else if(req.body.roleId == "e6895e69-bb65-4f92-8989-6aae24defc85")
    //                 {
    //                     if(req.user.permissions.INVITE){
    //                         let { team } = req.body;
    //                         if (team) { 
    //                             TEAMSERVICE.find({ id: team })
    //                                 .then((data) => {
    //                                     if (data) {
    //                                         TEAMSERVICE.find({ id: team, users: { some: { role: { name: "TEAM_ADMIN" } } } })
    //                                             .then((data) => {
    //                                                 if (data && data != null) {
    //                                                     res.status(400).send({ success: false, msg: "Team Already Have Admin" });
    //                                                     return  
    //                                                 } else {
    //                                                     req.permissions = TeamAdminPermission
    //                                                     next()
    //                                                 }
    //                                             })
    //                                             .catch((error) => {
    //                                                 res.status(400).send({ success: false, msg: error.message });
    //                                                 return
    //                                             })
    //                                     } else {
    //                                         res.status(400).send({ success: false, msg: "Required Team Not Found" });
    //                                         return  
    //                                     }
    //                                 })
    //                                 .catch((error) => {
    //                                     res.status(400).send({ success: false, msg: error.message });
    //                                     return
    //                                 })
    //                         } else {
    //                             res.status(400).send({ success: false, msg: "Please Select A Team For Creating Team Admin" });
    //                             return
    //                         }
    //                     }else{
    //                         res.status(401).send({ success: false, msg: "Insufficient privileges." });
    //                         return
    //                     }
    //                 }else if(req.body.roleId == "e6895e69-bb65-4f92-8989-6aae24defc86")
    //                 {
    //                     if(req.user.permissions.INVITE){
    //                         req.permissions = MemberPermission
    //                         next()
    //                     }else{
    //                         res.status(401).send({ success: false, msg: "Insufficient privileges." });
    //                         return
    //                     }
    //                 }
    //                 else{
    //                     res.status(401).send({ success: false, msg: "Role Not Found" });
    //                     return
    //                 }
    //             })
    //     )
    // }
    ValidationUpdateUser() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            let MyUserService = new user_service_1.UserService();
            MyUserService.findOne({ id: req.body.user }).then(data => {
                console.log('====================================');
                console.log(" Passing Permission ");
                console.log('====================================');
                if (data.role["id"] == "e6895e69-bb65-4f92-8989-6aae24defc84") {
                    res.locals = "updateStudent";
                    next();
                }
                else if (data.role["id"] == "e6895e69-bb65-4f92-8989-6aae24defc85") {
                    res.locals = "updateTeacher";
                    next();
                }
                else if (data.role["id"] == "e6895e69-bb65-4f92-8989-6aae24defc85") {
                    res.locals = "updateAdmin";
                    next();
                }
            });
        })
            .use((req, res, next) => {
            console.log('====================================');
            console.log("Checking Permission");
            console.log('====================================');
            if (res.locals != null && res.locals != "" && res.locals != undefined) {
                if (req.user.permissions[res.locals]) {
                    console.log('====================================');
                    console.log("Passed");
                    console.log('====================================');
                    next();
                }
                else {
                    console.log('====================================');
                    console.log("Access Denied");
                    console.log('====================================');
                    res.status(401).send({ success: false, msg: "Insufficient privileges." });
                    return;
                }
            }
        }));
    }
    validatePermission(permission) {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            console.log('====================================');
            console.log("Checking Permission");
            console.log('====================================');
            if (permission != null && permission != "" && permission != undefined) {
                if (req.user.permissions[permission]) {
                    console.log('====================================');
                    console.log("Passed");
                    console.log('====================================');
                    next();
                }
                else {
                    console.log('====================================');
                    console.log("Access Denied");
                    console.log('====================================');
                    res.status(401).send({ success: false, msg: "Insufficient privileges." });
                    return;
                }
            }
        }));
    }
}
exports.PermissionMiddleware = PermissionMiddleware;
//# sourceMappingURL=permission.js.map