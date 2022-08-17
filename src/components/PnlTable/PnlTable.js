import './PnlTable.css'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import UpdateMarketPrice from '../UpdateMarketPrice/UpdateMarketPrice'
import SettingsSlice from '../../slices/settingsSlice'
import { useDispatch, useSelector } from 'react-redux'

const PnlTable = () => {
    //var lastUpdate = 'No update yet'
    const dispatch = useDispatch()
    var localUpdate =  window.localStorage.getItem('lastMarketPriceUpdate')
    const lastMarketPriceUpdate = useSelector(state => state.settings.lastMarketPriceUpdate)
    const [lastUpdate, setLastUpdate] = useState('No update yet')

    useEffect(() => {
        dispatch(SettingsSlice.actions.setLastMarketPriceUpdate(localUpdate))
        setLastUpdate(lastMarketPriceUpdate)
    },[lastMarketPriceUpdate])
    
    return (
        <>
            <div id="pnl-card" className=" card pnl-table-div">
                <div className="w3-container"  id="pnl">
                    <br/>
                    <h5><b><i><FontAwesomeIcon icon={faDollarSign}/></i> Cards PnL:</b></h5>
                    <div>
                        <UpdateMarketPrice/>
                        <div id="lastMarketPriceUpdate" className="w3-black">
                            Last Price Update: {lastUpdate}
                        </div>
                    </div>
                    <div className="">
                        <input className="w3-input w3-border w3-padding" type="text" 
                            placeholder="Search.." id="collapsSearchPnl" />
                        <table id="pnl-table" className="w3-hoverable display table table-dark table-striped">
                            <thead>
                                <tr className="sticky-table-head w3-dark-grey">
                                <th >Card Name</th>
                                <th >Gold</th>
                                <th >BCX</th>
                                <th >Edition</th>
                                <th >buy Price</th>
                                <th >Current Price</th>
                                <th >PnL</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id='pnl-table-body'>
                                {/*netincome.map((a, i) => (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{a.username}</td>
                                        <td>{a.earned.toFixed(3)}</td>
                                        <td>{a.rent.toFixed(3)}</td>
                                        <td>{a.netIncome.toFixed(3)}</td>
                                    </tr>
                                ))*/}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PnlTable;