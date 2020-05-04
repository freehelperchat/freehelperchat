import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';

import { AuthContext } from 'context/AuthContext';

const Logout = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.logout();
  }, [authContext]);

  return <Redirect to={{ pathname: '/login' }} />;
};

export default Logout;
