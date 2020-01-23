const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const morgan = require('morgan')

const middleware = require('./utils/middleware')
const habitRouter = require('./controllers/habit')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

morgan.token('data', (req, res) => {
  JSON.stringify(req.body);
});

const loggerFormat = ':data ":method :url" :status :response-time';

app.use(morgan(loggerFormat));

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('connected to MongoDB via url: ', config.MONGODB_URI);
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

app.use('/api/habits', habitRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app