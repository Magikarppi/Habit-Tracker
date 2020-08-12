require('dotenv').config()

// let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_TEST_URI
}

module.exports = {
  MONGODB_URI,
  SECRET
}