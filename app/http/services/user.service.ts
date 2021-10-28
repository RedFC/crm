"use strict";
import { PrismaClient } from '@prisma/client';
import { IUser, IUserCreateProfile, IUserProfile } from "../models/user.model";
import { IProfile } from '../models/profile.user.model';
import { RedisService } from '../../cache/redis.service';
import { Role } from '../models/role.model';
import { IToken } from '../models/token.model';
import { Permissions } from '../models/permissions.model';
import jwt from 'jsonwebtoken'
import { ITeams } from '../models/teams.model';

const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_TOKEN);

const select = {
    id: true,
    email: true,
    blocked: true,
    gcm: true,
    createdAt: true,
    updatedAt: true,
    role : true,
    profile: true
};

const loginSelect = {
    id: true,
    email: true,
    role: true,
    gcm: true,
    createdAt: true,
    updatedAt: true,
    profile: true,
};

interface ISchemaResolver{
    name:string,
    email:string,
    address:string,
    phonenumber:string,
    type:string
}


export class UserService extends RedisService {
    private prisma;
    constructor() {
        super()
        this.prisma = new PrismaClient();
    }
    parseUserBigIntJSON(_user): IUserProfile {
        return JSON.parse(JSON.stringify(_user, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
            .replace(/"(-?\d+)n"/g, (_, a) => a))
    }
    
    createCustomer(data : ISchemaResolver):Promise<IUser>{
        return new Promise((resolve,reject) => {
            this.prisma.customer
            .create({data})
            .then(user => resolve(user))
            .catch(error => reject(error))
            .finally(() => this.prisma.$disconnect())
        })
    }

    getCustomers():Promise<any>{
        return new Promise((resolve,reject) => {
            this.prisma.customer
            .findMany()
            .then(user => resolve(user))
            .catch(error => reject(error))
            .finally(() => this.prisma.$disconnect())
        })
    }

    getCustomer(where):Promise<any>{
        return new Promise((resolve,reject) => {
            this.prisma.customer
            .findFirst({where})
            .then(user => resolve(user))
            .catch(error => reject(error))
            .finally(() => this.prisma.$disconnect())
        })
    }


    getCustomerAdvance(where):Promise<any>{
        return new Promise((resolve,reject) => {
            this.prisma.customer
            .findFirst({where,select :{advance:true}})
            .then(user => resolve(user))
            .catch(error => reject(error))
            .finally(() => this.prisma.$disconnect())
        })
    }


    updateCustomer(where,data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.prisma.customer
            .update({where,data})
            .then(user => resolve(user))
            .catch(error => reject(error))
            .finally(() => this.prisma.$disconnect())
        })
    }

    updateUser(where,data):Promise<IUser>
    {
        return new Promise((resolve,reject) => {
            this.prisma.user
                .update({where,data})
                .then(data => resolve(data))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect())
        })
    }

    findOne(where): Promise<IUserProfile> {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .findFirst({
                    where, select: select
                })
                .then(_user => resolve(this.parseUserBigIntJSON(_user)))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect())
        });
    }

    findAll(skip,take,where,orderBy?): Promise<IUserProfile> {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .findMany({skip,take,where,select,orderBy})
                .then(_user => resolve(_user))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect())
        });
    }

    countUsers(where): Promise<IUserProfile> {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .count({where})
                .then(_user => resolve(_user))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect())
        });
    }

    createToken(schema):Promise<IToken>{
        return new Promise((resolve,reject) => {
            this.prisma.tokens
                .upsert(schema)
                .then(token => resolve(token))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect())
        })
    }

    updatePermissions(where,data):Promise<Permissions>
    {
        return new Promise((resolve,reject) => {
            this.prisma.permissions
                .update({where,data})
                .then(token => resolve(token))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect())
        })
    }


    deleteUser(id):Promise<IUser>
    {
        return new Promise((resolve,reject) => {
            let DeleteUser = this.prisma.user.delete({where:{id : id}})
            let DeleteUserProfile = this.prisma.profile.delete({where:{ userId:id }})
            let DeleteUserPermissions = this.prisma.permissions.delete({where:{userId:id}});
            this.prisma.$transaction([DeleteUserPermissions, DeleteUserProfile, DeleteUser])
                .then(data => resolve(data))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect())
        })
    }

    getToken(where):Promise<IToken>{
        return new Promise((resolve,reject) => {
            this.prisma.tokens
            .findFirst({where})
            .then(token => resolve(token))
            .catch(error => reject(error))
            .finally(() => this.prisma.$disconnect())
        })
    }

    filter(where):Promise<IUserProfile> {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .findMany({where,select:select})
                .then(_user => resolve(_user))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect())
        });
    }

    
    async redisSetUserData(auth:string, exp:number){
        await super.setUserStateToken(auth, exp);
    }

    async redisUpdateUser(_user: IUserProfile) {
        await super.setData(_user.profile, `${_user.profile.name}|${_user.profile.phoneNo}|${_user.profile.userId}|user`, 0).catch((error) => { throw error })
    }

    async redisSetUserAuthKey(data,_user) {
        await super.setData(data,`${_user}|user|authkey`, 0).catch((error) => { throw error })
    }

    async redisSetUserResetKey(data) {
        await super.setData(data,data,0).catch((error) => { throw error })
    }

    async redisGetUserResetKey(data) {
        return super.getData(data).catch((error) => { throw error })
    }

    async redisGetUserAuthKey(_user) {
        return super.getData(`${_user}|user|authkey`).catch((error) => { throw error })
    }

    async redisDeleteKey(Key){
        await super.searchAndDeleteKeys(Key)
    }

    generatePasswordToken(id): any {
        var i = process.env.ISSUER_NAME;
        var s = process.env.SIGNED_BY_EMAIL;
        var a = process.env.AUDIENCE_SITE;
        var signOptions = {
            issuer: i,
            subject: s,
            audience: a
        };
        var payload = {
            id : id
        };
        var token = jwt.sign(payload,"RESET-TOKEN-KEY",signOptions);
        return token
    }

}
