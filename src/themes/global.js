import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  #themes-settings-button, #my-sidebar, header, footer, #smat, .card, .btn, span.dropdown-item, ul.dropdown-menu {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  #add-account-modal #form{
    background-color: ${({ theme }) => theme.body};
  }

  div.btn.btn-primary{
    border-color: ${({ theme }) => theme.body};
    font-size: x-small;
  }

  nav > div button.nav-item.nav-link,
  nav > div button.nav-item.nav-link.active{
    color: ${({ theme }) => theme.text};
    boarder: ${({ theme }) => theme.text};
  }

  nav > div button.nav-item.nav-link:hover,
  nav > div button.nav-item.nav-link:focus{
    color: ${({ theme }) => theme.text};
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
    font-size: small;
  }`