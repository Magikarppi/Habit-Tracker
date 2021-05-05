import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LoggedEmpty from '../images/Habit-tracker-Logged-empty.png';
import { getQuote } from '../services/quote';

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
  font-size: 20px;
  color: #fffc37;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  @media (min-width: 767px) {
    font-size: 40px;
  }
`;

const ParagraphBig = styled(ParagraphSmall)`
  font-size: 30px;
  @media (min-width: 767px) {
    font-size: 60px;
  }
`;

const Underline = styled.span`
  text-decoration: underline;
`;

const Italic = styled.span`
  font-style: italic;
`;

const GuideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: teal;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

const GuidePairWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

const imgStyle = {
  width: 300,
  height: 200,
  borderRadius: 10,
};

const LoggedOutView = () => {
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

  return (
    <div>
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
          Sign Up
        </StyledLink>
      </ButtonWrapper>
      {quote ? (
        <ParagraphSmall data-testid="quotePara">
          "{<Italic>{quote}</Italic>}" - {quoteAuthor}
        </ParagraphSmall>
      ) : null}
      <div
        style={{
          backgroundColor: 'teal',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <ParagraphMed>Here is how Habit Tracker works:</ParagraphMed>
      </div>
      <GuideWrapper>
        <GuidePairWrapper>
          <ParagraphSmall>
            Log in and add a habit that you want to track
          </ParagraphSmall>
          <img
            src={LoggedEmpty}
            alt="Logged in view no habits"
            style={imgStyle}
          />
        </GuidePairWrapper>
        <GuidePairWrapper>
          <ParagraphSmall>
            View all your habits and mark them done for today
          </ParagraphSmall>
          <img
            src={LoggedEmpty}
            alt="Logged in view no habits"
            style={imgStyle}
          />
        </GuidePairWrapper>
        <GuidePairWrapper>
          <ParagraphSmall>
            View completed days in a calendar and delete habit if necessary
          </ParagraphSmall>
          <img
            src={LoggedEmpty}
            alt="Logged in view no habits"
            style={{ ...imgStyle, marginRight: '5px' }}
          />
        </GuidePairWrapper>
      </GuideWrapper>
    </div>
  );
};

export default LoggedOutView;
