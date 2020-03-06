describe('Habit app habit', () => {
  const habitName = 'Mindfulness meditation'
  beforeEach(() => {
      cy.resetDB();
      cy.signup();
      cy.contains('A new user created')
      cy.loginMock();
      cy.visit('http://localhost:3000');
  })

  it('Habit form can be opened', () => {
    cy.get('[data-cy=habit-form-open]').click();
    cy.contains('name');
    cy.contains('Add');
  })

  it('a new habit can be added', () => {
    cy.get('[data-cy=habit-form-open]').click();
    cy.get('[data-cy=habitname-input]').type(habitName);
    cy.get('[data-cy=habit-submit]').click();
    cy.contains(habitName);
  })
})
