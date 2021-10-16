"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const client_1 = require("@prisma/client");
const redis_service_1 = require("../../cache/redis.service");
class ItemService extends redis_service_1.RedisService {
    constructor() {
        super();
        this.prisma = new client_1.PrismaClient();
    }
    create(data) {
        return (new Promise((resolve, reject) => {
            this.prisma.items.create({ data })
                .then((result) => resolve(result))
                .catch((error) => reject(error))
                .finally(() => this.prisma.$disconnect());
        }));
    }
    find(where) {
        return (new Promise((resolve, reject) => {
            this.prisma.items.findFirst({ where })
                .then((result) => resolve(result))
                .catch((error) => reject(error))
                .finally(() => this.prisma.$disconnect());
        }));
    }
    findAll() {
        return (new Promise((resolve, reject) => {
            this.prisma.items.findMany()
                .then((result) => resolve(result))
                .catch((error) => reject(error))
                .finally(() => this.prisma.$disconnect());
        }));
    }
    update(where, data) {
        return (new Promise((resolve, reject) => {
            this.prisma.items.update({ where, data })
                .then((result) => resolve(result))
                .catch((error) => reject(error))
                .finally(() => this.prisma.$disconnect());
        }));
    }
    delete(where) {
        return (new Promise((resolve, reject) => {
            this.prisma.items.delete({ where })
                .then((result) => resolve(result))
                .catch((error) => reject(error))
                .finally(() => this.prisma.$disconnect());
        }));
    }
}
exports.ItemService = ItemService;
//# sourceMappingURL=Items.service.js.map