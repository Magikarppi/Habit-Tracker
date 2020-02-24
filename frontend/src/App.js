import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  withRouter,
  useHistory
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import './App.css';
import { getAll, setToken, create, remove, update } from './services/habits';
import { login } from './services/login';
import { signup } from './services/signup';
import { getQuote } from './services/quote';
import { getUsers } from './services/users';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import ErrorNotification from './components/ErrorNotification';
import SuccessNotification from './components/SuccessNotification';
import AddHabit from './components/AddHabit';
import Habit from './components/Habit';
import HabitMoreInfo from './components/HabitMoreInfo';
import Toggleable from './components/Toggleable';
import Img1 from './images/caucasian-man-lifting.jpg';
import Img2 from './images/man_learning_guitar.jpg';
import Img3 from './images/man_reading.jpg';
import Img4 from './images/walking_outside_small.jpg';
import Img5 from './images/woman-eating-healthy-vegetarian-dinner.jpg';
import Img6 from './images/woman_meditating.jpg';
import { useField } from './hooks/hooks';



const App = () => {
  // const [allHabits, setAllHabits] = useState([]);
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

  const images = [Img1, Img2, Img3, Img4, Img5, Img6]

//   const GlobalStyle = createGlobalStyle`
//   body {
//     min-height: 100%;
//     color: #e6e6eb;
//     font-family: sans-serif;
//   }
// `

  const fetchQuote = async () => {
    try {
      const response = await getQuote();
      const fetchedQuote = response.contents.quotes[0].quote;
      const quoteAuthor = response.contents.quotes[0].author;
      console.log('fetchedQuote', fetchedQuote);
      setQuote(fetchedQuote);
      setQuoteAuthor(quoteAuthor);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchHabits = async () => {
  //   try {
  //     const fetchedHabits = await getAll();
  //     setAllHabits(fetchedHabits);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
    fetchQuote();
  }, []);

  useEffect(() => {
    const rNum = Math.floor(Math.random() * 5);
    console.log('rNum', rNum)
    document.body.background = images[rNum]
    // return () => {
    //   cleanup
    // };
  }, [])

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

  const handleSignupSubmit = async (e) => {
    console.log('handleSubmit runs');
    e.preventDefault();

    const signupData = {
      username: username.value,
      password: password.value
    };

    try {
      const response = await signup(signupData);
      console.log('response in handleSignup', response)
      if (response.error) {
        if (response.error.includes('User validation failed: username: Error, expected `username` to be unique.')) {
          setErrorMessage('Username is already taken. Please choose another username.')
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
          return;
        }
        return;
      }

      if (response.username) {
        setRedirect('/');
        setRedirect(null);
        setSuccessMessage('A new user created! Please log in!')
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
      password: password.value
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
        username.reset();
        password.reset();
        setRedirect('/');
        setRedirect(null);
        console.log('REDIRECT:', redirect);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    console.log('Logout runs');
    window.localStorage.clear();
    setLoggedInUser(null);
    setHabitsToShow([]); // ????????
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
        console.log(exception);
      }
      console.log('responseData in handle habit submit', responseData);
      if (responseData) {
        setHabitsToShow([...habitsToShow, responseData]);
        loggedInUser.habits = loggedInUser.habits.concat(responseData);
        console.log('loggedinUser ', loggedInUser);
        // fetchHabits();
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

  const handleRemove = async (habit) => {
    console.log('habit in remove', habit);
    if (window.confirm(`Do you want to delete habit: ${habit.name}?`)) {
      try {
        await remove(habit);
        console.log('removing worked?:::::::::::::::::');
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
      thisYear
    };

    const updateHabit = {
      ...habit,
      completions: habit.completions.concat(todayObj)
    };

    console.log('UpdateHabit', updateHabit);

    try {
      const responseData = await update(updateHabit);
      console.log('responseData in handleCompletion', responseData);
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
  // const habitById = (id) => allHabits.find((habit) => habit.id === id);

  console.log('REDIRECT', redirect);

  // remove ul?

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

  // return (
  //   <div>
  //     <ErrorNotification errorMessage={errorMessage} />
  //     <SuccessNotification successMessage={successMessage} />
  //     <Router>
  //       <div>
  //         <div>
  //           <Link to="/">Home</Link>

  //           {loggedInUser ? (
  //             <>
  //             <em>{loggedInUser.username} logged in</em>
  //             <button onClick={handleLogout}>Log out</button>
  //             </>
  //           ) : (
  //             <div>
  //               <div>
  //                 <Link to="/login">Login</Link>
  //               </div>
  //               <div>
  //                 <Link to="/signup">Sign up</Link>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //         <Route
  //           exact
  //           path="/"
  //           render={() => (
  //             <div>
  //               <h1>Habitzz brugh</h1>
  //               {showHabitForm ? (
  //                 <div>
  //                   <AddHabit
  //                     handleHabitSubmit={handleHabitSubmit}
  //                     habitName={removeReset(habitName)}
  //                   />
  //                   <button onClick={toggleHabitForm}>cancel</button>
  //                 </div>
  //               ) : (
  //                 <button onClick={toggleHabitForm}>Add a new habit</button>
  //               )}
  //               <ul>
  //                 {habitsToShow.map((habit) => (
  //                   <Habit key={habit.id} habit={habit} handleCompletion={handleCompletion} />
  //                 ))}
  //               </ul>
  //             </div>
  //           )}
  //         />
  //         <Route
  //           exact
  //           path="/signup"
  //           render={() => (
  //             <Signup
  //               username={removeReset(username)}
  //               password={removeReset(password)}
  //               handleSignupSubmit={handleSignupSubmit}
  //             />
  //           )}
  //         />
  //         <Route
  //           exact
  //           path="/login"
  //           render={() =>
  //             redirect ? (
  //               <Redirect to={redirect} />
  //             ) : (
  //               <Login
  //                 username={removeReset(username)}
  //                 password={removeReset(password)}
  //                 handleLoginSubmit={handleLoginSubmit}
  //               />
  //             )
  //           }
  //         />
  //         <Route
  //           path="/habits/:id"
  //           render={({ match }) =>
  //             redirect ? (
  //               <Redirect to={redirect} />
  //             ) : (
  //             <HabitMoreInfo
  //               habit={habitById(match.params.id)}
  //               handleRemove={handleRemove}
  //             />
  //           )}
  //         />
  //       </div>
  //     </Router>
  //   </div>
  // );
};

export default App;
