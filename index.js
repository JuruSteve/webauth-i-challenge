const express = require('express')
const helmet = require('helmet')
const session = require('express-session')
const server = express()
const usersRouter = require('./router/users-router')
const authRouter = require('./auth/auth-router')

server.use(session({
  name: 'sid',
  secret: 'thisisasecret',
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 2,
    secure: false
  },
  resave: false,
  saveUninitialized: false
}))
server.use(express.json())
server.use(helmet())
server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  const username = req.session.username || 'stranger'
  res.send(`Welcome ${username}`)
})

server.get('/logout', (req, res) => {
  req.session.destroy()
  res.send('You\'re logged out')
})

const port = 3300
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
