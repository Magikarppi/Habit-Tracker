import styled from 'styled-components';

import { HomeProps } from '../types';
import AddHabit from './AddHabit';
import Habit from './Habit';
import LoggedOutView from './LoggedOutView';

const HabitsDiv = styled.div`
  background: rgba(255, 255, 220, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  padding: 10px;
  margin: auto;
  margin-bottom: 5%;
  border-radius: 10px;
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
    font-size: 40px;
  }
`;

const ParagraphBig = styled(ParagraphSmall)`
  font-size: 30px;
  @media (min-width: 767px) {
    font-size: 60px;
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

const Home = ({
  loggedInUser,
  habitsToShow,
  handleHabitSubmit,
  handleCompletion,
  handleCancelCompletion,
  toggleHabitForm,
  showHabitForm,
}: HomeProps) => {
  return loggedInUser ? (
    <Wrapper>
      {showHabitForm || loggedInUser.habits.length === 0 ? (
        <div data-testid="habitForm-open-div">
          <AddHabit
            handleHabitSubmit={handleHabitSubmit}
            toggleHabitForm={toggleHabitForm}
          />
        </div>
      ) : (
        <NewHabitBtn
          data-cy="habit-form-open-btn"
          data-testid="habit-form-open-btn"
          onClick={toggleHabitForm}
        >
          Add a new habit
        </NewHabitBtn>
      )}
      {habitsToShow.length > 0 ? (
        <HabitsDiv data-testid="habit-div" data-cy="habit-div">
          {habitsToShow.map((habit) => (
            <Habit
              key={habit.id}
              habit={habit}
              handleCompletion={handleCompletion}
              handleCancelCompletion={handleCancelCompletion}
            />
          ))}
        </HabitsDiv>
      ) : (
        <>
          <ParagraphBig>Add your first habit in the form above</ParagraphBig>
          <ParagraphMed>Here are a few ideas if you need a spark:</ParagraphMed>
          <ParagraphSmall>"Physical exercise"</ParagraphSmall>
          <ParagraphSmall>"Reading"</ParagraphSmall>
          <ParagraphSmall>"Explore wikipedia"</ParagraphSmall>
          <ParagraphSmall>"Practice magic tricks"</ParagraphSmall>
        </>
      )}
    </Wrapper>
  ) : (
    <LoggedOutView />
  );
};

export default Home;
