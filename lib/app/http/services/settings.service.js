"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const client_1 = require("@prisma/client");
const redis_service_1 = require("../../cache/redis.service");
class SettingsService extends redis_service_1.RedisService {
    constructor() {
        super();
        this.prisma = new client_1.PrismaClient();
    }
}
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map