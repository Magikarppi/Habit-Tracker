/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
// import * as Habit from '../models/habit';
const Habit = require('../models/habit');
import * as User from '../models/user';

const testingRouter = express.Router();

testingRouter.post('/reset', async (_request, response) => {
  await Habit.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
