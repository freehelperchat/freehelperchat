import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Api from 'services/api';
import Chat from 'components/chat/Chat';
import { IChatInfo } from 'interfaces';
import { AxiosError } from 'axios';
import classes from './UserChat.module.css';

interface IParams {
  chatId: string;
}

const UserChat: React.FC = () => {
  const { chatId } = useParams<IParams>();
  const history = useHistory();
  const [chatInfo, setChatInfo] = useState<IChatInfo>();
  useEffect(() => {
    Api.get<IChatInfo>(`/chat/${chatId}`)
      .then(res => setChatInfo(res.data))
      .catch((err: AxiosError) => {
        if (err.response && err.response.status >= 400) {
          history.push('/');
        }
      });
  }, [chatId, history]);

  return (
    <div className={classes.Container}>
      <Chat chatId={chatId} name={chatInfo?.name} />
    </div>
  );
};

export default UserChat;
