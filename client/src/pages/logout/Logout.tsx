import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';

import Api from 'services/api';
import { AuthContext } from 'context/AuthContext';

const Logout: React.FC = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    Api.delete('/logout', {
      headers: {
        Authorization: authContext.token,
      },
    }).catch(() => undefined);
    authContext.logout();
  }, [authContext]);

  return <Redirect to={{ pathname: '/login' }} />;
};

export default Logout;
