import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './App.css';
import { setToken, create, remove, update } from './services/habits';
import { login } from './services/login';
import { signup } from './services/signup';
import { getQuote } from './services/quote';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import ErrorNotification from './components/ErrorNotification';
import SuccessNotification from './components/SuccessNotification';
import HabitMoreInfo from './components/HabitMoreInfo';
import Img1 from './images/caucasian-man-lifting.jpg';
import Img2 from './images/man_learning_guitar.jpg';
import Img3 from './images/young-man_reading.png';
import Img4 from './images/walking_outside_small.jpg';
import Img5 from './images/woman-eating-healthy-vegetarian-dinner.jpg';
import Img6 from './images/woman_meditating.jpg';
import { useField } from './hooks/hooks';

const App = () => {
  const [quote, setQuote] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [habitsToShow, setHabitsToShow] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirect, setRedirect] = useState(null);

  const habitName = useField('text');
  const username = useField('text');
  const password = useField('password');

  const fetchQuote = async () => {
    try {
      const response = await getQuote();
      const fetchedQuote = response.contents.quotes[0].quote;
      const quoteAuthor = response.contents.quotes[0].author;
      setQuote(fetchedQuote);
      setQuoteAuthor(quoteAuthor);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    if (window.screen.width > 767) {
      const images = [Img1, Img2, Img3, Img4, Img5, Img6];
      const rNum = Math.floor(Math.random() * 5);
      document.body.background = images[rNum];
    }
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedHabitAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedInUser(user);
      setHabitsToShow(user.habits);
      setToken(user.token);
    }
  }, []);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const signupData = {
      username: username.value,
      password: password.value,
    };

    if (signupData.password.length < 5) {
      setErrorMessage('Password must be at least five (5) characters long');
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
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
          }, 4000);
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
          }, 4000);
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
        }, 4000);
        username.reset();
        password.reset();
      }
    } catch (exception) {
      console.log('exception', exception);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username.value,
      password: password.value,
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
          }, 4000);
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
        username.reset();
        password.reset();
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
  };

  const handleHabitSubmit = async (e) => {
    e.preventDefault();

    try {
      const newHabit = {
        name: habitName.value,
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
          }, 4000);
          return;
        }
        return;
      }

      if (responseData.name) {
        setHabitsToShow([...habitsToShow, responseData]);
        loggedInUser.habits = loggedInUser.habits.concat(responseData);
        habitName.reset();
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

  const handleRemove = async (habit) => {
    if (window.confirm(`Do you want to delete habit: ${habit.name}?`)) {
      try {
        await remove(habit);
        setHabitsToShow(habitsToShow.filter((e) => e.id !== habit.id));
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
        }, 4000);
        setRedirect('/');
        setRedirect(null);
      } catch (exception) {
        console.log(exception);
        setErrorMessage('Habit deletion failed');
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      }
    }
  };

  const handleCompletion = async (habit) => {
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
      }, 4000);
    } catch (error) {
      console.log(error);
      setErrorMessage('Adding completion failed.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const toggleHabitForm = () => {
    setShowHabitForm(!showHabitForm);
  };

  const removeReset = (obj) => {
    const { reset, ...rest } = obj;
    return rest;
  };

  const habitById = (id) => habitsToShow.find((habit) => habit.id === id);

  return (
    <div>
      <ErrorNotification errorMessage={errorMessage} />
      <SuccessNotification successMessage={successMessage} />
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                quote={quote}
                quoteAuthor={quoteAuthor}
                habitsToShow={habitsToShow}
                habitName={removeReset(habitName)}
                showHabitForm={showHabitForm}
                toggleHabitForm={toggleHabitForm}
                handleCompletion={handleCompletion}
                handleLogout={handleLogout}
                loggedInUser={loggedInUser}
                handleHabitSubmit={handleHabitSubmit}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() =>
              redirect ? (
                <Redirect to={redirect} />
              ) : (
                <Signup
                  username={removeReset(username)}
                  password={removeReset(password)}
                  handleSignupSubmit={handleSignupSubmit}
                />
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
                <Login
                  username={removeReset(username)}
                  password={removeReset(password)}
                  handleLoginSubmit={handleLoginSubmit}
                />
              )
            }
          />
          <Route
            path="/habits/:id"
            render={({ match }) =>
              redirect ? (
                <Redirect to={redirect} />
              ) : (
                <HabitMoreInfo
                  habit={habitById(match.params.id)}
                  handleRemove={handleRemove}
                />
              )
            }
          />
        </div>
      </Router>
    </div>
  );
};

export default App;
