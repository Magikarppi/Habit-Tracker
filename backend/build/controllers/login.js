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
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const loginRouter = express_1.default.Router();
loginRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({
            username: request.body.username,
        }).populate('habits');
        const passwordCorrect = user === null
            ? false
            : yield bcryptjs.compare(request.body.password.toString(), user.passwordHash);
        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: 'invalid username or password',
            });
        }
        const userForToken = {
            username: user.username,
            id: user._id,
        };
        const secretForJwt = process.env.SECRET || '';
        const token = jwt.sign(userForToken, secretForJwt);
        response.status(200).send({
            token,
            username: user.username,
            habits: user.habits,
            id: user._id,
        });
        return;
    }
    catch (exception) {
        console.log(exception);
        response.status(401).send({ error: exception.message });
        return;
    }
}));
module.exports = loginRouter;
