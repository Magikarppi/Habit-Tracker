import mongoose from 'mongoose';

interface Completion {
  thisDay: number;
  thisMonth: number;
  thisYear: number;
}

// export interface HabitSc {
//   type: mongoose.Types.ObjectId;
//   ref: string;
// }

interface Habit {
  name: string;
  id: string;
  completions: [];
}

export interface UserType {
  username: string;
  passwordHash: string;
  habits: Habit[];
}

export interface UserDocument extends UserType, mongoose.Document {}

export interface HabitType {
  name: string;
  completions: Completion[];
  user: UserType;
}

export interface HabitDocument extends mongoose.Document, HabitType {}

export type Habits = HabitType[];
