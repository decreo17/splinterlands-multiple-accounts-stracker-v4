
import './App.css';
import 'w3-css/w3.css';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import Settings from './components/Settings/Settings';
import React from 'react'
import { SideBar } from './components/SideBar/SideBar';

const App = () => {
  return (
    <>
    <Menu />
    <SideBar />
    <Footer />
    <Settings />
    </>
  );
}

export default App;
