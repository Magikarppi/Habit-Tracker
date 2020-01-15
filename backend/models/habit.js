const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completions: { type: Array }
})

habitSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id 
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Habit', habitSchema)