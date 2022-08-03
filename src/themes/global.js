import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  #themes-settings-button, #my-sidebar, header, footer, #smat, .card, .btn {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  #add-account-modal #form{
    background-color: ${({ theme }) => theme.body};
  }


  :root {
    --toastify-toast-background: ${({ theme }) => theme.body};
  }

  body {
    
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }`