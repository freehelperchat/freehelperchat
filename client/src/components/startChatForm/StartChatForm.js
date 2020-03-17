import React, { useEffect, useState } from 'react';

import Api from '../../services/api';
import Input from '../input/Input';

const StartChatForm = () => {
  const [chatForm, setChatForm] = useState([]);
  useEffect(() => {
    Api.get('/api/startchat/get')
      .then(res => setChatForm(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {chatForm.map(c => (
        <Input
          key={c._id}
          Type={c.inputType}
          Label={c.label}
          Name={c.label.replace(/ /gi, '-').toLowerCase()}
          Required={c.required}
          Options={c.options}
        />
      ))}
    </form>
  );
};

export default StartChatForm;
