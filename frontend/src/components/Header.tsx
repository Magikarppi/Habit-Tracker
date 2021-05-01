import React from 'react';
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
  color: white;
`;

const LoggedInDiv = styled.div`
  /* background: rgba(255, 255, 220, 0.8);
  margin-left: 2%;
  padding: 0.25em 1em;
  border: 2px solid rgba(55, 55, 20, 0.5);
  border-radius: 3px; */
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

const Header = ({ loggedInUser, handleLogout }: HeaderProps) => {
  return loggedInUser ? (
    <HeaderWrapperDark>
      <HeaderSubWrapper>
        <LoggedInDiv>{loggedInUser.username} logged in</LoggedInDiv>
        <LogOutBtn data-testid="logout-btn" onClick={handleLogout}>
          Log out
        </LogOutBtn>
      </HeaderSubWrapper>
      <HeaderSubWrapper>
        <H1>{consts.appName}</H1>
      </HeaderSubWrapper>
      <HeaderSubWrapper />
    </HeaderWrapperDark>
  ) : (
    <HeaderWrapperLight>
      <HeaderSubWrapper></HeaderSubWrapper>
      <HeaderSubWrapper>
        <H1>{consts.appName}</H1>
      </HeaderSubWrapper>
      <HeaderSubWrapper />
    </HeaderWrapperLight>
  );
};

export default Header;
