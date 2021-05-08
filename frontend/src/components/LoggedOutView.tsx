import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LoggedEmptyImg from '../images/Habit-tracker-Logged-empty.png';
import HabitMoreInfoImg from '../images/Habit-tracker-habit-more-info.png';
import LoggedHabitsImg from '../images/Habit-tracker-Logged-habits-big-img.png';
import { getQuote } from '../services/quote';

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
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
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  width: 60%;
`;

const ParagraphMed = styled.p`
  font-size: 20px;
  width: 60%;
  text-align: center;
  margin: auto;
  margin-top: 20px;
  color: #fffc37;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  @media (min-width: 767px) {
    font-size: 40px;
  }
`;

const ParagraphBig = styled.p`
  font-size: 30px;
  width: 60%;
  text-align: center;
  margin: auto;
  margin-top: 20px;
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
  justify-content: center;
  background-color: teal;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

const GuidePairWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

const ParagraphWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 6%;
  margin-top: 2%;
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
      const quoteObject = {
        quote: response.contents.quotes[0].quote,
        author: response.contents.quotes[0].author,
      };
      return quoteObject;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    const getQuote = async () => {
      const fetchedQuoteObject = await fetchQuote();
      if (mounted) {
        setQuote(fetchedQuoteObject?.quote);
        setQuoteAuthor(fetchedQuoteObject?.author);
      }
    };
    getQuote();

    return function cleanup() {
      mounted = false;
    };
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
        <ParagraphWrapper>
          <ParagraphSmall data-testid="quotePara">
            "{<Italic>{quote}</Italic>}" - {quoteAuthor}
          </ParagraphSmall>
        </ParagraphWrapper>
      ) : (
        <ParagraphWrapper>
          <ParagraphSmall />
        </ParagraphWrapper>
      )}
      <div
        style={{
          backgroundColor: 'teal',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <ParagraphMed style={{ color: 'white', paddingBottom: '20px' }}>
          This is how Habit Tracker works:
        </ParagraphMed>
      </div>
      <GuideWrapper>
        <GuidePairWrapper>
          <ParagraphSmall style={{ width: '150px' }}>
            Log in and add a habit that you want to track
          </ParagraphSmall>
          <img
            src={LoggedEmptyImg}
            alt="Logged in view no habits"
            style={imgStyle}
          />
        </GuidePairWrapper>
        <GuidePairWrapper>
          <ParagraphSmall style={{ width: '150px' }}>
            View all your habits and mark them as done
          </ParagraphSmall>
          <img
            src={LoggedHabitsImg}
            alt="Logged in view no habits"
            style={imgStyle}
          />
        </GuidePairWrapper>
        <GuidePairWrapper>
          <ParagraphSmall style={{ width: '150px' }}>
            View completed days in a calendar and delete habit if necessary
          </ParagraphSmall>
          <img
            src={HabitMoreInfoImg}
            alt="Logged in view no habits"
            style={{ ...imgStyle, marginRight: '5px' }}
          />
        </GuidePairWrapper>
      </GuideWrapper>
    </div>
  );
};

export default LoggedOutView;
