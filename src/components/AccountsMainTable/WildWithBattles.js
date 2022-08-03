import './WildWithBattles.css'
import AccountSlice from '../../slices/account-slice'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { deleteAccountFromLocalStorage } from '../../utils/deleteAccountFromLocalStorage'
import $ from 'jquery';
//import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { useEffect } from 'react';

const WildWithBattles = () => {
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
        <div id="main1" className="w3-responsive card">
            <div className="card-header text-center">
                <a className="btn bg-gradient" data-bs-toggle="collapse" href="#collapseOne">
                    WILD
                </a>
            </div>
            <div id="collapseOne" className="collapse show" data-bs-parent="#accordion">
                <div className="card-body">
                    <input tabIndex="6" className="w3-input w3-border w3-padding" type="text" placeholder="Search for username.." id="search" />
                    <table id="jsonTableWild" className="w3-hoverable display table table-dark table-striped">
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
                                    <td>{a.rank}</td>
                                    <td>{a.rating}</td>
                                    <td>{a.power}</td>
                                    <td>{a.dec}</td>
                                    <td>{a.sps}</td>
                                    <td>{a.s_sps}</td>
                                    <td>{a.last_team}</td>
                                    <td>W: {a.winCount} D: {a.drawCount} L: {50 - a.winCount - a.drawCount} 
                                            <br/> WinRate {((a.winCount/50)*100).toFixed(2)}% 
                                            <br/><span style={{color:'#2196F3'}}> {a.decEarned.toFixed(2)} DEC Earned</span></td>
                                    <td>{a.last_battle}</td>
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

export default WildWithBattles