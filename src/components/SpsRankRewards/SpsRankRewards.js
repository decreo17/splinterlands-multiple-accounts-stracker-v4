import './SpsRankRewards.css'
import { useSelector } from 'react-redux/es/exports'
import $ from 'jquery';
import 'bootstrap'
import { useEffect, useState } from 'react';
import { faBinoculars, faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUnclaimedBalance } from '../../api/playerApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import UnclaimedSpsSlice from '../../slices/unclaimedSpsSlice';
import Loading from '../Loading/Loading';

//get unclaimedbalances
export const getUnclaimedSpsBalance = async(username) => {
    var wild = 0
    var modern = 0
    var season = 0
    var focus = 0
    //var total = 0

    await getUnclaimedBalance(username)
    .then((data) => {
        data['unclaimed_balances'].forEach((account) => {
            if(account.type === "wild") wild = account.balance
            else if (account.type === "modern") modern = account.balance
            else if (account.type === "focus") focus = account.balance
            else if (account.type === "season") season = account.balance
        })
    })
    .catch(err => {
        console.error(err);
        toast.error('There was an error while getting the unclaimed SPS balance for ' + username, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });
        return null;
    });


    return {
        username    : username,
        wild        : wild,
        modern      : modern,
        season      : season,
        focus       : focus,
        total       : parseFloat(wild) + parseFloat(modern) + parseFloat(season) + parseFloat(focus)
    }
}

export const UpdateUnclaimedSpsBalance = ()=> {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const loadSpsFromAccountsLocalStorage = () => {
        dispatch(UnclaimedSpsSlice.actions.reset())
        let usernames = [];
        let local = localStorage.getItem("accounts");
        //let accounts = []
        if (local == null || !local) {      
            toast.error("There are no valid accounts to load", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });
        } else {
            usernames.push(localStorage.getItem("accounts"));
            usernames = usernames.toString().split(",");
            (async () => {
                setLoading(true)
                for (let user of usernames) {
                    try {
                        await getUnclaimedSpsBalance(user)
                        .then(data => {
                            dispatch(UnclaimedSpsSlice.actions.addAccount(data))
                        })
                    } catch (e) {
                        console.log("There was an error while processing " + user + "\n" + e)
                        toast.error("There was an error while processing " + user + " | " + e, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored"
                        });
                    }
                }
            toast.success("Accounts Loaded!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
                setLoading(false)
            })();
        
        }
    }

    return (
        <div className='col-lg-2 col-md-3 col-sm-6'>
            <button id='load-unclaimed-sps' className="btn btn-sm btn-success m-1" onClick={()=> {
                loadSpsFromAccountsLocalStorage()
            }}>LOAD/REFRESH RANK REWARDS</button>
            {loading && <Loading/>}
        </div>
    
      )
}

const SpsRankRewards = () => {
    const localTheme = window.localStorage.getItem('theme');
    const sps = useSelector((state)=> state.unclaimedSps);
    var total_wild = 0
    var total_modern = 0
    var total_focus = 0
    var total_season = 0
    var total_total = 0

    sps.forEach(balance => {
        total_wild += parseFloat(balance.wild)
        total_modern += parseFloat(balance.modern)
        total_focus += parseFloat(balance.focus)
        total_season += parseFloat(balance.season)
        total_total += parseFloat(balance.total)
    })
    
    //fitler is not yet working, need to find better sort and filter
    $("#collapsSearchSps").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#spsRankRewardsTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    useEffect(() => {
        if(localTheme === 'light') {
            console.log(localTheme)
            $("#spsRankRewardsTable").removeClass("table-dark ");
        }
    })

    return (

        <div id="spsRankRewardsTableCard" className="w3-responsive card">
            <div className="w3-container"  id="sps-unclaimed">
                    <br/>
                    <h5><b><i><FontAwesomeIcon icon={faBinoculars}/></i> SPS Rank Rewards:</b></h5>
                    <div>
                        <UpdateUnclaimedSpsBalance/>
                    </div>
                    <input className="w3-input w3-border w3-padding" type="text" placeholder="Search.." id="collapsSearchSps" />
                    <div className="w3-responsive">
                        <table id="spsRankRewardsTable" className="w3-hoverable display table table-dark table-striped">
                            <thead>
                                <tr id="trsps-unclaimed" className="w3-dark-grey">
                                    <th >#</th>
                                    <th >Username</th>
                                    <th >Battles Wild</th>
                                    <th >Battles Modern</th>
                                    <th >Season Chest</th>
                                    <th >Focus Chest</th>
                                    <th >Total</th>
                                </tr>
                            </thead>
                            <tbody id='sps-unclaimed-table-body'>
                                {sps.map((a, i) => (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{a.username}</td>
                                        <td>{parseFloat(a.wild).toFixed(3)}</td>
                                        <td>{parseFloat(a.modern).toFixed(3)}</td>
                                        <td>{parseFloat(a.season).toFixed(3)}</td>
                                        <td>{parseFloat(a.focus).toFixed(3)}</td>
                                        <td>{parseFloat(a.total).toFixed(3)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <th>-</th>
                                    <th>Total</th>
                                    <th>{parseFloat(total_wild).toFixed(3)}</th>
                                    <th>{parseFloat(total_modern).toFixed(3)}</th>
                                    <th>{parseFloat(total_season).toFixed(3)}</th>
                                    <th>{parseFloat(total_focus).toFixed(3)}</th>
                                    <th>{parseFloat(total_total).toFixed(3)}</th>                                    
                                </tr>
                            </tbody>
                        </table><br/>
                    </div>
            </div>
        </div>
    )

}

export default SpsRankRewards;