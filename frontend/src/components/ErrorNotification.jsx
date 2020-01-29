import React from 'react'

const ErrorNotification = ({ errorMessage }) => {
  console.log('errormessage in Errornotification', errorMessage)
  if (!errorMessage) {
    return null
  }

  return (
    <div className='error'>
      {errorMessage}
    </div>
  )
}

export default ErrorNotification