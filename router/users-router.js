const express = require('express')
const router = express.Router()
const Users = require('../models/users-model')
const bcrypt = require('bcrypt')

// router.get('/', async (req, res) => {
//   try {
//     const users = await Dishes.getUsers()
//     res.status(200).json(users)
//   } catch (error) {
//     res.status(500).json({ message: 'We ran into an error retrieving the dishes' })
//   }
// })

router.post('/', async (req, res) => {
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
