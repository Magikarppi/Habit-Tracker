const usersRouter = require('express').Router()
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({}).populate('habits', { name: 1, completions: 1 })

    response.status(200).json(users.map(user => user.toJSON()))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: exception.message })
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const passwordHash = await bcryptjs.hash(request.body.password, 10)

    const user = new User({
      ...request.body,
      passwordHash
    })

    const savedUser = user.save()

    response.status(201).json(savedUser) //toJSON() ?
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: exception.message })
  }
})

module.exports = usersRouter