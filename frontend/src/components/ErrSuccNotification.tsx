import React from 'react';
import styled from 'styled-components';
import { ErrorSuccessMsg } from '../types';

const SuccessMsgDiv = styled.div`
  width: 50%;
  margin: auto;
  color: #000000;
  background: #a1ff54;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ErrorMsgDiv = styled.div`
  width: 50%;
  margin: auto;
  color: #000000;
  background: #ff711f;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Notification = ({
  successMessage,
  errorMessage,
}: {
  successMessage: ErrorSuccessMsg;
  errorMessage: ErrorSuccessMsg;
}) => {
  if (successMessage && !errorMessage) {
    return <SuccessMsgDiv>{successMessage}</SuccessMsgDiv>;
  } else if (errorMessage && !successMessage) {
    return <ErrorMsgDiv>{errorMessage}</ErrorMsgDiv>;
  } else {
    return null;
  }
};

export default Notification;
