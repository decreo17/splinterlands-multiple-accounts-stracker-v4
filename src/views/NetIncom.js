
import './NetIncome.css';
import React, { useState } from 'react'
import NetIncomeTable from '../components/NetIncomeTable/NetIncomeTable';
import NetIncomeDashboard from '../components/Dashboard/NetIncomeDashboard';
import Header from '../components/Header/Header';
import { useDispatch, useSelector } from "react-redux";


const NetIncome = () => {
    const addAccountButton = <button className="btn-sm btn-success m-1" onClick={()=>{ 
        document.getElementById('add-account-modal').style.display='block'
    }}>ADD</button>

    return (
      <>  
          
          <Header dashboard={NetIncomeDashboard}/>
          <NetIncomeTable/>
      </>
    );
  }
  
  export default NetIncome;
  