// import express = require('express');
import express, { Request } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

import * as middleware from './utils/middleware';
// const habitRouter = require('./controllers/habit');
import * as habitRouter from './controllers/habit';
import * as usersRouter from './controllers/users';
import * as loginRouter from './controllers/login';

const app = express();

morgan.token('data', (req) => {
  JSON.stringify(req.body);
});

const loggerFormat = ':data ":method :url" :status :response-time';

app.use(morgan(loggerFormat));

mongoose
  .connect(
    process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'test'
      ? process.env.MONGODB_TEST_URI
      : process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
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

module.exports = app;
