"use strict";

import { IUser } from "../models/user.model";
import * as Joi from "joi";

interface UserRegister extends IUser {
    email: string;
    password: string;
    phoneNo: number;
    name: string
    gcm_id: string[],
    platform: string,
}
interface UserLogin extends IUser {
    email: string;
    password: string;
    gcm_id: string[],
    platform: string,
}
interface UserSocialLogin extends IUser {
    token: string;
    gcm_id: string[];
    platform: string;
}

interface UserUpdate extends IUser {
    username: string;
    name: string;
    about: string;
}

export class Validator {
    constructor() { }

    //************************ VALIDATE USER REGISTER DATA ***********************//
    validateRegisterData(data: UserRegister) {
        const schema = Joi.object().keys({
            phoneNo: Joi.number(),
            name: Joi.string(),
            profileImage: Joi.string(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required()
        });
        return Joi.validate(data, schema);
    }

    //************************ VALIDATE USER VERIFY DATA ***********************//
    validateVerifyData(data: UserRegister) {
        const schema = Joi.object().keys({
            phoneNo: Joi.number().required(),
            code: Joi.number().required(),
            gcm_id: Joi.string(),
            platform: Joi.string(),
        });
        return Joi.validate(data, schema);
    }

    //************************ VALIDATE USER LOGIN DATA ***********************//
    validateLoginData(data: UserLogin) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            gcm_id: Joi.string(),
            platform : Joi.string(),
            code : Joi.string() 
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE USER UPDATE DATA ***********************//
    validateUserUpdateData(data: UserUpdate) {
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
           password : Joi.string().required(),
           roleId:Joi.string().required(),
           name :Joi.string().required(),
           phoneNumber : Joi.string().required(),
           gender: Joi.string().required(),
           team : Joi.string()
        })
        return Joi.validate(data, schema);
    }

    validateRegisterUserUpdateJoi(data) {
        const schema = Joi.object().keys({
           email: Joi.string().email({ minDomainAtoms: 2 }),
           password : Joi.string(),
           user : Joi.string(),
           roleId:Joi.string(),
           name :Joi.string(),
           blocked : Joi.boolean(),
           phoneNumber : Joi.string(),
           currentclass : Joi.string(),
           currentinstitute : Joi.string(),
           gender:Joi.string(),
           disconnectImages : Joi.array().items(Joi.object().keys({id : Joi.string().required()}))
        })
        return Joi.validate(data, schema);
    }


    ValidateUpdatePermissionJoi(data){
        const schema = Joi.object().keys({
           user: Joi.string().required(),
           permissions : Joi.object().required(),
        })
        return Joi.validate(data, schema);
    }

    validateBookAssignJoi(data) {
        const schema = Joi.object().keys({
            book:Joi.array().items(Joi.object().keys({id : Joi.string().required()})).required(),
            type: Joi.string().required(),
            year:Joi.string().required(),
            class:Joi.string().required()
        });
        return Joi.validate(data, schema);
    }

    validateBookAssignupdateJoi(data) {
        const schema = Joi.object().keys({
            book:Joi.array().items(Joi.object().keys({id : Joi.string().required()})),
            type: Joi.string(),
            year:Joi.string(),
            class:Joi.string(),
            disconnect:Joi.array().items(Joi.object().keys({id : Joi.string().required()}))
        });
        return Joi.validate(data, schema);
    }

    validateCreateYearsAndClassesJoi(data) {
        const schema = Joi.object().keys({
            year:Joi.string().required(),
            typeId: Joi.string().required(),
            yearClasses:Joi.array().items(Joi.object().keys({className : Joi.string().required()})).required(),
        });
        return Joi.validate(data, schema);
    }


    validateUpdateOnBoardingJoi(data) {
        const schema = Joi.object().keys({
            text:Joi.string().required(),
        });
        return Joi.validate(data, schema);
    }

}
