import React, { useEffect, useState } from 'react';

import Api from '../../services/api';
import Input from '../input/Input';

const StartChatForm = () => {
  const [chatForm, setChatForm] = useState([]);
  useEffect(() => {
    Api.get('/api/config/startchat')
      .then(res => setChatForm(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {chatForm.map(c => (
        <Input key={c.id} Type={c.type} Label={c.label} />
      ))}
    </form>
  );
};

export default StartChatForm;
