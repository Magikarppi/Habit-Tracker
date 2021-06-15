import mongoose from 'mongoose';
import { HabitDocument } from '../types';

const habitSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, minlength: 2, required: true },
  completions: { type: Array },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

habitSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export = mongoose.model<HabitDocument>('Habit', habitSchema);
