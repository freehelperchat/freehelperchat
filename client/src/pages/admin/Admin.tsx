import React, { useContext, useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { IChatInfo, IOnlineOperator } from 'interfaces';
import socket from 'services/socket';
import { AuthContext } from 'context/AuthContext';
import Layout from 'components/layout/Layout';
import AdminChat from 'pages/admin/adminChat/AdminChat';

const Admin: React.FC = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [onlineOperators, setOnlineOperators] = useState<IOnlineOperator[]>([]);
  const [yourChats, setYourChats] = useState<IChatInfo[]>([]);
  const [otherChats, setOtherChats] = useState<IChatInfo[]>([]);

  useEffect(() => {
    window.onbeforeunload = () => {
      socket.disconnect();
      return undefined;
    };
    socket.emit('login', { token: authContext.token });
    socket.on('operators', (data: IOnlineOperator[]) => {
      setOnlineOperators(data);
    });
    socket.on('your_chats', (data: IChatInfo[]) => {
      setYourChats(data);
    });
    socket.on('other_chats', (data: IChatInfo[]) => {
      setOtherChats(data);
    });
    socket.on('login_failed', () => history.push('/logout'));
    return () => {
      socket.removeListener('operators');
      socket.removeListener('your_chats');
      socket.removeListener('other_chats');
      socket.removeListener('login_failed');
    };
  }, [authContext.token, history]);

  return (
    <Layout
      yourChatsArr={yourChats}
      operatorsArr={onlineOperators}
      otherChatsArr={otherChats}
    >
      <Helmet title="Admin - Free Helper Chat" />
      <Route path="/admin/chat/:chatId" component={AdminChat} />
    </Layout>
  );
};

export default Admin;
