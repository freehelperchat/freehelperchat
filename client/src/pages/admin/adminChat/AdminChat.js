import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Api from 'services/api';
import { AuthContext } from 'context/AuthContext';

import Chat from 'components/chat/Chat';
import ChatInfo from 'components/chatInfo/ChatInfo';
import classes from './AdminChat.module.css';

const AdminChat = () => {
  const { chatId } = useParams();
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const history = useHistory();
  const [chatInfo, setChatInfo] = useState({});
  const [operatorInfo, setOperatorInfo] = useState({});
  useEffect(() => {
    let redirected = false;
    Api.get(`/chat/${chatId}`, { headers: { Authorization: token } })
      .then(res => {
        if (!redirected) {
          console.log(res.data);
          setChatInfo(res.data);
        }
      })
      .catch(err => {
        if (err.response) {
          switch (err.response.status) {
            case 400:
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
        if (err.response && err.response.status >= 400) {
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
        <Chat chatId={chatId} token={token} name={operatorInfo.fullName} />
      </div>
      <div className={classes.ChatInfo}>
        <ChatInfo chatInfo={chatInfo} />
      </div>
    </div>
  );
};

export default AdminChat;
