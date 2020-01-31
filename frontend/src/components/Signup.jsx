import React from 'react'

const Signup = ({ username, password, handleSignupSubmit }) => {

  return (
    <div>
      <form onSubmit={handleSignupSubmit}>
        username: <input {...username} />
        password: <input {...password} />
      <button type='submit'>Signup</button>
      </form>
    </div>
  )
}

export default Signup