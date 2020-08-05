import React from 'react';

import { getMessageTime, getColorByText } from 'utils/utils';
import { MsgContainer, MessageDiv, Name } from './styles';

interface IProps {
  type: string;
  time: number;
  name: string;
  message: string;
}

const Message: React.FC<IProps> = ({ type, time, name, message }) => {
  return (
    <MsgContainer
      backgroundColor={getColorByText(name)}
      messageType={type}
      title={getMessageTime(time)}
    >
      <Name>{name}</Name>
      <MessageDiv>{message}</MessageDiv>
    </MsgContainer>
  );
};

export default Message;
