
import './Home.css';
import 'w3-css/w3.css';
import Menu from '../components/Menu/Menu';
import Footer from '../components/Footer/Footer';
import Settings from '../components/Settings/Settings';
import React, { useEffect }  from 'react'
import { SideBar } from '../components/SideBar/SideBar';
import Header from '../components/Header/Header';
import SeasonBanner from '../components/SeasonBanner/SeasonBanner';
import AccountsMainTable from '../components/AccountsMainTable/AccountsMainTable'
import AddAccount from '../components/Accounts/AddAccount';
import { ToastContainer } from 'react-toastify';
import CardLookup from '../components/CardLookup/CardLookup';
import Dashboard from '../components/Dashboard/Dashboard';


const Home = () => {

  return (
    <>
      <Header dashboard={Dashboard} />
      <AccountsMainTable />
      
    </>
  );
}

export default Home;
