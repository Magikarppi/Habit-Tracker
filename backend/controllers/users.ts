import express from 'express';
import bcryptjs from 'bcryptjs';

import User = require('../models/user');
import { UserDocument } from '../types';

const usersRouter = express.Router();

usersRouter.get('/', async (_request, response) => {
  try {
    const users: UserDocument[] = await User.find({}).populate('habits', {
      name: 1,
      completions: 1,
    });

    response.status(200).json(users.map((user) => user.toJSON()));
  } catch (exception: any) {
    console.log(exception);
    response.status(400).send({ error: exception });
  }
});

usersRouter.post('/', async (request, response) => {
  try {
    if (!request.body.password) {
      throw new Error('Password not provided');
    }
    if (!request.body.username) {
      throw new Error('Username not provided');
    }
    if (request.body.password.length < 5) {
      throw new Error('Minimum length for password is 5 characters');
    }

    const passwordHash = await bcryptjs.hash(request.body.password, 10);

    const user = new User({
      ...request.body,
      passwordHash,
    });

    const savedUser = await user.save();
    return response.status(201).json(savedUser);
  } catch (exception: any) {
    console.log(exception);
    return response.status(400).send({ error: exception });
  }
});

export = usersRouter;
