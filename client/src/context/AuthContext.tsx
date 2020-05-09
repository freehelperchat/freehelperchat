import React, { useState } from 'react';

interface IAuthContext {
  isAuth: boolean;
  token: string;
  login: (id: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  isAuth: false,
  token: '',
  login: (id: string) => {},
  logout: () => {},
});

const AuthContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token') !== null);

  const login = (id: string) => {
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
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
