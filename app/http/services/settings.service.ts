"use strict";
import { PrismaClient } from '@prisma/client';
import { RedisService } from '../../cache/redis.service';


export class SettingsService extends RedisService {

    private prisma;
    constructor() {
        super()
        this.prisma = new PrismaClient();
    }


  
}