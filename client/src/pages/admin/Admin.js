import React from 'react';
import { Route } from 'react-router-dom';

import AuthContextProvider from 'context/AuthContext';
import AdminChat from './adminChat/AdminChat';
import Login from './login/Login';

const Admin = () => {
  return (
    <AuthContextProvider>
      <Route path="/admin/chat/:chatId" component={AdminChat} />
      <Route path="/admin/login" component={Login} />
      <Route path="/admin" exact />
    </AuthContextProvider>
  );
};

export default Admin;
