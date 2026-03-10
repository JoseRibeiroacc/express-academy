const positionService = require ("../services/positionService")

    const getPositions = async(req,res) => {
        const positions = await positionService.position.findMany()
        res.json(positions)
    }

    const getPosition = async(req,res) => {
        const id = Number(req.params.id)
        const position = await positionService.position.findUnique({
            where: {id}
        })
         res.json(position)
    }

    const createPosition = async(req,res)=> {
        const position = await positionService.position.create({
            data: req.body
               })
        res.status(201).json(position)
    }

    const updatePosition = async(req, res) => {
        const id = Number(req.params.id)
        const project = await positionService.position.update({
            where: {id},
            data: req.body
        })
        res.json(project)
    }

    const deletePosition = async(req,res) => {
        const id = Number(req.params.id)
        await positionService.position.delete({
            where: {id}
        })
        res.status(204).end()
    }


    module.exports = {
        getPositions,
        getPosition,
        createPosition,
        updatePosition,
        deletePosition
    }