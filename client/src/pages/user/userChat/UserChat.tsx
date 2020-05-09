import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Api from 'services/api';
import Chat from 'components/chat/Chat';
import { IChatInfo } from 'components/chatInfo/ChatInfo';
import classes from './UserChat.module.css';
import { AxiosError } from 'axios';

interface IParams {
  chatId: string;
  hash: string;
}

const UserChat: React.FC = () => {
  const { chatId, hash } = useParams<IParams>();
  const history = useHistory();
  const [chatInfo, setChatInfo] = useState<IChatInfo>();
  useEffect(() => {
    Api.get<IChatInfo>(`/chat/${chatId}`, { headers: { Hash: hash } })
      .then(res => setChatInfo(res.data))
      .catch((err: AxiosError) => {
        if (err.response && err.response.status >= 400) {
          history.push('/');
        }
      });
  }, [chatId, history, hash]);

  return (
    <div className={classes.Container}>
      <Chat chatId={+chatId} hash={hash} name={chatInfo?.name} />
    </div>
  );
};

export default UserChat;
