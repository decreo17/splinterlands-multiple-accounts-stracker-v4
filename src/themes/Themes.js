//import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import { useDarkMode } from './useDarkMode';
import Toggle from './Toggle';

// The function that toggles between themes
function Themes() {
    const [theme, toggleTheme, componentMounted] = useDarkMode();
  
    const themeMode = theme === 'dark' ? lightTheme : darkTheme;
  
    if (!componentMounted) {
      return <div />
    };
  
    return (
      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles />
          <Toggle theme={theme} toggleTheme={toggleTheme} />
        </>
      </ThemeProvider>
    );
  }
  
  export default Themes;