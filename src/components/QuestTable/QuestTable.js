import './QuestTable.css'
import { useSelector } from 'react-redux/es/exports'
import $ from 'jquery';
import 'bootstrap'
import { useEffect } from 'react';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoadQuest from '../Accounts/LoadQuest';

const QuestTable = () => {
    const localTheme = window.localStorage.getItem('theme');
    const accounts = useSelector((state)=> state.quest);
    
    //fitler is not yet working, need to find better sort and filter
    $("#collapssearchQuesteQuest").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#questTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    useEffect(() => {
        if(localTheme === 'light') {
            console.log(localTheme)
            $("#questTable").removeClass("table-dark ");
        }
    })
   
    return (

        <div id="questTableCard" className="w3-responsive card">
            <div className="w3-container"  id="quest">
                    <br/>
                    <h5><b><i><FontAwesomeIcon icon={faBinoculars}/></i> Quest:</b></h5>
                    <div>
                        <LoadQuest/>
                    </div>
                    <input tabIndex="8" className="w3-input w3-border w3-padding" type="text" placeholder="Search.." id="collapssearchQuesteQuest" />
                    <div className="w3-responsive">
                        <table id="questTable" className="w3-hoverable display table table-dark table-striped">
                            <thead>
                                <tr id="trQuest" className="w3-dark-grey">
                                    <th >#</th>
                                    <th >Username</th>
                                    <th >Focus</th>
                                    <th >Completion</th>
                                    <th >Progress</th>
                                    <th >Time Remaining</th>
                                </tr>
                            </thead>
                            <tbody id='quest-table-body'>
                                {accounts.map((a, i) => (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{a.username}</td>
                                        <td>{a.focus}</td>
                                        <td>{a.questCompleted} | Daily Chest: {a.chest} </td>
                                        <td>
                                            <progress className="chest_progress" value={Math.round(a.rshares - a.prev_total_rShares)} 
                                                max={Math.round(a.chest_rShares - a.prev_total_rShares)}> 
                                                {Math.round(a.rshares - a.prev_total_rShares)/Math.round(a.chest_rShares - a.prev_total_rShares)}
                                            </progress>
                                            <span>  </span> 
                                            {Math.round(a.rshares - a.prev_total_rShares)} / 
                                            {Math.round(a.chest_rShares - a.prev_total_rShares)}

                                        </td>
                                        <td>{a.questClaimed}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table><br/>
                    </div>
                
            </div>
        </div>
    )
}

export default QuestTable