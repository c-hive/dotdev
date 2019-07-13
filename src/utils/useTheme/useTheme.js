import { createContext, useContext } from "react";

const defaultContextData = {
  darkMode: false,
  toggle: () => {},
};

export const ThemeContext = createContext(defaultContextData);
export const useTheme = () => useContext(ThemeContext);
