const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

async function main() {

    prisma.role.createMany({
        data : [
            {
                id : "e6895e69-bb65-4f92-8989-6aae24defc84",name : "ADMIN"
            }
        ]
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    })



    prisma.user.create({
        data : {
            "id": "e6895e69-bb65-4f92-8989-6aae24defc81",
            "email": "admin@gmail.com",
            "blocked": false,
            "password" : "admin12345",
            "roleId" : "e6895e69-bb65-4f92-8989-6aae24defc84",
            profile : {
                create : {
                    "name" : "AmeerAdmin",
                    "about" : "",
                    "phoneNo" : "03333333333",
                    "profileImage": "http://localhost:8000/resources/cloudinary/images/378e5609-1ad7-44e2-acf2-be1cb4028a4a/2021-06-23T15-20-02.311Z-sydney-wallpaper"
                }
            }
    }
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error); 
})

}
main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })