import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken') || '',
  });

  const login = (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('jwtToken', token);
    } else {
      sessionStorage.setItem('jwtToken', token);
    }
    setAuthState({ token });
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    sessionStorage.removeItem('jwtToken');
    setAuthState({ token: '' });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
