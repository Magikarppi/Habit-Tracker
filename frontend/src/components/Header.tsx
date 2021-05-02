import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderProps } from '../types';
import { consts } from '../utils';

const HeaderWrapperDark = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  /* background-color: #383838; */
`;

const HeaderWrapperLight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
`;

const HeaderSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30%;
`;

const H1 = styled.h1`
  font-size: 200%;
  color: #fffc37;
  text-shadow: 1px 1px black;
`;

const LoggedInDiv = styled.div`
  text-align: center;
  white-space: nowrap;
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
  height: 30px;
  width: 100px;
`;

const StyledLink = styled(Link)`
  background: #cfccc2;
  &:hover {
    background: #ff711f;
  }
  font-size: 0.9em;
  margin: 0;
  padding: 0;
  text-align: center;
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
    <HeaderWrapperDark>
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
        <LogOutBtn data-testid="logout-btn" onClick={handleLogout}>
          Log out
        </LogOutBtn>
      </HeaderSubWrapper>
    </HeaderWrapperDark>
  ) : (
    <HeaderWrapperLight>
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
    </HeaderWrapperLight>
  );
};

export default Header;
