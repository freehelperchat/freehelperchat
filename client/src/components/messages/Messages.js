import React, { useEffect, useRef } from 'react';

import classes from './Messages.module.css';
import Message, { messageTypes } from './message/Message';

const Messages = ({ messages, user }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className={classes.MessagesContainer}>
      {messages.map(m => {
        let type;
        if (user) {
          type = m.operator
            ? messageTypes.INCOMING_MESSAGE
            : messageTypes.OUTGOING_MESSAGE;
        } else {
          type = !m.operator
            ? messageTypes.INCOMING_MESSAGE
            : messageTypes.OUTGOING_MESSAGE;
        }
        return (
          <Message
            key={m._id}
            type={type}
            time={m.time}
            message={m.message}
            name={m.name}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
