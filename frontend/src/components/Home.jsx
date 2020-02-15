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

const H1 = styled.h1`
  background: rgba(255,255,220,0.5);
  width: 200px;
  margin: auto;
`

const Em = styled.em`
  background: rgba(255,255,220,0.5);
`

const LogOutBtn = styled.button`
  background: #fff870;
  &:hover {
    background: #85015d;
  }
  font-size: 0.9em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #8f8d64;
  border-radius: 3px;
  text-align: center;
`

const NewHabitBtn = styled.button`
  background: #f2f5b5;
  &:hover {
    background: #e3bf20;
  }
  font-size: 0.9em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #8f8d64;
  border-radius: 3px;
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
        <Em>{loggedInUser.username} logged in</Em>
        <LogOutBtn onClick={handleLogout}>Log out</LogOutBtn>
      </div>
      <Wrapper>
        <H1>Habit tracker</H1>
        {showHabitForm ? (
          <div>
            <AddHabit
              handleHabitSubmit={handleHabitSubmit}
              habitName={habitName}
            />
            <button onClick={toggleHabitForm}>cancel</button>
          </div>
        ) : (
          <NewHabitBtn onClick={toggleHabitForm}>Add a new habit</NewHabitBtn>
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
