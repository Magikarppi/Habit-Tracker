import jwt = require('jsonwebtoken');
import express = require('express');
import Habit = require('../models/habit');
import User = require('../models/user');
// import { Router } from 'express';

const habitRouter = express.Router();

habitRouter.get('/', async (_request, response) => {
  try {
    const habits = await Habit.find({}).populate('user', { username: 1 });
    response.json(habits.map((habit) => habit.toJSON()));
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: exception.message });
  }
});

habitRouter.post('/', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    console.log('request body:', request.body);

    const habit = new Habit({
      ...request.body,
      user: user._id,
    });

    const savedHabit = await habit.save();
    user.habits = user.habits.concat(savedHabit._id);
    await user.save();

    response.status(201).json(savedHabit.toJSON());
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: exception.message });
  }
});

habitRouter.delete('/:id', async (request, response) => {
  try {
    await Habit.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  } catch (exception) {
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
    response.json(updatedHabit.toJSON());
  } catch (error) {
    console.log(error);
  }
});

module.exports = habitRouter;
