import React, { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider =({ children }) => {
  // Читаем тему из localStorage или по умолчанию - "light"
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme; // Используем имя темы как class
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
