const habitRouter = require('express').Router();
const Habit = require('../models/habit')
const User = require('../models/user')

habitRouter.get('/', async (request, response) => {
  try {
    const habits = await Habit.find({}).populate('user', { username: 1 })
    response.json(habits.map(habit => habit.toJSON()))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: exception.message })
  }
})

habitRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.userId)

  const habit = new Habit({
    ...request.body,
    user: user._id
  })


  try {
    const savedHabit = await habit.save()
    user.habits = user.habits.concat(savedHabit._id)
    await user.save()

    response.status(201).json(savedHabit.toJSON())
  } catch(exception) {
    console.log(exception)
    response.status(400).send({ error: exception.message })
  }
})

habitRouter.delete('/:id', async (request, response) => {
  try {
    await Habit.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: exception.message })
  }
})

module.exports = habitRouter