const express = require('express')
const helmet = require('helmet')
const server = express()
const usersRouter = require('./router/users-router')
const Users = require('./models/users-model')
const bcrypt = require('bcrypt')

server.use(express.json())
server.use(helmet())
server.use('/api/register', usersRouter)
server.post('/api/login', (req, res) => {
  let { username, password } = req.body
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Logged In`, cookie: user.id })
      } else {
        res.status(401).json({ message: `Invalid Credentials` })
      }
    })
})
server.get('/api/users', protectedRoute, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(e => {
      res.status(400).json(e)
    })
})

function protectedRoute (req, res, next) {
  const { username, password } = req.body
  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next()
        } else {
          res.status(401).json({ message: `Invalid Credentials` })
        }
      })
      .catch(e => {
        res.status(500).json({ message: 'You shall not pass [' })
      })
  } else {
    res.status(400).json({ message: 'Please provide credentials [' })
  }
}

const port = 3300
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
