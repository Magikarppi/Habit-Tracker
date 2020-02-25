describe('Habit app /signup and /login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', () => {
    cy.contains('Habit tracker');
  });

  it('sign up form can be opened', () => {
    cy.contains('Sign up').click();
  });

  it('login form can be opened', () => {
    cy.contains('Login').click();
  });

  describe('Habit app before signup and login', () => {
    beforeEach(() => {
      cy.resetDB();
    });

    it('User can sign up and log in', () => {
      cy.signup();
      cy.contains('A new user created');
      cy.url().should('eq', 'http://localhost:3000/login')
      cy.login();
      cy.contains('TestDude logged in');
      cy.url().should('eq', 'http://localhost:3000/')
    });
  });
});

