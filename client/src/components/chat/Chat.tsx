import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useDropzone } from 'react-dropzone';

import socket from 'services/socket';
import Api from 'services/api';
import Input from 'components/ui/input/Input';
import Messages from 'components/chat/messages/Messages';
import { AxiosError } from 'axios';
import { IMessage } from 'interfaces';
import classes from './Chat.module.css';

interface IProps {
  chatId: string;
  token?: string;
  name?: string;
}

const Chat: React.FC<IProps> = ({ chatId, token, name }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const history = useHistory();

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const renderMessage = (message: IMessage) => {
    return setMessages(msgs => [...msgs, message]);
  };

  const renderAllMessages = (messageArray: IMessage[]) => {
    return setMessages(messageArray);
  };

  useEffect(() => {
    socket.on('received_message', (data: IMessage) => {
      if (data.chatId === chatId) renderMessage(data);
    });
    socket.on('error_sending_message', (data: string) => {
      console.log('error_sending_message', data);
    });
  }, [chatId]);

  useEffect(() => {
    let redirected = false;
    const headers = token
      ? {
          Authorization: token,
        }
      : undefined;
    const cookies = new Cookies();
    const clientToken = cookies.get('clientToken');
    socket.emit('open_chat', { chatId, token, clientToken });
    Api.get<IMessage[]>(`/message/${chatId}`, {
      headers,
    })
      .then(res => {
        if (!redirected) return renderAllMessages(res.data);
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === 401) {
          if (token) return history.push('/logout');
          return history.push('/');
        }
      });
    return () => {
      redirected = true;
    };
  }, [chatId, token, history]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = newMessage.trim();
    if (message === '') return;
    const cookies = new Cookies();
    const clientToken = cookies.get('clientToken');
    const msg = {
      name,
      message,
      chatId,
      token,
      clientToken,
    };
    socket.emit('send_message', msg);
    setNewMessage('');
  };

  return (
    <div
      {...getRootProps({
        onClick: event => event.stopPropagation(),
      })}
      className={classes.ChatContainer}
    >
      <input {...getInputProps()} />
      {!isDragActive ? (
        <>
          <Messages messages={messages} user={typeof token === 'undefined'} />
          <form onSubmit={handleSubmit} className={classes.TextContainer}>
            <Input
              type="textarea"
              value={newMessage}
              change={e => setNewMessage(e.target.value)}
              required
            />
          </form>
        </>
      ) : (
        <div>
          <p>Drop the files here</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
