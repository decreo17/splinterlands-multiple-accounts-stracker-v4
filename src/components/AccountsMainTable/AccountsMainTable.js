import './AccountsMainTable.css'
import React from 'react'

const AccountsMainTable = () => {
    return (
        <>
            <div>
                <button className="btn-sm btn-success m-1" onClick={()=>{ 
                    document.getElementById('add-account-modal').style.display='block'
                }}>ADD</button>
            </div>
            
        </>
    )
}

export default AccountsMainTable;