import React, { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { IChatInfo, IOnlineOperator, IDepartment } from 'interfaces';
import socket from 'services/socket';
import { AuthContext } from 'context/AuthContext';
import Layout from 'components/layout/Layout';
import AdminChat from 'pages/admin/adminChat/AdminChat';

const Admin: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [onlineOperators, setOnlineOperators] = useState<IOnlineOperator[]>([]);
  const [yourChats, setYourChats] = useState<IChatInfo[]>([]);
  const [otherChats, setOtherChats] = useState<IChatInfo[]>([]);

  useEffect(() => {
    window.onbeforeunload = () => {
      socket.disconnect();
      return undefined;
    };
    socket.emit('login', { token: authContext.token });
    socket.on('online_operators', (data: IOnlineOperator[]) => {
      console.log(data);
      setOnlineOperators(data);
    });
    socket.on('your_chats', (data: IChatInfo[]) => {
      setYourChats(data);
    });
    socket.on('other_chats', (data: IChatInfo[]) => {
      setOtherChats(data);
    });
  }, [authContext.token]);

  return (
    <Layout
      yourChatsArr={yourChats}
      operatorsArr={onlineOperators}
      otherChatsArr={otherChats}
    >
      <Helmet title="Admin - Free Helper Chat" />
      <Route path="/admin/chat/:chatId" component={AdminChat} />
      <Route path="/admin" exact>
        <div>
          <div>
            <h1>Online Operators</h1>
            <div>
              <ul>
                {onlineOperators &&
                  onlineOperators.map(operator => (
                    <li key={operator._id}>
                      {operator.operator.fullName}
                      {operator.operator.allDepartments ? <p>&infin;</p> : null}
                      {(operator.operator.departmentIds as IDepartment[]).map(
                        department => (
                          <p key={department._id}>{department.name}</p>
                        )
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Route>
    </Layout>
  );
};

export default Admin;
