import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import socketio from 'socket.io-client';
import Api from '../../services/api';

const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { chatId } = useParams();
  const history = useHistory();

  const socket = useMemo(
    () =>
      socketio('http://localhost:3001/', {
        query: { userHash: '123' },
      }),
    []
  );

  const renderMessage = message => {
    return setMessages(msgs => [...msgs, message.message]);
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
    const message = {
      chatId,
      message: newMessage,
    };
    socket.emit('send_message', message);
    renderMessage(message);
    setNewMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          width: '100%',
          height: 200,
          scrollBehavior: 'smooth',
          overflowX: 'auto',
        }}
      >
        {messages.map(m => (
          <p key={Math.random()}>{m}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default UserChat;
