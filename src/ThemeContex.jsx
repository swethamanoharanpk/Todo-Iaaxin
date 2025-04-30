import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const themeStyles = {
    backgroundColor: darkMode ? "#1e1e1e" : "white",
    color: darkMode ? "#ffffff" : "#000000",
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
