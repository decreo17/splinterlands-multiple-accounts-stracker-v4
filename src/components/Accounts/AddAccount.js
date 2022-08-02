import './AddAccount.css'
import getPlayerData from '../../api/playerApi';
import LoadingSlice from '../../slices/loadingSlice';
import { useDispatch } from 'react-redux';
import { getAccountDetails } from './UpdateAccounts';
import AccountSlice from '../../slices/account-slice';
import { toast } from 'react-toastify';

const AddAccount = () => {
    const dispatch = useDispatch()
    const addAccountToLocalStorage = async () => {
        var usernameInput = document.getElementById("uname");
        //console.log(usernameInput.value);
        //create an array from the input
        var usernames = usernameInput.value.toString().split(",");
        //console.log(usernames);
        //loop thru the input to enter the account
        for (let i = 0; i < usernames.length; i++) {
            dispatch(LoadingSlice.actions.isLoading(true))
            await getPlayerData(usernames[i]).then((data) => {
                dispatch(LoadingSlice.actions.isLoading(true))
                if (!(data.name === undefined)) {
                    //add row
                    let oldData = [] 
                    let local = localStorage.getItem("accounts");
                    if ( local == null ) {
                        oldData.push(usernames[i]);
                        oldData = oldData.filter(function (el) { return el != null; });
                        localStorage.setItem("accounts", oldData)
                        document.getElementById('add-account-modal').style.display='none'
                        getAccountDetails(usernames[i])
                            .then(data => {
                                dispatch(AccountSlice.actions.addAccount(data))
                        })
                    } else {
                        if(local.toString().split(",").indexOf(usernames[i]) >= 0) {
                            toast.error(`${usernames[i]} already exist`, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored"
                                });
                        //addMessageToToaster(usernames[i] + " was already on the list")
                        } else {
                            oldData.push(localStorage.getItem("accounts"));
                            oldData.push(usernames[i]);
                            oldData = oldData.filter(function (el) { return el != null; });
                            localStorage.setItem("accounts", oldData);
                            document.getElementById('add-account-modal').style.display='none'
                            //createTable(usernames[i]);
                            getAccountDetails(usernames[i])
                            .then(data => {
                                dispatch(AccountSlice.actions.addAccount(data))
                            })
                        }
                    }
                } else {
                    //return error message to user
                    toast.error(usernames[i] + " is not a valid username", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                        });
                }
            })
        }
        usernameInput.value = "";
    }
    
    return (
        <div id="add-account-modal" style={{display:"none"}}>
            <div id="overlay"></div>
            <div id="main">
                <div id="form">
                    <div className="p-2">
                        <h5>Add Account</h5>
                    </div>
                    <div>
                        <input
                            id='uname'
                            name="username"
                            onChange={() => {""}}
                            placeholder="ENTER HIVE USERNAME"
                            autoComplete="off"
                            onKeyUp={(e) => {
                                if(e.key === "Enter") {
                                    addAccountToLocalStorage()
                                }
                            }}/>
                        <p>Note: Enter multiple accounts separated by comma<br/>ex. account1,account2</p>
                        <div className="d-flex justify-content-end p-2">
                            <button className="btn-sm btn-danger m-1" onClick={()=>{
                                document.getElementById('add-account-modal').style.display='none'
                            }}>Cancel</button>
                            <button className="btn-sm btn-success m-1" onClick={()=> {
                                addAccountToLocalStorage()
                            }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAccount