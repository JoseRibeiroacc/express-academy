const router = require("express").Router()
const allocationController = require("../controllers/allocationController")


router.get("/",allocationController.getAllocations)
router.get("/:positionId/:resourceId",allocationController.getAllocation)
router.post("/",allocationController.createAllocation)
router.put("/:positionId/:resourceId",allocationController.updateAllocation)
router.delete("/:positionId/:resourceId", allocationController.deleteAllocation)




module.exports = router