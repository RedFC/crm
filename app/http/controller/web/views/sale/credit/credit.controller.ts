import path from "path";
import * as appRoot from 'app-root-path'
import { UserService } from "../../../../../services/user.service";
import { ItemService } from "../../../../../services/Items.service";
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
            let myUserservice = new ItemService();
            let schema = {
                name:req.body.name,
                code:req.body.code,
                qty:req.body.qty,
                price:req.body.price,
            }
            let create = await myUserservice.create(schema)
            if(create){
                res.redirect('/admin/item/view')
            }
        } catch (error) {
            console.log(error);
        }
    }

    async view(req, res) {
        try {
            let myUserservice = new ItemService();
            let get = await myUserservice.findAll();
            if(get){
                res.render(path.join(appRoot.path, "views/sale/credit/view.ejs"),{data : get});
            }
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