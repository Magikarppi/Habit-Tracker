import express = require('express');
import cors = require('cors');
import mongoose = require('mongoose');
import morgan = require('morgan');

import config = require('./utils/config');
import middleware = require('./utils/middleware');
import habitRouter = require('./controllers/habit');
import usersRouter = require('./controllers/users');
import loginRouter = require('./controllers/login');
import { RequestMorgan } from './types';

const app = express();

morgan.token('data', (req: RequestMorgan) => {
  return JSON.stringify(req.body);
});

const loggerFormat = ':data ":method :url" :status :response-time';

app.use(morgan(loggerFormat));

mongoose
  .connect(config.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connected to MongoDB via url: ', config.MONGODB_URI);
  })
  .catch((error: any) => {
    console.log('error connecting to MongoDB', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.use('/api/habits', habitRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

export = app;
