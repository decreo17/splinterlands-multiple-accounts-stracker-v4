import './QuestTable.css'
import { useSelector } from 'react-redux/es/exports'
import $ from 'jquery';
import 'bootstrap'
import { useEffect } from 'react';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoadQuest from '../Accounts/LoadQuest';

const SeasonTable = () => {
    const localTheme = window.localStorage.getItem('theme');
    const accounts = useSelector((state)=> state.quest);
    
    //fitler is not yet working, need to find better sort and filter
    $("#collapssearchSeason").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#seasonTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    useEffect(() => {
        if(localTheme === 'light') {
            console.log(localTheme)
            $("#seasonTable").removeClass("table-dark ");
        }
    })
   
    return (

        <div id="seasonTableCard" className="w3-responsive card">
            <div className="w3-container"  id="season">
                    <br/>
                    <h5><b><i><FontAwesomeIcon icon={faBinoculars}/></i> Season:</b></h5>
                    <div>
                        <LoadQuest/>
                    </div>
                    <input tabIndex="8" className="w3-input w3-border w3-padding" type="text" placeholder="Search.." id="collapssearchSeason" />
                    <div className="w3-responsive">
                        <table id="seasonTable" className="w3-hoverable display table table-dark table-striped">
                            <thead>
                                <tr id="trSeason" className="w3-dark-grey">
                                    <th >#</th>
                                    <th >Username</th>
                                    <th >League</th>
                                    <th >Completion</th>
                                    <th >Progress</th>
                                </tr>
                            </thead>
                            <tbody id='season-table-body'>
                                {accounts.map((a, i) => (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{a.username}</td>
                                        <td>{a.seasonChestLoot} Chest</td>
                                        <td>Season Chest: {a.seasonChestEarned} </td>
                                        <td>
                                            <progress className="chest_progress" value={Math.round(a.seasonRshares - a.season_prev_total_rShares)} 
                                                max={Math.round(a.season_chest_rShares - a.season_prev_total_rShares)}> 
                                                {Math.round(a.seasonRshares - a.season_prev_total_rShares)/Math.round(a.season_chest_rShares - a.season_prev_total_rShares)}
                                            </progress>
                                            <span>  </span> 
                                            {Math.round(a.seasonRshares - a.season_prev_total_rShares)} /<span> </span> 
                                            {Math.round(a.season_chest_rShares - a.season_prev_total_rShares)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table><br/>
                    </div>
                
            </div>
        </div>
    )
}

export default SeasonTable