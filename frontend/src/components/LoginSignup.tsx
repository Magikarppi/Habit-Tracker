import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoadingOutlined } from '@ant-design/icons';

import { LoginSignUpInputValues, LoginSignUpProps } from '../types';

const SubmitDiv = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitBtn = styled.button``;

const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const DivInput = styled.div`
  margin: auto;
  margin-bottom: 10px;
  margin-top: 20px;
  /* background: #6b6b6a; */
  /* background: rgba(255, 255, 220, 0.5); */
  text-align: center;
  width: 100%;
  height: 20%;
  overflow: hidden;
  /* border: 2px solid #8f8d64; */
  border-radius: 3px;
  /* color: black; */
`;

const H3 = styled.h3`
  width: 200px;
  margin: auto;
  margin-bottom: 10px;
  padding: 0.25em 1em;
  text-align: center;
`;

const ErrorDiv = styled.div`
  color: red;
`;

const LoginSignUp = ({
  handleSignUpSubmit,
  handleLoginSubmit,
}: LoginSignUpProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const getLastPart = (url: string) => {
    const parts = url.split('/');
    return url.lastIndexOf('/') !== url.length - 1
      ? parts[parts.length - 1]
      : parts[parts.length - 2];
  };

  const formToShow = getLastPart(window.location.href);

  const initialValues = {
    username: '',
    password: '',
  };

  const validate = (values: LoginSignUpInputValues) => {
    const { username, password } = values;
    const errors: any = {};

    if (!username) {
      errors.username = 'Username is required!';
    } else if (username.length > 12) {
      errors.username = 'Max length is 12 characters';
    } else if (username.length < 3) {
      errors.username = 'Username should be at least 3 characters';
    }

    if (!password) {
      errors.password = 'Password is required!';
    } else if (password.length < 5) {
      errors.password = 'Password should be at least 5 characters long';
    }
    return errors;
  };

  switch (formToShow) {
    case 'signup':
      return (
        <>
          <H3>Sign Up</H3>
          <InputsContainer>
            <Formik
              initialValues={initialValues}
              validate={(values) => validate(values)}
              onSubmit={(values, { setSubmitting }) => {
                handleSignUpSubmit(values, setSubmitting);
              }}
            >
              {({ isSubmitting, errors }) => (
                <Form>
                  <DivInput>
                    <Field
                      type="username"
                      name="username"
                      placeholder="Username"
                      innerRef={inputRef}
                      data-cy="username-input"
                    />
                    <ErrorMessage name="username" component={ErrorDiv} />
                  </DivInput>
                  <DivInput>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      data-cy="password-input"
                    />
                    <ErrorMessage name="password" component={ErrorDiv} />
                  </DivInput>
                  {isSubmitting ? (
                    <LoadingOutlined spin className="loading" />
                  ) : (
                    <SubmitDiv>
                      <SubmitBtn type="submit" data-cy="submit-btn">
                        Submit
                      </SubmitBtn>
                    </SubmitDiv>
                  )}
                </Form>
              )}
            </Formik>
          </InputsContainer>
        </>
      );
    case 'login':
      return (
        <>
          <H3>Login</H3>
          <InputsContainer>
            <Formik
              initialValues={initialValues}
              validate={(values) => validate(values)}
              onSubmit={(values, { setSubmitting }) => {
                handleLoginSubmit(values, setSubmitting);
              }}
            >
              {({ isSubmitting, errors }) => (
                <Form>
                  <DivInput>
                    <Field
                      type="username"
                      name="username"
                      placeholder="Username"
                      innerRef={inputRef}
                      data-cy="username-input"
                    />
                    <ErrorMessage name="username" component={ErrorDiv} />
                  </DivInput>
                  <DivInput>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      data-cy="password-input"
                    />
                    <ErrorMessage name="password" component={ErrorDiv} />
                  </DivInput>
                  {isSubmitting ? (
                    <LoadingOutlined className="loading" spin />
                  ) : (
                    <SubmitDiv>
                      <SubmitBtn type="submit" data-cy="submit-btn">
                        Submit
                      </SubmitBtn>
                    </SubmitDiv>
                  )}
                </Form>
              )}
            </Formik>
          </InputsContainer>
        </>
      );
    default:
      return null;
  }
};

export default LoginSignUp;
