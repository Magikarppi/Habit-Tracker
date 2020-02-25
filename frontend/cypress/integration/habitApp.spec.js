describe('Habit app /signed in user', () => {
  describe('when user is created and logged in', () => {
    beforeEach(() => {
      // cy.resetDB();
      // cy.signup();
      cy.loginMock();
      cy.visit('http://localhost:3000');
    });

    it('username is shown', () => {
      cy.contains('TestDude logged in');
    });

    it('a new habit can be added', () => {
      cy.contains('Add a new habit').click();
      cy.get('[data-cy=habitname-input]').type('Mindfullness meditation');
      cy.get('[data-cy=habit-submit]').click();
      cy.contains('Mindfullness meditation');
    })

    describe('when a new habit is added', () => {
      beforeEach(() => {
        // cy.addHabit();

      });

      it('habit can be marked as done and it is shown', () => {
        cy.contains('Done for today!').click();
        cy.contains('Done!');
        // cy.contains.not('hahah')
      });

      it('more info about a habit is shown when clicked', () => {
        cy.contains('Mindfullness meditation').click();
        cy.contains('Mindfullness meditation');
        cy.contains('2020')
        cy.url().should('include', 'http://localhost:3000/habits/')
      });

      it('habit can be deleted', () => {
        cy.contains('Mindfullness meditation').click();
        cy.contains('Delete').click();
        cy.contains('Habit deleted')
        cy.url().should('eq', 'http://localhost:3000/')
        cy.contains('Mindfullness meditation').should('not.exist')
      });
    });
  });
});

