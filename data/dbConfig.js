const knex = require('knex')
const knexConfing = require('../knexfile')

const db = knex(knexConfing.development)

module.exports = db
