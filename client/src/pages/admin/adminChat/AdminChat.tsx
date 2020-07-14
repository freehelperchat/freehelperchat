import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Api from 'services/api';
import { AuthContext } from 'context/AuthContext';

import Chat from 'components/chat/Chat';
import ChatInfo, { IChatInfo } from 'components/chat/chatInfo/ChatInfo';
import { AxiosError } from 'axios';
import classes from './AdminChat.module.css';

interface IOperator {
  fullName: string;
  username: string;
  email?: string;
  disabled?: boolean;
  departmentIds?: string[];
  allDepartments?: boolean;
  autoAccept?: boolean;
  maxActiveChats?: number;
  hideOnline?: boolean;
  invisibleMode?: boolean;
}

const AdminChat: React.FC = () => {
  const { chatId } = useParams();
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const history = useHistory();
  const [chatInfo, setChatInfo] = useState<IChatInfo>();
  const [operatorInfo, setOperatorInfo] = useState<IOperator>();
  useEffect(() => {
    let redirected = false;
    Api.get<IChatInfo>(`/chat/${chatId}`, {
      headers: { Authorization: token },
    })
      .then(res => {
        if (!redirected) {
          console.log(res.data);
          setChatInfo(res.data);
        }
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          switch (err.response.status) {
            case 401:
              history.push('/logout');
              break;
            case 404:
              history.push('/admin');
              break;
            default:
              break;
          }
        }
      });

    Api.get('/operator', { headers: { Authorization: token } })
      .then(res => {
        if (!redirected) setOperatorInfo(res.data);
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          history.push('/logout');
        }
      });
    return () => {
      redirected = true;
    };
  }, [chatId, history, token]);

  return (
    <div className={classes.Container}>
      <div className={classes.AdminChat}>
        <Chat chatId={chatId} token={token} name={operatorInfo?.fullName} />
      </div>
      <div className={classes.ChatInfo}>
        {chatInfo && <ChatInfo chatInfo={chatInfo} />}
      </div>
    </div>
  );
};

export default AdminChat;
