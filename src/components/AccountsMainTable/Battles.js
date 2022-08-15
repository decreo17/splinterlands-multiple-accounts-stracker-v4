import './Battles.css'
import AccountSlice from '../../slices/account-slice'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { deleteAccountFromLocalStorage } from '../../utils/deleteAccountFromLocalStorage'
import $ from 'jquery';
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { useEffect } from 'react';

const Battles = () => {
    const localTheme = window.localStorage.getItem('theme');
    const dispatch = useDispatch()
    const accounts = useSelector((state)=> state.accounts);
    
    //fitler is not yet working, need to find better sort and filter
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#jsonTableWild tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    useEffect(() => {
        if(localTheme === 'light') {
        console.log(localTheme)
        $("#jsonTableWild").removeClass("table-dark ");
        }
    })
   
    return (
        <div id="mainWild" className="w3-responsive card">
            <div className="card-body">
                <h5><b><i><FontAwesomeIcon icon={faUsers}/></i> Users:</b></h5>
                <input tabIndex="6" className="w3-input w3-border w3-padding" type="text" placeholder="Search for username.." id="search" />
                <table id="jsonTableWild" className="w3-hoverable display table table-dark table-striped">
                    <thead>
                        <tr id="trAccounts" className="w3-dark-grey">
                            <th >#</th>
                            <th id="th-username">Username</th>
                            <th >ECR</th>
                            <th >Power</th>
                            <th >Rank</th>
                            <th >Rating</th>
                            <th >Last Team</th>
                            <th title="Last 50 Battles">Win Rate</th>
                            <th>Last Battle</th>
                            <th >Modern Rank</th>
                            <th >Modern Rating</th>
                            <th >Modern Last Team</th>
                            <th title="Last 50 Battles">Modern Win Rate</th>
                            <th>Modern Last Battle</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id='with-battles'>
                        {accounts.map((a, i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{a.username}</td>
                                <td>{`${a.ecr}%`}</td>
                                <td>{a.power}</td>
                                <td>{a.rank}</td>
                                <td>{a.rating}</td>
                                <td>{a.last_team}</td>
                                <td>
                                    <div className=" btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                                        {((a.winCount/50)*100).toFixed(2)}%
                                    </div>
                                    <ul className="dropdown-menu">
                                        <li><span className="dropdown-item">W: {a.winCount} D: {a.drawCount} L: {50 - a.winCount - a.drawCount}</span></li>
                                        <li><span className="dropdown-item" style={{color:'#2196F3'}}>{a.decEarned.toFixed(2)} DEC Earned</span></li>
                                    </ul>
                                </td>
                                    
                                <td style={{whiteSpace: 'nowrap'}}>{a.last_battle}</td>
                                <td>{a.modern_rank}</td>
                                <td>{a.modern_rating}</td>
                                <td>{a.modern_last_team}</td>
                                <td>
                                    <div type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                                        {((a.modern_winCount/50)*100).toFixed(2)}%
                                    </div>
                                    <ul className="dropdown-menu">
                                        <li><span className="dropdown-item">W: {a.modern_winCount} D: {a.modern_drawCount} L: {50 - a.modern_winCount - a.modern_drawCount}</span></li>
                                        <li><span className="dropdown-item" style={{color:'#2196F3'}}>{a.modern_decEarned.toFixed(2)} DEC Earned</span></li>
                                    </ul>
                                </td>
                                <td style={{whiteSpace: 'nowrap'}}>{a.modern_last_battle}</td>
                                <td><button className="btn-sm btn-danger" onClick={() => {
                                    //delete from reducer
                                    dispatch(AccountSlice.actions.deleteAccount(a.username));
                                    //delete in localStorage
                                    deleteAccountFromLocalStorage(a.username)
                                }}>DELETE</button></td>
                                {/**create a new component that will take a username prop, then pass that a.username to that component
                                 * The component should dispatch a change in the account-slice
                                 * account-slice should be update to add another action which has the logic to update that particular account
                                 * then add that component here and wrap it with <td>
                                 */}
                            </tr>
                            ))}
                        </tbody>
                </table><br/>
            </div>
        </div>
    )
}

export default Battles