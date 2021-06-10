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
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User = require("../models/user");
const usersRouter = express_1.default.Router();
usersRouter.get('/', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find({}).populate('habits', {
            name: 1,
            completions: 1,
        });
        response.status(200).json(users.map((user) => user.toJSON()));
    }
    catch (exception) {
        console.log(exception);
        response.status(400).send({ error: exception.message });
    }
}));
usersRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.body.password.length < 5) {
        throw new Error('Minimum length for password is 5 characters');
    }
    try {
        const passwordHash = yield bcryptjs_1.default.hash(request.body.password, 10);
        const user = new User(Object.assign(Object.assign({}, request.body), { passwordHash }));
        const savedUser = yield user.save();
        return response.status(201).json(savedUser);
    }
    catch (exception) {
        console.log(exception);
        return response.status(400).send({ error: exception.message });
    }
}));
module.exports = usersRouter;
