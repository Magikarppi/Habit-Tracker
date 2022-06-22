import express from 'express';
import jwt = require('jsonwebtoken');
import bcryptjs = require('bcryptjs');

import config = require('../utils/config');
import User = require('../models/user');

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
  try {
    const user = await User.findOne({
      username: request.body.username,
    }).populate('habits');

    const passwordCorrect =
      user === null
        ? false
        : await bcryptjs.compare(
            request.body.password.toString(),
            user.passwordHash
          );

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password',
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, config.SECRET!);

    response.status(200).send({
      token,
      username: user.username,
      habits: user.habits,
      id: user._id,
    });
    return;
  } catch (exception: any) {
    console.log(exception);
    response.status(401).send({ error: exception });
    return;
  }
});

export = loginRouter;
