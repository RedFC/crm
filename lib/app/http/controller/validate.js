"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const Joi = __importStar(require("joi"));
class Validator {
    constructor() { }
    //************************ VALIDATE USER REGISTER DATA ***********************//
    validateRegisterData(data) {
        const schema = Joi.object().keys({
            phoneNo: Joi.number(),
            name: Joi.string(),
            profileImage: Joi.string(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required()
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE USER VERIFY DATA ***********************//
    validateVerifyData(data) {
        const schema = Joi.object().keys({
            phoneNo: Joi.number().required(),
            code: Joi.number().required(),
            gcm_id: Joi.string(),
            platform: Joi.string(),
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE USER LOGIN DATA ***********************//
    validateLoginData(data) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            gcm_id: Joi.string(),
            platform: Joi.string(),
            code: Joi.string()
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE USER UPDATE DATA ***********************//
    validateUserUpdateData(data) {
        const schema = Joi.object().keys({
            username: Joi.string(),
            name: Joi.string(),
            about: Joi.string(),
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE Return Policy ***********************//
    validateRegisterUserJoi(data) {
        const schema = Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().required(),
            roleId: Joi.string().required(),
            name: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            gender: Joi.string().required(),
            team: Joi.string()
        });
        return Joi.validate(data, schema);
    }
    validateRegisterUserUpdateJoi(data) {
        const schema = Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }),
            password: Joi.string(),
            user: Joi.string(),
            roleId: Joi.string(),
            name: Joi.string(),
            blocked: Joi.boolean(),
            phoneNumber: Joi.string(),
            currentclass: Joi.string(),
            currentinstitute: Joi.string(),
            gender: Joi.string(),
            disconnectImages: Joi.array().items(Joi.object().keys({ id: Joi.string().required() }))
        });
        return Joi.validate(data, schema);
    }
    ValidateUpdatePermissionJoi(data) {
        const schema = Joi.object().keys({
            user: Joi.string().required(),
            permissions: Joi.object().required(),
        });
        return Joi.validate(data, schema);
    }
    validateBookAssignJoi(data) {
        const schema = Joi.object().keys({
            book: Joi.array().items(Joi.object().keys({ id: Joi.string().required() })).required(),
            type: Joi.string().required(),
            year: Joi.string().required(),
            class: Joi.string().required()
        });
        return Joi.validate(data, schema);
    }
    validateBookAssignupdateJoi(data) {
        const schema = Joi.object().keys({
            book: Joi.array().items(Joi.object().keys({ id: Joi.string().required() })),
            type: Joi.string(),
            year: Joi.string(),
            class: Joi.string(),
            disconnect: Joi.array().items(Joi.object().keys({ id: Joi.string().required() }))
        });
        return Joi.validate(data, schema);
    }
    validateCreateYearsAndClassesJoi(data) {
        const schema = Joi.object().keys({
            year: Joi.string().required(),
            typeId: Joi.string().required(),
            yearClasses: Joi.array().items(Joi.object().keys({ className: Joi.string().required() })).required(),
        });
        return Joi.validate(data, schema);
    }
    validateUpdateOnBoardingJoi(data) {
        const schema = Joi.object().keys({
            text: Joi.string().required(),
        });
        return Joi.validate(data, schema);
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validate.js.map