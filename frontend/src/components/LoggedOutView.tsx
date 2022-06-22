import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LoggedEmptyImg from '../images/newHabitTrackerLoggedInEmptyBig.png';
import HabitMoreInfoImg from '../images/newHabitTrackerHabitMoreInfoBig.png';
import LoggedHabitsImg from '../images/newHabitTrackerLoggedInAddHabitBig.png';
import { getQuote } from '../services/quote';

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
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 5px;
  width: 60px;
  height: 40px;
  @media (min-width: 767px) {
    width: 80px;
    height: 60px;
  }
`;

const ParagraphSmall = styled.p`
  margin: auto;
  margin-top: 5px;
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
  background: 'linear-gradient(#6b6b6a, #242424)';
  @media (min-width: 767px) {
    flex-direction: row;
    height: 200px;
  }
`;

const GuidePairWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 20px;
  @media (min-width: 767px) {
    flex-direction: row;
    justify-content: center;
    width: 33%;
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
  height: 150,
  borderRadius: 10,
};

const LoggedOutView = () => {
  const [quote, setQuote] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await getQuote();
      if (!response.contents) {
        return null;
      }
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
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <ParagraphMed style={{ padding: '15px' }}>
          This is how Simplify Success works:
        </ParagraphMed>
      </div>
      <GuideWrapper>
        <GuidePairWrapper>
          <ParagraphWrapper>
            <ParagraphSmall>
              Log in and add a habit that you want to track
            </ParagraphSmall>
          </ParagraphWrapper>
          <img
            src={LoggedEmptyImg}
            alt="Logged in view no habits"
            style={imgStyle}
          />
        </GuidePairWrapper>
        <GuidePairWrapper>
          <ParagraphWrapper>
            <ParagraphSmall>
              View all your habits and mark them as done
            </ParagraphSmall>
          </ParagraphWrapper>
          <img
            src={LoggedHabitsImg}
            alt="Logged in view no habits"
            style={imgStyle}
          />
        </GuidePairWrapper>
        <GuidePairWrapper>
          <ParagraphWrapper>
            <ParagraphSmall>
              View completed days in a calendar and delete habit if necessary
            </ParagraphSmall>
          </ParagraphWrapper>
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
