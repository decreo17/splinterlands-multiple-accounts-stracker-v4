
import './App.css';
import 'w3-css/w3.css';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import Settings from './components/Settings/Settings';
import React, { useEffect }  from 'react'
import { SideBar } from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import SeasonBanner from './components/SeasonBanner/SeasonBanner';
import AccountsMainTable from './components/AccountsMainTable/AccountsMainTable'
import AddAccount from './components/Accounts/AddAccount';
import { ToastContainer } from 'react-toastify';
import QuestTable from './components/QuestTable/QuestTable';

const App = () => {

  return (
    <>
      <AddAccount />
      <Settings />
      <Menu />
      <SideBar />
      <div className="w3-main" style={{marginTop:'43px'}}>
      <SeasonBanner />
      <ToastContainer
        limit={10}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <AccountsMainTable />
      <QuestTable />
      <Footer />
      </div>
    </>
  );
}

export default App;
