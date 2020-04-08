import React from 'react';
import { Route } from 'react-router-dom';

import AuthContextProvider from '../../context/AuthContext';
import AdminChat from './adminChat/AdminChat';

function Admin() {
  return (
    <AuthContextProvider>
      <Route path="/admin/chat/:chatId" component={AdminChat} />
    </AuthContextProvider>
  );
}

export default Admin;
