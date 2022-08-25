import UpdateNetIncome from '../Accounts/UpdateNetIncome'
import './NetIncomeTable.css'
import $ from 'jquery';
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import UpdateMarketPrice from '../UpdateMarketPrice/UpdateMarketPrice';
import PnlTable from '../PnlTable/PnlTable';
import 'bootstrap'



const NetIncomeTable = ()=> {
    const netincome = useSelector((state)=> state.transactions.netIncome);
    const localTheme = window.localStorage.getItem('theme');

    $("#collapsSearchNetIncome").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#netincome-table tr").filter(function() {
          return $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          
        });
    });

    useEffect(() => {
        if(localTheme === 'light') {
        console.log(localTheme)
        $("#netincome-table").removeClass("table-dark ");
        }
    })

    return (
        <>
            <div id="netincome-card" className=" card netincome-table-div">
                <div className="w3-container"  id="quest">
                    <br/>
                    <h5><b><i><FontAwesomeIcon icon={faUsers}/></i> Users:</b></h5>
                    <div>
                        <UpdateNetIncome/> 
                    </div>
                    <div className="">
                        <input className="w3-input w3-border w3-padding" type="text" 
                            placeholder="Search.." id="collapsSearchNetIncome" />
                        <table id="netincome-table" className="w3-hoverable display table table-dark table-striped">
                            <thead>
                                <tr id="tr-netincome" className="sticky-table-head w3-dark-grey">
                                    <th >#</th>
                                    <th >Username</th>
                                    <th >Dec Earned</th>
                                    <th >Rent</th>
                                    <th >Net Income</th>
                                </tr>
                            </thead>
                            <tbody id='netincome-table-body'>
                                {netincome.map((a, i) => (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{a.username}</td>
                                        <td>{a.earned.toFixed(3)}</td>
                                        <td>{a.rent.toFixed(3)}</td>
                                        <td>{a.netIncome.toFixed(3)}</td>
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