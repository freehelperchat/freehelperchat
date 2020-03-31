import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Api from '../../services/api';
import Input from '../input/Input';
import Button from '../button/Button';
import chatStatus from '../../constants/chatStatus';
import classes from './StartChatForm.module.css';

const StartChatForm = () => {
  const { t } = useTranslation('translation');
  const history = useHistory();
  const [chatForm, setChatForm] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    Api.get('/api/startchat')
      .then(res => setChatForm(res.data))
      .catch(err => console.log(err));
    Api.get('/api/department/names')
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (value, id) => {
    setFormValues(fv => ({ ...fv, [id]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userData = Object.keys(formValues).map(fv => ({
      fieldId: fv,
      value: formValues[fv],
    }));

    Api.post('/api/chat', {
      userData,
      department,
      name,
      email,
      status: chatStatus.PENDING,
    })
      .then(res => history.push(`/id/${res.data.chatId}/${res.data._id}`))
      .catch(err => console.log(err));
  };

  return (
    <div className={classes.Form}>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label={t('startchatform.name')}
          name={t('startchatform.name')
            .toLowerCase()
            .replace(/ /gi, '-')}
          required
          value={name}
          change={e => setName(e.target.value)}
        />
        <Input
          type="email"
          label={t('startchatform.email')}
          name={t('startchatform.email')
            .toLowerCase()
            .replace(/ /gi, '-')}
          required
          value={email}
          change={e => setEmail(e.target.value)}
        />
        {chatForm.map(c => (
          <Input
            key={c._id}
            type={c.inputType}
            label={c.label}
            name={c.name}
            required={c.required}
            options={c.options}
            value={formValues[c.name]}
            change={e => handleChange(e.target.value, c.name)}
          />
        ))}
        <Input
          type="select"
          label={t('department.name')}
          name={t('department.name').toLowerCase()}
          required
          options={departments}
          value={department}
          change={e => setDepartment(e.target.value)}
        />
        <Button type="submit" label={t('button.startchat')} />
      </form>
    </div>
  );
};

export default StartChatForm;
