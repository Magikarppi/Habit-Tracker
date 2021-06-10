import express from 'express';

import Habit = require('../models/habit');
import User = require('../models/user');

const testingRouter = express.Router();

testingRouter.post('/reset', async (_request, response) => {
  await Habit.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

export = testingRouter;
