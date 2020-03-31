import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import socketio from 'socket.io-client';

import Messages from '../messages/Messages';
import Input from '../input/Input';
import Api from '../../services/api';

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { chatId } = useParams();
  const history = useHistory();

  const socket = useMemo(
    () =>
      socketio('http://localhost:3001/', {
        query: { operatorToken: '1234' },
      }),
    []
  );

  const renderMessage = message => {
    return setMessages(msgs => [...msgs, message]);
  };

  useEffect(() => {
    socket.on('received_message', data => {
      renderMessage(data);
    });
    socket.emit('open_chat', { chatId });
    Api.get(`/api/chat/${chatId}`)
      .then(() => {
        Api.get(`/api/message/${chatId}`)
          .then(res => res.data.map(msg => renderMessage(msg)))
          .catch(err => console.log(err));
      })
      .catch(() => history.push('/'));
  }, [socket, chatId, history]);

  const handleSubmit = e => {
    e.preventDefault();
    const message = newMessage.trim();
    console.log('message', message);
    if (message === '') return;
    const msg = {
      name: 'teste',
      operator: true,
      message,
      chatId,
    };
    socket.emit('send_message', msg);
    setNewMessage('');
  };

  return (
    <>
      <Messages messages={messages} />
      <form onSubmit={handleSubmit}>
        <Input
          type="textarea"
          value={newMessage}
          change={e => setNewMessage(e.target.value)}
          required
        />
      </form>
    </>
  );
};

export default AdminChat;
