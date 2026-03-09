const express = require('express')
const config = require('./utils/config')
const logger = require('./utils/logger')

const projectsRouter = require ("./routes/projects")

const app = express();

app.use(express.json())


app.get('/', (request, response) => {
    response.send('<h1> Hello World!</h1>')
})

app.use("/projects", projectsRouter)

app.listen(config.PORT,() => {
    logger.info(`Server running on port ${config.PORT}`)
})
