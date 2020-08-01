import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useDropzone } from 'react-dropzone';

import Siofu from 'socketio-file-upload';
import socket from 'services/socket';
import Api from 'services/api';
import Icon from 'components/ui/icon/Icon';
import Input from 'components/ui/input/Input';
import Messages from 'components/chat/messages/Messages';
import { AxiosError } from 'axios';
import { IMessage } from 'interfaces';
import dragIcon from 'assets/drag.svg';
import classes from './Chat.module.css';

interface IProps {
  chatId: string;
  token?: string;
  name?: string;
}

const Chat: React.FC<IProps> = ({ chatId, token, name }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const history = useHistory();
  const uploader = useMemo(() => new Siofu(socket), []);

  const onDrop = useCallback(
    acceptedFiles => {
      uploader.submitFiles(acceptedFiles);
      // const reader = new FileReader();
      // reader.readAsDataURL(acceptedFiles[0]);
      // reader.onload = () => {
      //   console.log(reader.result);
      //   socket.emit('upload_file', {
      //     file: reader.result,
      //     filename: (acceptedFiles[0] as File).name,
      //   });
      // };
    },
    [uploader]
  );

  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop,
  });

  const renderMessage = (message: IMessage) => {
    return setMessages(msgs => [...msgs, message]);
  };

  const renderAllMessages = (messageArray: IMessage[]) => {
    return setMessages(messageArray);
  };

  useEffect(() => {
    document.onpaste = event => {
      const clipboardFiles = event.clipboardData?.files;
      if (clipboardFiles) {
        uploader.submitFiles(clipboardFiles);
      }
    };
    uploader.addEventListener(
      'start',
      (event: { file: { meta: { socketId: string } } }) => {
        // eslint-disable-next-line no-param-reassign
        event.file.meta.socketId = socket.id;
      }
    );
    socket.on('file_uploaded', (data: {}) => console.log(data));
  }, [uploader]);

  useEffect(() => {
    socket.on('received_message', (data: IMessage) => {
      if (data.chatId === chatId) renderMessage(data);
    });
    socket.on('error_sending_message', (data: string) => {
      console.log('error_sending_message', data);
    });
    return () => {
      socket.removeListener('received_message');
      socket.removeListener('error_sending_message');
    };
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
    setMessages([]);
    setLoading(true);
    Api.get<IMessage[]>(`/message/${chatId}`, {
      headers,
    })
      .then(res => {
        if (!redirected) {
          setLoading(false);
          return renderAllMessages(res.data);
        }
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

  const sendMessage = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div
      {...getRootProps({
        onClick: event => event.stopPropagation(),
      })}
      className={classes.ChatContainer}
    >
      <input {...getInputProps()} />
      <Messages
        loading={loading}
        messages={messages}
        user={typeof token === 'undefined'}
      />
      <form onSubmit={handleSubmit} className={classes.TextContainer}>
        <Input
          type="textarea"
          value={newMessage}
          change={e => setNewMessage(e.target.value)}
          required
          sendClick={sendMessage}
          fileClick={() => inputRef.current?.click()}
        />
      </form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: isDragActive ? '100%' : 0,
          height: isDragActive ? '100%' : 0,
          overflow: 'hidden',
          transformOrigin: 'center',
          transition: '0.4s all ease-in-out',
        }}
      >
        <p>Drop your file(s) here</p>
        <Icon
          path={dragIcon}
          color="#a5a5a5"
          size="80%"
          maxSize={512}
          minSize={64}
        />
      </div>
    </div>
  );
};

export default Chat;
