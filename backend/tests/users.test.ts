import mongoose = require('mongoose');
import supertest = require('supertest');
import app = require('../app');

import User = require('../models/user');
import helper = require('./test-helper');

const api = supertest(app);

describe('when there is initially one user at db', () => {
  const initialUser = {
    username: 'testUser',
    password: 'secret',
  };
  const newUser = {
    username: 'AlexiLaiho',
    password: 'LakeBodom',
  };
  const invalidNewUsers = [
    { username: 'AleksiLaiho' },
    { password: 'LakeBodom' },
    { username: 'Al', password: 'LakeBodom' },
    { username: 'AlexiLaiho', password: 'Lake' },
  ];

  beforeEach(async () => {
    try {
      await User.deleteMany({});
      const user = new User(initialUser);
      await user.save();
    } catch (error) {
      console.log(error);
    }
  });

  test('new user creation succeeds', async () => {
    try {
      const usersAtStart = await helper.usersInDB();

      if (usersAtStart === undefined) {
        throw new Error('userInDb() returned undefined');
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDB();

      if (usersAtEnd === undefined) {
        throw new Error('userInDb() returned undefined');
      }

      expect(usersAtEnd.length).toBe(usersAtStart.length + 1);
      const usernames = usersAtEnd.map((user) => user.username);
      expect(usernames).toContain(newUser.username);
    } catch (error) {
      console.log(error);
    }
  });

  test('new user creation fails with invalid inputs', async () => {
    try {
      const usersAtStart = await helper.usersInDB();

      if (usersAtStart === undefined) {
        throw new Error('userInDb() returned undefined');
      }

      for (const invalidUser of invalidNewUsers) {
        await api.post('/api/users').send(invalidUser).expect(400);

        const usersAtEnd = await helper.usersInDB();

        if (usersAtEnd === undefined) {
          throw new Error('userInDb() returned undefined');
        }

        expect(usersAtEnd.length).toBe(usersAtStart.length);
        const usernames = usersAtEnd.map((user) => user.username);
        expect(usernames).not.toContain(invalidUser.username);
      }
    } catch (error) {
      console.log(error);
    }
  });

  test('user can login', async () => {
    try {
      const response = await api
        .post('/api/login')
        .send(initialUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      expect(response.body.token).toBeTruthy();
    } catch (error) {
      console.log(error);
    }
  });

  test("user can't login with invalid password", async () => {
    try {
      const response = await api
        .post('/api/login')
        .send({ ...initialUser, password: 'wrongPass' })
        .expect(400);

      expect(response.body.token).toBeUndefined();
    } catch (error) {
      console.log(error);
    }
  });
});

afterAll(() => {
  mongoose.connection.close();
});
