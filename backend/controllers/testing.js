const router = require('express').Router();
const Habit = require('../models/habit');
const User = require('../models/user');

router.post('/reset', async (request, response) => {
  await Habit.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

// router.post('/seed/user', async (request, response) => {
//   if (request.body.password.length < 5) {
//     // return response.status(400).send({ error: 'Minimum length for password is 5 characters'})
//     throw new Error('Minimum length for password is 5 characters');
//   }

//   try {
//     const passwordHash = await bcryptjs.hash(request.body.password, 10);

//     const user = new User({
//       ...request.body,
//       passwordHash,
//     });

//     const savedUser = await user.save();
//     return response.status(201).json(savedUser);
//   } catch (exception) {
//     console.log(exception);
//     return response.status(400).send({ error: exception.message });
//   }
// });

module.exports = router;
