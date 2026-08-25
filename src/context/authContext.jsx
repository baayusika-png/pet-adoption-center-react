import { useContext, createContext, useState } from "react";
import { logoutUser } from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);

    // Save user in sessionStorage
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      // Call logout API
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }

    // Clear React user state
    setUser(null);

    // Remove user from sessionStorage
    sessionStorage.removeItem("user");

    // Remove token from sessionStorage
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
