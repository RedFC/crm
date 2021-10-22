import path from "path";
import * as appRoot from 'app-root-path'
import { UserService } from "../../../../services/user.service";
export class Views {

    async create(req, res)
    {

        let myUserservice = new UserService();
        let get = await myUserservice.getCustomers();
        res.render(path.join(appRoot.path, "views/pages/collection/create.ejs"),{data:get});
    };

    async set(req, res){
        try {
            let myUserservice = new UserService();
            let schema = {
                name : req.body.name,
                email:req.body.email,
                type:req.body.type,
                address:req.body.address,
                phonenumber:req.body.phone
            }
            let create = await myUserservice.createCustomer(schema)
            if(create){
                res.redirect('/admin/collection/view')
            }
        } catch (error) {
         console.log(error);
        }
    }

    async view(req, res) {
        try {
            let myUserservice = new UserService();
            let get = await myUserservice.getCustomers();
            if(get){
                res.render(path.join(appRoot.path, "views/pages/collection/view.ejs"),{data : get});
            }
        } catch (error) {
            console.log(error);
        }
    };

    async edit(req, res) {
        try {
            let myUserservice = new UserService();
            let get = await myUserservice.getCustomer({id:req.params.id});
            if(get){
                res.render(path.join(appRoot.path, "views/pages/collection/edit.ejs"),{data : get});
            }
        } catch (error) {
            console.log(error);
        }
    };


    async update(req, res) {
        try {
            let myUserservice = new UserService();
            let get = await myUserservice.getCustomers();
            if(get){
                res.render(path.join(appRoot.path, "views/pages/collection/view.ejs"),{data : get});
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    async destroy(req, res) {
        try {
            let myUserservice = new UserService();
            let get = await myUserservice.getCustomers();
            if(get){
                res.render(path.join(appRoot.path, "views/pages/collection/view.ejs"),{data : get});
            }
        } catch (error) {
            console.log(error);
        }
    };

    async delete(req, res) {
        try {
            let myUserservice = new UserService();
            let get = await myUserservice.getCustomers();
            if(get){
                res.render(path.join(appRoot.path, "views/pages/collection/view.ejs"),{data : get});
            }
        } catch (error) {
            console.log(error);
        }
    };



}