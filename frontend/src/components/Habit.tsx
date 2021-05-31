import { LoadingOutlined, CheckOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Completion, HabitProps, HabitType } from '../types';
import { stringShortener } from '../utils';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 210px;
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
  border: 2px solid #8f8d64;
  border-radius: 3px;
  text-align: center;
`;

const CancelBtn = styled.button`
  width: 50px;
  height: 34px;
  &:hover {
    background: #ff4141;
  }
  font-size: 0.9em;
  background: rgba(255, 255, 220, 0);
  margin: 0;
  border: 2px solid #ff4141;
  border-radius: 50%;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  /* margin-bottom: 10px; */
`;

const DoneNotif = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 34px;
  background: #73ff00;
  color: black;
  width: 50px;
  font-size: 0.9em;
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
  margin-bottom: 0.5em;
`;

const Habit = ({
  habit,
  handleCompletion,
  handleCancelCompletion,
}: HabitProps) => {
  const [currentStreak, setCurrentStreak] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (habit) {
      setCurrentStreak(getCurrentStreak(habit.completions));
    }
  }, [habit, handleCompletion]);

  if (!habit) {
    return null;
  }

  const handleCompletions = async (
    action: 'undone' | 'done',
    habit: HabitType
  ) => {
    setLoading(true);
    try {
      if (action === 'done') {
        await handleCompletion(habit);
        setLoading(false);
        return;
      } else if (action === 'undone') {
        await handleCancelCompletion(habit);
        setLoading(false);
        return;
      }
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
  };

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
        loading ? (
          <LoadingOutlined spin style={{ fontSize: 40, marginBottom: 20 }} />
        ) : (
          <ButtonWrapper>
            <DoneNotif>
              <CheckOutlined data-cy="checkmark" style={{ fontSize: 20 }} />
            </DoneNotif>
            <CancelBtn
              data-cy="cancel-done-btn"
              onClick={() => handleCompletions('undone', habit)}
            >
              x
            </CancelBtn>
          </ButtonWrapper>
        )
      ) : loading ? (
        <LoadingOutlined spin style={{ fontSize: 40, marginBottom: 20 }} />
      ) : (
        <div>
          <DoneBtn
            data-cy="done-btn"
            onClick={() => handleCompletions('done', habit)}
          >
            Done for today!
          </DoneBtn>
        </div>
      )}
    </Div>
  );
};

export default Habit;
