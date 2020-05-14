import React from 'react';
import { Route } from 'react-router-dom';

import StartChatForm from 'pages/user/startChatForm/StartChatForm';
import UserChat from 'pages/user/userChat/UserChat';

function User() {
  return (
    <>
      <Route path="/" exact component={StartChatForm} />
      <Route path="/id/:chatId/:hash" component={UserChat} />
    </>
  );
}

export default User;
