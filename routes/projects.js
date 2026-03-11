const router = require("express").Router()
const projectsController = require("../controllers/projectsController")

router.get("/", projectsController.getProjects)
router.get("/:id/positions", projectsController.getProjectPositions)
router.get("/:id", projectsController.getProject)
router.post("/", projectsController.createProject)
router.put("/:id", projectsController.updateProject)
router.delete("/:id", projectsController.deleteProject)

module.exports = router