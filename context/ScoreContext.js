import React, { createContext, useState } from "react";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [stars, setStars] = useState(0);

  const addStar = () => {
    setStars((prev) => prev + 1);
  };

  const addFiveStars = () => {
    setStars((prev) => prev + 5);
  };

  const resetStars = () => {
    setStars(0);
  };

  return (
    <ScoreContext.Provider
      value={{
        stars,
        addStar,
        addFiveStars,
        resetStars,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};