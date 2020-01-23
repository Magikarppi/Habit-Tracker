import React, { useState, useEffect } from 'react';

import './App.css';
import { getAll, setToken } from './services/habits'
import { login } from './services/login'
import { signup } from './services/signup'
import Signup from './components/Signup'
import Login from './components/Login'

const App = () => {
  const [habitsToShow, setHabits] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const fetchHabits = async () => {
      const fetchedHabits = await getAll()
      console.log('fetchedHabits:', fetchHabits)
      setHabits(fetchedHabits)
    }
    fetchHabits()
  }, [setHabits])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSignupSubmit = async (e) => {
    console.log('handleSubmit runs')
    e.preventDefault()

    const signupData = {
      username,
      password
    }

    try {
      await signup(signupData)

      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLoginSubmit = async e => {
    e.preventDefault()

    const loginData = {
      username,
      password
    }

    try {
      const user = await login(loginData)

      console.log('user:', user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log(exception)
    }
  }

  return(
    <div>
      <h1>Habitzz brugh</h1>
      <Signup 
        username={username} 
        password={password} 
        handleUsernameChange={handleUsernameChange} 
        handlePasswordChange={handlePasswordChange}
        handleSignupSubmit={handleSignupSubmit}
      />
      <Login 
        username={username} 
        password={password} 
        handleUsernameChange={handleUsernameChange} 
        handlePasswordChange={handlePasswordChange}
        handleLoginSubmit={handleLoginSubmit}
      />
      <ul>
      {habitsToShow.map(habit => (
        <li>{habit.name}</li>
      ))}
      </ul>
    </div>
  )
}

export default App;
