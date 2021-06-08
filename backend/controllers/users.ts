/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
// const usersRouter = require('express').Router();
// import * as User from '../models/user';
const User = require('../models/user');
// const User = require('../models/user');
import bcryptjs from 'bcryptjs';
// const bcryptjs = require('bcryptjs');
import { UserDocument } from '../types';

const usersRouter = express.Router();

usersRouter.get('/', async (_request, response) => {
  try {
    const users: UserDocument[] = await User.find({}).populate('habits', {
      name: 1,
      completions: 1,
    });

    response.status(200).json(users.map((user) => user.toJSON()));
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: exception.message });
  }
});

usersRouter.post('/', async (request, response) => {
  if (request.body.password.length < 5) {
    throw new Error('Minimum length for password is 5 characters');
  }

  try {
    const passwordHash = await bcryptjs.hash(request.body.password, 10);

    const user = new User({
      ...request.body,
      passwordHash,
    });

    const savedUser = await user.save();
    return response.status(201).json(savedUser);
  } catch (exception) {
    console.log(exception);
    return response.status(400).send({ error: exception.message });
  }
});

module.exports = usersRouter;
