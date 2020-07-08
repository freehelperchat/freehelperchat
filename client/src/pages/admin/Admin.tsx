import React, { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import socket from 'services/socket';
import { AuthContext } from 'context/AuthContext';
import Layout from 'components/layout/Layout';
import AdminChat from 'pages/admin/adminChat/AdminChat';

interface IDepartment {
  _id: string;
  name: string;
}
interface IOperator {
  _id: string;
  allDepartments: boolean;
  departmentIds: IDepartment[];
  fullName: string;
}
interface IOnlineOperator {
  _id: string;
  operator: IOperator;
  socket: string;
  time: number;
  __v: number;
}

const Admin: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [onlineOperators, setOnlineOperators] = useState<IOnlineOperator[]>();

  useEffect(() => {
    window.onbeforeunload = () => {
      socket.disconnect();
      return undefined;
    };
    socket.emit('login', { token: authContext.token });
    socket.on('online_operators', (data: IOnlineOperator[]) => {
      setOnlineOperators(data);
    });
  }, [authContext.token]);

  return (
    <Layout
      yourChatsArr={[
        { chatId: 1, name: 'Bruna Braga Felix Soares', status: 1 },
        { chatId: 2, name: 'Sonia Regina Da Costa Jesus', status: 1 },
        { chatId: 3, name: 'Paulo Martiniano Lessa ma', status: 1 },
        { chatId: 4, name: 'LANIA fERREIRA lINS', status: 1 },
        { chatId: 5, name: 'LANIA fERREIRA lINS', status: 1 },
        { chatId: 6, name: 'LANIA fERREIRA lINS', status: 1 },
        { chatId: 7, name: 'LANIA fERREIRA lINS', status: 1 },
        { chatId: 8, name: 'LANIA fERREIRA lINS', status: 1 },
        { chatId: 9, name: 'LANIA fERREIRA lINS', status: 1 },
        { chatId: 10, name: 'LANIA fERREIRA lINS', status: 1 },
        { chatId: 11, name: 'LANIA fERREIRA lINS', status: 1 },
      ]}
      operatorsArr={[
        { _id: '123', name: 'Pedro Dias', status: true, activeChats: 3 },
        { _id: '321', name: 'Thiago Antunes', status: true, activeChats: 3 },
      ]}
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
                      {operator.operator.departmentIds.map(department => (
                        <p key={department._id}>{department.name}</p>
                      ))}
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
