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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const redis_service_1 = require("../../cache/redis.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_TOKEN);
const select = {
    id: true,
    email: true,
    blocked: true,
    gcm: true,
    createdAt: true,
    updatedAt: true,
    role: true,
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
class UserService extends redis_service_1.RedisService {
    constructor() {
        super();
        this.prisma = new client_1.PrismaClient();
    }
    parseUserBigIntJSON(_user) {
        return JSON.parse(JSON.stringify(_user, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
            .replace(/"(-?\d+)n"/g, (_, a) => a));
    }
    createCustomer(data) {
        return new Promise((resolve, reject) => {
            this.prisma.customer
                .create({ data })
                .then(user => resolve(user))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    getCustomers() {
        return new Promise((resolve, reject) => {
            this.prisma.customer
                .findMany()
                .then(user => resolve(user))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    getCustomer(where) {
        return new Promise((resolve, reject) => {
            this.prisma.customer
                .findFirst({ where })
                .then(user => resolve(user))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    updateUser(where, data) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .update({ where, data })
                .then(data => resolve(data))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    findOne(where) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .findFirst({
                where, select: select
            })
                .then(_user => resolve(this.parseUserBigIntJSON(_user)))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    findAll(skip, take, where, orderBy) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .findMany({ skip, take, where, select, orderBy })
                .then(_user => resolve(_user))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    countUsers(where) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .count({ where })
                .then(_user => resolve(_user))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    createToken(schema) {
        return new Promise((resolve, reject) => {
            this.prisma.tokens
                .upsert(schema)
                .then(token => resolve(token))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    updatePermissions(where, data) {
        return new Promise((resolve, reject) => {
            this.prisma.permissions
                .update({ where, data })
                .then(token => resolve(token))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    deleteUser(id) {
        return new Promise((resolve, reject) => {
            let DeleteUser = this.prisma.user.delete({ where: { id: id } });
            let DeleteUserProfile = this.prisma.profile.delete({ where: { userId: id } });
            let DeleteUserPermissions = this.prisma.permissions.delete({ where: { userId: id } });
            this.prisma.$transaction([DeleteUserPermissions, DeleteUserProfile, DeleteUser])
                .then(data => resolve(data))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    getToken(where) {
        return new Promise((resolve, reject) => {
            this.prisma.tokens
                .findFirst({ where })
                .then(token => resolve(token))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    filter(where) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .findMany({ where, select: select })
                .then(_user => resolve(_user))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    redisSetUserData(auth, exp) {
        const _super = Object.create(null, {
            setUserStateToken: { get: () => super.setUserStateToken }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.setUserStateToken.call(this, auth, exp);
        });
    }
    redisUpdateUser(_user) {
        const _super = Object.create(null, {
            setData: { get: () => super.setData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.setData.call(this, _user.profile, `${_user.profile.name}|${_user.profile.phoneNo}|${_user.profile.userId}|user`, 0).catch((error) => { throw error; });
        });
    }
    redisSetUserAuthKey(data, _user) {
        const _super = Object.create(null, {
            setData: { get: () => super.setData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.setData.call(this, data, `${_user}|user|authkey`, 0).catch((error) => { throw error; });
        });
    }
    redisSetUserResetKey(data) {
        const _super = Object.create(null, {
            setData: { get: () => super.setData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.setData.call(this, data, data, 0).catch((error) => { throw error; });
        });
    }
    redisGetUserResetKey(data) {
        const _super = Object.create(null, {
            getData: { get: () => super.getData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.getData.call(this, data).catch((error) => { throw error; });
        });
    }
    redisGetUserAuthKey(_user) {
        const _super = Object.create(null, {
            getData: { get: () => super.getData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.getData.call(this, `${_user}|user|authkey`).catch((error) => { throw error; });
        });
    }
    redisDeleteKey(Key) {
        const _super = Object.create(null, {
            searchAndDeleteKeys: { get: () => super.searchAndDeleteKeys }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.searchAndDeleteKeys.call(this, Key);
        });
    }
    generatePasswordToken(id) {
        var i = process.env.ISSUER_NAME;
        var s = process.env.SIGNED_BY_EMAIL;
        var a = process.env.AUDIENCE_SITE;
        var signOptions = {
            issuer: i,
            subject: s,
            audience: a
        };
        var payload = {
            id: id
        };
        var token = jsonwebtoken_1.default.sign(payload, "RESET-TOKEN-KEY", signOptions);
        return token;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map