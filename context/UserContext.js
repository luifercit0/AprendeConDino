import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [dinoElegido, setDinoElegido] = useState("dino_verde"); // Dino por defecto

  return (
    <UserContext.Provider
      value={{
        nombre,
        edad,
        dinoElegido,
        setNombre,
        setEdad,
        setDinoElegido,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};