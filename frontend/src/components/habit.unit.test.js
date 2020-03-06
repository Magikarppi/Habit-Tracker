import React, { Component } from 'react'
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from 'history'

import { render, cleanup, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import Habit from './Habit'

afterEach(cleanup)

test('should render habit name and "done for today!" text', () => {
  const history = createMemoryHistory()
  const habit = {
    name: 'Mindfulness meditation',
    completions: []
  }

  const component = render(
    <Router history={history}>
      <Habit habit={habit} />
    </Router>
  )

  expect(component.container).toHaveTextContent('Mindfulness meditation')
  expect(component.container).toHaveTextContent('Done for today!')
})

test('clicking Done for today btn should call handleCompletion once', () => {
  const history = createMemoryHistory()
  const habit = {
    name: 'Mindfulness meditation',
    completions: []
  }

  const mockHandler = jest.fn()

  const component = render(
    <Router history={history}>
      <Habit habit={habit} handleCompletion={mockHandler}/>
    </Router>
  )

  const button = component.getByText('Done for today!');
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(1)
})
