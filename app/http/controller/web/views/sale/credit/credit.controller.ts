import path from "path";
import * as appRoot from 'app-root-path'
import { UserService } from "../../../../../services/user.service";
import { ItemService } from "../../../../../services/Items.service";
import { LedgerService } from "../../../../../services/ledger.service";
export class Views {

    async create(req, res)
    {   
        let myItemservice = new ItemService();
        let myUserservice = new UserService();
        let getCustomers = await myUserservice.getCustomers();
        let getItems = await myItemservice.findAll();
        res.render(path.join(appRoot.path, "views/pages/sale/credit/create.ejs"),{datacustomer:getCustomers,dataItems:getItems});
    };

    async set(req, res){
        try {
            let myLeadgerService = new LedgerService();
            let saleschema = {
                customer:{connect:{id:req.body.customer}},
                item:{connect:{id:req.body.item}},
                itemprice:req.body.price,
                netprice:req.body.netprice,
                quantity:req.body.qty
            }
            let ledgerschema = {
                customer:{connect:{id:req.body.customer}},
                type:req.body.type
            }
            let create = await myLeadgerService.create(saleschema,ledgerschema)
            if(create){
                res.redirect('/admin/sale/credit/view')
            }
        } catch (error) {
            console.log(error);
        }
    }

    async view(req, res) {
        try {
            let myLeadgerService = new LedgerService();
            let get = await myLeadgerService.findAll();
            if(get){
                res.render(path.join(appRoot.path, "views/pages/sale/credit/view.ejs"),{data : get});
            }
        } catch (error) {
            console.log(error);
        }
    };

    async invoice(req, res) {
        try {
                res.render(path.join(appRoot.path, "views/pages/sale/credit/invoice.ejs"));
        } catch (error) {
            console.log(error);
        }
    };

    async edit(req, res) {
        try {
            let myUserservice = new ItemService();
            let get = await myUserservice.find({id:req.params.id});
            if(get){
                res.render(path.join(appRoot.path, "views/pages/sale/credit/edit.ejs"),{data : get});
            }
        } catch (error) {
            console.log(error);
        }
    };


    async update(req, res) {
        try {
            let myUserservice = new ItemService();
            let schema = {
                name:req.body.name,
                code:req.body.code,
                qty:req.body.qty,
                price:req.body.price,
            }
            let get = await myUserservice.update({id:req.params.id},schema);
            if(get){
                res.render(path.join(appRoot.path, "views/pages/sale/credit/view.ejs"),{data : get});
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    async destroy(req, res) {
        try {
            let myUserservice = new ItemService();
            let get = await myUserservice.find({id:req.params.id});
            if(get){
                res.render(path.join(appRoot.path, "views/pages/sale/credit/view.ejs"),{data : get});
            }
        } catch (error) {
            console.log(error);
        }
    };

    async delete(req, res) {
        try {
            let myUserservice = new ItemService();
            let get = await myUserservice.delete({id:req.params.id});
            if(get){
                res.render(path.join(appRoot.path, "views/pages/sale/credit/view.ejs"),{data : get});
            }
        } catch (error) {
            console.log(error);
        }
    };



}