const router = require("express").Router()
const positionController = require("../controllers/positionController")

router.get("/", positionController.getPositions)
router.get("/:id/allocations", positionController.getPositionAllocations)
router.get("/:id", positionController.getPosition)
router.post("/", positionController.createPosition)
router.put("/:id", positionController.updatePosition)
router.delete("/:id", positionController.deletePosition)

module.exports = router