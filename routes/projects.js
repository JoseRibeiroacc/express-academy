const router = require("express").Router()
const projectsController = require("../controllers/projectsController")
const {tokenExtractor, userExtractor} = require ("../utils/middleware")

router.get("/", projectsController.getProjects)
router.get("/:id/positions", projectsController.getProjectPositions)
router.get("/:id", projectsController.getProject)
router.post("/", tokenExtractor,userExtractor,projectsController.createProject)
router.put("/:id", tokenExtractor,userExtractor,projectsController.updateProject)
router.delete("/:id", tokenExtractor,userExtractor,projectsController.deleteProject)


module.exports = router