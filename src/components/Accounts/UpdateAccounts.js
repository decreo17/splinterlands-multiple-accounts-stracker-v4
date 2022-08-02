/**
 * This will be use to update the AccountSlice to have the account details
 */

import getPlayerData, { getPlayerBalance, getPlayerBattleHistoryWild, getPlayerBattleHistoryModern } from "../../api/playerApi"
import { useDispatch, useSelector } from "react-redux";
import league from "../../utils/league";
import calculateECR from "../../utils/calculateEcr";
import LoadingSlice from "../../slices/loadingSlice";
import AccountSlice from "../../slices/account-slice";
import splinter from "../../utils/splinter";
import moment from "moment";
import React, { useEffect } from "react";

//for toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//const accounts = useSelector((state)=> state.accounts);

export const getAccountDetails = async(username) => {
    let ecr = 0;
    //const dispatch = useDispatch();
    let rank = "";
    let rating = 0;
    let power = 0;
    let dec = 0;
    let sps = 0;
    let s_sps = 0;
    let credits = 0;
    let voucher = 0;
    let chaos = 0;
    let gold_potion = 0;
    let legend_potion = 0;
    let last_team = "no battle";
    let win_rate = "";
    let last_battle = "no battle";
    let modern_rank = "";
    let modern_rating = 0;
    let modern_last_team = "no battle";
    let modern_win_rate = "";
    let modern_last_battle = "no battle";

    //player battle history
    let winCount = 0,
    drawCount = 0,
    decEarned = 0,
    team = "", 
    wl= "", 
    modern_winCount = 0,
    modern_drawCount = 0,
    modern_decEarned = 0,
    modern_team = "", 
    modern_wl= "",
    player = username;


    await getPlayerData(username)
    .then((data) => {
            console.log(data)
            rank = league(data.league)
            rating = data.rating
            power = data.collection_power
            modern_rank = league(data.modern_league)
            modern_rating = data.modern_rating
    })
    .catch(err => {
        console.error(err);
        //dispatch(LoadingSlice.actions.isLoading(false))
        toast.error('There was an error with player data of ' + username, {
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

    await getPlayerBalance(username)
    .then((data) => {
        //console.log(data)
        var lastCaptureRate = data.find(x => x.token === "ECR").balance, 
        lastRewardTime = new Date(data.find(x => x.token === "ECR").last_reward_time);    
        
        ecr = (calculateECR(lastCaptureRate, lastRewardTime)/100).toFixed(2);

        data.forEach((account) => {
            if(account.token === "DEC") dec = account.balance
            else if (account.token === "SPS") sps = account.balance
            else if (account.token === "SPSP") s_sps = account.balance
            else if (account.token === "VOUCHER") voucher = account.balance
            else if (account.token === "GOLD") gold_potion = account.balance
            else if (account.token === "LEGENDARY") legend_potion = account.balance
            else if (account.token === "CHAOS") chaos = account.balance
            else if (account.token === "CREDITS") credits = account.balance
        })
    })
    .catch(err => {
        console.error(err);
        //dispatch(LoadingSlice.actions.isLoading(false))
        toast.error('There was an error in getting the balance of ' + username, {
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

    await getPlayerBattleHistoryWild(username)
    .then((data) => {
        //console.log(data)
        try {
            if(data.battles[0].winner === player){ wl = "WIN " + 
            parseFloat(JSON.parse(data.battles[0].reward_dec).toFixed(2)) + " DEC" } else { if(data.battles[0].winner !== player || data.battles[0].winner !== "DRAW") { wl = "LOSE" } }
            if(data.battles[0].winner === "DRAW"){ wl = "DRAW" }
        } catch (e) {
            setTimeout(function() {
                if(data.battles[0].winner === player){ wl = "WIN " + 
                parseFloat(JSON.parse(data.battles[0].reward_dec).toFixed(2)) + " DEC" } else { if(data.battles[0].winner !== player || data.battles[0].winner !== "DRAW") { wl = "LOSE" } }
                if(data.battles[0].winner === "DRAW"){ wl = "DRAW" }
            }, 1000)
        }

        try {
            //console.log(JSON.parse(data.battles[i].details).team1.player)
            if(JSON.parse(data.battles[0].details).team1.player === player){
                team = splinter(JSON.parse(data.battles[0].details).team1.color) + " - " + wl        
            } else {
                team = splinter(JSON.parse(data.battles[0].details).team2.color) + " - " + wl
            }
        } catch (e) {
            //console.log(e)
            try {
                if(data.battles[0].winner === player){
                    team = "The enemy surrendered - " + wl ;
                } else {
                    team = "You surrendered - LOSE";
                }
            } catch (e) {
            //console.log(e);
                if(JSON.parse(data.battles[0].details).winner === player) {
                    team = "The enemy surrendered";
                } else {
                    team = "You surrendered";
                }
            }        
        }
        
        for (var i = 0; i < data.battles.length; i++) {

            //var win = data.battles[i].winner;
            try {
            
            if(data.battles[i].winner === player){ winCount++; wl = "WIN" } else { if(data.battles[i].winner !== player || data.battles[i].winner !== "DRAW") { wl = "LOSE" } }
            if(data.battles[i].winner === "DRAW"){ drawCount++; wl = "DRAW" }
            
            } catch (e) {
                console.log(e);
                setTimeout(function() {
                if(data.battles[i].winner === player){ winCount++; wl = "WIN" } else { if(data.battles[i].winner !== player || data.battles[i].winner !== "DRAW") { wl = "LOSE" } }
                if(data.battles[i].winner === "DRAW"){ drawCount++; wl = "DRAW" } }, 1000)
            }

            try {
                if(data.battles[i].winner === player){ decEarned += parseFloat(JSON.parse(data.battles[i].reward_dec).toFixed(2))}
            } catch (e) {
                console.log(e)     
            }
            last_battle = moment(data.battles[0].created_date).fromNow();
        }

        //win_rate = <WinRate winCount={winCount} drawCount={drawCount} decEarned={decEarned}/>
        win_rate =`W: ${winCount} D: ${drawCount} L: ${50 - winCount - drawCount} <br/> WinRate ${((winCount/50)*100).toFixed(2)}% <br><span style='color:#2196F3' ${decEarned.toFixed(2)} \nDEC Earned</span>`
        /*
        win_rate = "W: " + winCount + " D: " + drawCount + " L: " + (50 - winCount - drawCount) + <br/> + "WinRate: " + 
            ((winCount/50)*100).toFixed(2) + "% " + "<br/><span style={{color:'#2196F3'}}/>" + 
            decEarned.toFixed(2) + " \nDEC Earned</span>"*/

        last_team = team
    })
    .catch(err => {
        console.error(err);
        //dispatch(LoadingSlice.actions.isLoading(false))
        //alert('An error occured');
        toast.error('There was an error while getting the wild battles of ' + username, {
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

    await getPlayerBattleHistoryModern(username)
    .then((data) => {
        //console.log(data)
        try {
            if(data.battles[0].winner === player){ modern_wl = "WIN " + 
            parseFloat(JSON.parse(data.battles[0].reward_dec).toFixed(2)) + " DEC" } else { if(data.battles[0].winner !== player || data.battles[0].winner !== "DRAW") { modern_wl = "LOSE" } }
            if(data.battles[0].winner === "DRAW"){ modern_wl = "DRAW" }
        } catch (e) {
            setTimeout(function() {
                if(data.battles[0].winner === player){ modern_wl = "WIN " + 
                parseFloat(JSON.parse(data.battles[0].reward_dec).toFixed(2)) + " DEC" } else { if(data.battles[0].winner !== player || data.battles[0].winner !== "DRAW") { modern_wl = "LOSE" } }
                if(data.battles[0].winner === "DRAW"){ modern_wl = "DRAW" }
            }, 1000)
        }

        try {
            //console.log(JSON.parse(data.battles[i].details).team1.player)
            if(JSON.parse(data.battles[0].details).team1.player === player){
                modern_team = splinter(JSON.parse(data.battles[0].details).team1.color) + " - " + modern_wl        
            } else {
                modern_team = splinter(JSON.parse(data.battles[0].details).team2.color) + " - " + modern_wl
            }
        } catch (e) {
            //console.log(e)
            try {
                if(data.battles[0].winner === player){
                    modern_team = "The enemy surrendered - " + modern_wl ;
                } else {
                    modern_team = "You surrendered - LOSE";
                }
            } catch (e) {
            //console.log(e);
                if(JSON.parse(data.battles[0].details).winner === player) {
                    modern_team = "The enemy surrendered";
                } else {
                modern_team = "You surrendered";
                }
            }        
        }
        
        for (var i = 0; i < data.battles.length; i++) {

            //var win = data.battles[i].winner;
            try {
            
            if(data.battles[i].winner === player){ modern_winCount++; modern_wl = "WIN" } else { if(data.battles[i].winner !== player || data.battles[i].winner !== "DRAW") { modern_wl = "LOSE" } }
            if(data.battles[i].winner === "DRAW"){ modern_drawCount++; modern_wl = "DRAW" }
            
            } catch (e) {
                console.log(e);
                setTimeout(function() {
                if(data.battles[i].winner === player){ modern_winCount++; modern_wl = "WIN" } else { if(data.battles[i].winner !== player || data.battles[i].winner !== "DRAW") { modern_wl = "LOSE" } }
                if(data.battles[i].winner === "DRAW"){ modern_drawCount++; modern_wl = "DRAW" } }, 1000)
            }

            try {
                if(data.battles[i].winner === player){ modern_decEarned += parseFloat(JSON.parse(data.battles[i].reward_dec).toFixed(2))}
            } catch (e) {
                console.log(e)     
            }
            modern_last_battle = moment(data.battles[0].created_date).fromNow();
        }

        modern_win_rate =`W: ${modern_winCount} D: ${modern_drawCount} L: ${50 - modern_winCount - modern_drawCount} <br> WinRate ${((modern_winCount/50)*100).toFixed(2)}% <br><span style='color:#2196F3' ${modern_decEarned.toFixed(2)} \nDEC Earned</span>`
        /*
        win_rate = "W: " + winCount + " D: " + drawCount + " L: " + (50 - winCount - drawCount) + <br/> + "WinRate: " + 
            ((winCount/50)*100).toFixed(2) + "% " + "<br/><span style={{color:'#2196F3'}}/>" + 
            decEarned.toFixed(2) + " \nDEC Earned</span>"*/

        modern_last_team = modern_team
    })
    .catch(err => {
        console.error(err);
        //dispatch(LoadingSlice.actions.isLoading(false))
        toast.error('There was an error while getting the modern battles of ' + username, {
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
        username                : username,
        ecr                     : ecr,
        rank                    : rank, 
        rating                  : rating, 
        power                   : power, 
        dec                     : dec, 
        sps                     : sps,
        s_sps                   : s_sps, 
        credits                 : credits, 
        voucher                 : voucher, 
        chaos                   : chaos,
        gold_potion             : gold_potion, 
        legend_potion           : legend_potion, 
        last_team               : last_team, 
        win_rate                : win_rate, 
        last_battle             : last_battle,
        decEarned               : decEarned,
        winCount                : winCount,
        drawCount               : drawCount,
        modern_winCount         : modern_winCount,
        modern_drawCount        : modern_drawCount,
        modern_decEarned        : modern_decEarned,
        modern_rank             : modern_rank, 
        modern_rating           : modern_rating, 
        modern_last_team        : modern_last_team, 
        modern_win_rate         : modern_win_rate, 
        modern_last_battle      : modern_last_battle
    }
}


const UpdateAccounts = ()=> {
    const dispatch = useDispatch();
};

export default UpdateAccounts