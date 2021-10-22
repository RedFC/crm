import {Customer, Items, ledger, PrismaClient, Sale} from '@prisma/client'
import { RedisService } from '../../cache/redis.service';
import {UserService} from './user.service'

interface SaleResolver{
  customer:{connect:{id:Customer['id']}},
  item:{connect:{id:Items['id']}},
  itemprice:String,
  netprice:String,
  quantity:String
}

interface LedgerResolver{
  customer:{connect:{id:Customer['id']}},
  type:String
}

export class LedgerService extends RedisService{
  private prisma;
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  create(schemaSale:SaleResolver,schemaLegder:LedgerResolver): Promise<any>{
    return (
      new Promise((resolve,reject) => {
        this.prisma.sale.create({data:schemaSale})
          .then((result) => {
              var debit = "0";
              var credit = "0";
              if(schemaLegder.type == "CREDIT"){
                credit = result.netprice
              }else if(schemaLegder.type == "DEBIT"){
                debit = result.netprice
              }
              this.prisma.ledger.create({data:{customer:schemaLegder.customer,debit:debit,credit:credit}})
                .then(resultledger => {
                  let myUserService = new UserService();
                      myUserService.getCustomer({id : schemaLegder.customer.connect.id})
                        .then(customerResult => {
                          let amount = (Number(customerResult['balance'])+Number(resultledger.credit));
                          myUserService.updateCustomer({id:schemaLegder.customer.connect.id},{balance:String(amount)})
                          .then(data => resolve(data))
                        })
                })
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect())
          })
          .catch((error) => reject(error))
          .finally(() => this.prisma.$disconnect()) 
        })
      )
  }

  find(where): Promise<Sale>{
    return (
      new Promise((resolve,reject) => {
        this.prisma.sale.findFirst({ where,include:{customer:true,item:true} })
          .then((result) => resolve(result))
          .catch((error) => reject(error))
          .finally(() => this.prisma.$disconnect()) 
        })
      )
  }

  findAll(): Promise<Sale>{
    return (
      new Promise((resolve,reject) => {
        this.prisma.sale.findMany({include:{customer:{select:{name:true}},item:{select:{code:true}}}})
          .then((result) => resolve(result))
          .catch((error) => reject(error))
          .finally(() => this.prisma.$disconnect()) 
        })
      )
  }


  update(where,data):Promise<Sale>{
    return (
      new Promise((resolve,reject) => {
        this.prisma.sale.update({where,data})
          .then((result) => resolve(result))
          .catch((error) => reject(error))
          .finally(() => this.prisma.$disconnect()) 
        })
      )
  }

  delete(where):Promise<Sale>{
    return (
      new Promise((resolve,reject) => {
        this.prisma.sale.delete({where})
          .then((result) => resolve(result))
          .catch((error) => reject(error))
          .finally(() => this.prisma.$disconnect()) 
        })
      )
  }


}