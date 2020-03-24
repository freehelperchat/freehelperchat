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
  const [phone, setPhone] = useState('');
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
      status: chatStatus.PENDING,
    })
      .then(res => history.push(`/id/${res.data._id}`))
      .catch(err => console.log(err));
  };

  return (
    <div className={classes.Form}>
      <form onSubmit={handleSubmit}>
        <Input
          Type="text"
          Label={t('startchatform.name')}
          Name={t('startchatform.name')
            .toLowerCase()
            .replace(/ /gi, '-')}
          Required
          Value={name}
          Change={e => setName(e.target.value)}
        />
        <Input
          Type="text"
          Label={t('startchatform.phone')}
          Name={t('startchatform.phone')
            .toLowerCase()
            .replace(/ /gi, '-')}
          Required
          Value={phone}
          Change={e => setPhone(e.target.value)}
        />
        {chatForm.map(c => (
          <Input
            key={c._id}
            Type={c.inputType}
            Label={c.label}
            Name={c.name}
            Required={c.required}
            Options={c.options}
            Value={formValues[c.name]}
            Change={e => handleChange(e.target.value, c.name)}
          />
        ))}
        <Input
          Type="select"
          Label={t('department.name')}
          Name={t('department.name').toLowerCase()}
          Required
          Options={departments}
          Value={department}
          Change={e => setDepartment(e.target.value)}
        />
        <Button Type="submit" Label={t('button.startchat')} />
      </form>
    </div>
  );
};

export default StartChatForm;
