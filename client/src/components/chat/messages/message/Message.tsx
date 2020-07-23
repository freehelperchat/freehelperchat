import React from 'react';

import { getMessageTime, getColorByText } from 'utils/utils';
import classes from './Message.module.css';

interface IProps {
  type: string;
  time: number;
  name: string;
  message: string;
}

const Message: React.FC<IProps> = ({ type, time, name, message }) => {
  return (
    <div
      className={[classes.MsgDiv, classes[type]].join(' ')}
      style={{ background: getColorByText(name) }}
      title={getMessageTime(time)}
    >
      <p className={classes.Name}>{name}</p>
      <div className={classes.Message}>{message}</div>
    </div>
  );
};

export default Message;

export const messageTypes = {
  OUTGOING_MESSAGE: 'OutgoingMessage',
  INCOMING_MESSAGE: 'IncomingMessage',
};
