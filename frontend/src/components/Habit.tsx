import {
  LoadingOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';

import { Completion, HabitProps, HabitType, TodayObjType } from '../types';
import { stringShortener } from '../utils';
import StreakIcon from './StreakIcon';
import StreakInfo from './StreakInfo';

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  padding: 20px;
  @media (min-width: 767px) {
    flex-direction: row;
    height: 100px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
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
  margin-bottom: 0.5em;
  font-size: 0.9em;
  color: black;
  @media (min-width: 767px) {
    width: 50px;
    height: 50px;
    margin-bottom: 0;
  }
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
  parentAnimFinished,
}: HabitProps) => {
  const [streakElements, setStreakElements] = useState<JSX.Element[] | null>(
    null
  );
  const [currentStreak, setCurrentStreak] = useState<number | null>(null);
  const [strIndex, setStrIndex] = useState<number>(0);
  const [loadingCompletion, setLoadingCompletion] = useState<boolean>(false);
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);

  useEffect(() => {
    if (!currentStreak || currentStreak < 2) {
      return setStreakElements(null);
    }

    if (currentStreak === 10) {
      return setStreakElements([
        <StreakIcon iconName="party" />,
        <StreakInfo currentStreak={currentStreak} />,
      ]);
    } else if (currentStreak === 50) {
      return setStreakElements([
        <StreakIcon iconName="crown" />,
        <StreakInfo currentStreak={currentStreak} />,
      ]);
    } else if (currentStreak === 100) {
      return setStreakElements([
        <StreakIcon iconName="hundred" />,
        <StreakInfo currentStreak={currentStreak} />,
      ]);
    } else {
      return setStreakElements([
        <StreakIcon iconName="flame" />,
        <StreakInfo currentStreak={currentStreak} />,
      ]);
    }
  }, [currentStreak]);

  useEffect(() => {
    if (habit) {
      setCurrentStreak(getCurrentStreak(habit.completions));
    }
  }, [habit, handleCompletion]);

  if (!habit) {
    return null;
  }

  const incrIndex = (i: number) => {
    if (streakElements) {
      if (i < streakElements.length - 1) {
        setStrIndex((prev: number) => prev + 1);
        return;
      }
    }
    return;
  };

  const streakTransition = useTransition(
    streakElements && streakElements[strIndex],
    {
      from: {
        opacity: 0,
      },
      enter: {
        opacity: 1,
      },
      onRest: () => incrIndex(strIndex),
      config: {
        duration: 500,
      },
    }
  );

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
          setStrIndex(0);
          break;
        case 'remove':
          setLoadingRemove(true);
          await handleRemove(habit);
          setLoadingRemove(false);
          break;
        default:
          setLoadingCompletion(false);
          setLoadingRemove(false);
          setStrIndex(0);
          break;
      }
    } catch (error) {
      console.log(error);
      setLoadingCompletion(false);
      setLoadingRemove(false);
      return;
    }
  };

  const findByMatchingDate = (
    completions: Completion[],
    dateObj: TodayObjType
  ) => {
    return completions.filter((completion: any) => {
      return Object.keys(dateObj).every((key) => {
        return completion[key] === dateObj[key];
      });
    });
  };

  const today = new Date();
  const todayObj: TodayObjType = {
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
          <ParagraphBig>
            {window.screen.width > 767
              ? stringShortener(habit.name)
              : stringShortener(habit.name, 12)}
          </ParagraphBig>
        </TextWrapper>
      </StyledLink>

      {parentAnimFinished ? (
        <ButtonSection>
          {loadingCompletion ? (
            <ButtonWrapper>
              <LoadingOutlined spin className="loading" />
            </ButtonWrapper>
          ) : matchingDates.length > 0 ? (
            <ButtonWrapper>
              <DoneToggler
                data-cy="cancel-done-btn"
                onClick={() => handleActions('undone', habit)}
                done={true}
              >
                <CheckOutlined data-cy="checkmark" className="checkDelIcon" />
              </DoneToggler>
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <DoneToggler
                data-cy="done-btn"
                onClick={() => handleActions('done', habit)}
                done={false}
              >
                <CheckOutlined data-cy="checkmark" className="checkDelIcon" />
              </DoneToggler>
            </ButtonWrapper>
          )}
          {loadingRemove ? (
            <ButtonWrapper>
              <LoadingOutlined spin className="loading" />
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <RemoveButton
                data-cy="delete-btn"
                onClick={() => handleActions('remove', habit)}
              >
                <DeleteOutlined data-cy="trash" className="checkDelIcon" />
              </RemoveButton>
            </ButtonWrapper>
          )}

          <ButtonWrapper>
            {streakTransition((styles, item) =>
              item ? (
                <animated.div
                  style={{
                    ...styles,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderRadius: '10px',
                  }}
                >
                  <StreakDiv>{item}</StreakDiv>
                </animated.div>
              ) : null
            )}
          </ButtonWrapper>
        </ButtonSection>
      ) : (
        <ButtonSection />
      )}
    </>
  );
};

export default Habit;
