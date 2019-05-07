const express = require('express')
const router = express.Router()
const Dishes = require('../models/users-model')

router.get('/', async (req, res) => {
  try {
    const users = await Dishes.getUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'We ran into an error retrieving the dishes' })
  }
})

module.exports = router
