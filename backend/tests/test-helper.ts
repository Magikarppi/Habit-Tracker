import Habit = require('../models/habit');
import User = require('../models/user');

const usersInDB = async () => {
  try {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
  } catch (error) {
    console.log(error);
    return;
  }
};

const habitsInDB = async () => {
  try {
    const habits = await Habit.find({});
    return habits.map((habit) => habit.toJSON());
  } catch (error) {
    console.log(error);
    return;
  }
};

export = {
  usersInDB,
  habitsInDB,
};
