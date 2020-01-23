import React from 'react'

const Login = ({ handleLoginSubmit, username, password, handleUsernameChange, handlePasswordChange }) => {

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        username: <input type='text' value={username} onChange={(e) => handleUsernameChange(e)} />
        password: <input type='text' value={password} onChange={(e) => handlePasswordChange(e)} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login