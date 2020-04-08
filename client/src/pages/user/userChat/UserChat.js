import React from 'react';
import { useParams } from 'react-router-dom';

import Chat from '../../../components/chat/Chat';

const UserChat = () => {
  const { chatId, hash } = useParams();

  return <Chat chatId={chatId} hash={hash} />;
};

export default UserChat;
