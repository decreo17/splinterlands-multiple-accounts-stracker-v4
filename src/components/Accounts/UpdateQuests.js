/**
 * This will be use to update the QuestSlice to have the account details
 */
import { getCurrentRewards } from '../../api/playerApi';

//for toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;   

export const getQuestDetails = async(username, settings) => {
    var questName = ""
    var claimedId = ""
    var questClaimed = ""
    var chestTier = ""
    var rshares = 0
    var chestLoot = ""
    var startTime = ""
    var now = ""
    var distance = ""
    var hours = ""
    var minutes = ""
    var base = 0
    var max = ""
    var step_multiplier = 0
    var chest_rShares = 0
    var prev_total_rShares = 0
    var chest = 0
    var focus = ""
    //season
    var seasonRshares = 0
    var seasonChestTeir = ""
    var seasonMax = 150
    var seasonChestEarned = 0
    var seasonBase = 0
    var seasonChestLoot = ""
    var season_step_multiplier = 0
    var season_chest_rShares = 0
    var season_prev_total_rShares = 0
    
    await getCurrentRewards(username)
    .then((data) => {
        var questData = data.quest_reward_info

        var dailyQuest = settings.daily_quests
        
        dailyQuest.forEach(quest => {
          if(quest.name === questData.name) questName = quest.data.value
        });

        claimedId = questData.claim_trx_id
        questClaimed = questData.claim_date
        chestTier = questData.chest_tier
        rshares = questData.rshares
        startTime = new Date(questData.created_date).getTime() + 86400000
        now = new Date().getTime()
        distance = startTime - now
        hours = Math.floor((distance % (day)) / (hour))
        minutes = Math.floor((distance % (hour)) / (minute))

        /*chest calculator*/
        var league = []
        if (chestTier === 0) {
          league = settings.loot_chests.quest[0]
          chestLoot = "Bronze"
        } else if (chestTier === 1) {
          league = settings.loot_chests.quest[1]
          chestLoot = "Silver"
        } else if (chestTier === 2) {
          league = settings.loot_chests.quest[2]
          chestLoot = "Gold"
        } else if (chestTier === 3) {
          league = settings.loot_chests.quest[3]
          chestLoot = "Diamond"
        } else if (chestTier === 4) {
          league = settings.loot_chests.quest[4]
          chestLoot = "Champion"
        } else {
          console.log("There was an error with tier")
          toast.error('There was an error with getting the tier for ' + username, {
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

        base = league.base
        max = league.max
        step_multiplier = league.step_multiplier
        chest_rShares = base
        
        while (rshares >= chest_rShares) {
          prev_total_rShares = chest_rShares
          chest_rShares = (chest_rShares *= step_multiplier) + base
          chest += 1
        }

        if (chest >= max) {
            chest = max
        }
        /*End*/

        try {
          if(questClaimed == null) {
            if (hours < 0) {
              questClaimed = "Request new focus/Claim your chest"
            } else {
              questClaimed = `${hours}:${minutes} (HRS:MIN)`
            }
          } else {
              questClaimed = new Date(questClaimed);
          }

        } catch (e) {
          toast.error('There was an error with getting the quest for ' + username, {
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
          
        focus = questName + " : " + chestLoot + " Chest" ;  
        
        /*Season*/
        var seasonData = data.season_reward_info
        seasonRshares = seasonData.rshares
        seasonChestEarned = seasonData.chest_earned
        seasonChestTeir = seasonData.chest_tier

        /*season chest calculator*/
        var seasonLeague = []
        if (seasonChestTeir === 0) {
          seasonLeague = settings.loot_chests.season[0]
          seasonChestLoot = "Bronze"
        } else if (seasonChestTeir === 1) {
          seasonLeague = settings.loot_chests.season[1]
          seasonChestLoot = "Silver"
        } else if (seasonChestTeir === 2) {
          seasonLeague = settings.loot_chests.season[2]
          seasonChestLoot = "Gold"
        } else if (seasonChestTeir === 3) {
          seasonLeague = settings.loot_chests.season[3]
          seasonChestLoot = "Diamond"
        } else if (seasonChestTeir === 4) {
          seasonLeague = settings.loot_chests.season[4]
          seasonChestLoot = "Champion"
        } else {
          console.log("There was an error with season tier")
          toast.error('There was an error with getting the season tier for ' + username, {
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

        seasonBase = seasonLeague.base
        season_step_multiplier = seasonLeague.step_multiplier
        season_chest_rShares = seasonBase
        
        while (seasonRshares >= season_chest_rShares) {
          season_prev_total_rShares = season_chest_rShares
          season_chest_rShares = (season_chest_rShares *= season_step_multiplier) + seasonBase
        }
        /*End*/

    })
    .catch(err => {
        console.error(err);
        toast.error('There was an error while getting the quest details for ' + username, {
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
        username                  : username,
        questName                 : questName,
        claimedId                 : claimedId,
        questClaimed              : questClaimed,
        chestTier                 : chestTier,
        rshares                   : rshares,
        chestLoot                 : chestLoot,
        startTime                 : startTime,
        now                       : now,
        distance                  : distance,
        hours                     : hours,
        minutes                   : minutes,
        base                      : base,
        max                       : max,
        step_multiplier           : step_multiplier,
        chest_rShares             : chest_rShares,
        prev_total_rShares        : prev_total_rShares,
        chest                     : chest,
        focus                     : focus,
        seasonRshares             : seasonRshares,
        seasonChestTeir           : seasonChestTeir,
        seasonMax                 : seasonMax,
        seasonChestEarned         : seasonChestEarned,
        seasonBase                : seasonBase,
        seasonChestLoot           : seasonChestLoot,
        season_step_multiplier    : season_step_multiplier,
        season_chest_rShares      : season_chest_rShares,
        season_prev_total_rShares : season_prev_total_rShares
    }
    
}

const UpdateQuests = () => {

}

export default UpdateQuests