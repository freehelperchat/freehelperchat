import React, { useMemo, useEffect, useState } from 'react';
import socketio from 'socket.io-client';

import StartChatForm from '../../components/startChatForm/StartChatForm';

function User() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const socket = useMemo(
    () =>
      socketio('http://localhost:3001/', {
        query: { userHash: '123' },
      }),
    []
  );

  useEffect(() => {
    socket.on('received_message', data => {
      setMessages(m => [...m, data]);
    });
    socket.emit('open_chat', { chatId: '1' });
  }, [socket]);

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('send_message', {
      chatId: '1',
      message: newMessage,
    });
    setNewMessage('');
  };

  return (
    <>
      <StartChatForm />
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
    </>
  );
}

export default User;
