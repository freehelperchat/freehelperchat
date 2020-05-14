import React, { useEffect, useRef } from 'react';

import Message, {
  messageTypes,
} from 'components/chat/messages/message/Message';
import classes from './Messages.module.css';

export interface IMessage {
  _id: string;
  operator: boolean;
  time: number;
  message: string;
  name: string;
}

interface IProps {
  messages: IMessage[];
  user: boolean;
}

const Messages: React.FC<IProps> = ({ messages, user }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
