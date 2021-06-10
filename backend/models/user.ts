import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { UserDocument } from '../types';

const userSchema: mongoose.Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  passwordHash: String,
  habits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habit',
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export = mongoose.model<UserDocument>('User', userSchema);
