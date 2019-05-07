const express = require('express')
const helmet = require('helmet')
const server = express()
const usersRouter = require('./router/users-router')

server.use(express.json())
server.use(helmet())

server.use('/api/users', usersRouter)

const port = 3300
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
