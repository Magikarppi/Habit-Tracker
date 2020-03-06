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
import Home from './Home';

afterEach(cleanup);

describe('Home, when not logged in, ', () => {
  let container;
  let getByTestId;
  const quote = 'Replace bad habits with good habits';
  const quoteAuthor = 'Gene Simmons';
  const history = createMemoryHistory();
  const loggedInUser = null;

  beforeEach(() => {
    const component = render(
      <Router history={history}>
        <Home
          loggedInUser={loggedInUser}
          quote={quote}
          quoteAuthor={quoteAuthor}
        />
      </Router>
    );

    container = component.container;
    getByTestId = component.getByTestId;
  });

  test('should render signup and login btns if no user logged in', () => {
    // const history = createMemoryHistory();
    // const loggedInUser = null;
  
    // const { container, getByTestId } = render(
    //   <Router history={history}>
    //     <Home loggedInUser={loggedInUser} />
    //   </Router>
    // );
  
    const loginBtn = getByTestId('login-btn');
    const signupBtn = getByTestId('signup-btn');
    expect(container).toHaveTextContent(/Habit tracker/i);
    expect(container).toHaveTextContent(/login/i);
    expect(container).toHaveTextContent(/sign up/i);
    expect(loginBtn).toHaveTextContent(/login/i);
    expect(signupBtn).toHaveTextContent(/sign up/i);
    expect(loginBtn).toBeDefined();
    expect(signupBtn).toBeDefined();
  });
  
  test('should render quote', () => {
    // const history = createMemoryHistory();
    // const loggedInUser = null;
    // const quote = 'Replace bad habits with good habits';
    // const quoteAuthor = 'Gene Simmons';
  
    // const { getByTestId } = render(
    //   <Router history={history}>
    //     <Home
    //       loggedInUser={loggedInUser}
    //       quote={quote}
    //       quoteAuthor={quoteAuthor}
    //     />
    //   </Router>
    // );
  
    const quotePara = getByTestId('quotePara');
  
    expect(quotePara).toHaveTextContent(quote);
    expect(quotePara).toHaveTextContent(quoteAuthor);
  });
})

describe('Home, when user is logged in, ', () => {
  let container;
  let getByTestId;
  const history = createMemoryHistory();
  const username = 'SamH';
  const habit = 'Mindfulness meditation'
  const loggedInUser = { username };
  const habitsToShow = [{ name: habit, completions: [], id: 'k1' }];
  const showHabitForm = true;
  let mockHandler;
  
  beforeEach(() => {
    mockHandler = jest.fn();

    const component = render(
      <Router history={history}>
        <Home loggedInUser={loggedInUser} habitsToShow={habitsToShow} showHabitForm={showHabitForm} toggleHabitForm={mockHandler} />
      </Router>
    );

    container = component.container;
    getByTestId = component.getByTestId;
  })

  test('should render username and log out btn', () => {
  
    // const { container, getByTestId } = render(
    //   <Router history={history}>
    //     <Home loggedInUser={loggedInUser} habitsToShow={habitsToShow} />
    //   </Router>
    // );
  
    const logoutBtn = getByTestId('logout-btn');
    expect(logoutBtn).toBeDefined();
    expect(logoutBtn).toHaveTextContent(/log out/i);
    expect(container).toHaveTextContent(`${username} logged in`);
  })
  
  test('should render habit', () => {
    const habitComponent = getByTestId('habit-div');
    expect(habitComponent).toBeDefined();
    expect(habitComponent).toHaveTextContent(habit);
    expect(habitComponent).toHaveTextContent('Done for today!');
  })
  
  test('should open habit form if props require', () => {
    const habitFormOpen = getByTestId('habitForm-open-div');
    expect(habitFormOpen).toBeDefined();
    const closeBtn = getByTestId('habit-form-close-btn');
    expect(closeBtn).toHaveTextContent('cancel')
  })

  test('clicking cancel should call toggleHabitForm once', () => {
    const cancelBtn = getByTestId('habit-form-close-btn');
    fireEvent.click(cancelBtn);

    expect(mockHandler.mock.calls.length).toBe(1)
  })

  test('toggleHabitForm gets called after clicking "add a new habit"-button ', () => {
    const component = render(
      <Router history={history}>
        <Home loggedInUser={loggedInUser} habitsToShow={habitsToShow} showHabitForm={false} toggleHabitForm={mockHandler} />
      </Router>
    );

    const openFormBtn = component.getByTestId('habit-form-open-btn');
    fireEvent.click(openFormBtn);

    expect(mockHandler.mock.calls.length).toBe(1)
  })
  
  
})




