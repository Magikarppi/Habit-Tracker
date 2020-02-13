import React from 'react';
import {
  Link,
} from 'react-router-dom';
import styled from 'styled-components';


import AddHabit from './AddHabit';
import Habit from './Habit';

const LoggedInView = styled.div`
  background: linear-gradient(to top, black, #00025c);

`

const HabitsDiv = styled.div`
  background: rgba(255,255,220,0.5);
  width: 300px;
  padding: 10px;
  margin: auto;
`

const LogSignDiv = styled.div`
  margin-right: 300px;
  display: inline-block;
  width: 60px;
  background: rgba(255,255,220,0.5);
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid rgba(255,255,220,0.5);
  border-radius: 3px;
`

const StyledPara = styled.p`
  margin: auto;
  text-shadow: 1px 1px;
  background: rgba(255,255,220,0.5);
  text-align: center;
`

const Wrapper = styled.div`
  text-align: center;
`

const Home = ({
  quote,
  quoteAuthor,
  loggedInUser,
  handleLogout,
  habitsToShow,
  showHabitForm,
  handleHabitSubmit,
  habitName,
  toggleHabitForm,
  handleCompletion
}) => {

  return loggedInUser ? (
    <div>
      <div>
        <em>{loggedInUser.username} logged in</em>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <Wrapper>
        <h1>Habit tracker</h1>
        {showHabitForm ? (
          <div>
            <AddHabit
              handleHabitSubmit={handleHabitSubmit}
              habitName={habitName}
            />
            <button onClick={toggleHabitForm}>cancel</button>
          </div>
        ) : (
          <button onClick={toggleHabitForm}>Add a new habit</button>
        )}
        <HabitsDiv>
          {habitsToShow.map((habit) => (
            <Habit
              key={habit.id}
              habit={habit}
              handleCompletion={handleCompletion}
            />
          ))}
        </HabitsDiv>
      </Wrapper>
    </div>
  ) : (
    <div>
      <Wrapper>
        <LogSignDiv>
          <Link to="/login">Login</Link>
        </LogSignDiv>
        <LogSignDiv>
          <Link to="/signup">Sign up</Link>
        </LogSignDiv>
        <StyledPara>{quote} - {quoteAuthor}</StyledPara>
      </Wrapper>
    </div>
  );
};

export default Home;
