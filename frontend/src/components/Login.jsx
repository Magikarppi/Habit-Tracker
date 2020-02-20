import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BackButton = styled.div`
  margin-right: 300px;
  display: inline-block;
  width: 60px;
  background: rgba(255, 255, 220, 0.5);
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid rgba(255, 255, 220, 0.5);
  border-radius: 3px;
`;

const SubmitBtn = styled.button`
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

const SubmitDiv = styled.div`
  margin: auto;
  text-align: center;
`

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
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
`;

const Login = ({ handleLoginSubmit, username, password }) => {
  return (
    <div>
      <BackButton>
        <Link to="/">Back</Link>
      </BackButton>
      <div>
        <form onSubmit={handleLoginSubmit}>
          <DivInput>
            Username <Input data-cy="login-user-input" {...username} />
          </DivInput>
          <DivInput>
            Password <Input data-cy="login-pass-input" {...password} />
          </DivInput>
          <SubmitDiv>
            <SubmitBtn data-cy="login-submit" type="submit">Login</SubmitBtn>
          </SubmitDiv>
        </form>
      </div>
    </div>
  );
};

export default Login;
