import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isAuth: false,
  token: '',
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = props => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token') !== null);

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
    <AuthContext.Provider value={{ token, isAuth, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
