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
      $("#questTable").removeClass("table-dark ");
      $("#seasonTable").removeClass("table-dark ");
      $("#card-lookup-table").removeClass("table-dark ");
      $("#netincome-table").removeClass("table-dark ");
      $("#spsRankRewardsTable").removeClass("table-dark ");
    
    } else {
      $("#jsonTableModern").addClass("table-dark ");
      $("#jsonTableWild").addClass("table-dark ");
      $("#questTable").addClass("table-dark ");
      $("#seasonTable").addClass("table-dark ");
      $("#card-lookup-table").addClass("table-dark ");
      $("#netincome-table").addClass("table-dark ");
      $("#spsRankRewardsTable").addClass("table-dark ");
  
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