const prisma = require("../services/prismaService")
const asyncHandler = require("../utils/asyncHandler")
const {
  notDeleted,
  withNotDeleted,
  markDeleted
} = require("../utils/softDelete")

const getProjects = asyncHandler(async (req, res) => {
  const projects = await prisma.project.findMany({
    where: withNotDeleted(),
    include: {
      positions: {
        where: notDeleted
      }
    }
  })
  res.json(projects)
})

const getProject = asyncHandler(async (req, res) => {
  const id = Number(req.params.id)
  const project = await prisma.project.findFirst({
    where: withNotDeleted({ id }),
    include: {
      positions: {
        where: notDeleted
      }
    }
  })
  if (!project) {
    return res.status(404).json({ error: "Project not found" })
  }
  res.json(project)
})

const getProjectPositions = asyncHandler(async (req, res) => {
  const id = Number(req.params.id)
  const project = await prisma.project.findFirst({
    where: withNotDeleted({ id }),
    include: {
      positions: {
        where: notDeleted
      }
    }
  })

  if (!project) {
    return res.status(404).json({ error: "Project not found" })
  }

  res.json(project.positions)
})

const createProject = asyncHandler(async (req, res) => {
  const project = await prisma.project.create({
    data: req.body
  })
  res.status(201).json(project)
})

const updateProject = asyncHandler(async (req, res) => {
  const id = Number(req.params.id)
  const project = await prisma.project.update({
    where: { id },
    data: req.body
  })
  res.json(project)
})

const deleteProject = asyncHandler(async (req, res) => {
  const id = Number(req.params.id)
  await prisma.project.update({
    where: { id },
    data: markDeleted
  })
  res.status(204).end()
})

module.exports = {
  getProjects,
  getProject,
  getProjectPositions,
  createProject,
  updateProject,
  deleteProject
}
