import { useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import {
  useTrail,
  animated,
  useTransition,
  Trail,
  Transition,
} from 'react-spring';

import { HomeProps } from '../types';
import AddHabit from './AddHabit';
import Habit from './Habit';
import LoggedOutView from './LoggedOutView';

const HabitsList = styled.div`
  /* background: rgba(255, 255, 220, 0.8); */
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  width: 80%;
  /* width: 300px; */
  padding: 10px;
  /* margin: auto; */
  /* margin-bottom: 5%; */
  /* border-radius: 10px; */
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
  color: #fffc37;
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
  background: #f2f5b5;
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
    background: rgba(255, 255, 220, 0.8);
    border-radius: 10px;
    border: 2px solid black;
    overflow: hidden;
  }
`;

// const habitWrapperStyles: CSSProperties = {
//   width: '100%',
//   height: '150px',
//   display: 'flex',
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   background: 'rgba(255, 255, 220, 0.8)',
//   borderRadius: '10px',
//   border: '2px solid black',
//   overflow: 'hidden',
// };

const formWrapperStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '150px',
};

// const habitWrapperStyles = {
//   width: '100%',
//   height: '80%',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   background: 'rgba(255, 255, 220, 0.8)',
//   borderRadius: '10px',
//   border: '2px solid black',
// };

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
  const [animationFinished, setAnimationFinished] = useState<boolean>(false);
  // const trail = useTrail(habitsToShow.length, {
  //   from: {
  //     marginTop: -100,
  //     opacity: 0,
  //     transform: 'translate3d(-50px,-20px,0)',
  //   },
  //   to: {
  //     marginTop: 0,
  //     opacity: 1,
  //     transform: 'translate3d(0,0px,0)',
  //   },
  // });

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
    onRest: () => setAnimationFinished(true),
    config: {},
  });

  const formTransition = useTransition(showHabitForm, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    // leave: {
    //   opacity: 0,
    // },
    // reverse: showHabitForm,
    // delay: 100,
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
              Add a new habit
            </NewHabitBtn>
          </div>
        )
      )}
      {habitsToShow.length > 0 ? (
        <HabitsList data-testid="habit-div" data-cy="habit-div">
          {habitTransitions((props, item, state, index) => {
            console.log('Tstate', state);
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
                  animationFinished={animationFinished}
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
