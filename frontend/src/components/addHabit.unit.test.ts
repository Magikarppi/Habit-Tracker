import React, { Component } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';

import {
  render,
  cleanup,
  fireEvent,
  getByTestId
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import AddHabit from './AddHabit';

afterEach(cleanup);

describe('add habit form', () => {
  
  test('should call handleHabitSubmit once when add is clicked', () => {
    const habitName = 'Mindfulness meditation'
    const mockHandler = jest.fn();

    const { getByTestId } = render(
      <AddHabit handleHabitSubmit={mockHandler} habitName={habitName} />
    )

    const submitBtn = getByTestId('habit-submit');

    fireEvent.click(submitBtn);

    expect(mockHandler.mock.calls.length).toBe(1)
  })

})
