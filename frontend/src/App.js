import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';

import './App.css';
import { getAll, setToken, create } from './services/habits';
import { login } from './services/login';
import { signup } from './services/signup';
import { getUsers } from './services/users';
import Signup from './components/Signup';
import Login from './components/Login';
import ErrorNotification from './components/ErrorNotification';
import AddHabit from './components/AddHabit';
import Habit from './components/Habit';
import Toggleable from './components/Toggleable';
import { useField } from './hooks/hooks';

const App = () => {
  const [allHabits, setAllHabits] = useState([])
  const [habitsToShow, setHabitsToShow] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [habitName, setHabitName] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const habitName = useField('text');
  
  const fetchHabits = async () => {
    try {
      const fetchedHabits = await getAll();
      setAllHabits(fetchedHabits);  
    } catch (error) {
      console.log(error)
    }
  };

  // const fetchUsers = async () => {
  //   try {
  //     const fetchedUsers = await getUsers();
  //     console.log('fetchedUsers', fetchedUsers)
  //     return fetchedUsers
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    fetchHabits();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedHabitAppUser');
    if (loggedUserJSON) {
      // const fetchedUsers = fetchUsers();
        const user = JSON.parse(loggedUserJSON);
        // const user = fetchedUsers.find(user => user.id === userParsed.id)
        setLoggedInUser(user);
        setHabitsToShow(user.habits);
        setToken(user.token);
    }
  }, []);

  console.log('LoggedInUser:', loggedInUser);
  console.log('habitsToShow:', habitsToShow);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupSubmit = async (e) => {
    console.log('handleSubmit runs');
    e.preventDefault();

    const signupData = {
      username,
      password
    };

    try {
      await signup(signupData);
    } catch (exception) {
      console.log(exception);
    }

    setUsername('');
    setPassword('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password
    };
    try {
      let responseData = null;
      try {
        responseData = await login(loginData);

        console.log('responseData:', responseData);
        console.log('responseData.username:', responseData.username);
        console.log(typeof responseData.username);
      } catch (exception) {
        console.log('first catch runs');
        console.log(exception);
      }

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
        console.log('setting localstorage item');
        window.localStorage.setItem(
          'loggedHabitAppUser',
          JSON.stringify(responseData)
        );
        setToken(responseData.token);
        setLoggedInUser(responseData);
        setHabitsToShow(responseData.habits);
      }
    } catch (error) {
      console.log(error);
    }

    setUsername('');
    setPassword('');
  };

  const handleHabitSubmit = async (e) => {
    e.preventDefault();

    let responseData = null;
    try {
      try {
        const newHabit = {
          name: habitName.value
        };

        responseData = await create(newHabit);
      } catch (exception) {
        console.log(exception)
      }
      console.log('responseData in handle habit submit', responseData);
      if (responseData) {

        setHabitsToShow([...habitsToShow, responseData]);
        loggedInUser.habits = loggedInUser.habits.concat(responseData)
        console.log('loggedinUser ', loggedInUser)
        fetchHabits()
        console.log('habitsToShow', habitsToShow);
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

  const toggleHabitForm = () => {
    setShowHabitForm(!showHabitForm);
  };

  const removeReset = (obj) => {
    const { reset, ...rest } = obj;
    return rest;
  };

  const habitById = id =>  allHabits.find(habit => habit.id === id)

  return (
    <div>
      <ErrorNotification errorMessage={errorMessage} />
      <Router>
        <div>
          <div>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Login</Link>
          </div>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <h1>Habitzz brugh</h1>
                {showHabitForm ? (
                  <div>
                    <AddHabit
                      handleHabitSubmit={handleHabitSubmit}
                      habitName={removeReset(habitName)}
                    />
                    <button onClick={toggleHabitForm}>cancel</button>
                  </div>
                ) : (
                  <button onClick={toggleHabitForm}>Add a new habit</button>
                )}
                <ul>
                  {habitsToShow.map((habit) => (
                    <li key={habit.id}>
                      <Link to={`/habits/${habit.id}`}>{habit.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <Signup
                username={username}
                password={password}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
                handleSignupSubmit={handleSignupSubmit}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <Login
                username={username}
                password={password}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
                handleLoginSubmit={handleLoginSubmit}
              />
            )}
          />
          <Route path="/habits/:id" render={({ match }) => <Habit habit={habitById(match.params.id)} />} />
        </div>
      </Router>
    </div>
  );
};

export default App;
