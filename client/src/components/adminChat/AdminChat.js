import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import socketio from 'socket.io-client';

import Message from '../message/Message';
import Api from '../../services/api';

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { chatId } = useParams();
  const messagesEndRef = useRef(null);
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

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = e => {
    e.preventDefault();
    const message = {
      chatId,
      name: 'teste',
      operator: true,
      message: newMessage,
    };
    socket.emit('send_message', message);
    renderMessage(message);
    setNewMessage('');
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          height: 200,
          scrollBehavior: 'smooth',
          overflowX: 'auto',
        }}
      >
        <div
          style={{
            width: '30%',
            maxHeight: 300,
            overflow: 'auto',
          }}
        >
          {messages.map(m => (
            <Message
              key={m._id}
              Operator={m.operator}
              Message={m.message}
              Name={m.name}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          required
        />
      </form>
    </>
  );
};

export default AdminChat;
