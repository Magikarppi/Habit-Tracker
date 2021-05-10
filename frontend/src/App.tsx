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
  HabitNameField,
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
    const loggedUserJSON = window.localStorage.getItem('loggedHabitAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedInUser(user);
      setHabitsToShow(user.habits);
      setToken(user.token);
    }
  }, []);

  const handleSignUpSubmit = async (values: LoginSignUpInputValues) => {
    const { username, password } = values;
    const signupData = {
      username,
      password,
    };

    if (signupData.password.length < 5) {
      setErrorMessage('Password must be at least five (5) characters long');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    try {
      const response = await signup(signupData);
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
        setRedirect(null);
        setSuccessMessage('A new user created! Please log in!');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (exception) {
      console.log('exception', exception);
    }
  };

  const handleLoginSubmit = async (values: LoginSignUpInputValues) => {
    const { username, password } = values;
    const loginData = {
      username,
      password,
    };
    try {
      const responseData = await login(loginData);

      if (responseData.error) {
        if (
          responseData.error.toUpperCase() === 'INVALID USERNAME OR PASSWORD'
        ) {
          setErrorMessage('Wrong username or password');
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        }
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
        setRedirect(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setLoggedInUser(null);
    setHabitsToShow([]);
    setRedirect('/');
    setRedirect(null);
  };

  const handleHabitSubmit = async (values: HabitInputValue) => {
    const { habitName } = values;
    try {
      const newHabit = {
        name: habitName,
      };

      const responseData = await create(newHabit);

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
        setHabitsToShow([...habitsToShow, responseData]);
        loggedInUser.habits = loggedInUser.habits.concat(responseData);
        setShowHabitForm(false);
        window.localStorage.setItem(
          'loggedHabitAppUser',
          JSON.stringify(loggedInUser)
        );
      }
    } catch (exception) {
      console.log(exception);
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
          loggedInUser.habits = loggedInUser.habits.filter(
            (e) => e.id !== habit.id
          );
          window.localStorage.setItem(
            'loggedHabitAppUser',
            JSON.stringify(loggedInUser)
          );
          setSuccessMessage('Habit deleted');
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
          setRedirect('/');
          setRedirect(null);
        }
      } catch (exception) {
        console.log(exception);
        setErrorMessage('Habit deletion failed');
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
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

    try {
      const responseData = await update(updateHabit);
      setHabitsToShow(
        habitsToShow.map((e) => (e.id === responseData.id ? responseData : e))
      );
      loggedInUser.habits = loggedInUser.habits.map((e) =>
        e.id === responseData.id ? responseData : e
      );
      window.localStorage.setItem(
        'loggedHabitAppUser',
        JSON.stringify(loggedInUser)
      );
      setSuccessMessage('Completion added!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.log(error);
      setErrorMessage('Adding completion failed.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleCancelCompletion = async (habit: HabitType) => {
    if (!loggedInUser) {
      return setErrorMessage('User not logged in');
    }

    habit.completions.splice(habit.completions.length - 1, 1);

    const updateHabit = {
      ...habit,
    };

    try {
      const responseData = await update(updateHabit);
      setHabitsToShow(
        habitsToShow.map((e) => (e.id === responseData.id ? responseData : e))
      );
      loggedInUser.habits = loggedInUser.habits.map((e) =>
        e.id === responseData.id ? responseData : e
      );
      window.localStorage.setItem(
        'loggedHabitAppUser',
        JSON.stringify(loggedInUser)
      );
      setSuccessMessage('Completion cancelled!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.log(error);
      setErrorMessage('Adding completion failed.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const habitById = (id: string) =>
    habitsToShow.find((habit) => habit.id === id);

  return (
    <div>
      <GlobalStyle />
      <ErrSuccNotification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
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
                <Home
                  habitsToShow={habitsToShow}
                  handleCompletion={handleCompletion}
                  handleCancelCompletion={handleCancelCompletion}
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
                  <HabitMoreInfo
                    habit={habitById(match.params.id)}
                    handleRemove={handleRemove}
                  />
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
