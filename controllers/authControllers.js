const bcrypt = require ("bcrypt")
const jwt = require ("jsonwebtoken")
const asyncHandler = require("../utils/asyncHandler")
const prisma = require ("../services/prismaService")
const {withNotDeleted} = require("../utils/softDelete")

const register = asyncHandler(async (req,res)=> {
    const {username,password, firstName, lastName } = req.body

    if(!username|| !password){
        return res.status(400).json({error: "username and password are required"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await prisma.user.create({
        data:{
            username,
            password: passwordHash,
            role : "user",
            firstName,
            lastName
        }
    })

    res.status(201).json({
        id: user.id,
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName

    })

})

    const login = asyncHandler(async (req,res)=> {

        const {username, password} = req.body

        if(!username || !password) {
            return res.status(400).json({error: "username and password are required"})
        }

        const user = await prisma.user.findFirst({
            where: withNotDeleted({username})
        })

        if(!user) {
            return res.status(401).json({error: "invalid username or password"})
        }

         const passwordCorrect = await bcrypt.compare(password, user.password)

            if (!passwordCorrect) {
            return res.status(401).json({
            error: 'invalid username or password'
            })
        }

            const userForToken = {
            id: user.id,
            username: user.username,
            role: user.role
        }

        const token = jwt.sign(
            userForToken,
            process.env.JWT_SECRET,
            { expiresIn: 60*60 }
        )

        res.status(200).json({ token, username: user.username, role:user.role, firstName: user.firstName, lastName: user.lastName })
        })

        module.exports = {
            register,login
        } 