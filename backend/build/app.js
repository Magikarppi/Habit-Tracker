"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express = require('express');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const config = require("./utils/config");
// import * as middleware from './utils/middleware';
const middleware = require("./utils/middleware");
const habitRouter = require("./controllers/habit");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const app = express_1.default();
morgan_1.default.token('data', (req) => {
    return JSON.stringify(req.body);
});
const loggerFormat = ':data ":method :url" :status :response-time';
app.use(morgan_1.default(loggerFormat));
mongoose_1.default
    .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => {
    console.log('connected to MongoDB via url: ', config.MONGODB_URI);
})
    .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
});
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(middleware.tokenExtractor);
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing');
    app.use('/api/testing', testingRouter);
}
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('build'));
}
app.use('/api/habits', habitRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
module.exports = app;
