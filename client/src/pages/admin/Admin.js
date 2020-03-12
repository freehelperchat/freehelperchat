import React, { useMemo, useEffect, useState } from 'react';
import socketio from 'socket.io-client';

function Admin() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const socket = useMemo(
    () =>
      socketio('http://localhost:3001/', {
        query: { operatorToken: '1234' },
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
    <form onSubmit={handleSubmit}>
      {messages.map(m => (
        <p key={Math.random()}>{m}</p>
      ))}
      <input
        type="text"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Admin;
