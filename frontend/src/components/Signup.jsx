import React, { useState } from 'react'
import signupService from '../services/signup'

const Signup = ({ username, password, handlePasswordChange, handleUsernameChange, handleSignupSubmit }) => {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  // const handleUsernameChange = (e) => {
  //   setUsername(e.target.value)
  // }

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value)
  // }

  // const handleSubmit = async (e) => {
  //   console.log('handleSubmit runs')
  //   e.preventDefault()

  //   const signupData = {
  //     username,
  //     password
  //   }

  //   try {
  //     await signupService.signup(signupData)

  //     setUsername('')
  //     setPassword('')
  //   } catch (exception) {
  //     console.log(exception)
  //   }
  // }

  return (
    <div>
      <form onSubmit={handleSignupSubmit}>
        username: <input type='text' value={username} onChange={(e) => handleUsernameChange(e)} />
        password: <input type='text' value={password} onChange={(e) => handlePasswordChange(e)} />
      <button type='submit'>Signup</button>
      </form>
    </div>
  )
}

export default Signup