describe('Header when user is not logged in', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.visit('/');
  });

  it('should show the title', () => {
    cy.contains('Simplify Success');
  });

  it('should not show "logged in', () => {
    cy.contains('logged in').should('not.exist');
  });

  it('should not show a back button on home page', () => {
    cy.get('[data-cy=back-btn]').should('not.exist');
  });

  it('should show a back button on login page and it should return to home', () => {
    cy.visit('/login');
    cy.get('[data-cy=back-btn]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should show a back button on signup page and it should return to home', () => {
    cy.visit('/signup');
    cy.get('[data-cy=back-btn]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});

describe('user is logged in', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.seedUserToDB();
    cy.loginMock();
    cy.visit('/');
  });
  it('should show the title', () => {
    cy.contains('Simplify Success');
  });

  it('should show "logged in', () => {
    cy.contains('logged in');
  });

  it('should show log out button', () => {
    cy.get('[data-cy=logout-btn]');
  });

  it('should show a back button on "habit more info" page and it should return home', () => {
    cy.visit('/habits/sagassag322sa');
    cy.get('[data-cy=back-btn]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
