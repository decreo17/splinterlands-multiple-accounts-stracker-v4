import './AccountsMainTable.css'
import React from 'react'
import WildWithBattles from './WildWithBattles'
import UpdateAccounts from '../Accounts/UpdateAccounts'
import LoadAccounts from '../Accounts/LoadAccounts'
import ModernWithBattles from './ModernWithBattles'

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
                {clearAccountsButton}
                <LoadAccounts />
            </div>
            <WildWithBattles/>
            <ModernWithBattles/>
        </>
    )
}

export default AccountsMainTable;