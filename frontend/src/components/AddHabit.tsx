import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import {
  AddHabitProps,
  HabitInputValue,
  LoginSignUpInputValues,
} from '../types';

const SubmitBtn = styled.button`
  background: #fffba8;
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

const SubmitDiv = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DivInput = styled.div`
  margin: auto;
  margin-bottom: 10px;
  background: rgba(255, 255, 220, 0.5);
  text-align: center;
  width: 200px;
  border: 2px solid #8f8d64;
  border-radius: 3px;
  color: black;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #000000;
  background: rgba(255, 255, 220, 0.8);
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
`;

const CancelBtn = styled.button`
  background: #cfccc2;
  &:hover {
    background: #ff711f;
  }
  font-size: 0.9em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #8f8d64;
  border-radius: 3px;
  text-align: center;
`;

const ErrorDiv = styled.div`
  color: red;
`;

const AddHabit = ({
  handleHabitSubmit,
  habitName,
  toggleHabitForm,
}: AddHabitProps) => {
  const initialValues = {
    habitName: '',
  };

  const validate = (values: HabitInputValue) => {
    const { habitName } = values;
    const errors: any = {};

    if (!habitName) {
      errors.habitName = 'Please enter a habit name';
    } else if (habitName.length >= 30) {
      errors.username = 'Max length is 30 chars';
    }

    return errors;
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={(values) => validate(values)}
        onSubmit={(values, { setSubmitting }) => {
          handleHabitSubmit(values);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <DivInput>
              <Field
                type="habitName"
                name="habitName"
                placeholder="Habit name"
              />
            </DivInput>
            <ErrorMessage name="username" component={ErrorDiv} />
            <SubmitDiv>
              <SubmitBtn
                data-cy="habit-submit"
                data-testid="habit-submit"
                type="submit"
              >
                Add
              </SubmitBtn>
              <CancelBtn
                data-cy="habit-form-close"
                data-testid="habit-form-close-btn"
                onClick={toggleHabitForm}
              >
                cancel
              </CancelBtn>
            </SubmitDiv>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddHabit;
