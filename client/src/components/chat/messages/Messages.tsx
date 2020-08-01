import React, { useEffect, useRef } from 'react';

import Message, {
  messageTypes,
} from 'components/chat/messages/message/Message';
import { IMessage } from 'interfaces';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import classes from './Messages.module.css';

interface IProps {
  messages: IMessage[];
  user: boolean;
  loading?: boolean;
}

const Messages: React.FC<IProps> = ({ messages, user, loading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className={classes.MessagesContainer}>
      {loading && (
        <SkeletonTheme color="#ddd" highlightColor="#e7e7e7">
          <div className={[classes.Loading, classes.Right].join(' ')}>
            <Skeleton width="30%" />
          </div>
          <div className={[classes.Loading, classes.Left].join(' ')}>
            <Skeleton width="40%" />
          </div>
          <div className={[classes.Loading, classes.Left].join(' ')}>
            <Skeleton width="60%" height={88} />
          </div>
          <div className={[classes.Loading, classes.Right].join(' ')}>
            <Skeleton width="40%" />
          </div>
        </SkeletonTheme>
      )}
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
