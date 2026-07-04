import React, { createContext, useState } from "react";

export const ScoreContext = createContext();

const ACTIVIDADES = ["Letras", "Numeros", "Colores", "DinoGame"];

export const ScoreProvider = ({ children }) => {
  const [stars, setStars] = useState(0);
  const [completadas, setCompletadas] = useState([]);

  const addStar = () => {
    setStars((prev) => prev + 1);
  };

  const addFiveStars = () => {
    setStars((prev) => prev + 5);
  };

  const resetStars = () => {
    setStars(0);
  };

  const marcarCompletada = (nombreActividad) => {
    setCompletadas((prev) =>
      prev.includes(nombreActividad) ? prev : [...prev, nombreActividad]
    );
  };

  const todoCompletado = ACTIVIDADES.every((a) => completadas.includes(a));

  return (
    <ScoreContext.Provider
      value={{
        stars,
        addStar,
        addFiveStars,
        resetStars,
        completadas,
        marcarCompletada,
        todoCompletado,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
