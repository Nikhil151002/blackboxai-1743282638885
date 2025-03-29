import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const decoded = jwt_decode(token);
      setUser(decoded);
    }
  }, [token]);

  const login = async (credentials) => {
    const { data } = await axios.post('/api/auth/login', credentials);
    localStorage.setItem('token', data.token);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;