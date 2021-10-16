"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../app/http/controller/web/error");
const resources_1 = require("../app/http/controller/web/resources");
const verification_1 = require("../app/http/controller/web/verification");
const views_1 = require("../app/http/controller/web/views");
const customer_1 = require("../app/http/controller/web/views/customer");
const Items_1 = require("../app/http/controller/web/views/Items");
const credit_1 = require("../app/http/controller/web/views/sale/credit");
var session = require('express-session');
var flash = require('req-flash');
module.exports = function (app) {
    app.use(session({
        secret: 'KEYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        resave: false,
        saveUninitialized: true
    }));
    app.use(flash());
    app.use("/error", error_1.errorRouter);
    app.use("/resources", resources_1.resourceRouter);
    app.use("/verification", verification_1.verificationRouter);
    app.use("/admin/customer", customer_1.CustomerRouter);
    app.use("/admin/item", Items_1.ItemsRouter);
    app.use("/admin/sale/credit", credit_1.CreditsRouter);
    app.use("/", views_1.viewsRouter);
};
//# sourceMappingURL=web.js.map