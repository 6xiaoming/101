//import { createContext, useContext } from 'react';

//export const AuthContext = createContext(null);

// export function useAuth() {
//     return useContext(AuthContext);
// }

// src/context/auth.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// 提供 Provider 组件：集中管理登录状态
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // 当 token 改变时，自动更新 localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const value = { token, setToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 封装好的 hook：用于其他组件获取 token 状态
export function useAuth() {
  return useContext(AuthContext);
}