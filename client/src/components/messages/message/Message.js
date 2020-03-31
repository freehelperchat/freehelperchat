import React from 'react';

import classes from './Message.module.css';

const Message = ({ operator, name, message }) => {
  return (
    <div
      className={[classes.MsgDiv, classes[operator ? 'Operator' : 'User']].join(
        ' '
      )}
    >
      <p className={classes.Name}>{name}</p>
      <div className={classes.Message}>{message}</div>
    </div>
  );
};

export default Message;
