
import './App.css';
import 'w3-css/w3.css';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import Settings from './components/Settings/Settings';
import React from 'react'
import { SideBar } from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import SeasonBanner from './components/SeasonBanner/SeasonBanner';

const App = () => {

  return (
    <>
      <Settings />
      <Menu />
      <SideBar />
      <div className="w3-main" style={{marginTop:'43px'}}>
      <SeasonBanner />
      <Header />
      <Footer />
      </div>
    </>
  );
}

export default App;
