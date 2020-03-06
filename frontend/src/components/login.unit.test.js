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
import Login from './Login';

afterEach(cleanup);

describe('On login page the app ', () => {
  let container;
  let getByTestId;
  let mockHandler;
  
  beforeEach(() => {
    const history = createMemoryHistory();
    mockHandler = jest.fn();
    
    const component = render(
      <Router history={history} >
        <Login handleLoginSubmit={mockHandler} />
      </Router>
    )

    container = component.container;
    getByTestId = component.getByTestId;
  })

  test('should show the form', () => {
    const usernameInput = getByTestId('login-user-input');
    const passwordInput = getByTestId('login-pass-input');

    expect(usernameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  })
  

  test('should call handleLoginSubmit once when clicked', () => {
    const loginBtn = getByTestId('login-submit');
    fireEvent.click(loginBtn);
    
    expect(mockHandler.mock.calls.length).toBe(1);
  })
  
})
