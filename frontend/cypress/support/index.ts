// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// /// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to reset the database
       * @example cy.resetDB()
       */
      resetDB(): Chainable<Subject>;
      /**
       * Custom command to seed the database with user
       * @example cy.seedUserToDB()
       */
      seedUserToDB(): Chainable<Subject>;
      /**
       * Custom command to signup using the UI
       * @example cy.signup()
       */
      signup(): Chainable<Subject>;
      /**
       * Custom command to login using the UI
       * @example cy.login()
       */
      login(): Chainable<Subject>;
      /**
       * Custom command to login using mock request
       * @example cy.loginMock()
       */
      loginMock(): Chainable<Subject>;
      /**
       * Custom command to add a habit using the UI
       * @example cy.addHabit()
       */
      addHabit(habitName: string): Chainable<Subject>;
    }
  }
}
