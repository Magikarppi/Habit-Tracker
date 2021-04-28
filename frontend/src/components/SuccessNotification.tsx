import React from 'react';
import styled from 'styled-components';
import { ErrorSuccessMsg } from '../types';

const MsgDiv = styled.div`
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

const SuccessNotification = ({
  successMessage,
}: {
  successMessage: ErrorSuccessMsg;
}) => {
  return successMessage ? <MsgDiv>{successMessage}</MsgDiv> : null;
};

export default SuccessNotification;
