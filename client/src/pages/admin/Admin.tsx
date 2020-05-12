import React, { useMemo, useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import socketio from 'socket.io-client';

import AdminChat from './adminChat/AdminChat';
import { AuthContext } from 'context/AuthContext';

const Admin: React.FC = () => {
  const authContext = useContext(AuthContext);

  const socket = useMemo(
    () =>
      socketio('http://localhost:3001/', {
        query: {
          operatorToken: authContext.token,
        },
      }),
    [authContext.token]
  );

  useEffect(() => {}, [socket]);

  return (
    <>
      <Route component={() => <h1>TODO: HEADER ADMIN</h1>} />
      <Route path="/admin/chat/:chatId" component={AdminChat} />
      <Route path="/admin" exact>
        <div>
          <div>
            <h1>Online Operators</h1>
          </div>
        </div>
      </Route>
    </>
  );
};

export default Admin;
