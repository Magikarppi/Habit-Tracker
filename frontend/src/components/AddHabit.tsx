import React from 'react';
import styled from 'styled-components';
import { AddHabitProps } from '../types';

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

const AddHabit = ({
  handleHabitSubmit,
  habitName,
  toggleHabitForm,
}: AddHabitProps) => {
  return (
    <div>
      <form onSubmit={handleHabitSubmit}>
        <DivInput>
          Name your habit: <Input data-cy="habitname-input" {...habitName} />
        </DivInput>
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
      </form>
    </div>
  );
};

export default AddHabit;
