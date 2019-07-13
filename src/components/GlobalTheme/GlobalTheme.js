import React from "react";
import { ThemeProvider } from "styled-components";
import LightTheme from "../../../resources/Themes/LightTheme";
import DarkTheme from "../../../resources/Themes/DarkTheme";
import Loader from "../UI/Loader/Loader";
import * as CustomHooks from "../../utils/CustomHooks/CustomHooks";
import { ThemeContext } from "../../utils/useTheme/useTheme";

const globalTheme = ({ children }) => {
  const [themeState, setThemeState] = CustomHooks.useDarkMode();

  if (!themeState.hasThemeLoaded) {
    return <Loader />;
  }

  const toggle = () => {
    const dark = !themeState.dark;
    localStorage.setItem("dark", JSON.stringify(dark));
    setThemeState({ ...themeState, dark });
  };

  const currentTheme = themeState.dark ? DarkTheme : LightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <ThemeContext.Provider
        value={{
          dark: themeState.dark,
          toggle,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default globalTheme;
