const express = require('express')
const router = express.Router()
const Users = require('../models/users-model')
const protectedRoute = require('../auth/restricted-middleware')

router.get('/', protectedRoute, async (req, res) => {
  try {
    const users = await Users.getUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'We ran into an error retrieving the dishes' })
  }
})

module.exports = router
