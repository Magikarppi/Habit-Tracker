const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const config = require('../utils/config')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {

  try {
  const user = await User.findOne({ username: request.body.username }).populate('habits')
  console.log('user', user)
  const passwordCorrect = user === null 
    ? false
    : await bcryptjs.compare(request.body.password.toString(), user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, config.SECRET)

    response.status(200).send({ token, username: user.username, habits: user.habits, id: user._id})
  } catch (exception) {
    console.log(exception)
    response.status(401).send({ error: exception.message })
  }
})

module.exports = loginRouter