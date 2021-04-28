import React from 'react';
import styled from 'styled-components';
import { AddHabitProps } from '../types';

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
`;

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
  color: #000000;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
`;

const AddHabit = ({ handleHabitSubmit, habitName }: AddHabitProps) => {
  return (
    <div>
      <form onSubmit={handleHabitSubmit}>
        <DivInput>
          name: <Input data-cy="habitname-input" {...habitName} />
        </DivInput>
        <SubmitDiv>
          <SubmitBtn
            data-cy="habit-submit"
            data-testid="habit-submit"
            type="submit"
          >
            Add
          </SubmitBtn>
        </SubmitDiv>
      </form>
    </div>
  );
};

export default AddHabit;
