"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_service_1 = require("../../../../services/error.service");
// import { TeamService } from "../../../../services/Items.service";
// const TEAMSERVICE = new TeamService();
const ERRORSERVICE = error_service_1.ErrorService.handler;
const RESPONSESERVICE = error_service_1.ErrorService.response;
// export class TeamAdminController{
//   async create(req,res) {
//     try {
//       let Schema = {
//         name: req.body.name
//       }     
//       // let create = await TEAMSERVICE.create(Schema);
//       // if (create) {
//       //   RESPONSESERVICE(res,200,{success:true,msg:"Team Created Successfully",data : create,status:200})
//       // }
//     } catch (error) {
//       ERRORSERVICE(res, 500, { success: false, raw : error.message, status: 500 })
//     }
//   }
//   async readOne(req,res) {
//     try {
//       let read = await TEAMSERVICE.find({id : req.body.id});
//       if (read) {
//         RESPONSESERVICE(res,200,{success:true,msg:"Team Fetched Successfully",data : read,status:200})
//       }
//     } catch (error) {
//       ERRORSERVICE(res, 500, { success: false, raw : error.message, status: 500 })
//     }
//   }
//   async read(req,res) {
//     try {  
//       let read = await TEAMSERVICE.findAll();
//       if (read) {
//         RESPONSESERVICE(res,200,{success:true,msg:"Teams Fetched Successfully",data : read,status:200})
//       }
//     } catch (error) {
//       ERRORSERVICE(res, 500, { success: false, raw : error.message, status: 500 })
//     }
//   }
//   async update(req,res) {
//     try {
//       let Schema = {
//         name: req.body.name
//       }     
//       let update = await TEAMSERVICE.update({id : req.body.id},Schema);
//       if (update) {
//         RESPONSESERVICE(res,200,{success:true,msg:"Team Updated Successfully",data : update,status:200})
//       }
//     } catch (error) {
//       ERRORSERVICE(res, 500, { success: false, raw : error.message, status: 500 })
//     }
//   }
//   async delete(req,res) {
//     try {
//       let deleteTeam = await TEAMSERVICE.delete({id : req.body.id});
//       if (deleteTeam) {
//         RESPONSESERVICE(res,200,{success:true,msg:"Team Updated Successfully",data : deleteTeam,status:200})
//       }
//     } catch (error) {
//       ERRORSERVICE(res, 500, { success: false, raw : error.message, status: 500 })
//     }
//   }
//   async assignTeam(req, res) {
//     try {
//     } catch (error) {
//       ERRORSERVICE(res, 500, { success: false, raw : error.message, status: 500 })
//     }
//   }
// }
//# sourceMappingURL=team.admin.controller.js.map