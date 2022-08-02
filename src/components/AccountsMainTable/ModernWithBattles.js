import './WildWithBattles.css'
import AccountSlice from '../../slices/account-slice'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { deleteAccountFromLocalStorage } from '../../utils/deleteAccountFromLocalStorage'
import $ from 'jquery';

const ModernWithBattles = () => {

    const dispatch = useDispatch()
    const accounts = useSelector((state)=> state.accounts);
    
    //fitler is not yet working, need to find better sort and filter
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#jsonTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
   
    return (
        <div id="main1" className="w3-responsive card">
            <div className="card-header text-center">
                <a className="btn bg-gradient" data-bs-toggle="collapse" href="#collapseTwo">
                    MODERN
                </a>
            </div>
            <div id="collapseTwo" className="collapse show" data-bs-parent="#accordion">
                <div className="card-body">
                    <input tabIndex="6" className="w3-input w3-border w3-padding" type="text" placeholder="Search for username.." id="search" />
                    <table id="jsonTable" className="w3-text-black w3-table-all darkMode w3-hoverable display">
                        <thead>
                            <tr id="trAccounts" className="w3-dark-grey">
                                <th >#</th>
                                <th id="th-username">Username</th>
                                <th >ECR</th>
                                <th >Rank</th>
                                <th >Rating</th>
                                <th >Power</th>
                                <th >In-game DEC</th>
                                <th >SPS</th>
                                <th >Staked SPS</th>
                                <th >Last Team</th>
                                <th title="Last 50 Battles">Win Rate</th>
                                <th>Last Battle</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id='with-battles'>
                            {accounts.map((a, i) => (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{a.username}</td>
                                    <td>{`${a.ecr}%`}</td>
                                    <td>{a.modern_rank}</td>
                                    <td>{a.modern_rating.toLocaleString()}</td>
                                    <td>{a.power.toLocaleString()}</td>
                                    <td>{a.dec.toLocaleString()}</td>
                                    <td>{a.sps.toLocaleString()}</td>
                                    <td>{a.s_sps.toLocaleString()}</td>
                                    <td>{a.modern_last_team}</td>
                                    <td>W: {a.modern_winCount} D: {a.modern_drawCount} L: {50 - a.modern_winCount - a.modern_drawCount} 
                                            <br/> WinRate {((a.modern_winCount/50)*100).toFixed(2)}% 
                                            <br/><span style={{color:'#2196F3'}}> {a.modern_decEarned.toFixed(2)} DEC Earned</span></td>
                                    <td>{a.modern_last_battle}</td>
                                    <td><button className="btn-sm btn-danger" onClick={() => {
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
        </div>
    )
}

export default ModernWithBattles