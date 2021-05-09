let token = 'Bearer 13r1331k31j3r3rj';

Cypress.Commands.add('resetDB', () => {
  cy.request('POST', 'http://localhost:3003/api/testing/reset');
});

Cypress.Commands.add('seedUserToDB', () => {
  const user = {
    username: 'TestDude',
    password: 'passw',
  };
  cy.request('POST', 'http://localhost:3003/api/users/', user);
});

Cypress.Commands.add('signup', () => {
  cy.visit('/');
  cy.get('[data-cy=signup-btn]').click();
  cy.get('[data-cy=username-input]').type('TestDude');
  cy.get('[data-cy=password-input]').type('passw');
  cy.get('[data-cy=submit-btn]').click();
});

Cypress.Commands.add('login', () => {
  cy.get('[data-cy=username-input]').type('TestDude');
  cy.get('[data-cy=password-input]').type('passw');
  cy.get('[data-cy=submit-btn]').click();
});

Cypress.Commands.add('loginMock', () => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    body: {
      username: 'TestDude',
      password: 'passw',
    },
  }).then((resp) => {
    window.localStorage.setItem(
      'loggedHabitAppUser',
      JSON.stringify(resp.body)
    );
    token = `Bearer ${resp.body.token}`;
  });
});

Cypress.Commands.add('addHabit', (habitName) => {
  cy.request({
    method: 'POST',
    url: '/api/habits',
    body: {
      name: habitName,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedHabitAppUser')).token
      }`,
    },
  });
});

// Cypress.Commands.add("signupMock", () => {
//   const user = {
//     username: 'TestDude',
//     password: 'passw'
//   }
//   cy.request({
//     method: 'POST',
//     url: 'http://localhost:3000/api/users',
//     body: JSON.stringify(user),
//     headers: { 'Content-Type': 'application/json' }
//   })
//   .then((response) => window.localStorage.setItem('loggedHabitAppUser', JSON.stringify(response.body)))
// })

// Cypress.Commands.add('addHabit', () => {
//   cy.contains('Add a new habit').click();
//   cy.get('[data-cy=habitname-input]').type('Mindfullness meditation');
//   cy.get('[data-cy=habit-submit]').click();
//   cy.contains('Mindfullness meditation');
// })

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
