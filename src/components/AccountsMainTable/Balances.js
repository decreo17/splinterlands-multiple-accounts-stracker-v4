import './Battles.css'
import AccountSlice from '../../slices/account-slice'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { deleteAccountFromLocalStorage } from '../../utils/deleteAccountFromLocalStorage'
import $ from 'jquery';
import { useEffect } from 'react';
import 'bootstrap'
import { faUsers, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Balances = () => {
    const localTheme = window.localStorage.getItem('theme');
    const dispatch = useDispatch()
    const accounts = useSelector((state)=> state.accounts);
    const sps = useSelector((state)=> state.unclaimedSps);

    const totalUnclaimedSps = (username) => {

        try {
            if(sps.length > 0) {
                let filtered = sps.filter(a => a.username === username)
                console.log(filtered)
                return filtered[0].total
    
            } else {
                return null
            } 

        } catch {
            return null
        }        
    }

    
    //fitler is not yet working, need to find better sort and filter
    $("#search-balances").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#jsonTableModern tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    useEffect(() => {
        if(localTheme === 'light') {
            console.log(localTheme)
            $("#jsonTableModern").removeClass("table-dark ");
        }
    })

    return (
        <div id="mainModern" className="w3-responsive card">
            <div className="card-body">
                <h5><b><i><FontAwesomeIcon icon={faUsers}/></i> Users:</b></h5>
                <input tabIndex="6" className="w3-input w3-border w3-padding" type="text" placeholder="Search for username.." id="search-balances" />
                <table id="jsonTableModern" className="w3-hoverable display table table-dark table-striped">
                    <thead>
                        <tr id="trAccounts" className="w3-dark-grey">
                            <th >#</th>
                            <th id="th-username">Username</th>
                            <th >ECR</th>
                            <th>Power</th>
                            <th >In-game DEC</th>
                            <th >SPS</th>
                            <th >Staked SPS</th>
                            <th>Credits</th>
                            <th>Voucher</th>
                            <th>Gold Potion</th>
                            <th>Legendary Potion</th>
                            <th>Glint</th>
                            <th>Merits</th>
                            <th>Unclaimed Sps <i title='Click on SPS Rank Rewards to load unclaimed SPS'><FontAwesomeIcon icon={faInfoCircle}/></i></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id='balance'>
                        {accounts.map((a, i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{a.username}</td>
                                <td>{`${a.ecr}`}</td>
                                <td>{a.power}</td>                                   
                                <td>{a.dec}</td>
                                <td>{a.sps}</td>
                                <td title={`Owned: ${a.s_sps} | Delegated in: ${a.s_sps_in} | Delegated out: ${a.s_sps_out}`}>
                                    { parseFloat(a.s_sps + a.s_sps_in - a.s_sps_out).toFixed(2)}</td>
                                <td>{a.credits}</td>
                                <td>{a.voucher}</td>
                                <td>{a.gold_potion}</td>
                                <td>{a.legend_potion}</td>
                                <td>{a.glint}</td>
                                <td>{a.merits}</td>
                                <td>{totalUnclaimedSps(a.username)}</td>
                                <td><button className="btn btn-sm btn-danger" onClick={() => {
                                    //delete from reducer
                                    dispatch(AccountSlice.actions.deleteAccount(a.username));
                                    //delete in localStorage
                                    deleteAccountFromLocalStorage(a.username)
                                }}>DELETE</button></td>
                            </tr>
                            ))}
                        </tbody>
                </table><br/>
            </div>
        </div>
    )
}

export default Balances