"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const Habit = require("../models/habit");
const User = require("../models/user");
const config = require("../utils/config");
const habitRouter = express_1.default.Router();
habitRouter.get('/', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habits = yield Habit.find({}).populate('user', {
            username: 1,
        });
        response.json(habits.map((habit) => habit.toJSON()));
    }
    catch (exception) {
        console.log(exception);
        response.status(400).send({ error: exception.message });
    }
}));
habitRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.token) {
            throw new Error('token missing');
        }
        const secretForJwt = config.SECRET || '';
        const decodedToken = jsonwebtoken_1.default.verify(request.token, secretForJwt);
        if (!decodedToken.id) {
            throw new Error('token invalid');
        }
        const user = yield User.findById(decodedToken.id);
        if (!user) {
            throw new Error('User not found');
        }
        const habit = new Habit(Object.assign(Object.assign({}, request.body), { user: user._id }));
        const savedHabit = yield habit.save();
        user.habits = user.habits.concat(savedHabit._id);
        yield user.save();
        response.status(201).json(savedHabit.toJSON());
    }
    catch (exception) {
        console.log(exception);
        response.status(400).send({ error: exception.message });
    }
}));
habitRouter.delete('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Habit.findByIdAndRemove(request.params.id);
        response.status(204).end();
    }
    catch (exception) {
        console.log(exception);
        response.status(400).send({ error: exception.message });
    }
}));
habitRouter.put('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habit = Object.assign({}, request.body);
        const updatedHabit = yield Habit.findByIdAndUpdate(request.params.id, habit, {
            new: true,
            omitUndefined: true,
        });
        if (!updatedHabit) {
            throw new Error('Habit update failed');
        }
        response.json(updatedHabit.toJSON());
    }
    catch (exception) {
        console.log(exception);
        response.status(400).send({ exception: exception.message });
    }
}));
module.exports = habitRouter;
