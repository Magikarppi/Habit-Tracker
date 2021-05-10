import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Completion, HabitProps } from '../types';
import { stringShortener } from '../utils';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  height: 180px;
  width: 90%;
`;

const StyledLink = styled(Link)`
  color: #000000;
  width: 80%;
`;

const DoneBtn = styled.button`
  background: #fff870;
  &:hover {
    background: #a8ff36;
  }
  font-size: 0.9em;
  /* padding: 0.25em 1em; */
  border: 2px solid #8f8d64;
  border-radius: 3px;
  text-align: center;
`;

const CancelBtn = styled.button`
  &:hover {
    background: #ff4141;
  }
  font-size: 0.9em;
  /* padding: 0.25em 1em; */
  margin: 0;
  border: 2px solid #ff4141;
  border-radius: 50%;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 80%;
`;

const DoneNotif = styled.div`
  background: #73ff00;
  color: black;
  width: 50px;
  font-size: 0.9em;
  margin-top: 5px;
  border: 2px solid #000000;
  border-radius: 3px;
  text-align: center;
`;

const StreakDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #000000;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  font-size: 0.9em;
  color: black;
`;

const Habit = ({
  habit,
  handleCompletion,
  handleCancelCompletion,
}: HabitProps) => {
  const [currentStreak, setCurrentStreak] = useState<number | null>(null);

  useEffect(() => {
    if (habit) {
      setCurrentStreak(getCurrentStreak(habit.completions));
    }
  }, [habit, handleCompletion]);

  if (!habit) {
    return null;
  }

  const findByMatchingDate = (completions: any, dateObj: any) => {
    return completions.filter((completion: any) => {
      return Object.keys(dateObj).every((key) => {
        return completion[key] === dateObj[key];
      });
    });
  };

  const today = new Date();
  const todayObj = {
    thisDay: today.getDate(),
    thisMonth: today.getMonth(),
    thisYear: today.getFullYear(),
  };

  const matchingDates = findByMatchingDate(habit.completions, todayObj);

  const getCurrentStreak = (completions: Completion[]) => {
    let count = 0;
    const transformToDateString = (completion: Completion) => {
      return `${completion.thisYear}-${completion.thisMonth + 1}-${
        completion.thisDay + 1
      }`;
    };
    const completionsCopy = [...completions];
    completionsCopy.reverse().forEach((el, i) => {
      const today = new Date().setUTCHours(0, 0, 0, 0);
      const currElDate = new Date(transformToDateString(el)).setUTCHours(
        0,
        0,
        0,
        0
      );

      const milliSecondsInADay = 86400000;
      const daysPassed = i * milliSecondsInADay;
      const daysPassedSinceCompletion = today - currElDate;

      if (daysPassedSinceCompletion === daysPassed) {
        count++;
      }
    });
    return count;
  };

  return (
    <Div>
      <StyledLink data-cy="habit-link" to={`/habits/${habit.id}`}>
        {stringShortener(habit.name)}
      </StyledLink>
      {currentStreak && currentStreak > 1 ? (
        <StreakDiv>
          <p style={{ fontSize: '10px' }}>Streak</p>
          {currentStreak}
        </StreakDiv>
      ) : (
        <StreakDiv
          style={{
            background: 'none',
            border: 'none',
          }}
        ></StreakDiv>
      )}
      {matchingDates.length > 0 ? (
        <ButtonWrapper>
          <DoneNotif>Done!</DoneNotif>
          <CancelBtn
            data-cy="cancel-done-btn"
            onClick={() => handleCancelCompletion(habit)}
          >
            x
          </CancelBtn>
        </ButtonWrapper>
      ) : (
        <div>
          <DoneBtn data-cy="done-btn" onClick={() => handleCompletion(habit)}>
            Done for today!
          </DoneBtn>
        </div>
      )}
    </Div>
  );
};

export default Habit;
