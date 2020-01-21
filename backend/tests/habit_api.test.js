const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const Habit = require('../models/habit')
const User = require('../models/user')
const helper = require('./test-helper')

const api = supertest(app)

const initialHabits = [
  {
    name: 'Daily non-dual mindfulness meditation'
  },
  {
    name: 'Visualization practice'
  }
]

beforeEach(async () => {
  await Habit.deleteMany({})

  const habitObjects = initialHabits.map(habit => new Habit(habit))
  const promiseArray = habitObjects.map(habit => habit.save())
  await Promise.all(promiseArray)
})

test('habits are returned as json', async () => {
  await api
    .get('api/habits')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: 'tester',
      password: 'secret'
    })
    await user.save()
  })

  test.only('creation succeeds with new username',async () => {
    console.log('TEST RUNSSSSSS')
    const usersAtStart = await helper.usersInDB()
    console.log('usersAtStart: ', usersAtStart)

    const newUser = {
      username: 'SamiH',
      password: 'superSecret'
    }

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    console.log('usersAtEnd XXX', usersAtEnd)
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })
  
})


afterAll(() => {
  console.log('afterAll runs')
  mongoose.connection.close()
})