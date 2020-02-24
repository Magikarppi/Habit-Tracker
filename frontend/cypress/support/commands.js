Cypress.Commands.add("login", () => {
  cy.visit('http://localhost:3000');
  cy.contains('Sign up').click();
  cy.get('[data-cy=signup-user-input]').type('TestDude');
  cy.get('[data-cy=signup-pass-input]').type('passw');
  cy.get('[data-cy=signup-submit]').click();
  cy.contains('Login').click();
  cy.get('[data-cy=login-user-input]').type('TestDude');
  cy.get('[data-cy=login-pass-input]').type('passw');
  cy.get('[data-cy=login-submit]').click();
  cy.url().should('eq', 'http://localhost:3000/')
})

Cypress.Commands.add('addHabit', () => {
  cy.contains('Add a new habit').click();
  cy.get('[data-cy=habitname-input]').type('Mindfullness meditation');
  cy.get('[data-cy=habit-submit]').click();
  cy.contains('Mindfullness meditation');
})



// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
