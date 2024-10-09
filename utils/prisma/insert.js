let { PrismaClient } = require('@prisma/client');
let prisma = new PrismaClient();


const add = async () => {
     await prisma.message.create({
        data :{
            message : "test"
        }
     })
}

add()