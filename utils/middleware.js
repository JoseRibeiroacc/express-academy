const logger = require("./logger")
const jwt = require("jsonwebtoken")

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response) => {
  logger.error(error.message)

  if (error.name === "PrismaClientValidationError") {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === "PrismaClientKnownRequestError") {
    if (error.code === "P2002") {
      return response.status(400).json({ error: "Unique constraint failed" })
    }
    return response.status(400).json({ error: error.message })
  }
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }
  return response.status(500).json({ error: "Internal Server Error" })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "")
  } else {
    request.token = null
  }
  next()
}

const userExtractor = (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: "token missing" })
  }
  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)
  request.user = decodedToken
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
