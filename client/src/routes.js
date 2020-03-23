import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import User from './pages/user/User';
import Admin from './pages/admin/Admin';

function Routes() {
  return (
    <BrowserRouter basename="/chat">
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={User} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
