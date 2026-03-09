const projectService = require("../services/projectService")

const getProjects = async (req, res) => {
    const projects = await projectService.project.findMany()
    res.json(projects)
} 

const getProject = async (req, res) => {
    const id = Number(req.params.id)
    const project = await projectService.project.findUnique({
        where : {id}
    })
    res.json(project)

}

const createProject = async(req, res) => {
    const project = await projectService.project.create({
        data: req.body
    })
    res.status(201).json(project)
}

const updateProject = async(req,res) => {
    const id = Number(req.params.id)
    const project = await projectService.project.update({
        where: {id},
        data: req.body
    })
    res.json(project)
}

const deleteProject = async(req, res) => {
    const id = Number(req.params.id)
    await projectService.project.delete({
        where: {id}
    })
    res.status(204).end()
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
}
