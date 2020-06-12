import React, { useContext, lazy } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { LangContext } from 'context/LangContext';
import { baseURL } from 'services/api';
import User from 'pages/user/User';

const PrivateRoute = lazy(() => import('components/privateRoute/PrivateRoute'));
const Admin = lazy(() => import('pages/admin/Admin'));
const Login = lazy(() => import('pages/login/Login'));
const Logout = lazy(() => import('pages/logout/Logout'));

const Routes: React.FC = () => {
  const { lang } = useContext(LangContext);
  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>Free Helper Chat</title>
        <link rel="icon" href={`${baseURL}images/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${baseURL}images/logo.png`} />
        <meta name="description" content="Free Helper Chat" />
        <meta httpEquiv="content-language" content={lang} />
      </Helmet>
      <BrowserRouter basename="/chat">
        <Switch>
          <PrivateRoute path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={User} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
