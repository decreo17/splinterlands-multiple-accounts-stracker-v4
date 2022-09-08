import { getCards, getUnclaimedBalanceHistory } from '../../api/playerApi';
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import LoadingSlice from '../../slices/loadingSlice';
import CoinGecoPriceApi from '../../api/CoinGecoPrice';

//for toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransactionsSlice from '../../slices/transactionsSlice';
import Loading from '../Loading/Loading';

export const daysAgo = (numOfDdays) => {
    var days = 86400000 * numOfDdays;
    var daysAgo = new Date(Date.now() - days);
    return daysAgo;
}

export const getNetIncomeDetails = async(username,days = 1) => {
    //days = parseFloat(document.getElementById("netIncomeDays").value)
    var cards = []
    var rent = 0
    var earned = 0
    //var netIncome = ''
    //var spsPrice = 0
    //var decPrice
    //const localCurrency = window.localStorage.getItem("currency");
    //var transactions = []

    /*await CoinGecoPriceApi("splinterlands")
        .then((data) => {
           spsPrice = data["market_data"]["current_price"][localCurrency.toLocaleLowerCase()]
        }); 
    
    await CoinGecoPriceApi("dark-energy-crystals")
        .then((data) => {
            decPrice = data["market_data"]["current_price"][localCurrency.toLocaleLowerCase()]
        });*/
    console.log(days + " days")
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

    await getUnclaimedBalanceHistory(username)
    .then((data) => {
        
        let duration = daysAgo(days)
        let spsUnclaimedRewards = data.filter(transaction => parseFloat(transaction.amount) > 0)
                                .filter(transaction => Date.parse(transaction.created_date) > duration) //data.filter(transaction => transaction.type === "dec_reward" || transaction.type === "quest_rewards")
        //let spsUnclaimedRewards = data.filter(transaction => transaction.type === "dec_reward")
        //transactions = spsUnclaimedRewards
        spsUnclaimedRewards.map(x => earned += parseFloat(x.amount));
        console.log(spsUnclaimedRewards)
        //netIncome = (earned * spsPrice) - (rent * decPrice)

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
       
    }
    
}

const UpdateNetIncome = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const loadAccountsFromLocalStorage = () => {
        
        dispatch(TransactionsSlice.actions.reset())
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
                setLoading(true)
                for (let user of usernames) {
                    
                    try {
                        await getNetIncomeDetails(user)
                        .then(data => {
                            //dispatch(LoadingSlice.actions.isLoading(true))
                            //accounts.push(data)
                            dispatch(TransactionsSlice.actions.addNetIncome(data))
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
                //dispatch(spsUnclaimedRewardsSlice.actions.setNetIncome(accounts))
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
                setLoading(false)
            })();
        } 
    }
    
  return (
    <div className='col-lg-6 col-md-6 col-sm-6'>
        <button id='load-net-income' className="btn btn-sm btn-success m-1" onClick={()=> {
            loadAccountsFromLocalStorage()
        }}>LOAD/REFRESH NETINCOME</button>
        {loading && <Loading/>}
    </div>

  )

}

export default UpdateNetIncome