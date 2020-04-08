import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isAuth: false,
  token: '',
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = props => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuth, setIsAuth] = useState(token !== '');

  const login = id => {
    localStorage.setItem('token', id);
    setToken(id);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
