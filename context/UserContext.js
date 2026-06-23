import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");

  return (
    <UserContext.Provider
      value={{
        nombre,
        edad,
        setNombre,
        setEdad,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};