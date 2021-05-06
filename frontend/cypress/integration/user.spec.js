/* eslint-disable no-undef */
describe('Habit app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', () => {
    cy.contains('Simplify Success');
    cy.contains('Start tracking your habits now!');
  });

  it('sign up form can be opened and back btn returns to home', () => {
    cy.get('[data-cy=signup-btn]').click(); //change to data-cy plus all else similar cases. And do cy.server() and route to stub login and signup because I lready have tested those that they will work
    cy.url().should('eq', 'http://localhost:3000/signup');
    cy.contains('Sign Up');
    cy.contains('[data-cy=username-input]');
    cy.contains('[data-cy=password-input]');
    cy.get('[data-cy=back-btn]').click(); //change to data-cy plus all else similar cases. And do cy.server() and route to stub login and signup because I lready have tested those that they will work
    cy.url().should('eq', 'http://localhost:3000');
    cy.contains('Start tracking your habits now!');
  });

  it('login form can be opened and back btn returns to home ', () => {
    cy.get('[data-cy=login-btn]').click(); //change to data-cy plus all else similar cases. And do cy.server() and route to stub login and signup because I lready have tested those that they will work
    cy.url().should('eq', 'http://localhost:3000/login');
    cy.contains('Login');
    cy.contains('[data-cy=username-input]');
    cy.contains('[data-cy=password-input]');
    cy.get('[data-cy=back-btn]').click(); //change to data-cy plus all else similar cases. And do cy.server() and route to stub login and signup because I lready have tested those that they will work
    cy.url().should('eq', 'http://localhost:3000');
    cy.contains('Start tracking your habits now!');
  });

  describe('Habit app signup and login', () => {
    beforeEach(() => {
      cy.resetDB();
    });

    it('User can sign up and log in', () => {
      cy.signup();
      cy.contains('A new user created');
      cy.url().should('eq', 'http://localhost:3000/login');
      cy.login();
      cy.contains('TestDude logged in');
      cy.url().should('eq', 'http://localhost:3000/');
    });

    it(`User can't sign up with username with less than three characters`, () => {
      cy.visit('http://localhost:3000/signup');
      cy.get('[data-cy=username-input]').type('Te');
      cy.get('[data-cy=password-input]').type('passw');
      cy.get('[data-cy=submit-btn]').click();
      cy.contains('Username should be at least 3');
      cy.contains('A new user created').should('not.exist');
      cy.url().should('eq', 'http://localhost:3000/signup');
    });

    it(`User can't sign up with password with less than five characters`, () => {
      cy.visit('http://localhost:3000/signup');
      cy.get('[data-cy=username-input]').type('TestDude');
      cy.get('[data-cy=password-input]').type('pass');
      cy.get('[data-cy=submit-btn]').click();
      cy.contains('Password should be at least 5');
      cy.contains('A new user created').should('not.exist');
      cy.url().should('eq', 'http://localhost:3000/signup');
    });
  });
});
