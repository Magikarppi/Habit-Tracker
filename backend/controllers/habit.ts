import jwt from 'jsonwebtoken';
import express from 'express';

import Habit = require('../models/habit');
import User = require('../models/user');
import { HabitDocument } from '../types';
import config = require('../utils/config');

const habitRouter = express.Router();

habitRouter.get('/', async (_request, response) => {
  try {
    const habits: HabitDocument[] = await Habit.find({}).populate('user', {
      username: 1,
    });
    response.json(habits.map((habit) => habit.toJSON()));
  } catch (exception: any) {
    console.log(exception);
    response.status(400).send({ error: exception.message });
  }
});

habitRouter.post('/', async (request, response) => {
  try {
    if (!request.token) {
      throw new Error('token missing');
    }

    const decodedToken: any = jwt.verify(request.token, config.SECRET!);

    if (!decodedToken || !decodedToken.id) {
      throw new Error('token invalid');
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      throw new Error('User not found');
    }

    const habit = new Habit({
      ...request.body,
      user: user._id,
    });

    const savedHabit = await habit.save();
    user.habits = user.habits.concat(savedHabit._id);
    await user.save();

    response.status(201).json(savedHabit.toJSON());
    return;
  } catch (exception: any) {
    console.log(exception);
    response.status(400).send({ error: exception.message });
    return;
  }
});

habitRouter.delete('/:id', async (request, response) => {
  try {
    await Habit.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception: any) {
    console.log(exception);
    response.status(400).send({ error: exception.message });
  }
});

habitRouter.put('/:id', async (request, response) => {
  try {
    const habit = {
      ...request.body,
    };

    const updatedHabit = await Habit.findByIdAndUpdate(
      request.params.id,
      habit,
      {
        new: true,
        omitUndefined: true,
      }
    );

    if (!updatedHabit) {
      throw new Error('Habit update failed');
    }

    response.json(updatedHabit.toJSON());
  } catch (exception: any) {
    console.log(exception);
    response.status(400).send({ exception: exception.message });
  }
});

export = habitRouter;
