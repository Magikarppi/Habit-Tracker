const User = require('../models/user')

const usersInDB = async () => {
  const users = User.find({})
  return users
}

module.exports = {
  usersInDB
}