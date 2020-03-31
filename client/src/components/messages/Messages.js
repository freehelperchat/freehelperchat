import React, { useEffect, useRef } from 'react';

import classes from './Messages.module.css';
import Message from './message/Message';

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className={classes.MessagesContainer}>
      {messages.map(m => (
        <Message
          key={m._id}
          operator={m.operator}
          message={m.message}
          name={m.name}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
