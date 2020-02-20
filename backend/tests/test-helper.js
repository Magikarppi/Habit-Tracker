const User = require('../models/user')

const usersInDB = async () => {
  try {
    const users = await User.find({})
    console.log('users', users)
    return users.map(user => user.toJSON())
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  usersInDB
}