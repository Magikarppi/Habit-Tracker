const habitRouter = require("express").Router();
const Habit = require('../models/habit')

habitRouter.get('/', async (request, response) => {
  try {
    const habits = await Habit.find({})
    response.json(habits.map(habit => habit.toJSON()))
  } catch (exception) {
    
  }
})

habitRouter.post('/', async (request, response) => {
  const habit = new Habit({
    ...request.body
  })

  try {
    const savedHabit = await habit.save()

    response.status(201).json(savedHabit.toJSON())
  } catch(exception) {

  }
})

habitRouter.delete('/:id', async (request, response) => {
  try {
    await Habit.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  } catch (exception) {

  }
})

module.exports = habitRouter