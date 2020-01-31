import React from 'react'

const Login = ({ handleLoginSubmit, username, password }) => {

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        username: <input {...username} />
        password: <input {...password} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login