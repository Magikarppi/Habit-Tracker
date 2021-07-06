import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.css';
import { setToken, create, remove, update } from './services/habits';
import { login } from './services/login';
import { signup } from './services/signup';
import Home from './components/Home';
import HabitMoreInfo from './components/HabitMoreInfo';
import {
  ErrorSuccessMsg,
  HabitInputValue,
  HabitsToShow,
  HabitType,
  LoggedInUser,
  LoginSignUpInputValues,
} from './types';
import GlobalStyle from './globalStyle';
import LoginSignUp from './components/LoginSignUp';
import ErrSuccNotification from './components/ErrSuccNotification';
import Header from './components/Header';

const App = () => {
  const [habitsToShow, setHabitsToShow] = useState<HabitsToShow>([]);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<ErrorSuccessMsg>('');
  const [successMessage, setSuccessMessage] = useState<ErrorSuccessMsg>('');
  const [redirect, setRedirect] = useState<string | null>(null);
  const [showHabitForm, setShowHabitForm] = useState(false);

  useEffect(() => {
    if (!loggedInUser) {
      const loggedUserJSON = window.localStorage.getItem('loggedHabitAppUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setLoggedInUser(user);
        setHabitsToShow(user.habits);
        setToken(user.token);
      }
    }
  }, []);

  useEffect(() => {
    if (loggedInUser && loggedInUser.habits.length < 1) {
      setShowHabitForm(true);
    }
  }, [loggedInUser]);

  const handleSignUpSubmit = async (
    values: LoginSignUpInputValues,
    setSubmitting: (value: boolean) => void
  ) => {
    const { username, password } = values;
    const signupData = {
      username,
      password,
    };

    if (signupData.password.length < 5) {
      setSubmitting(false);
      setErrorMessage('Password must be at least five (5) characters long');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    try {
      const response = await signup(signupData);
      setSubmitting(false);
      if (response.error) {
        if (
          response.error.includes(
            'User validation failed: username: Error, expected `username` to be unique.'
          )
        ) {
          setErrorMessage(
            'Username is already taken. Please choose another username.'
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          return;
        }

        if (
          response.error.includes(
            'is shorter than the minimum allowed length'
          ) &&
          response.error.includes('username')
        ) {
          setErrorMessage(
            'Username must be at least three (3) characters long'
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          return;
        }

        return;
      }

      if (response.username) {
        setRedirect('/login');
        resetRedirect();
        setSuccessMessage('A new user created! Please log in!');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
        return;
      }
    } catch (exception) {
      console.log('exception', exception);
      setErrorMessage('Something went wrong.. Please try again');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
  };

  const handleLoginSubmit = async (
    values: LoginSignUpInputValues,
    setSubmitting: (value: boolean) => void
  ) => {
    const { username, password } = values;
    const loginData = {
      username,
      password,
    };

    try {
      const responseData = await login(loginData);
      setSubmitting(false);
      if (responseData.error) {
        if (
          responseData.error.toUpperCase() === 'INVALID USERNAME OR PASSWORD'
        ) {
          setErrorMessage('Wrong username or password');
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          return;
        }
        return;
      }

      if (responseData.username) {
        window.localStorage.setItem(
          'loggedHabitAppUser',
          JSON.stringify(responseData)
        );
        setToken(responseData.token);
        setLoggedInUser(responseData);
        setHabitsToShow(responseData.habits);
        setRedirect('/');
        resetRedirect();
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleLogout = () => {
    setRedirect('/');
    window.localStorage.clear();
    setLoggedInUser(null);
    setHabitsToShow([]);
    resetRedirect();
  };

  const handleHabitSubmit = async (
    values: HabitInputValue,
    setSubmitting: (value: boolean) => void
  ) => {
    const { habitName } = values;
    try {
      const newHabit = {
        name: habitName,
      };

      const responseData = await create(newHabit);
      setSubmitting(false);

      if (responseData.error) {
        if (
          responseData.error.includes(
            'is shorter than the minimum allowed length'
          )
        ) {
          setErrorMessage(
            'Minimum length for a habit name is two (2) characters.'
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          return;
        }
        return;
      }

      if (responseData.name && loggedInUser) {
        setShowHabitForm(false);
        setHabitsToShow([...habitsToShow, responseData]);
        const usersNewHabits = loggedInUser.habits.concat(responseData);
        const updatedLoggedInUser = { ...loggedInUser, habits: usersNewHabits };
        setLoggedInUser(updatedLoggedInUser);
        window.localStorage.setItem(
          'loggedHabitAppUser',
          JSON.stringify(updatedLoggedInUser)
        );
        return;
      }
    } catch (exception) {
      console.log(exception);
      return;
    }
  };

  const toggleHabitForm = () => {
    setShowHabitForm(!showHabitForm);
  };

  const handleRemove = async (habit: HabitType) => {
    if (window.confirm(`Do you want to delete habit: ${habit.name}?`)) {
      try {
        await remove(habit);
        setHabitsToShow(habitsToShow.filter((e) => e.id !== habit.id));
        if (loggedInUser) {
          const usersNewHabits = loggedInUser.habits.filter(
            (e) => e.id !== habit.id
          );
          const updatedLoggedInUser = {
            ...loggedInUser,
            habits: usersNewHabits,
          };
          setLoggedInUser(updatedLoggedInUser);
          window.localStorage.setItem(
            'loggedHabitAppUser',
            JSON.stringify(updatedLoggedInUser)
          );
          setSuccessMessage('Habit deleted');
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
          return;
        }
      } catch (exception) {
        console.log(exception);
        setErrorMessage('Habit deletion failed');
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        return;
      }
    }
  };

  const handleCompletion = async (habit: HabitType) => {
    if (!loggedInUser) {
      return setErrorMessage('User not logged in');
    }
    const date = new Date();
    const thisDay = date.getDate();
    const thisMonth = date.getMonth();
    const thisYear = date.getFullYear();

    const todayObj = {
      thisDay,
      thisMonth,
      thisYear,
    };

    const updateHabit = {
      ...habit,
      completions: habit.completions.concat(todayObj),
    };

    const indexOfHabit = habitsToShow.map((e) => e.id).indexOf(habit.id);

    try {
      const responseData = await update(updateHabit);

      const habitsCopy = [...habitsToShow];

      setHabitsToShow(
        habitsCopy.map((habit, i) =>
          i === indexOfHabit
            ? { ...habit, completions: [...habit.completions, todayObj] }
            : habit
        )
      );

      const usersNewHabits = loggedInUser.habits.map((e) =>
        e.id === responseData.id ? responseData : e
      );

      const updatedLoggedInUser = {
        ...loggedInUser,
        habits: usersNewHabits,
      };
      setLoggedInUser(updatedLoggedInUser);
      window.localStorage.setItem(
        'loggedHabitAppUser',
        JSON.stringify(updatedLoggedInUser)
      );
      setSuccessMessage('Completion added!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return;
    } catch (error) {
      console.log(error);
      setErrorMessage('Adding completion failed.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
  };

  const handleCancelCompletion = async (habit: HabitType) => {
    if (!loggedInUser) {
      return setErrorMessage('User not logged in');
    }

    try {
      const completionsCopy = [...habit.completions];
      completionsCopy.splice(completionsCopy.length - 1, 1);

      const updateHabit = {
        ...habit,
        completions: completionsCopy,
      };
      const responseData = await update(updateHabit);

      const updatedHabits = habitsToShow.map((e) =>
        e.id === responseData.id ? responseData : e
      );

      setHabitsToShow(updatedHabits);

      const updatedLoggedInUser = {
        ...loggedInUser,
        habits: updatedHabits,
      };

      setLoggedInUser(updatedLoggedInUser);
      window.localStorage.setItem(
        'loggedHabitAppUser',
        JSON.stringify(updatedLoggedInUser)
      );
      setSuccessMessage('Completion cancelled!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return;
    } catch (error) {
      console.log(error);
      setErrorMessage('Adding completion failed.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
  };

  const habitById = (id: string) =>
    habitsToShow.find((habit) => habit.id === id);

  const resetRedirect = () => {
    setRedirect(null);
  };

  return (
    <div>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Header
                  loggedInUser={loggedInUser}
                  handleLogout={handleLogout}
                />
                <ErrSuccNotification
                  errorMessage={errorMessage}
                  successMessage={successMessage}
                />
                <Home
                  habitsToShow={habitsToShow}
                  handleCompletion={handleCompletion}
                  handleCancelCompletion={handleCancelCompletion}
                  handleRemove={handleRemove}
                  toggleHabitForm={toggleHabitForm}
                  showHabitForm={showHabitForm}
                  loggedInUser={loggedInUser}
                  handleHabitSubmit={handleHabitSubmit}
                />
              </>
            )}
          />
          <Route
            exact
            path="/signup"
            render={() =>
              redirect ? (
                <Redirect to={redirect} />
              ) : (
                <>
                  <Header
                    loggedInUser={loggedInUser}
                    handleLogout={handleLogout}
                  />
                  <ErrSuccNotification
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                  />
                  <LoginSignUp
                    handleLoginSubmit={handleLoginSubmit}
                    handleSignUpSubmit={handleSignUpSubmit}
                  />
                </>
              )
            }
          />
          <Route
            exact
            path="/login"
            render={() =>
              redirect ? (
                <Redirect to={redirect} />
              ) : (
                <>
                  <Header
                    loggedInUser={loggedInUser}
                    handleLogout={handleLogout}
                  />
                  <ErrSuccNotification
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                  />
                  <LoginSignUp
                    handleLoginSubmit={handleLoginSubmit}
                    handleSignUpSubmit={handleSignUpSubmit}
                  />
                </>
              )
            }
          />
          <Route
            path="/habits/:id"
            render={({ match }) =>
              redirect ? (
                <Redirect to={redirect} />
              ) : (
                <>
                  <Header
                    loggedInUser={loggedInUser}
                    handleLogout={handleLogout}
                  />
                  <ErrSuccNotification
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                  />
                  <HabitMoreInfo habit={habitById(match.params.id)} />
                </>
              )
            }
          />
          <Route render={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
