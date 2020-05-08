import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';

import Api from 'services/api';
import { AuthContext } from 'context/AuthContext';

const Logout = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    Api.delete('/logout', {
      headers: {
        Authorization: authContext.token,
      },
    }).catch(() => {});
    authContext.logout();
  }, [authContext]);

  return <Redirect to={{ pathname: '/login' }} />;
};

export default Logout;
