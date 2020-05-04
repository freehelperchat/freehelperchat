import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Api from 'services/api';
import { AuthContext } from 'context/AuthContext';
import Chat from '../../../components/chat/Chat';

const AdminChat = () => {
  const { chatId } = useParams();
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const history = useHistory();
  const [chatInfo, setChatInfo] = useState({});
  const [operatorInfo, setOperatorInfo] = useState({});
  useEffect(() => {
    Api.get(`/chat/${chatId}`, { headers: { Authorization: token } })
      .then(res => setChatInfo(res.data))
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

  return <Chat chatId={chatId} token={token} name={operatorInfo.fullName} />;
};

export default AdminChat;
