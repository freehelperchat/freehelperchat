import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from 'components/privateRoute/PrivateRoute';
import Admin from 'pages/admin/Admin';
import User from 'pages/user/User';
import Login from 'pages/login/Login';
import Logout from 'pages/logout/Logout';

function Routes() {
  return (
    <BrowserRouter basename="/chat">
      <Switch>
        <PrivateRoute path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={User} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
