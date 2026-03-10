const resourceService = require("../services/resourceService")

const getResources = async(req, res) => {
    const resources = await resourceService.resource.findMany()
    res.json(resources)
}

const getResource = async(req,res) => {
    const id = Number(req.params.id)
    const resource = await resourceService.resource.findUnique({where : {id}})
    res.json(resource)
}

const createResource = async(req,res) => {
    const resource = await resourceService.resource.create({
        data: req.body
    })
    res.status(201).json(resource)
}

const updateResource = async(req,res) => {
    const id = Number(req.params.id)
    const resource = await resourceService.resource.update({
        where: {id},
        data: req.body
    })
    res.json(resource)
}

const deleteResource = async(req, res) => {
    const id = Number(req.params.id)
    await resourceService.resource.delete({
        where: {id}
    })
    res.status(204).end()


}


module.exports = {
    getResources,
    getResource,
    createResource,
    updateResource,
    deleteResource
}