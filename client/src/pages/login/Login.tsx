import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Api from 'services/api';
import Button from 'components/ui/button/Button';
import Input from 'components/ui/input/Input';
import { AuthContext } from 'context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const history = useHistory();
  const authContext = useContext(AuthContext);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    Api.post('/login', {}, { auth: { username, password } })
      .then(res => {
        const { token } = res.data;
        authContext.login(token);
        history.push('/admin');
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Helmet title="Login - Free Helper Chat" />
      <Input
        type="text"
        label={t('info.username')}
        name={t('info.username').toLowerCase().replace(/ /gi, '-')}
        required
        value={username}
        change={e => setUsername(e.target.value)}
      />
      <Input
        type="password"
        label={t('info.password')}
        name={t('info.password').toLowerCase().replace(/ /gi, '-')}
        required
        change={e => setPassword(e.target.value)}
      />
      <Button type="submit" label={t('button.login')} />
    </form>
  );
};

export default Login;
