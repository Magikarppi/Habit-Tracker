import dotenv from 'dotenv';

dotenv.config();

let MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const PORT = process.env.PORT || 3003;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_TEST_URI!;
}

export = {
  MONGODB_URI,
  SECRET,
  PORT,
};
