import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AddHabit from './AddHabit';
import Habit from './Habit';

const HabitsDiv = styled.div`
  background: rgba(255, 255, 220, 0.8);
  width: 300px;
  padding: 10px;
  margin: auto;
`;

const StyledLink = styled(Link)`
  color: #63006e;
  font-weight: bold;
  margin-right: 300px;
  display: inline-block;
  width: 60px;
  background: rgba(255, 255, 220, 0.8);
  &:hover {
    background: #fad850;
  }
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid rgba(255, 255, 220, 0.5);
  border-radius: 3px;
`;

// const LogSignDiv = styled.div`
//   margin-right: 300px;
//   display: inline-block;
//   width: 60px;
//   background: rgba(255,255,220,0.8);
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid rgba(255,255,220,0.5);
//   border-radius: 3px;
// `

const StyledPara = styled.p`
  margin: auto;
  text-shadow: 1px 1px;
  background: rgba(255, 255, 220, 0.8);
  text-align: center;
  width: 50%;
  padding: 0.25em 1em;
  border: 2px solid rgba(55, 55, 20, 0.5);
  border-radius: 3px;
`;

const Wrapper = styled.div`
  text-align: center;
`;

const H1 = styled.h1`
  background: rgba(255, 255, 220, 0.8);
  width: 200px;
  margin: auto;
  padding: 0.25em 1em;
  border: 1px solid rgba(55, 55, 20, 0.5);
  border-radius: 3px;
`;

const Em = styled.em`
  background: rgba(255, 255, 220, 0.8);
  margin-left: 2%;
  padding: 0.25em 1em;
  border: 2px solid rgba(55, 55, 20, 0.5);
  border-radius: 3px;
`;

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
`;

const CancelBtn = styled.button`
  background: #cfccc2;
  &:hover {
    background: #ff711f;
  }
  font-size: 0.9em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #8f8d64;
  border-radius: 3px;
  text-align: center;
`;

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
`;

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
        <LogOutBtn data-testid="logout-btn" onClick={handleLogout}>
          Log out
        </LogOutBtn>
      </div>
      <Wrapper>
        <H1>Habit tracker</H1>
        {showHabitForm ? (
          <div data-testid="habitForm-open-div">
            <AddHabit
              handleHabitSubmit={handleHabitSubmit}
              habitName={habitName}
            />
            <CancelBtn
              data-cy="habit-form-close"
              data-testid="habit-form-close-btn"
              onClick={toggleHabitForm}
            >
              cancel
            </CancelBtn>
          </div>
        ) : (
          <NewHabitBtn
            data-cy="habit-form-open"
            data-testid="habit-form-open-btn"
            onClick={toggleHabitForm}
          >
            Add a new habit
          </NewHabitBtn>
        )}
        {habitsToShow.length > 0 ? (
          <HabitsDiv data-testid="habit-div">
            {habitsToShow.map((habit) => (
              <Habit
                key={habit.id}
                habit={habit}
                handleCompletion={handleCompletion}
              />
            ))}
          </HabitsDiv>
        ) : null}
      </Wrapper>
    </div>
  ) : (
    <div>
      <Wrapper>
        <H1>Habit tracker</H1>
        <StyledLink data-cy="login-btn" data-testid="login-btn" to="/login">
          Login
        </StyledLink>
        <StyledLink data-cy="signup-btn" data-testid="signup-btn" to="/signup">
          Sign up
        </StyledLink>
        {quote ? (
          <StyledPara data-testid="quotePara">
            {quote} - {quoteAuthor}
          </StyledPara>
        ) : (
          <StyledPara data-testid="quotePara">loading quote...</StyledPara>
        )}
      </Wrapper>
    </div>
  );
};

export default Home;
