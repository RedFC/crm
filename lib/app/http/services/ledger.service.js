"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerService = void 0;
const client_1 = require("@prisma/client");
const redis_service_1 = require("../../cache/redis.service");
const user_service_1 = require("./user.service");
class LedgerService extends redis_service_1.RedisService {
    constructor() {
        super();
        this.prisma = new client_1.PrismaClient();
    }
    create(schemaSale, schemaLegder) {
        return (new Promise((resolve, reject) => {
            this.prisma.sale.create({ data: schemaSale })
                .then((result) => {
                var debit = "0";
                var credit = "0";
                if (schemaLegder.type == "CREDIT") {
                    credit = result.netprice;
                }
                else if (schemaLegder.type == "DEBIT") {
                    debit = result.netprice;
                }
                this.prisma.ledger.create({ data: { customer: schemaLegder.customer, debit: debit, credit: credit } })
                    .then(resultledger => {
                    let myUserService = new user_service_1.UserService();
                    myUserService.getCustomer({ id: schemaLegder.customer.connect.id })
                        .then(customerResult => {
                        let amount = (Number(customerResult['balance']) + Number(resultledger.credit));
                        myUserService.updateCustomer({ id: schemaLegder.customer.connect.id }, { balance: String(amount) })
                            .then(data => resolve(data));
                    });
                })
                    .catch(error => reject(error))
                    .finally(() => this.prisma.$disconnect());
            })
                .catch((error) => reject(error))
                .finally(() => this.prisma.$disconnect());
        }));
    }
    find(where) {
        return (new Promise((resolve, reject) => {
            this.prisma.sale.findFirst({ where, include: { customer: true, item: true } })
                .then((result) => resolve(result))
                .catch((error) => reject(error))
                .finally(() => this.prisma.$disconnect());
        }));
    }
    findAll() {
        return (new Promise((resolve, reject) => {
            this.prisma.sale.findMany({ include: { customer: { select: { name: true } }, item: { select: { code: true } } } })
                .then((result) => resolve(result))
                .catch((error) => reject(error))
                .finally(() => this.prisma.$disconnect());
        }));
    }
    update(where, data) {
        return (new Promise((resolve, reject) => {
            this.prisma.sale.update({ where, data })
                .then((result) => resolve(result))
                .catch((error) => reject(error))
                .finally(() => this.prisma.$disconnect());
        }));
    }
    delete(where) {
        return (new Promise((resolve, reject) => {
            this.prisma.sale.delete({ where })
                .then((result) => resolve(result))
                .catch((error) => reject(error))
                .finally(() => this.prisma.$disconnect());
        }));
    }
}
exports.LedgerService = LedgerService;
//# sourceMappingURL=ledger.service.js.map