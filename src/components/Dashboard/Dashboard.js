import { faDashboard, faUser, faBitcoinSign, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DashboardSlice from '../../slices/dashboardSlice'
import CoinGecoPriceApi from '../../api/CoinGecoPrice'

const Dashboard = () => {
    const dispatch = useDispatch()
    const totalAccounts = useSelector(state => state.dashboard.totalAccounts)
    const decPrice = useSelector(state => state.dashboard.decPrice)
    const spsPrice = useSelector(state => state.dashboard.spsPrice)
    const totalChaos = useSelector(state => state.dashboard.totalChaos)
    const totalCredits = useSelector(state => state.dashboard.totalCredits)
    const totalDec = useSelector(state => state.dashboard.totalDec)
    const totalSps = useSelector(state => state.dashboard.totalSps)
    const totalStake = useSelector(state => state.dashboard.totalStake)
    const one = 1
    const accounts = useSelector((state)=> state.accounts);
    const localCurrency = window.localStorage.getItem("currency");

    //calculate total
    let total_accounts = 0;
    let total_chaos = 0;
    let total_credits = 0;
    let total_dec = 0;
    let total_sps = 0;
    let total_ssps = 0;
    let total_dec_price = 0;
    let total_sps_price = 0;
    let total_ssps_price = 0;
    let total_credits_price = 0;

    accounts.forEach(a => {
        total_accounts ++;
        total_dec += a.dec;
        total_sps += a.sps;
        total_ssps += a.s_sps;
        total_credits += a.credits;
        total_chaos += a.chaos;
    })

    useEffect(() => {
        dispatch(DashboardSlice.actions.setAccount(total_accounts))
        dispatch(DashboardSlice.actions.setChaos(total_chaos))
        dispatch(DashboardSlice.actions.setCredits(total_credits))
        dispatch(DashboardSlice.actions.setDec(total_dec))
        dispatch(DashboardSlice.actions.setSps(total_sps))
        dispatch(DashboardSlice.actions.setStake(total_ssps))

    }, [accounts])
    
    
    
    useEffect(() => {
        CoinGecoPriceApi("splinterlands")
        .then((data) => {
            dispatch(DashboardSlice.actions.setSpsPrice(data["market_data"]["current_price"][localCurrency.toLocaleLowerCase()]))
        }); 

        CoinGecoPriceApi("dark-energy-crystals")
        .then((data) => {
            dispatch(DashboardSlice.actions.setDecPrice(data["market_data"]["current_price"][localCurrency.toLocaleLowerCase()]))
        }); 
        
    }, [localCurrency, totalAccounts])

    total_dec_price = decPrice * totalDec
    total_sps_price = spsPrice * totalSps
    total_ssps_price = spsPrice * totalStake
    total_credits_price = totalCredits / 1000

    return (
        <>
            <h5><b><i><FontAwesomeIcon icon={faDashboard}/></i> My Dashboard</b></h5>
            
            <div id="one" style={{display: 'none'}}>{one}</div>
            <div className="w3-row-padding w3-margin-bottom">
                {/* ACCOUNTS */}
                <div className="w3-quarter w3-padding">
                    <div className="w3-container w3-round bg-gradient w3-red w3-padding-16">
                        <p className='card-header w3-center'>TOTAL ACCOUNTS</p>
                        <div className="w3-left"><i className="w3-xlarge"><FontAwesomeIcon icon={faUser}/></i></div>
                        <div className="w3-right accounts">
                            <p id="total-accounts">{totalAccounts}</p>
                            <br/>
                        </div>
                        <div className="w3-clear"></div>
                    </div>
                    </div>
                    {/* DEC PRICE */}
                    <div className="w3-quarter w3-padding">
                        <div className="bg-gradient w3-container w3-round w3-purple w3-padding-16">
                            <p className='card-header w3-center'>DEC Price</p>
                            <div className="w3-left"><i className="w3-xlarge"><FontAwesomeIcon icon={faBitcoinSign}/></i></div>
                            <div className="w3-right accounts">
                                <p id="decPrice">{decPrice.toFixed(5)} {localCurrency.toLocaleUpperCase()}</p>
                                <br/>
                            </div>
                            <div className="w3-clear"></div>
                        </div>
                    </div>
                    {/* SPS PRICE */}
                    <div className="w3-quarter w3-padding">
                        <div className="bg-gradient w3-container w3-round w3-green w3-padding-16">
                            <p className='card-header w3-center'>SPS Price</p>
                            <div className="w3-left"><i className="w3-xlarge"><FontAwesomeIcon icon={faBitcoinSign}/></i></div>
                            <div className="w3-right accounts">
                                <p id="spsPrice">{spsPrice.toFixed(2)} {localCurrency.toLocaleUpperCase()}</p>
                                <br/>
                            </div>
                            <div className="w3-clear"></div>
                        </div>
                    </div>
                    {/* CHAOS */}
                    <div className="w3-quarter w3-padding">
                        <div className="bg-gradient w3-container w3-round w3-red w3-padding-16">
                            <p className='card-header w3-center'>TOTAL CHAOS</p>
                            <div className="w3-left"><i className="w3-xlarge"><FontAwesomeIcon icon={faUser}/></i></div>
                            <div className="w3-right accounts">
                                <p id="total-chaos">{totalChaos}</p>
                                <br/>
                            </div>
                            <div className="w3-clear"></div>
                        </div>
                    </div>
                    {/* TOTAL CREDITS */}
                    <div className="w3-quarter w3-padding">
                        <div className= "bg-gradient w3-container w3-round w3-orange w3-text-white w3-padding-16">
                            <p className='card-header w3-center'> TOTAL CREDITS</p>
                            <div className="w3-left"><i className="w3-xlarge"><FontAwesomeIcon icon={faHeart}/></i></div>
                            <div className="w3-right">
                                <p id="credits">{totalCredits.toFixed(5)}</p>
                                <span id="creditsCurrency">{total_credits_price.toFixed(2)} USD</span>
                            </div>
                            <div className="w3-clear"></div>
                        </div>
                    </div>  
                    {/* TOTAL DEC */}
                    <div className="w3-quarter w3-padding">
                        <div className="bg-gradient w3-container w3-round w3-purple w3-padding-16">
                            <p className='card-header w3-center'>TOTAL DEC</p>
                            <div className="w3-left"><i className="w3-xlarge"><FontAwesomeIcon icon={faBitcoinSign}/></i></div>
                            <div className="w3-right">
                                <p id="dec">{totalDec.toFixed(5)}</p>
                                <span id="decCurrency">{total_dec_price.toFixed(2)} {localCurrency.toLocaleUpperCase()}</span>
                            </div>
                            <div className="w3-clear"></div>
                        </div>
                    </div>
                    {/* TOTAL SPS */}
                    <div className="w3-quarter w3-padding">
                        <div className="bg-gradient w3-container w3-round w3-green w3-padding-16">
                            <p className='card-header w3-center'>TOTAL SPS</p>
                            <div className="w3-left"><i className="w3-xlarge"><FontAwesomeIcon icon={faBitcoinSign}/></i></div>
                            <div className="w3-right">
                                <p id="sps">{totalSps.toFixed(3)}</p>
                                <span id="spsCurrency">{total_sps_price.toFixed(2)} {localCurrency.toLocaleUpperCase()}</span>
                            </div>
                            <div className="w3-clear"></div>
                        </div>
                    </div>
                    {/* TOTAL STAKES SPS */}
                    <div className="w3-quarter w3-padding">
                        <div className="bg-gradient w3-container w3-round w3-orange w3-text-white w3-padding-16">
                            <p className='card-header w3-center'>TOTAL STAKED</p>
                            <div className="w3-left"><i className="w3-xlarge"><FontAwesomeIcon icon={faHeart}/></i></div>
                            <div className="w3-right">
                                <p id="spsp">{totalStake.toFixed(3)}</p>
                                <span id="spspCurrency">{total_ssps_price.toFixed(2)} {localCurrency.toLocaleUpperCase()}</span>
                            </div>
                        <div className="w3-clear"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard