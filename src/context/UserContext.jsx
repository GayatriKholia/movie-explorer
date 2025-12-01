import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // store a simple mock user with username and membership
  const [user, setUser] = useLocalStorage("user", {
    username: "guest",
    membership: "free"
  });

  const updateUser = updates => setUser(prev => ({ ...prev, ...updates }));

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}