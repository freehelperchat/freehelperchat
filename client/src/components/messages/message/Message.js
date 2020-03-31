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
      <p className={classes.Message}>{message}</p>
    </div>
  );
};

export default Message;
