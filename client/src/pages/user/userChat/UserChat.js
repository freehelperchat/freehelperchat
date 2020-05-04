import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Api from 'services/api';
import Chat from 'components/chat/Chat';

const UserChat = () => {
  const { chatId, hash } = useParams();
  const history = useHistory();
  const [chatInfo, setChatInfo] = useState({});
  useEffect(() => {
    Api.get(`/chat/${chatId}`, { headers: { Hash: hash } })
      .then(res => setChatInfo(res.data))
      .catch(err => {
        if (err.response && err.response >= 400) {
          history.push('/');
        }
      });
  }, [chatId, history, hash]);

  return <Chat chatId={chatId} hash={hash} name={chatInfo.name} />;
};

export default UserChat;
