import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  border: 1px solid black;
  height: 90px;
`

const StyledLink = styled(Link)`
  color: #000000;

`

const DoneBtn = styled.button`
  background: #fff870;
  &:hover {
    background: #a8ff36;
  }
  font-size: 0.9em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #8f8d64;
  border-radius: 3px;
  text-align: center;
`

const DoneNotif = styled.div`
  background: #73ff00;
  width: 50px;
  font-size: 0.9em;
  margin: auto;
  margin-top: 1em;
  border: 2px solid #000000;
  border-radius: 3px;
  text-align: center;

`

const Habit = ({ habit, handleCompletion }) => {
  if (!habit) {
    return null
  };

  const findByMatchingDate = (completions, dateObj) => {
    return completions.filter((completion) => {
      return Object.keys(dateObj).every((key) => {
        return completion[key] === dateObj[key];
      });
    });
  };

  const today = new Date();
  const todayObj = {
    thisDay: today.getDate(),
    thisMonth: today.getMonth(),
    thisYear: today.getFullYear()
  };

  const matchingDates = findByMatchingDate(habit.completions, todayObj);

  return (
    <Div>
      <StyledLink data-cy="habit-link" to={`/habits/${habit.id}`}>{habit.name}</StyledLink>
      {matchingDates.length > 0 ? (<DoneNotif>Done!</DoneNotif>) : (
        <div>
          <DoneBtn data-cy="done-btn" onClick={() => handleCompletion(habit)}>Done for today!</DoneBtn>
        </div>
      )}
    </Div>
  );
};

export default Habit;