import React, { useEffect, useRef } from 'react';

import Message from 'components/chat/messages/message/Message';
import { messageTypes } from 'constants/messageTypes';
import { IMessage } from 'interfaces';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { MessagesContainer, LeftLoading, RightLoading } from './styles';

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
    <MessagesContainer>
      {loading && (
        <SkeletonTheme color="#202020" highlightColor="#252525">
          <RightLoading>
            <Skeleton width="30%" />
          </RightLoading>
          <LeftLoading>
            <Skeleton width="40%" />
          </LeftLoading>
          <LeftLoading>
            <Skeleton width="60%" height={88} />
          </LeftLoading>
          <RightLoading>
            <Skeleton width="40%" />
          </RightLoading>
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
            file={m.file}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </MessagesContainer>
  );
};

export default Messages;
