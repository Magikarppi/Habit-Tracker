import React, { Component } from 'react'
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from '@testing-library/react'

import ErrorNotification from './ErrorNotification';

afterEach(cleanup)

test('should render error notification when passed', () => {
  const errorMessage = 'FATAL ERROR' 

  const component = render(
      <ErrorNotification errorMessage={errorMessage} />
  )

  expect(component.container).toHaveTextContent(errorMessage)

})

test('should NOT render error notification when null passed', () => {
  const errorMessage = null

  const component = render(
      <ErrorNotification errorMessage={errorMessage} />
  )

  expect(component.container).toBeEmpty()

})
