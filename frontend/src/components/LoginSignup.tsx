import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoginSignUpProps } from '../types';

const SubmitDiv = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: #63006e;
  font-weight: bold;
  &:hover {
    background: #7c7c7c;
  }
  /* margin-right: 300px; */
  display: inline-block;
  width: 40px;
  height: 20px;
`;

const SubmitBtn = styled.button``;

const DivInput = styled.div`
  margin: auto;
  margin-bottom: 10px;
  background: rgba(255, 255, 220, 0.5);
  text-align: center;
  width: 200px;
  border: 2px solid #8f8d64;
  border-radius: 3px;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: black;
  background: #fffba8;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
`;

const H3 = styled.h3`
  width: 200px;
  margin: auto;
  margin-bottom: 10px;
  padding: 0.25em 1em;
  text-align: center;
`;

const LoginSignUp = ({
  username,
  password,
  handleSignUpSubmit,
  handleLoginSubmit,
}: LoginSignUpProps) => {
  const getLastPart = (url: string) => {
    const parts = url.split('/');
    return url.lastIndexOf('/') !== url.length - 1
      ? parts[parts.length - 1]
      : parts[parts.length - 2];
  };

  const formToShow = getLastPart(window.location.href);

  switch (formToShow) {
    case 'signup':
      return (
        <div>
          <StyledLink data-cy="back-btn" to="/">
            Back
          </StyledLink>
          <H3>Sign Up</H3>
          <div>
            <form onSubmit={handleSignUpSubmit}>
              <DivInput>
                Username <Input data-cy="signup-user-input" {...username} />
              </DivInput>
              <DivInput>
                Password <Input data-cy="signup-pass-input" {...password} />
              </DivInput>
              <SubmitDiv>
                <SubmitBtn data-cy="signup-submit" type="submit">
                  Sign Up
                </SubmitBtn>
              </SubmitDiv>
            </form>
          </div>
        </div>
      );
    case 'login':
      return (
        <div>
          <StyledLink data-cy="back-btn" to="/">
            Back
          </StyledLink>
          <H3>Login</H3>
          <div>
            <form onSubmit={handleLoginSubmit}>
              <DivInput>
                Username{' '}
                <Input
                  data-cy="login-user-input"
                  data-testid="login-user-input"
                  {...username}
                />
              </DivInput>
              <DivInput>
                Password{' '}
                <Input
                  data-cy="login-pass-input"
                  data-testid="login-pass-input"
                  {...password}
                />
              </DivInput>
              <SubmitDiv>
                <SubmitBtn
                  data-cy="login-submit"
                  data-testid="login-submit"
                  type="submit"
                >
                  Login
                </SubmitBtn>
              </SubmitDiv>
            </form>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default LoginSignUp;
