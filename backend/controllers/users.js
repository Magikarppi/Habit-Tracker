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
  if (request.body.password.length < 5) {
    // return response.status(400).send({ error: 'Minimum length for password is 5 characters'})
    throw new Error('Minimum length for password is 5 characters')
  }

  try {
    const passwordHash = await bcryptjs.hash(request.body.password, 10);

    const user = new User({
      ...request.body,
      passwordHash
    });

    const savedUser = await user.save();
    return response.status(201).json(savedUser);
  } catch (exception) {
    console.log(exception);
    return response.status(400).send({ error: exception.message });
  }
});

module.exports = usersRouter;