const express = require('express')
const router = express.Router()
const Users = require('../models/users-model')
const bcrypt = require('bcrypt')

router.post('/login', (req, res) => {
  let { username, password } = req.body
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username
        res.status(200).json({ message: `Logged In`, cookie: user.id })
      } else {
        res.status(401).json({ message: `Invalid Credentials` })
      }
    })
})

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      res.status(500).json({ message: 'Please provide credentials' })
    } else {
      const hash = bcrypt.hashSync(password, 10)
      const newUser = { username, password: hash }
      const users = await Users.addUser(newUser)
      res.status(200).json(users)
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = router
