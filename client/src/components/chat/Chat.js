import React, { useState, useEffect, useMemo } from 'react';
import socketio from 'socket.io-client';

import Input from '../input/Input';
import Messages from '../messages/Messages';
import Api from '../../services/api';
import classes from './Chat.module.css';

const Chat = ({ chatId, token, hash }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  console.log(chatId, token, hash);
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
    socket.emit('open_chat', { chatId });
    Api.get(`/api/message/${chatId}`)
      .then(res => renderAllMessages(res.data))
      .catch(err => console.log(err));
  }, [socket, chatId]);

  const handleSubmit = e => {
    e.preventDefault();
    const message = newMessage.trim();
    if (message === '') return;
    const msg = {
      message,
      chatId,
      token,
      hash,
    };
    socket.emit('send_message', msg);
    setNewMessage('');
  };

  return (
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
  );
};

export default Chat;
