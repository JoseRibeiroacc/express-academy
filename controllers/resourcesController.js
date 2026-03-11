const resourceService = require("../services/resourceService")
const asyncHandler = require("../utils/asyncHandler")
const {notDeleted, withNotDeleted, markDeleted} = require ("../utils/softDelete")

const getResources = asyncHandler(async(req, res) => {
    const resources = await resourceService.resource.findMany({
        where: withNotDeleted(),
        include : {
            allocations: {
                where: notDeleted
            } 
        }
    })
    res.json(resources)
})

const getResource = asyncHandler(async(req,res) => {
    const id = Number(req.params.id)
    const resource = await resourceService.resource.findFirst({
        where: withNotDeleted({id}),
     include : {
        allocations : {
            where: notDeleted,
            include : {
                position: true
            }
        }
     }
    })
    if(!resource) {
        return res.status(404).json({error: "Resource not found"})
    }
    res.json(resource)
})

const createResource = asyncHandler(async(req,res) => {
    const resource = await resourceService.resource.create({
        data: req.body
    })
    res.status(201).json(resource)
     
})

const updateResource = asyncHandler(async(req,res) => {

    const id = Number(req.params.id)
    const resource = await resourceService.resource.update({
        where: {id},
        data: req.body
    })
    res.json(resource)
    
})

const deleteResource = asyncHandler(async(req, res) => {

    const id = Number(req.params.id)
    await resourceService.resource.update({
        where: {id} ,
        data : markDeleted
    })
    res.status(204).end()

})


module.exports = {
    getResources,
    getResource,
    createResource,
    updateResource,
    deleteResource
}