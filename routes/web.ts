
import { errorRouter } from "../app/http/controller/web/error";
import { resourceRouter } from "../app/http/controller/web/resources";
import { verificationRouter } from "../app/http/controller/web/verification"
import { viewsRouter } from "../app/http/controller/web/views"
import { CustomerRouter } from "../app/http/controller/web/views/customer"
import { ItemsRouter } from "../app/http/controller/web/views/Items"
import { CreditsRouter } from "../app/http/controller/web/views/sale/credit"
import { CollectionRouter } from "../app/http/controller/web/views/collection"

var session = require('express-session');
var flash = require('req-flash');

module.exports = function (app) {

    app.use(session({
        secret: 'KEYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        resave: false,
        saveUninitialized: true
      }))

    app.use(flash());

    app.use("/error", errorRouter);

    app.use("/resources", resourceRouter);

    app.use("/verification", verificationRouter);
    
    app.use("/admin/customer", CustomerRouter)

    app.use("/admin/item", ItemsRouter)

    app.use("/admin/sale/credit", CreditsRouter)

    // app.use("/admin/sale/walking", CreditsRouter)

    app.use("/admin/collection", CollectionRouter)

    app.use("/", viewsRouter)



}