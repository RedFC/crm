var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        prisma.role.createMany({
            data: [
                {
                    id: "e6895e69-bb65-4f92-8989-6aae24defc84", name: "ADMIN"
                }
            ]
        }).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        });
        prisma.user.create({
            data: {
                "id": "e6895e69-bb65-4f92-8989-6aae24defc81",
                "email": "admin@gmail.com",
                "blocked": false,
                "password": "admin12345",
                "roleId": "e6895e69-bb65-4f92-8989-6aae24defc84",
                profile: {
                    create: {
                        "name": "AmeerAdmin",
                        "about": "",
                        "phoneNo": "03333333333",
                        "profileImage": "http://localhost:8000/resources/cloudinary/images/378e5609-1ad7-44e2-acf2-be1cb4028a4a/2021-06-23T15-20-02.311Z-sydney-wallpaper"
                    }
                }
            }
        }).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        });
    });
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(this, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=default_data.js.map