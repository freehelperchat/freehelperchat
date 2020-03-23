import React from 'react';
import { Route } from 'react-router-dom';

import AdminChat from '../../components/adminChat/AdminChat';

function Admin() {
  return <Route path="/admin/chat/:chatId" component={AdminChat} />;
}

export default Admin;
