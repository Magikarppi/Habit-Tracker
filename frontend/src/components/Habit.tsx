import {
  LoadingOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import styled, { CSSProperties } from 'styled-components';

import { Completion, HabitProps, HabitType } from '../types';
import { stringShortener } from '../utils';

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  padding: 10px;
  margin-top: 10px;
  @media (min-width: 767px) {
    flex-direction: row;
    height: 100px;
    margin-right: 5%;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  @media (min-width: 767px) {
    align-items: center;
  }
  height: 100%;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* height: 100px; */
  /* width: 100%; */
  margin-left: 5%;
`;

const DoneToggler = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 34px;
  background: ${(props: { done: boolean }) =>
    props.done ? '#73ff00' : 'grey'};
  &:hover {
    background: ${(props: { done: boolean }) =>
      props.done ? 'grey' : '#73ff00'};
  }
  color: black;
  width: 50px;
  font-size: 0.9em;
  border: 2px solid #000000;
  border-radius: 3px;
  text-align: center;
`;

const RemoveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 34px;
  &:hover {
    background: #ff4141;
  }
  color: black;
  width: 50px;
  font-size: 0.9em;
  border: 2px solid #000000;
  border-radius: 3px;
  text-align: center;
  margin-top: 10px;
`;

const StreakDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #000000;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  @media (min-width: 767px) {
    width: 50px;
    height: 50px;
  }
  font-size: 0.9em;
  color: black;
  margin-bottom: 0.5em;
`;

const ParagraphSmall = styled.p`
  text-shadow: 1px 1px;
  text-align: left;
  padding: 10px;
  margin: 0;
`;

const ParagraphBig = styled(ParagraphSmall)`
  color: #000000;
  font-size: 20px;
  @media (min-width: 767px) {
    font-size: 60px;
  }
`;

const Habit = ({
  habit,
  handleCompletion,
  handleCancelCompletion,
  handleRemove,
}: HabitProps) => {
  const [currentStreak, setCurrentStreak] = useState<number | null>(null);
  const [showCurrentStreak, setShowCurrenStreak] = useState<boolean>(false);
  const [loadingCompletion, setLoadingCompletion] = useState<boolean>(false);
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);

  useEffect(() => {
    if (habit) {
      setCurrentStreak(getCurrentStreak(habit.completions));
    }
  }, [habit, handleCompletion]);

  useEffect(() => {
    if (currentStreak && currentStreak > 1) {
      setShowCurrenStreak(true);
    }
  }, [currentStreak]);

  if (!habit) {
    return null;
  }

  console.log('current streak', currentStreak);

  const streakTransition = useTransition(showCurrentStreak, {
    from: {
      opacity: 0,
      //background: interpolate color
    },
    enter: {
      opacity: 1,
    },
    // leave: {
    //   opacity: 0,
    // },
    // reverse: showHabitForm,
    // delay: 100,
    // onRest: () => (!showHabitForm),
    // onStart: () => (!showHabitForm),
    config: {
      duration: 500,
    },
  });

  const handleActions = async (
    action: 'undone' | 'done' | 'remove',
    habit: HabitType
  ) => {
    try {
      switch (action) {
        case 'done':
          setLoadingCompletion(true);
          await handleCompletion(habit);
          setLoadingCompletion(false);
          break;
        case 'undone':
          setLoadingCompletion(true);
          await handleCancelCompletion(habit);
          setLoadingCompletion(false);
          break;
        case 'remove':
          setLoadingRemove(true);
          await handleRemove(habit);
          setLoadingRemove(false);
          break;
        default:
          setLoadingCompletion(false);
          setLoadingRemove(false);
          break;
      }
    } catch (error) {
      console.log(error);
      setLoadingCompletion(false);
      setLoadingRemove(false);
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
    <>
      <StyledLink data-cy="habit-link" to={`/habits/${habit.id}`}>
        <TextWrapper>
          <ParagraphBig>{stringShortener(habit.name)}</ParagraphBig>
        </TextWrapper>
      </StyledLink>

      <BtnWrapper>
        {loadingCompletion ? (
          <LoadingOutlined spin style={{ fontSize: 40, marginBottom: 20 }} />
        ) : matchingDates.length > 0 ? (
          <DoneToggler
            data-cy="cancel-done-btn"
            onClick={() => handleActions('undone', habit)}
            done={true}
          >
            <CheckOutlined data-cy="checkmark" style={{ fontSize: 20 }} />
          </DoneToggler>
        ) : (
          <DoneToggler
            data-cy="done-btn"
            onClick={() => handleActions('done', habit)}
            done={false}
          >
            <CheckOutlined data-cy="checkmark" style={{ fontSize: 20 }} />
          </DoneToggler>
        )}
        {loadingRemove ? (
          <LoadingOutlined spin style={{ fontSize: 40, marginBottom: 20 }} />
        ) : (
          <RemoveButton
            data-cy="delete-btn"
            onClick={() => handleActions('remove', habit)}
          >
            <DeleteOutlined data-cy="trash" style={{ fontSize: 20 }} />
          </RemoveButton>
        )}
        {streakTransition((styles, item) =>
          item ? (
            <animated.div style={{ ...styles }}>
              <StreakDiv>
                <p style={{ fontSize: '10px' }}>Streak</p>
                {currentStreak}
              </StreakDiv>
            </animated.div>
          ) : (
            <StreakDiv
              style={{
                background: 'none',
                border: 'none',
              }}
            ></StreakDiv>
          )
        )}
      </BtnWrapper>
    </>
  );
};

export default Habit;
