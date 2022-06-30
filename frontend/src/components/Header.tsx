import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderProps } from '../types';
import { consts } from '../utils';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30%;
`;

const HeaderSubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 767px) {
    flex-direction: row;
  }
  align-items: center;
  justify-content: center;
  width: 30%;
`;

const H1 = styled.h1`
  text-shadow: 1px 1px black;
`;

const LoggedInDiv = styled.div`
  text-align: center;
  white-space: nowrap;
  font-size: 10px;
  @media (min-width: 767px) {
    font-size: 20px;
  }
`;

const LogOutBtn = styled.button`
  height: 30px;
  width: 80px;
  font-size: 0.6em;
  @media (min-width: 767px) {
    font-size: 0.9em;
    font-size: 1vw;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid;
    border-radius: 3px;
    text-align: center;
    height: 30px;
    width: 100px;
  }
`;

const StyledLink = styled(Link)`
  border: 2px solid black;
  border-radius: 5px;
  font-size: 0.9em;
  margin: 0;
  padding: 1em 1em;
`;

const Header = ({ loggedInUser, handleLogout }: HeaderProps) => {
  const getPart = (part: 'last' | 'secondToLast', url: string) => {
    const parts = url.split('/');
    if (part === 'last') {
      return url.lastIndexOf('/') !== url.length - 1
        ? parts[parts.length - 1]
        : parts[parts.length - 2];
    } else if (part === 'secondToLast') {
      return url.lastIndexOf('/') !== url.length - 1
        ? parts[parts.length - 2]
        : parts[parts.length - 3];
    }
  };

  const urlSecondToLast = getPart('secondToLast', window.location.href);
  const urlLastPart = getPart('last', window.location.href);

  return loggedInUser ? (
    <HeaderWrapper>
      <HeaderSubWrapper>
        {urlSecondToLast === 'habits' ? (
          <StyledLink data-cy="back-btn" to="/">
            Back
          </StyledLink>
        ) : null}
      </HeaderSubWrapper>
      <HeaderSubWrapper>
        <H1>{consts.appName}</H1>
      </HeaderSubWrapper>
      <HeaderSubWrapper>
        <LoggedInDiv>{loggedInUser.username} logged in</LoggedInDiv>
        <LogOutBtn data-cy="logout-btn" onClick={handleLogout}>
          Log out
        </LogOutBtn>
      </HeaderSubWrapper>
    </HeaderWrapper>
  ) : (
    <HeaderWrapper>
      <HeaderSubWrapper>
        {urlLastPart === 'login' || urlLastPart === 'signup' ? (
          <StyledLink data-cy="back-btn" to="/">
            Back
          </StyledLink>
        ) : null}
      </HeaderSubWrapper>
      <HeaderSubWrapper>
        <H1>{consts.appName}</H1>
      </HeaderSubWrapper>
      <HeaderSubWrapper />
    </HeaderWrapper>
  );
};

export default Header;
