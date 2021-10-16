"use strict";
import { PrismaClient } from '@prisma/client' 
export interface ITeams {
  id:string,
  name:string
  createdAt: Date;
  updatedAt: Date;
}