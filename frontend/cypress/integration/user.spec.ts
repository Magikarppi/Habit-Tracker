describe('Habit app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('front page can be opened', () => {
    cy.contains('Simplify Success');
    cy.contains('Start tracking your habits now!');
  });

  it('sign up form can be opened and back btn returns to home', () => {
    cy.get('[data-cy=signup-btn]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/signup');
    cy.contains('Sign Up');
    cy.get('[data-cy=username-input]');
    cy.get('[data-cy=password-input]');
    cy.get('[data-cy=back-btn]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Start tracking your habits now!');
  });

  it('login form can be opened and back btn returns to home ', () => {
    cy.get('[data-cy=login-btn]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/login');
    cy.contains('Login');
    cy.get('[data-cy=username-input]');
    cy.get('[data-cy=password-input]');
    cy.get('[data-cy=back-btn]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Start tracking your habits now!');
  });

  describe('Habit app signup and login', () => {
    beforeEach(() => {
      cy.resetDB();
    });

    it('User can sign up, log in and log out', () => {
      cy.signup();
      cy.contains('A new user created');
      cy.url().should('eq', Cypress.config().baseUrl + '/login');
      cy.login();
      cy.contains('TestDude logged in');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.get('[data-cy=logout-btn]').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.contains('TestDude logged in').should('not.exist');
      cy.get('[data-cy=logout-btn]').should('not.exist');
    });

    it(`User can't sign up with username with less than three characters`, () => {
      cy.visit('/signup');
      cy.get('[data-cy=username-input]').type('Te');
      cy.get('[data-cy=password-input]').type('passw');
      cy.get('[data-cy=submit-btn]').click();
      cy.contains('Username should be at least 3');
      cy.contains('A new user created').should('not.exist');
      cy.url().should('eq', Cypress.config().baseUrl + '/signup');
    });

    it(`User can't sign up with password with less than five characters`, () => {
      cy.visit('/signup');
      cy.get('[data-cy=username-input]').type('TestDude');
      cy.get('[data-cy=password-input]').type('pass');
      cy.get('[data-cy=submit-btn]').click();
      cy.contains('Password should be at least 5');
      cy.contains('A new user created').should('not.exist');
      cy.url().should('eq', Cypress.config().baseUrl + '/signup');
    });

    it(`User can sign up after invalid signup`, () => {
      cy.visit('/signup');
      cy.get('[data-cy=username-input]').type('TestDude');
      cy.get('[data-cy=password-input]').type('pass');
      cy.get('[data-cy=submit-btn]').click();
      cy.contains('Password should be at least 5');
      cy.get('[data-cy=password-input]').type('passw');
      cy.get('[data-cy=submit-btn]').click();
      cy.contains('A new user created');
      cy.url().should('eq', Cypress.config().baseUrl + '/login');
    });

    it(`User can login after invalid login`, () => {
      cy.signup();
      cy.contains('A new user created');
      cy.get('[data-cy=username-input]').type('TestDude');
      cy.get('[data-cy=password-input]').type('invalidpassw');
      cy.get('[data-cy=submit-btn]').click();
      cy.contains('Wrong');
      cy.get('[data-cy=password-input]').clear();
      cy.get('[data-cy=password-input]').type('passw');
      cy.get('[data-cy=submit-btn]').click();
      cy.contains('logged in');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });
});
