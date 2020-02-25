const router = require('express').Router();
const Habit = require('../models/habit');
const User = require('../models/user');

router.post('/reset', async (request, response) => {
  await Habit.deleteMany({});
  await User.deleteMany({});

  response.status(204).end()
})

module.exports = router;