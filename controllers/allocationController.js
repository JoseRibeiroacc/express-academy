const prisma = require("../services/prismaService")
const {notDeleted, withNotDeleted, markDeleted} = require ("../utils/softDelete")
const asyncHandler = require("../utils/asyncHandler")

const getAllocations = asyncHandler(async(req, res) => {
    const allocations = await prisma.allocation.findMany({
        where : withNotDeleted(),
        include : {
            position: true,
            resource: true
        }
    }) 
    res.json(allocations)
})

const getAllocation = asyncHandler(async(req,res) => {
        const positionId = Number(req.params.positionId)
        const resourceId = Number(req.params.resourceId)

        const allocation = await prisma.allocation.findFirst({
            where : withNotDeleted({
                    positionId,
                    resourceId
                    }),
            include : {
                position : true,
                resource : true
            }
        })

        if(!allocation){
            return res.status(404).json({error: "Allocation not found"})
        }

        res.json(allocation)
})

      const createAllocation = asyncHandler(async(req,res)=> {
        const allocation = await prisma.allocation.create({
            data: req.body
               })
        res.status(201).json(allocation)
    } )

    const updateAllocation = asyncHandler(async(req, res) => {
        const positionId = Number(req.params.positionId)
        const resourceId = Number(req.params.resourceId)

        const allocation = await prisma.allocation.update({
            where : {
                positionId_resourceId : {
                    positionId,
                    resourceId
                }
            },
            data : req.body
            })
            res.json(allocation)
        })

        const deleteAllocation = asyncHandler(async(req,res) => {

        const positionId = Number(req.params.positionId)
        const resourceId = Number(req.params.resourceId)

        await prisma.allocation.update({
            where: {
                positionId_resourceId: {
                    positionId,
                    resourceId
                }
            },
            data : markDeleted
        })
        res.status(204).end()
    })


    module.exports = {
        getAllocations,
        getAllocation,
        createAllocation,
        updateAllocation,
        deleteAllocation
    }