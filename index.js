const express = require('express')
const config = require('./utils/config')
const logger = require('./utils/logger')

const projectsRouter = require ("./routes/projects")
const resourcesRouter = require ("./routes/resources")
const positionRouter = require ("./routes/positions")
const allocationsRouter = require ("./routes/allocations")
const authRouter = require ("./routes/auth")
const {unknownEndpoint, errorHandler } = require ("./utils/middleware")

const app = express();

app.use(express.json())


app.get('/', (request, response) => {
    response.send('<h1> Express Academy </h1>')
})

app.use("/auth", authRouter)
app.use("/projects", projectsRouter)
app.use("/resources", resourcesRouter)
app.use("/positions", positionRouter)
app.use("/allocations", allocationsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(config.PORT,() => {
    logger.info(`Server running on port ${config.PORT}`)
})
