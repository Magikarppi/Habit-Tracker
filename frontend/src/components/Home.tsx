import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getQuote } from '../services/quote';

import { HomeProps } from '../types';
import AddHabit from './AddHabit';
import Habit from './Habit';

const HabitsDiv = styled.div`
  background: rgba(255, 255, 220, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  padding: 10px;
  margin: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: #63006e;
  font-weight: bold;
  margin-right: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 30px;
`;

const ParagraphSmall = styled.p`
  margin: auto;
  margin-top: 20px;
  text-shadow: 1px 1px;
  text-align: center;
  width: 60%;
  padding: 0.25em 1em;
`;

const ParagraphMed = styled(ParagraphSmall)`
  font-size: 40px;
  color: #fffc37;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const ParagraphBig = styled(ParagraphSmall)`
  font-size: 60px;
`;

const Underline = styled.span`
  text-decoration: underline;
`;

const Italic = styled.span`
  font-style: italic;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NewHabitBtn = styled.button`
  background: #f2f5b5;
  &:hover {
    background: #fff870;
  }
  font-size: 0.9em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #8f8d64;
  border-radius: 3px;
  text-align: center;
`;

const Home = ({
  loggedInUser,
  handleLogout,
  habitsToShow,
  handleHabitSubmit,
  habitName,
  showHabitForm,
  toggleHabitForm,
  handleCompletion,
}: HomeProps) => {
  const [quote, setQuote] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await getQuote();
      const fetchedQuote = response.contents.quotes[0].quote;
      const quoteAuthor = response.contents.quotes[0].author;
      setQuote(fetchedQuote);
      setQuoteAuthor(quoteAuthor);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return loggedInUser ? (
    <Wrapper>
      {showHabitForm ? (
        <div data-testid="habitForm-open-div">
          <AddHabit
            handleHabitSubmit={handleHabitSubmit}
            habitName={habitName}
            toggleHabitForm={toggleHabitForm}
          />
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
  ) : (
    <div>
      {/* <H1>{consts.appName}</H1> */}
      <ParagraphBig>
        Did you know that the things that you do{' '}
        <Underline>repeatedly</Underline> construct your identity and determine
        the success that you are going to have?
      </ParagraphBig>
      <ParagraphMed>Start tracking your habits now!</ParagraphMed>
      <ButtonWrapper>
        <StyledLink data-cy="login-btn" data-testid="login-btn" to="/login">
          Login
        </StyledLink>
        <StyledLink data-cy="signup-btn" data-testid="signup-btn" to="/signup">
          Sign up
        </StyledLink>
      </ButtonWrapper>
      {quote ? (
        <ParagraphSmall data-testid="quotePara">
          "{<Italic>{quote}</Italic>}" - {quoteAuthor}
        </ParagraphSmall>
      ) : null}
      {/* <ParagraphMed>Here is how Habit Tracker works:</ParagraphMed> */}
    </div>
  );
};

export default Home;
