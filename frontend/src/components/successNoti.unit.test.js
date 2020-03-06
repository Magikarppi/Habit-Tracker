import React, { Component } from 'react'
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from '@testing-library/react'

import SuccessNotification from './SuccessNotification';

afterEach(cleanup)

test('should render error notification when passed', () => {
  const successMessage = 'Great Success! Heavenly leader happy!' 

  const component = render(
      <SuccessNotification successMessage={successMessage} />
  )

  expect(component.container).toHaveTextContent(successMessage)

})

test('should NOT render error notification when null passed', () => {
  const successMessage = null

  const component = render(
      <SuccessNotification successMessage={successMessage} />
  )

  expect(component.container).toBeEmpty()

})
