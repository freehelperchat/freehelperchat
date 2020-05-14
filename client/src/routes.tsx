import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { baseURL } from 'services/api';
import PrivateRoute from 'components/privateRoute/PrivateRoute';
import Admin from 'pages/admin/Admin';
import User from 'pages/user/User';
import Login from 'pages/login/Login';
import Logout from 'pages/logout/Logout';

function Routes() {
  return (
    <>
      <Helmet>
        <title>Free Helper Chat</title>
        <link rel="icon" href={`${baseURL}images/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${baseURL}images/logo192.png`} />
        <meta name="description" content="Free Helper Chat" />
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
}

export default Routes;
