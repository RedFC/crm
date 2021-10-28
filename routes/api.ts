import expess from "express";
import { extraApisRouter } from "../app/http/controller/api/extraApis";
const app = expess();

app.use('/extra',extraApisRouter)

module.exports = app;