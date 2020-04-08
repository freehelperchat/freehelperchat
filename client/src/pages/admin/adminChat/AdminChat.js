import React from 'react';
import { useParams } from 'react-router-dom';

import Chat from '../../../components/chat/Chat';

const AdminChat = () => {
  const { chatId } = useParams();

  return <Chat chatId={chatId} token="" />;
};

export default AdminChat;
