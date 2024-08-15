// src/TutionContext.js

import React, { createContext, useState } from 'react';

export const TutionContext = createContext();

export const TutionProvider = ({ children }) => {
  const [tutions, setTutions] = useState([]);

  const addTution = (newTution) => {
    setTutions((prevTutions) => [...prevTutions, newTution]);
  };

  return (
    <TutionContext.Provider value={{ tutions, addTution }}>
      {children}
    </TutionContext.Provider>
  );
};
