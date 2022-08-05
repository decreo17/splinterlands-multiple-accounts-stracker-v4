/**
 * This will be use to update the QuestSlice to have the account details
 */
import { getCurrentQuest } from '../../api/playerApi';

//for toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;    

export const getQuestDetails = async(username, settings) => {
    var questName = ""
    var questCompleted = 0
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
    
    await getCurrentQuest(username)
    .then((data) => {
        
        var dailyQuest = settings.daily_quests
        
        dailyQuest.forEach(quest => {
          if(quest.name === data[0].name) questName = quest.data.value
        });

        questCompleted = data[0].completed_items
        claimedId = data[0].claim_trx_id
        questClaimed = data[0].claim_date
        chestTier = data[0].chest_tier
        rshares = data[0].rshares
        chestLoot = ""
        startTime = new Date(data[0].created_date).getTime() + 86400000
        now = new Date().getTime()
        distance = startTime - now
        hours = Math.floor((distance % (day)) / (hour))
        minutes = Math.floor((distance % (hour)) / (minute))

        /*chest calculator*/
        var league = []
        if (chestTier == 0) {
          league = settings.loot_chests.quest[0]
          chestLoot = "Bronze"
        } else if (chestTier == 1) {
          league = settings.loot_chests.quest[1]
          chestLoot = "Silver"
        } else if (chestTier == 2) {
          league = settings.loot_chests.quest[2]
          chestLoot = "Gold"
        } else if (chestTier == 3) {
          league = settings.loot_chests.quest[3]
          chestLoot = "Diamond"
        } else if (chestTier == 4) {
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
        console.log("league " + league)

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
            if(claimedId == null) {
              claimedId = ""
            } else {
              claimedId = " ID: " + claimedId;
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
        username            : username,
        questName           : questName,
        questCompleted      : questCompleted,
        claimedId           : claimedId,
        questClaimed        : questClaimed,
        chestTier           : chestTier,
        rshares             : rshares,
        chestLoot           : chestLoot,
        startTime           : startTime,
        now                 : now,
        distance            : distance,
        hours               : hours,
        minutes             : minutes,
        base                : base,
        max                 : max,
        step_multiplier     : step_multiplier,
        chest_rShares       : chest_rShares,
        prev_total_rShares  : prev_total_rShares,
        chest               : chest,
        focus               : focus
    }
    
}

const UpdateQuests = () => {

}

export default UpdateQuests