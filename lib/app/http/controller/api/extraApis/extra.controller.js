"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraApisConditions = void 0;
const user_service_1 = require("../../../services/user.service");
class ExtraApisConditions {
    getCustomerAdvance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let myUserservice = new user_service_1.UserService();
            let getadvance = yield myUserservice.getCustomerAdvance({ id: req.params.id });
            console.log(getadvance);
            res.send(getadvance);
        });
    }
}
exports.ExtraApisConditions = ExtraApisConditions;
//# sourceMappingURL=extra.controller.js.map