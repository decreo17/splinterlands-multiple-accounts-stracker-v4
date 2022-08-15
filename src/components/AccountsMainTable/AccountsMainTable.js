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
import { useDispatch, useSelector } from 'react-redux'
import AccountSlice from '../../slices/account-slice'
import LoadingSlice from '../../slices/loadingSlice'

const AccountsMainTable = () => {
    const dispatch = useDispatch()
    const quest = useSelector((state)=> state.quest);

    const addAccountButton = <button className="btn-sm btn-success m-1" onClick={()=>{ 
        document.getElementById('add-account-modal').style.display='block'
    }}>ADD</button>

    const clearAccountsButton = <button className="btn-sm btn-success m-1" onClick={()=>{ 
        dispatch(LoadingSlice.actions.isLoading(true))
        window.localStorage.removeItem("accounts");
        dispatch(AccountSlice.actions.reset());
        toast.success('Accounts Cleared', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });
    }}>CLEAR</button>

    return (
        <>
            <div className='text-center'>
                {addAccountButton}
                <LoadAccounts />
                {clearAccountsButton}
            </div>
            
            <br/>

            <nav>
                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                    <button className="bg-gradient nav-item nav-link active" id="component-battles-tab" data-bs-toggle="tab" 
                        data-bs-target="#component-battles" type="button" role="tab" 
                        aria-controls="component-battles" aria-selected="true">
                            Battles
                    </button>
                    <button className="bg-gradient nav-item nav-link" id="component-balance-tab" data-bs-toggle="tab" 
                        data-bs-target="#component-balance" type="button" role="tab" 
                        aria-controls="component-balance" aria-selected="false">
                            Balances
                    </button>
                    <button className="bg-gradient nav-link nav-item" id="component-quest-tab" data-bs-toggle="tab" 
                        data-bs-target="#component-quest" type="button" role="tab" 
                        aria-controls="component-quest" aria-selected="false"
                        onClick={() => {

                            if(!quest.length > 0) {
                                document.getElementById('load-quest').click()
                            }
                            
                        }}> Quest
                    </button>
                </div>
            </nav>

            <div className="tab-content">
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