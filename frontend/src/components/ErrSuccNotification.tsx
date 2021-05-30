import React from 'react';
import styled from 'styled-components';
import { ErrorSuccessMsg } from '../types';

const SuccessMsgDiv = styled.div`
  width: 70%;
  height: 25px;
  margin: auto;
  color: #000000;
  background: #a1ff54;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  font-size: 4vw;
  @media (min-width: 767px) {
    font-size: 20px;
    width: 30%;
  }
`;

const ErrorMsgDiv = styled(SuccessMsgDiv)`
  background: #ff711f;
`;

const EmptyDiv = styled.div`
  width: 50%;
  height: 29px;
  margin: auto;
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
    return <EmptyDiv />;
  }
};

export default Notification;
