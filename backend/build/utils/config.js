"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// require('dotenv').config();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const PORT = process.env.PORT || 3003;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.MONGODB_TEST_URI;
}
module.exports = {
    MONGODB_URI,
    SECRET,
    PORT,
};
