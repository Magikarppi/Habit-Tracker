import mongoose = require('mongoose');
import supertest = require('supertest');
import app = require('../app');

import Habit = require('../models/habit');
import { HabitType } from '../types';
import helper = require('./test-helper');

const api = supertest(app);

describe('when there are two initial habits', () => {
  const initialHabits = [
    {
      name: 'Mindfulness meditation',
    },
    {
      name: 'Jujutsu technique practice',
    },
  ];

  const newHabit = {
    name: 'Play chess',
  };

  const invalidHabit = {
    name: 'Xx',
  };

  const completion = { thisDay: 15, thisMonth: 6, thisYear: 2021 };

  beforeEach(async () => {
    try {
      await Habit.deleteMany({});

      const habitObjects = initialHabits.map((habit) => new Habit(habit));
      const promiseArray = habitObjects.map((habit) => habit.save());
      await Promise.all(promiseArray);
    } catch (error) {
      console.log(error);
    }
  });

  test('habits are returned as json', async () => {
    try {
      await api
        .get('/api/habits')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    } catch (error) {
      console.log(error);
    }
  });

  test('there are two habits and they are correct', async () => {
    try {
      const response = await api.get('/api/habits');
      const habitNames = response.body.map((e: HabitType) => e.name);

      expect(response.body).toHaveLength(initialHabits.length);
      expect(habitNames).toContain(initialHabits[0].name);
      expect(habitNames).toContain(initialHabits[1].name);
    } catch (error) {
      console.log(error);
    }
  });

  test('new habit can be added', async () => {
    try {
      const habitsAtStart = await helper.habitsInDB();

      if (habitsAtStart === undefined) {
        throw new Error('habitsInDB() returned undefined');
      }

      const response = await api
        .post('/api/habits')
        .send(newHabit)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toContain(newHabit.name);
      expect(response.body).toHaveProperty('id');

      const habitsAtEnd = await helper.habitsInDB();

      if (habitsAtEnd === undefined) {
        throw new Error('habitsInDB() returned undefined');
      }

      expect(habitsAtEnd.length).toBe(habitsAtStart.length + 1);
      const habits = habitsAtEnd.map((habit: HabitType) => habit.name);
      expect(habits).toContain(newHabit.name);
    } catch (error) {
      console.log(error);
    }
  });

  test('invalid habit can\t be added', async () => {
    try {
      const habitsAtStart = await helper.habitsInDB();

      if (habitsAtStart === undefined) {
        throw new Error('habitsInDB() returned undefined');
      }

      const response = await api
        .post('/api/habits')
        .send(invalidHabit)
        .expect(400);

      expect(response.body).not.toContain(invalidHabit.name);
      expect(response.body).not.toHaveProperty('id');

      const habitsAtEnd = await helper.habitsInDB();

      if (habitsAtEnd === undefined) {
        throw new Error('habitsInDb() returned undefined');
      }

      expect(habitsAtEnd.length).toBe(habitsAtStart.length);
      const habitNames = habitsAtEnd.map((habit) => habit.name);
      expect(habitNames).not.toContain(invalidHabit.name);
    } catch (error) {
      console.log(error);
    }
  });

  test('habit completion can be added', async () => {
    try {
      const habitsAtStart = await helper.habitsInDB();

      if (habitsAtStart === undefined) {
        throw new Error('habitsInDB() returned undefined');
      }

      await api
        .put(`/api/habits/${habitsAtStart[0].id}`)
        .send({ ...habitsAtStart[0], completions: [completion] })
        .expect(201);

      const habitsAtEnd = await helper.habitsInDB();

      if (habitsAtEnd === undefined) {
        throw new Error('habitsInDb() returned undefined');
      }

      expect(habitsAtEnd[0].completions[0]).toEqual(completion);
    } catch (error) {
      console.log(error);
    }
  });

  test('habit completion can be cancelled', async () => {
    try {
      const habitsAtStart = await helper.habitsInDB();

      if (habitsAtStart === undefined) {
        throw new Error('habitsInDB() returned undefined');
      }

      await api
        .put(`/api/habits/${habitsAtStart[0].id}`)
        .send({ ...habitsAtStart[0], completions: [completion] });

      const habitsAtMiddle = await helper.habitsInDB();

      if (habitsAtMiddle === undefined) {
        throw new Error('habitsInDb() returned undefined');
      }

      expect(habitsAtMiddle[0].completions[0]).toEqual(completion);

      await api
        .put(`/api/habits/${habitsAtStart[0].id}`)
        .send({ ...habitsAtStart[0], completions: [] });

      const habitsAtEnd = await helper.habitsInDB();

      if (habitsAtEnd === undefined) {
        throw new Error('habitsInDb() returned undefined');
      }

      expect(habitsAtEnd[0].completions[0]).not.toEqual(completion);
    } catch (error) {
      console.log(error);
    }
  });

  test('habit can be deleted', async () => {
    try {
      const habitsAtStart = await helper.habitsInDB();

      if (habitsAtStart === undefined) {
        throw new Error('habitsInDB() returned undefined');
      }

      const habitToDelete = habitsAtStart[0];

      await api.delete(`/api/habits/${habitToDelete.id}`).expect(204);

      const habitsAtEnd = await helper.habitsInDB();

      if (habitsAtEnd === undefined) {
        throw new Error('habitsInDb() returned undefined');
      }

      expect(habitsAtEnd.length).toEqual(habitsAtStart.length - 1);

      const habitNames = habitsAtEnd.map((e) => e.name);
      expect(habitNames).not.toContain(habitToDelete.name);
    } catch (error) {
      console.log(error);
    }
  });
});

afterAll(() => {
  mongoose.connection.close();
});
