import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // JWT Token
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  // Logged-in User
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Restore Login on Refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Login
  function login(accessToken, userInfo) {
    localStorage.setItem("token", accessToken);

    if (userInfo) {
      localStorage.setItem(
        "user",
        JSON.stringify(userInfo)
      );
      setUser(userInfo);
    }

    setToken(accessToken);
    setIsAuthenticated(true);
  }

  // Logout
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}