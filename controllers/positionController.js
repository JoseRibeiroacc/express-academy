const positionService = require ("../services/positionService")
const asyncHandler = require("../utils/asyncHandler")
const {notDeleted, withNotDeleted, markDeleted } = require ("../utils/softDelete")

    const getPositions = asyncHandler(async(req,res) => {
        const positions = await positionService.position.findMany({
            where: withNotDeleted(),
            include : {
            project : true
        }
    })
        res.json(positions)
    } )

    const getPosition = asyncHandler(async(req,res) => {
        const id = Number(req.params.id)
        const position = await positionService.position.findFirst({
            where: withNotDeleted(id),
            include : {
                project : true,
                allocations : {
                    where: notDeleted,
                    include : {
                        resource : true
                    }
                }
            }
        })

        if(!position) {
            return res.status(404).json({error: "Position not found"})
        }
         res.json(position)
    })

    const createPosition = asyncHandler(async(req,res)=> {
        const position = await positionService.position.create({
            data: req.body
               })
        res.status(201).json(position)
        
    } )


    const updatePosition = asyncHandler(async(req, res) => {

        const id = Number(req.params.id)
        const position  = await positionService.position.update({
            where: {id},
            data: req.body
        })
        res.json(position)
        
    })

    const deletePosition = asyncHandler(async(req,res) => {
        const id = Number(req.params.id)
        await positionService.position.update({
            where: {id} ,
            data : markDeleted
        })
        res.status(204).end()       
    } )


    module.exports = {
        getPositions,
        getPosition,
        createPosition,
        updatePosition,
        deletePosition
    }