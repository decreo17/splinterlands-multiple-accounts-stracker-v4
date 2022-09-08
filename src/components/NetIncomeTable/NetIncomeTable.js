import UpdateNetIncome from '../Accounts/UpdateNetIncome'
import './NetIncomeTable.css'
import $ from 'jquery';
import { faUsers, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import UpdateMarketPrice from '../UpdateMarketPrice/UpdateMarketPrice';
import PnlTable from '../PnlTable/PnlTable';
import 'bootstrap'
import CoinGecoPriceApi from '../../api/CoinGecoPrice';
import DashboardSlice from '../../slices/dashboardSlice';


/**
 * To implement <NetIncomeDays/> we need to separate rentals into DEC and Credits
 * We will then call them both to get the rental and will have them reflect price,
 * the only difference though is that credits will be peg to USD
 *  
 */

const NetIncomeDays =() => {
    var days = []
    for (let i = 0; i < 15; i++) {
        days.push((i+1).toString())
    }
    
    const daysObjects = days.map((day, i) => ({id:i, value:day, text:day}));

    const daysOptions = daysObjects.map((day) => (
        <option key={day.id} value={(day.value)}>{day.text}</option>
    ))


    return (
        <div className="w3-padding">
            <select id="netIncomeDays" >
                {daysOptions}
            </select>
            <span > Days</span>
        </div>
    )
}

const NetIncomeTable = ()=> {
    const dispatch = useDispatch()
    const netincome = useSelector((state)=> state.transactions.netIncome);
    const localTheme = window.localStorage.getItem('theme');
    const localCurrency = window.localStorage.getItem("currency");
    const decPrice = useSelector(state => state.dashboard.decPrice)
    const spsPrice = useSelector(state => state.dashboard.spsPrice)


    useEffect(() => {
        CoinGecoPriceApi("splinterlands")
        .then((data) => {
            dispatch(DashboardSlice.actions.setSpsPrice(data["market_data"]["current_price"][localCurrency.toLocaleLowerCase()]))
        }); 

        CoinGecoPriceApi("dark-energy-crystals")
        .then((data) => {
            dispatch(DashboardSlice.actions.setDecPrice(data["market_data"]["current_price"][localCurrency.toLocaleLowerCase()]))
        }); 
        
    }, [localCurrency])
    $("#collapsSearchNetIncome").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#netincome-table tr").filter(function() {
          return $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          
        });
    });

    useEffect(() => {
        if(localTheme === 'light') {
        $("#netincome-table").removeClass("table-dark ");
        }
    })

    return (
        <>
            <div id="netincome-card" className=" card netincome-table-div">
                <div className="w3-container"  id="quest">
                    <br/>
                    <h5><b><i><FontAwesomeIcon icon={faUsers}/></i> Users:</b></h5>
                    <div className='d-flex'>
                        <UpdateNetIncome/> {/*<NetIncomeDays/>*/}
                    </div>
                    <div className="">
                        <input className="w3-input w3-border w3-padding" type="text" 
                            placeholder="Search.." id="collapsSearchNetIncome" />
                        <table id="netincome-table" className="w3-hoverable display table table-dark table-striped">
                            <thead>
                                <tr id="tr-netincome" className="sticky-table-head w3-dark-grey">
                                    <th >#</th>
                                    <th >Username</th>
                                    <th >SPS Earned <i title='This includes rank battles, season and focus rewards'><FontAwesomeIcon icon={faInfoCircle}/></i></th>
                                    <th >Dec Rent</th>
                                    <th >Net Income</th>
                                </tr>
                            </thead>
                            <tbody id='netincome-table-body'>
                                {netincome.map((a, i) => (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{a.username}</td>
                                        <td>{a.earned.toFixed(3)} ({(a.earned * spsPrice).toFixed(3)} {localCurrency.toLocaleUpperCase()})</td>
                                        <td>{a.rent.toFixed(3)} ({(a.rent * decPrice).toFixed(3)} {localCurrency.toLocaleUpperCase()})</td>
                                        <td>{((a.earned * spsPrice) - (a.rent * decPrice)).toFixed(3)} {localCurrency.toLocaleUpperCase()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NetIncomeTable;