import './LoadAccounts.css'
import LoadingSlice from '../../slices/loadingSlice';
import { useDispatch } from 'react-redux';
import { getAccountDetails } from './UpdateAccounts';
import AccountSlice from '../../slices/account-slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoadAccounts = () => {
    const dispatch = useDispatch()
    dispatch(LoadingSlice.actions.isLoading(true))
    const loadAccountsFromLocalStorage = async () => {
        dispatch(AccountSlice.actions.reset())
        let usernames = [];
        let local = localStorage.getItem("accounts");
        if (local == null || !local) {      
            toast.error("There are no valid accounts to load", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });
        } else {
            usernames.push(localStorage.getItem("accounts"));
            usernames = usernames.toString().split(",");
            (async () => {
                for (let user of usernames) {
                    try {
                        await getAccountDetails(user)
                        .then(data => {
                            dispatch(LoadingSlice.actions.isLoading(true))
                            dispatch(AccountSlice.actions.addAccount(data))
                        })
                } catch (e) {
                    console.log("There was an error while processing " + user + "\n" + e)
                    toast.error("There was an error while processing " + user + " | " + e, {
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
            }
            toast.success("Accounts Loaded!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
            })();
        }
        
    }

    return (
        <button id='load-accounts' className="btn-sm btn-success m-1" onClick={()=> {
            loadAccountsFromLocalStorage()
        }}>LOAD ACCOUNTS</button>                    
    )
}

export default LoadAccounts