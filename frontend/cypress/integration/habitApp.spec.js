describe('Habit app /signed in user', () => {
  const habitName = 'Mindfulness meditation'
  // before(() => {
  //     const user = JSON.stringify({username: 'TestDude', password: 'passw', completions: []})
  //     window.localStorage.setItem('loggedHabitAppUser', user)
  // })
  // describe.only('when user is logged in', () => {
  //   beforeEach(() => {
  //     cy.resetDB();
  //     const user = {
  //       username: 'TestDude',
  //       password: 'passw',
  //       // habits: [{ name: habitName, completions: [], id: '123j321' }],
  //       // id: '12345678h'
  //     };
  //     cy.request('POST', 'http://localhost:3000/api/users', user);
  //     cy.visit('http://localhost:3000')
  //   })

  //   it('loggin in works', () => {
  //     cy.contains('TestDude logged in')
  //   })
  // })
  

  describe('when user is created and logged in', () => {
    beforeEach(() => {
      const user = JSON.stringify({
        username: 'TestDude',
        password: 'passw',
        habits: [{ name: habitName, completions: [], id: '5e53bc003e6ff528b8e54ce7' }],
        id: '12345678h'
      });
      window.localStorage.setItem('loggedHabitAppUser', user);
      console.log('localstorage user:', window.localStorage);
      // cy.visit('http://localhost:3000');
      // cy.server()
      // cy.route({
      //   method: 'POST',
      //   url: '/login',
      //   response: {
      //     body: {
      //       username: 'TestDude'
      //     }
      //   },
      //   status: 200
      // })
      // cy.resetDB();
      // cy.signup();
      // cy.contains('A new user created')
      // cy.loginMock();
      // // cy.contains('TestDude logged in')
      // cy.addHabit();
      // cy.visit('http://localhost:3000');
      // cy.contains(habitName)
    });
    // beforeEach(() => {
    //   // cy.resetDB();
    //   // cy.signup();
    //   // cy.contains('A new user created')
    //   // cy.loginMock();
    //   // cy.visit('http://localhost:3000');
    // });

    it('username is shown', () => {
      cy.visit('http://localhost:3000');
      cy.contains('TestDude logged in');
    });

    // it('a new habit can be added', () => {
    //   cy.contains('Add a new habit').click();
    //   cy.get('[data-cy=habitname-input]').type(habitName);
    //   cy.get('[data-cy=habit-submit]').click();
    //   cy.contains(habitName);
    // })

    describe('when a new habit is added', () => {
      // before(() => {
      //   cy.addHabit();
      //   cy.contains(habitName)
      // })
      beforeEach(() => {
        // cy.visit('http://localhost:3000');
        cy.server()
        // // cy.fixture('habits').as('habits')

        // cy.addHabit();
        // cy.contains(habitName)
      });

      it('habit can be marked as done and it is shown', () => {
        // cy.contains('Done for today!').click();
        cy.server()
        cy.route({
          method: 'PUT',
          url: '/habits/5e53bc003e6ff528b8e54ce7',
          body: {
            name: habitName,
            completions: [],
            // _id: 'gsa1g33g33g33'
          },
          response: { 
            name: habitName,
            completions: [{
              thisDay: 1,
              thisMonth: 1,
              thisYear: 2020
            }],
            id: '5e53bc003e6ff528b8e54ce7' 
          }
        })
        cy.get('[data-cy=done-btn]').click();
        cy.visit('http://localhost:3000');
        cy.contains('Done!');
        // cy.contains.not('hahah')
      });

      it('more info about a habit is shown when clicked', () => {
        cy.get('[data-cy=habit-link]').click();
        cy.contains(habitName);
        cy.contains('2020');
        cy.url().should('include', 'http://localhost:3000/habits/');
      });

      it('habit can be deleted', () => {
        cy.get('[data-cy=habit-link]').click();
        cy.get('[data-cy=delete-btn]').click();
        cy.contains('Habit deleted');
        cy.url().should('eq', 'http://localhost:3000/');
        cy.contains(habitName).should('not.exist');
      });

      it('Back btn from habit info returns to home where all habits are shown', () => {
        cy.get('[data-cy=habit-link]').click();
        cy.contains('Delete');
        cy.get('[data-cy=back-btn]').click();
        cy.contains(/Habit tracker/i);
        cy.contains(/Add a new habit/i);
        cy.url().should('eq', 'http://localhost:3000/');
        cy.contains(habitName).should('not.exist');
      });
    });
  });
});
