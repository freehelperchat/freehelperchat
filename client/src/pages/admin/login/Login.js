import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import Api from 'services/api';
import Button from 'components/button/Button';
import Input from 'components/input/Input';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation('translation');
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    Api.post('/login', {}, { auth: { username, password } })
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('token', token);
        history.push('/admin');
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        label={t('form.username')}
        name={t('form.username')
          .toLowerCase()
          .replace(/ /gi, '-')}
        required
        value={username}
        change={e => setUsername(e.target.value)}
      />
      <Input
        type="password"
        label={t('form.password')}
        name={t('form.password')
          .toLowerCase()
          .replace(/ /gi, '-')}
        required
        change={e => setPassword(e.target.value)}
      />
      <Button type="submit" label={t('button.login')} />
    </form>
  );
};

export default Login;
