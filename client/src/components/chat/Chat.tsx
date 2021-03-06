import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useDropzone } from 'react-dropzone';

import socket from 'services/socket';
import Api from 'services/api';
import Icon from 'components/ui/icon/Icon';
import Input from 'components/ui/input/Input';
import Messages from 'components/chat/messages/Messages';
import { AxiosError } from 'axios';
import { IMessage } from 'interfaces';
import dragIcon from 'assets/drag.svg';
import { ChatContainer, TextContainer, Dropzone } from './styles';

interface IProps {
  chatId: string;
  token?: string;
  name?: string;
}

const Chat: React.FC<IProps> = ({ chatId, token, name }) => {
  // const [files, setFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const history = useHistory();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        socket.emit('upload_file', {
          file: reader.result,
          filename: file.name,
        });
      };
    });
  }, []);

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
      if (clipboardFiles && clipboardFiles.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(clipboardFiles[0]);
        reader.onload = () => {
          socket.emit('upload_file', {
            file: reader.result,
            filename: clipboardFiles[0].name,
          });
        };
      }
    };
  }, []);

  useEffect(() => {
    socket.on('received_message', (data: IMessage) => {
      if (data.chatId === chatId) renderMessage(data);
    });
    socket.on('error_sending_message', (data: string) => {
      console.log('error_sending_message', data);
    });
    socket.on('file_uploaded', (data: string) => {
      const cookies = new Cookies();
      const clientToken = cookies.get('clientToken');
      const msg = {
        name,
        message: newMessage,
        chatId,
        token,
        clientToken,
        file: data,
      };
      socket.emit('send_message', msg);
    });
    return () => {
      socket.removeListener('received_message');
      socket.removeListener('error_sending_message');
      socket.removeListener('file_uploaded');
    };
  }, [chatId, token, name, newMessage]);

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
    <ChatContainer
      {...getRootProps({
        onClick: event => event.stopPropagation(),
      })}
    >
      <input {...getInputProps()} />
      <Messages
        loading={loading}
        messages={messages}
        user={typeof token === 'undefined'}
      />
      <TextContainer onSubmit={handleSubmit}>
        <Input
          type="textarea"
          value={newMessage}
          change={e => setNewMessage(e.target.value)}
          required
          sendClick={sendMessage}
          fileClick={() => inputRef.current?.click()}
        />
      </TextContainer>
      <Dropzone active={isDragActive}>
        <p>Drop your file(s) here</p>
        <Icon
          path={dragIcon}
          color="#909090"
          size="80%"
          maxSize="512px"
          minSize="64px"
        />
      </Dropzone>
    </ChatContainer>
  );
};

export default Chat;
