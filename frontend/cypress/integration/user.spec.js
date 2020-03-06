describe('Habit app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', () => {
    cy.contains('Habit tracker');
  });

  it('sign up form can be opened and back btn returns to home', () => {
    cy.get('[data-cy=signup-btn]').click();        //change to data-cy plus all else similar cases. And do cy.server() and route to stub login and signup because I lready have tested those that they will work
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Signup');
    cy.url().should('eq', 'http://localhost:3000/signup')
    cy.get('[data-cy=back-btn]').click();        //change to data-cy plus all else similar cases. And do cy.server() and route to stub login and signup because I lready have tested those that they will work
    cy.contains(/Habit Tracker/i)
  });

  it('login form can be opened and back btn returns to home ', () => {
    cy.get('[data-cy=login-btn]').click();        //change to data-cy plus all else similar cases. And do cy.server() and route to stub login and signup because I lready have tested those that they will work
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Login');
    cy.url().should('eq', 'http://localhost:3000/login')
    cy.get('[data-cy=back-btn]').click();        //change to data-cy plus all else similar cases. And do cy.server() and route to stub login and signup because I lready have tested those that they will work
    cy.contains(/Habit Tracker/i)
  });

  describe('Habit app signup and login', () => {
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

    it(`User can't sign up with username with less than three characters`, () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-cy=signup-btn]').click();        //change to data-cy plus all else similar cases. And do cy.server() and route to stub login and signup because I lready have tested those that they will work
      cy.get('[data-cy=signup-user-input]').type('Te');
      cy.get('[data-cy=signup-pass-input]').type('passw');
      cy.get('[data-cy=signup-submit]').click();
      cy.contains('Username must be at least three (3) characters long')
      cy.contains('A new user created').should('not.exist')
      cy.url().should('eq', 'http://localhost:3000/signup')
    })

    it(`User can't sign up with password with less than five characters`, () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-cy=signup-btn]').click();        //change to data-cy plus all else similar cases. And do cy.server() and route to stub login and signup because I lready have tested those that they will work
      cy.get('[data-cy=signup-user-input]').type('TestDude');
      cy.get('[data-cy=signup-pass-input]').type('pass');
      cy.get('[data-cy=signup-submit]').click();
      cy.contains('Password must be at least five (5) characters long')
      cy.contains('A new user created').should('not.exist')
      cy.url().should('eq', 'http://localhost:3000/signup')
    })
  });
});

