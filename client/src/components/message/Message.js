import React from 'react';

import classes from './Message.module.css';

const Message = props => {
  return (
    <div
      className={[
        classes.MsgDiv,
        classes[props.Operator ? 'Operator' : 'User'],
      ].join(' ')}
    >
      <p className={classes.Name}>{props.Name}</p>
      <p className={classes.Message}>{props.Message}</p>
    </div>
  );
};

export default Message;
