import React, { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import Api from 'services/api';
import socket from 'services/socket';
import { AuthContext } from 'context/AuthContext';
import AdminChat from './adminChat/AdminChat';

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
    Api.get<IOnlineOperator[]>('/online', {
      headers: {
        Authorization: authContext.token,
      },
    })
      .then(res => {
        console.log(res.data);
        setOnlineOperators(res.data);
      })
      .catch(err => console.log(err));
  }, [authContext.token]);

  return (
    <>
      <Route component={() => <h1>TODO: HEADER ADMIN</h1>} />
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
    </>
  );
};

export default Admin;
