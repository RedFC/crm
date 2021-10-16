import {Items, PrismaClient} from '@prisma/client'
import { RedisService } from '../../cache/redis.service';
import { ITeams } from '../models/teams.model';
import { IUser } from '../models/user.model';


interface ItemResolver{
  name:String	
  code	:String
  qty	:String
  price	:String
}

export class ItemService extends RedisService{
  private prisma;
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  create(data:ItemResolver): Promise<ITeams>{
    return (
      new Promise((resolve,reject) => {
        this.prisma.items.create({ data })
          .then((result) => resolve(result))
          .catch((error) => reject(error))
          .finally(() => this.prisma.$disconnect()) 
        })
      )
  }

  find(where): Promise<Items>{
    return (
      new Promise((resolve,reject) => {
        this.prisma.items.findFirst({ where })
          .then((result) => resolve(result))
          .catch((error) => reject(error))
          .finally(() => this.prisma.$disconnect()) 
        })
      )
  }

  findAll(): Promise<Items>{
    return (
      new Promise((resolve,reject) => {
        this.prisma.items.findMany()
          .then((result) => resolve(result))
          .catch((error) => reject(error))
          .finally(() => this.prisma.$disconnect()) 
        })
      )
  }


  update(where,data):Promise<Items>{
    return (
      new Promise((resolve,reject) => {
        this.prisma.items.update({where,data})
          .then((result) => resolve(result))
          .catch((error) => reject(error))
          .finally(() => this.prisma.$disconnect()) 
        })
      )
  }

  delete(where):Promise<Items>{
    return (
      new Promise((resolve,reject) => {
        this.prisma.items.delete({where})
          .then((result) => resolve(result))
          .catch((error) => reject(error))
          .finally(() => this.prisma.$disconnect()) 
        })
      )
  }

}