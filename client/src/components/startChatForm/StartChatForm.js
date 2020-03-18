import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Api from '../../services/api';
import Input from '../input/Input';
import classes from './StartChatForm.module.css';

const StartChatForm = () => {
  const { t } = useTranslation('translation');
  const [chatForm, setChatForm] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formValues, setFormValues] = useState({});
  useEffect(() => {
    Api.get('/api/startchat/get')
      .then(res => setChatForm(res.data))
      .catch(err => console.log(err));
    Api.get('/api/department/names')
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (value, name) => {
    setFormValues(fv => ({ ...fv, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className={classes.Form}>
      <form onSubmit={handleSubmit}>
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
          Value={formValues.department}
          Change={e => handleChange(e.target.value, 'department')}
        />
      </form>
    </div>
  );
};

export default StartChatForm;
