import React from 'react';
import { Route } from 'react-router-dom';

import StartChatForm from '../../components/startChatForm/StartChatForm';
import UserChat from '../../components/userChat/UserChat';

function User() {
  return (
    <>
      <Route path="/" exact component={StartChatForm} />
      <Route path="/id/:chatId" component={UserChat} />
    </>
  );
}

export default User;
