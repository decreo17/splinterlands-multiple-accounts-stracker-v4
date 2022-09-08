import { faDashboard, faUser, faBitcoinSign, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DashboardSlice from '../../slices/dashboardSlice'
import CoinGecoPriceApi from '../../api/CoinGecoPrice'

const NetIncomeDashboard = () => {
    const dispatch = useDispatch()
    const accounts = useSelector((state)=> state.accounts);
    const netincome = useSelector((state)=> state.transactions.netIncome);
    const localCurrency = window.localStorage.getItem("currency");
    const totalAccounts = useSelector(state => state.dashboard.totalAccounts)
    const decPrice = useSelector(state => state.dashboard.decPrice)
    const spsPrice = useSelector(state => state.dashboard.spsPrice)
    const totalEarned = useSelector(state => state.dashboard.totalEarned)
    const totalRent = useSelector(state => state.dashboard.totalRent)
    //const netIncome = useSelector(state => state.dashboard.netIncome)
    var total_earned_price = 0
    var total_rent_price = 0
    var netIncome_price = 0
    var total_earned = 0
    var total_rent = 0
    var total_netincome = 0
    var total_accounts = 0

    useEffect(() => {
        dispatch(DashboardSlice.actions.setEarned(total_earned))
        dispatch(DashboardSlice.actions.setRent(total_rent))
        dispatch(DashboardSlice.actions.setNetIncome(total_netincome))

    }, [accounts, localCurrency, netincome])

    useEffect(() => {
        CoinGecoPriceApi("splinterlands")
        .then((data) => {
            dispatch(DashboardSlice.actions.setSpsPrice(data["market_data"]["current_price"][localCurrency.toLocaleLowerCase()]))
        }); 

        CoinGecoPriceApi("dark-energy-crystals")
        .then((data) => {
            dispatch(DashboardSlice.actions.setDecPrice(data["market_data"]["current_price"][localCurrency.toLocaleLowerCase()]))
        }); 
        
    }, [accounts, localCurrency])

    netincome.forEach(a => {
        total_accounts ++;
        total_earned += a.earned;
        total_rent += a.rent;
        total_netincome += ((a.earned * spsPrice) - (a.rent * decPrice))
    })

    total_earned_price = spsPrice * totalEarned
    total_rent_price = decPrice * totalRent
    netIncome_price = total_netincome
   
    return (
        <>
            <h5><b><i><FontAwesomeIcon icon={faDashboard}/></i> Rent Income Dashboard</b></h5>
            <div className="w3-row-padding w3-margin-bottom">
                {/* ACCOUNTS */}
                <div className="w3-quarter w3-padding">
                    <div className="bg-gradient w3-container w3-round w3-red w3-padding-16">
                        <p className='card-header w3-center'>TOTAL ACCOUNTS</p>
                        <div className="w3-left"><i className="w3-xlarge"><FontAwesomeIcon icon={faUser}/></i></div>
                        <div className="w3-right accounts">
                            <p id="total-accounts">{total_accounts}</p>
                            <br/>
                        </div>
                        <div className="w3-clear"></div>
                    </div>
                </div>

                {/* SPS EARNED */}
                <div className="w3-quarter w3-padding">
                    <div className="bg-gradient w3-container w3-round w3-purple w3-padding-16">
                        <p className='card-header w3-center'>TOTAL EARNED(SPS)</p>
                        <div className="w3-left"><i className="w3-xlarge"><FontAwesomeIcon icon={faBitcoinSign}/></i></div>
                        <div className="w3-right">
                            <p id="total-earned">{totalEarned.toFixed(5)}</p>
                            <span id="earned-currency">{total_earned_price.toFixed(3)} {localCurrency.toLocaleUpperCase()}</span>
                        </div>
                        <div className="w3-clear"></div>
                    </div>
                </div>
                {/* DEC RENT */}
                <div className="w3-quarter w3-padding">
                    <div className="bg-gradient w3-container w3-round w3-green w3-padding-16">
                        <p className='card-header w3-center'>TOTAL RENT(DEC)</p>
                        <div className="w3-left"><i className="w3-xlarge"><FontAwesomeIcon icon={faBitcoinSign}/></i></div>
                        <div className="w3-right">
                            <p id="total-rent">{totalRent.toFixed(5)}</p>
                            <span id="rent-currency">{total_rent_price.toFixed(3)} {localCurrency.toLocaleUpperCase()}</span>
                        </div>
                        <div className="w3-clear"></div>
                    </div>
                </div>
                {/* Local Currency NETINCOME */}
                <div className="w3-quarter w3-padding">
                    <div className="bg-gradient w3-container w3-round w3-orange w3-text-white w3-padding-16">
                        <p className='card-header w3-center'>NET INCOME</p>
                        <div className="w3-left"><i className="w3-xlarge"><FontAwesomeIcon icon={faHeart}/></i></div>
                        <div className="w3-right">
                            <p id="netincome-currency">{netIncome_price.toFixed(3)} {localCurrency.toLocaleUpperCase()}</p>
                            <br/>
                        </div>
                        <div className="w3-clear"></div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default NetIncomeDashboard