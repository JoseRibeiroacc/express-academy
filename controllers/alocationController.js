const alocationService = require("../services/alocationService")

const getAlocations = async(req, res) => {
    const alocations = await alocationService.allocation.findMany() 
    res.json(alocations)
}

module.exports = {
    getAlocations
}