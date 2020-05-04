import React from 'react';

import { getMessageTime } from 'utils/utils';
import classes from './Message.module.css';

const Message = ({ type, time, name, message }) => {
  return (
    <div
      className={[classes.MsgDiv, classes[type]].join(' ')}
      title={getMessageTime(+time)}
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
