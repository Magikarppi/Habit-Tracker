describe('Habit app', () => {
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

  describe('when user is logged in', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.contains('Sign up').click();
      cy.get('[data-cy=signup-user-input]').type('TestDude');
      cy.get('[data-cy=signup-pass-input]').type('passw');
      cy.get('[data-cy=signup-submit]').click();
      cy.contains('Login').click();
      cy.get('[data-cy=login-user-input]').type('TestDude');
      cy.get('[data-cy=login-pass-input]').type('passw');
      cy.get('[data-cy=login-submit]').click();
    });

    it('username is shown', () => {
      cy.contains('TestDude logged in').click();
    });
  });
});

