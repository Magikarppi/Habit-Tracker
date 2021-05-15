describe('Habit app /logged in user', () => {
  const habitName = 'Mindfulness meditation';

  beforeEach(() => {
    cy.resetDB();
    cy.seedUserToDB();
    cy.loginMock();
    cy.visit('/');
  });

  it('a new habit can be added', () => {
    cy.get('[data-cy=habit-input]').type(habitName);
    cy.get('[data-cy=habit-submit-btn]').click();
    cy.contains(habitName);
  });

  describe('when a new habit is added', () => {
    beforeEach(() => {
      // cy.addHabit(habitName);
      cy.get('[data-cy=habit-input]').type(habitName);
      cy.get('[data-cy=habit-submit-btn]').click();
      // cy.visit('/');
    });

    it('the habit name is shown', () => {
      cy.contains(habitName);
      cy.get('[data-cy=habit-div]');
    });

    // it('the habit streak is shown ', () => {
    // })

    it('habit can be marked as done and it can be cancelled', () => {
      cy.get('[data-cy=done-btn]').click();
      cy.contains('Done!');
      cy.get('[data-cy=cancel-done-btn]').click();
      cy.contains('Done!').should('not.exist');
      cy.get('[data-cy=done-btn]');
    });

    it('more info about a habit is shown when clicked', () => {
      cy.get('[data-cy=habit-link]').click();
      cy.contains(habitName);
      cy.url().should('include', '/habits');
    });

    it('habit can be deleted', () => {
      cy.get('[data-cy=habit-link]').click();
      cy.get('[data-cy=delete-btn]').click();
      cy.contains('Habit deleted');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.contains(habitName).should('not.exist');
    });
  });
});
