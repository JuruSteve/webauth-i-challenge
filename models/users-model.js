const db = require('../data/dbConfig')

module.exports = {
  getUsers,
  addUser,
  findBy,
  find
}

function getUsers () {
  return db('users')
}

function addUser (user) {
  return db.insert(user, 'id')
    .into('users')
}

function findBy (user) {
  return db('users').select('*').where('username', '=', user.username)
}

function find () {
  return db('users')
}
