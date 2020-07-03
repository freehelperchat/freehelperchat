import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import socket from 'services/socket';
import Api from 'services/api';
import Input from 'components/ui/input/Input';
import Messages, { IMessage } from 'components/chat/messages/Messages';
import { AxiosError } from 'axios';
import classes from './Chat.module.css';

interface IProps {
  chatId: number;
  token?: string;
  hash?: string;
  name?: string;
}

const Chat: React.FC<IProps> = ({ chatId, token, hash, name }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const history = useHistory();

  const renderMessage = (message: IMessage) => {
    return setMessages(msgs => [...msgs, message]);
  };

  const renderAllMessages = (messageArray: IMessage[]) => {
    return setMessages(messageArray);
  };

  useEffect(() => {
    let redirected = false;
    socket.on('received_message', (data: IMessage) => {
      if (+data.chatId === +chatId) renderMessage(data);
    });
    socket.on('error_sending_message', (data: string) => {
      console.log('error_sending_message', data);
    });
    const headers = token
      ? {
          Authorization: token,
        }
      : {
          Hash: hash,
        };
    socket.emit('open_chat', { chatId });
    Api.get<IMessage[]>(`/message/${chatId}`, {
      headers,
    })
      .then(res => {
        if (!redirected) return renderAllMessages(res.data);
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.status >= 400) {
          if (token) return history.push('/logout');
          return history.push('/');
        }
      });
    return () => {
      redirected = true;
    };
  }, [chatId, hash, token, history]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = newMessage.trim();
    if (message === '') return;
    const msg = {
      name,
      message,
      chatId,
      token,
      hash,
    };
    socket.emit('send_message', msg);
    setNewMessage('');
  };

  return (
    <div className={classes.Container}>
      <div className={classes.ChatContainer}>
        <Messages messages={messages} user={typeof hash !== 'undefined'} />
        <form onSubmit={handleSubmit}>
          <Input
            type="textarea"
            value={newMessage}
            change={e => setNewMessage(e.target.value)}
            required
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
