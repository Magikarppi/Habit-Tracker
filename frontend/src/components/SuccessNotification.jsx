import React from 'react'

const SuccessNotification = ({ successMessage }) => {
  return successMessage ? (
    <div>{successMessage}</div>
  ) : null
}

export default SuccessNotification