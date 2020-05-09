import React, { useContext } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

import { AuthContext } from 'context/AuthContext';

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const authContext = useContext(AuthContext);
  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<{}>) =>
        authContext.isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};

export default PrivateRoute;
