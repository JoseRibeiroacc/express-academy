require("dotenv").config()
const prisma = require("./services/projectService")


async function test() {
    console.log("user model exists:", !!prisma.user)

    const users = await prisma.user.findMany()
    console.log(users)
}

test()

.catch((error) => {
    console.log(error)
})
.finally(async () => {
    await prisma.$disconnect()
})