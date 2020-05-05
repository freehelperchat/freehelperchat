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
    Api.get(`/chat/${chatId}`, { headers: { Authorization: token } })
      .then(res => {
        console.log(res.data);
        setChatInfo(res.data);
      })
      .catch(err => {
        if (err.response && err.response >= 400) {
          history.push('/logout');
        }
      });

    Api.get('/operator', { headers: { Authorization: token } })
      .then(res => setOperatorInfo(res.data))
      .catch(err => {
        if (err.response && err.response >= 400) {
          history.push('/logout');
        }
      });
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
