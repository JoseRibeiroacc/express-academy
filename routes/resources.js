const router = require("express").Router()
const resourcesController = require("../controllers/resourcesController")


router.get("/",resourcesController.getResources)
router.get("/:id",resourcesController.getResource)
router.post("/",resourcesController.createResource)
router.put("/:id",resourcesController.updateResource)
router.delete("/:id", resourcesController.deleteResource)




module.exports = router