import { useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { animated, useTransition } from 'react-spring';

import { HomeProps } from '../types';
import AddHabit from './AddHabit';
import Habit from './Habit';
import LoggedOutView from './LoggedOutView';

const HabitsList = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 10px;
`;

const ParagraphSmall = styled.p`
  margin: auto;
  margin-top: 20px;
  text-shadow: 1px 1px;
  text-align: center;
  width: 60%;
  padding: 0.25em 1em;
`;

const ParagraphMed = styled(ParagraphSmall)`
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  @media (min-width: 767px) {
    font-size: 25px;
  }
`;

const ParagraphBig = styled(ParagraphSmall)`
  font-size: 30px;
  margin-top: 0px;
  @media (min-width: 767px) {
    font-size: 40px;
  }
`;

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NewHabitBtn = styled.button`
  font-size: 0.9em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid;
  border-radius: 3px;
  text-align: center;
`;

const HabitWrapper = styled(animated.div)`
  &[style] {
    width: 100%;
    height: 200px;
    @media (min-width: 767px) {
      height: 150px;
    }
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #f9ffd9;
    border-radius: 10px;
    border: 2px solid black;
    overflow: hidden;
  }
`;

const formWrapperStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '150px',
};

const Home = ({
  loggedInUser,
  habitsToShow,
  handleHabitSubmit,
  handleCompletion,
  handleCancelCompletion,
  handleRemove,
  toggleHabitForm,
  showHabitForm,
}: HomeProps) => {
  const [parentAnimFinished, setParentAnimFinished] = useState<boolean>(false);

  const habitTransitions = useTransition(habitsToShow, {
    from: {
      marginTop: -100,
      opacity: 1,
      transform: 'translate3d(-150px,-40px,0)',
    },
    enter: {
      marginTop: 0,
      opacity: 1,
      transform: 'translate3d(0px,0px,0)',
    },
    leave: {
      marginTop: 0,
      opacity: 0,
      transform: 'translate3d(-150px,-40px,0)',
    },
    update: null,
    keys: (habit) => habit.id,
    onRest: () => setParentAnimFinished(true),
  });

  const formTransition = useTransition(showHabitForm, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    config: {
      duration: 500,
    },
  });

  return loggedInUser ? (
    <Wrapper>
      {formTransition((styles, item) =>
        item ? (
          <animated.div
            data-testid="habitForm-open-div"
            style={{ ...formWrapperStyles, ...styles }}
          >
            <AddHabit
              handleHabitSubmit={handleHabitSubmit}
              toggleHabitForm={toggleHabitForm}
            />
          </animated.div>
        ) : (
          <div style={{ ...formWrapperStyles }}>
            <NewHabitBtn
              data-cy="habit-form-open-btn"
              data-testid="habit-form-open-btn"
              onClick={toggleHabitForm}
            >
              New Habit
            </NewHabitBtn>
          </div>
        )
      )}
      {habitsToShow.length > 0 ? (
        <HabitsList data-testid="habit-div" data-cy="habit-div">
          {habitTransitions((props, item, state, index) => {
            return (
              <HabitWrapper
                key={item.id}
                style={{
                  ...props,
                }}
                className="box"
              >
                <Habit
                  key={item.id}
                  habit={item}
                  handleCompletion={handleCompletion}
                  handleCancelCompletion={handleCancelCompletion}
                  handleRemove={handleRemove}
                  parentAnimFinished={parentAnimFinished}
                />
              </HabitWrapper>
            );
          })}
        </HabitsList>
      ) : (
        <>
          <ParagraphBig>Add your first habit in the form above</ParagraphBig>
          <ParagraphMed>Here are a few ideas if you need a spark:</ParagraphMed>
          <ParagraphSmall>"Physical exercise"</ParagraphSmall>
          <ParagraphSmall>"Study string theory"</ParagraphSmall>
          <ParagraphSmall>"Explore Wikipedia"</ParagraphSmall>
          <ParagraphSmall>"Practice magic tricks"</ParagraphSmall>
        </>
      )}
    </Wrapper>
  ) : (
    <LoggedOutView />
  );
};

export default Home;
