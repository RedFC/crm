import expess from "express";
import { userRouter } from "../app/http/controller/api/user";
import { userAdminRouter } from "../app/http/controller/api/user/admin";
import { teamAdminRouter } from "../app/http/controller/api/team/admin";
const app = expess();


module.exports = app;