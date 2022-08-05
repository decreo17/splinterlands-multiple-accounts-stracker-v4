//import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import { useDarkMode } from './useDarkMode';
import Toggle from './Toggle';
import $ from 'jquery';

// The function that toggles between themes
function Themes() {
    const [theme, toggleTheme, componentMounted] = useDarkMode();
  
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    //do the add/remove class here for themes
    if(theme === 'light'){
      console.log(theme + " this")
      $("#jsonTableModern").removeClass("table-dark ");
      $("#jsonTableWild").removeClass("table-dark ");
      $("#questTableWild").removeClass("table-dark ");
      $("#questTableModern").removeClass("table-dark ");
    } else {
      $("#jsonTableModern").addClass("table-dark ");
      $("#jsonTableWild").addClass("table-dark ");
      $("#questTableWild").addClass("table-dark ");
      $("#questTableModern").addClass("table-dark ");
    }
  
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