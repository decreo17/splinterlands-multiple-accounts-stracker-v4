import { getCards, getDecTransactions } from '../../api/playerApi';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import LoadingSlice from '../../slices/loadingSlice';

//for toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DecTransactionsSlice from '../../slices/decTransactionsSlice';

export const daysAgo = (numOfDdays) => {
    var days = 86400000 * numOfDdays;
    var daysAgo = new Date(Date.now() - days);
    return daysAgo;
}

export const getNetIncomeDetails = async(username,days = 1) => {
    var cards = []
    var rent = 0
    var earned = 0
    var netIncome = 0
    //var transactions = []
    
    await getCards(username)
    .then((data) => {
        cards = data['cards'];
        cards.filter(c => c.market_listing_type === "RENT")
            .filter(c => c.delegated_to === username).map(x => rent+=parseFloat(x.buy_price));
    })
    .catch(err => {
        console.error(err);
        toast.error('There was an error while getting the cards for ' + username, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });
        return null;
    });

    await getDecTransactions(username)
    .then((data) => {
        
        let duration = daysAgo(days)
        let decTransactions = data.filter(transaction => transaction.type === "dec_reward" || transaction.type === "quest_rewards")
        //let decTransactions = data.filter(transaction => transaction.type === "dec_reward")
            .filter(transaction => Date.parse(transaction.created_date) > duration)
        //transactions = decTransactions
        decTransactions.map(x => earned += parseFloat(x.amount));
        netIncome = earned - rent
    })
    .catch(err => {
        console.error(err);
        toast.error('There was an error while getting the dec transactions for ' + username, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });
        return null;
    });

    return {
        username          : username,
        rent              : rent,
        earned            : earned,
        netIncome         : netIncome
    }
    
}

const UpdateNetIncome = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(LoadingSlice.actions.isLoading(true))
    })
    const loadAccountsFromLocalStorage = async () => {
        dispatch(DecTransactionsSlice.actions.reset())
        let usernames = [];
        let local = localStorage.getItem("accounts");
        //let accounts = []
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
                        await getNetIncomeDetails(user)
                        .then(data => {
                            dispatch(LoadingSlice.actions.isLoading(true))
                            //accounts.push(data)
                            dispatch(DecTransactionsSlice.actions.addNetIncome(data))
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
                //dispatch(DecTransactionsSlice.actions.setNetIncome(accounts))
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
    <button id='load-net-income' className="btn-sm btn-success m-1" onClick={()=> {
        loadAccountsFromLocalStorage()
  }}>LOAD/REFRESH NETINCOME</button>     
  )

}

export default UpdateNetIncome