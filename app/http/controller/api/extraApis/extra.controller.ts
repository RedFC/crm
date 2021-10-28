import * as _ from "lodash";
import * as fs from "fs";
import moment from "../../../../modules/moment";
import short from 'short-uuid';
import { UserService } from "../../../services/user.service";
export class ExtraApisConditions{ 




    async getCustomerAdvance(req,res){

        let myUserservice = new UserService();
        let getadvance = await myUserservice.getCustomerAdvance({id:req.params.id});
        console.log(getadvance);
        res.send(getadvance)

    }



}
