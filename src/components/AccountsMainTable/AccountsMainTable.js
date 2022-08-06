import './AccountsMainTable.css'
import React from 'react'
import Battles from './Battles'
import UpdateAccounts from '../Accounts/UpdateAccounts'
import LoadAccounts from '../Accounts/LoadAccounts'
import Balances from './Balances'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
//for toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuestTable from '../QuestTable/QuestTable'

const AccountsMainTable = () => {
    const addAccountButton = <button className="btn-sm btn-success m-1" onClick={()=>{ 
        document.getElementById('add-account-modal').style.display='block'
    }}>ADD</button>

    const clearAccountsButton = <button className="btn-sm btn-success m-1" onClick={()=>{ 
        //alert("clear all accounts")
        
    }}>CLEAR</button>

    return (
        <>
            <div className='text-center'>
                {addAccountButton}
                <LoadAccounts />
                {clearAccountsButton}
            </div>
            
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="component-battles-tab" data-bs-toggle="tab" data-bs-target="#component-battles" type="button" role="tab" aria-controls="component-battles" aria-selected="true">Battles</button>
                    <button class="nav-link" id="component-balance-tab" data-bs-toggle="tab" data-bs-target="#component-balance" type="button" role="tab" aria-controls="component-balance" aria-selected="false">Balances</button>
                    <button class="nav-link" id="component-quest-tab" data-bs-toggle="tab" data-bs-target="#component-quest" type="button" role="tab" aria-controls="component-quest" aria-selected="false">Quest</button>
                </div>
            </nav>

            <div class="tab-content">
                <div id="component-battles" className="tab-pane fade show active">
                    <Battles/>
                </div>
                <div id="component-balance" className="tab-pane fade">
                    <Balances/>
                </div>
                <div id="component-quest" className="tab-pane fade">
                    <QuestTable/>
                </div>
            </div>
          
            
            
        </>
    )
}

export default AccountsMainTable;