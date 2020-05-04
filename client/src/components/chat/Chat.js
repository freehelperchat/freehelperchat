import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import socketio from 'socket.io-client';

import Api from 'services/api';
import Input from 'components/input/Input';
import Messages from 'components/messages/Messages';
import classes from './Chat.module.css';

const Chat = ({ chatId, token, hash, name }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const history = useHistory();

  const socket = useMemo(
    () =>
      socketio('http://localhost:3001/', {
        query: {
          operatorToken: token,
        },
      }),
    [token]
  );

  const renderMessage = message => {
    return setMessages(msgs => [...msgs, message]);
  };

  const renderAllMessages = messageArray => {
    return setMessages(msgs => [...msgs, ...messageArray]);
  };

  useEffect(() => {
    socket.on('received_message', data => {
      renderMessage(data);
    });
    socket.on('error_sending_message', data => {
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
    Api.get(`/message/${chatId}`, {
      headers,
    })
      .then(res => renderAllMessages(res.data))
      .catch(err => {
        if (err.response && err.response.status >= 400) {
          console.log(err.response);
          if (token) return history.push('/logout');
          return history.push('/');
        }
      });
  }, [socket, chatId, hash, token, history]);

  const handleSubmit = e => {
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
