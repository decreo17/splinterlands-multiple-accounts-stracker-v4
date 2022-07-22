import { faDashboard, faUser, faBitcoinSign, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const totalAccounts = useSelector(state => state.dashboard.totalAccounts)
    const decPrice = useSelector(state => state.dashboard.decPrice)
    const spsPrice = useSelector(state => state.dashboard.spsPrice)
    const totalChaos = useSelector(state => state.dashboard.totalChaos)
    const totalCredits = useSelector(state => state.dashboard.totalCredits)
    const totalDec = useSelector(state => state.dashboard.totalDec)
    const totalSps = useSelector(state => state.dashboard.totalSps)
    const totalStake = useSelector(state => state.dashboard.totalStake)
    const one = 1

    return (
        <>
            <h5><b><i><FontAwesomeIcon icon={faDashboard}/></i> My Dashboard</b></h5>
            
            <div id="one" style={{display: 'none'}}>{one}</div>
            <div className="w3-row-padding w3-margin-bottom">
                {/* ACCOUNTS */}
                <div className="w3-quarter w3-padding">
                    <div className="w3-container w3-round w3-red w3-padding-16">
                        <p className='card-header w3-center'>TOTAL ACCOUNTS</p>
                        <div className="w3-left"><i className="w3-xxxlarge"><FontAwesomeIcon icon={faUser}/></i></div>
                        <div className="w3-right accounts">
                            <p id="total-accounts">{totalAccounts}</p>
                            <br/>
                        </div>
                        <div className="w3-clear"></div>
                    </div>
                    </div>
                    {/* DEC PRICE */}
                    <div className="w3-quarter w3-padding">
                        <div className="w3-container w3-round w3-purple w3-padding-16">
                            <p className='card-header w3-center'>DEC Price</p>
                            <div className="w3-left"><i className="w3-xxxlarge"><FontAwesomeIcon icon={faBitcoinSign}/></i></div>
                            <div className="w3-right accounts">
                                <p id="decPrice">{decPrice}</p>
                                <br/>
                            </div>
                            <div className="w3-clear"></div>
                        </div>
                    </div>
                    {/* SPS PRICE */}
                    <div className="w3-quarter w3-padding">
                        <div className="w3-container w3-round w3-green w3-padding-16">
                            <p className='card-header w3-center'>SPS Price</p>
                            <div className="w3-left"><i className="w3-xxxlarge"><FontAwesomeIcon icon={faBitcoinSign}/></i></div>
                            <div className="w3-right accounts">
                                <p id="spsPrice">{spsPrice}</p>
                                <br/>
                            </div>
                            <div className="w3-clear"></div>
                        </div>
                    </div>
                    {/* CHAOS */}
                    <div className="w3-quarter w3-padding">
                        <div className="w3-container w3-round w3-red w3-padding-16">
                            <p className='card-header w3-center'>TOTAL CHAOS</p>
                            <div className="w3-left"><i className="w3-xxxlarge"><FontAwesomeIcon icon={faUser}/></i></div>
                            <div className="w3-right accounts">
                                <p id="total-chaos">{totalChaos}</p>
                                <br/>
                            </div>
                            <div className="w3-clear"></div>
                        </div>
                    </div>
                    {/* TOTAL CREDITS */}
                    <div className="w3-quarter w3-padding">
                        <div className="w3-container w3-round w3-orange w3-text-white w3-padding-16">
                            <p className='card-header w3-center'> TOTAL CREDITS</p>
                            <div className="w3-left"><i className="w3-xxxlarge"><FontAwesomeIcon icon={faHeart}/></i></div>
                            <div className="w3-right">
                                <p id="credits">{totalCredits}</p>
                                <span id="creditsCurrency">(0.00)</span>
                            </div>
                            <div className="w3-clear"></div>
                        </div>
                    </div>  
                    {/* TOTAL DEC */}
                    <div className="w3-quarter w3-padding">
                        <div className="w3-container w3-round w3-purple w3-padding-16">
                            <p className='card-header w3-center'>TOTAL DEC</p>
                            <div className="w3-left"><i className="w3-xxxlarge"><FontAwesomeIcon icon={faBitcoinSign}/></i></div>
                            <div className="w3-right">
                                <p id="dec">{totalDec}</p>
                                <span id="decCurrency">(0.00)</span>
                            </div>
                            <div className="w3-clear"></div>
                    </div>
                    </div>
                    {/* TOTAL SPS */}
                    <div className="w3-quarter w3-padding">
                        <div className="w3-container w3-round w3-green w3-padding-16">
                            <p className='card-header w3-center'>TOTAL SPS</p>
                            <div className="w3-left"><i className="w3-xxxlarge"><FontAwesomeIcon icon={faBitcoinSign}/></i></div>
                            <div className="w3-right">
                                <p id="sps">{totalSps}</p>
                                <span id="spsCurrency">(0.00)</span>
                            </div>
                            <div className="w3-clear"></div>
                        </div>
                    </div>
                    {/* TOTAL STAKES SPS */}
                    <div className="w3-quarter w3-padding">
                        <div className="w3-container w3-round w3-orange w3-text-white w3-padding-16">
                            <p className='card-header w3-center'>TOTAL STAKED</p>
                            <div className="w3-left"><i className="w3-xxxlarge"><FontAwesomeIcon icon={faHeart}/></i></div>
                            <div className="w3-right">
                                <p id="spsp">{totalStake}</p>
                                <span id="spspCurrency">(0.00)</span>
                            </div>
                        <div className="w3-clear"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard