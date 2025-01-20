import React, { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст
const UserContext = createContext();

// Провайдер для контекста
export const UserProvider = ({ children }) => {
  const [login, setLogin] = useState("");

  return (
    <UserContext.Provider value={{ login, setLogin }}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для использования контекста
export const useUser = () => {
  return useContext(UserContext);
};
