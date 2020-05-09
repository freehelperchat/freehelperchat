import React from 'react';
import { Route } from 'react-router-dom';

import AdminChat from './adminChat/AdminChat';

const Admin: React.FC = () => {
  return (
    <>
      <Route path="/admin" component={() => <h1>TESTE</h1>} />
      <Route path="/admin/chat/:chatId" component={AdminChat} />
    </>
  );
};

export default Admin;
