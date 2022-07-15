
import './App.css';
import 'w3-css/w3.css';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import Settings from './components/Settings/Settings';
import React from 'react'
import { SideBar } from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import store from './store/store';
import { Provider } from 'react-redux/es/exports';
import SeasonBanner from './components/SeasonBanner/SeasonBanner';
import { GlobalStyles } from './themes/global';

const App = () => {

  return (
      <Provider store={store}>
      <>
        <Menu />
        <SideBar />
        <div className="w3-main" style={{marginTop:'43px'}}>
        <Header />
        <SeasonBanner />
        <Footer />
        </div>
        <Settings />
      </>     
      </Provider>

  );
}

export default App;
