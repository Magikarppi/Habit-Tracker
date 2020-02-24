import React from 'react'
import styled from 'styled-components';

const MsgDiv = styled.div`
    width: 50%;
    margin: auto;
    color: #000000;
    background: #ff711f;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
`

const ErrorNotification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <MsgDiv>
      {errorMessage}
    </MsgDiv>
  )
}

export default ErrorNotification