import splinterlandsApi from "./splinterlandsApi";
//for toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = splinterlandsApi
const retryMins = 2

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const getMillisToSleep = (minutes = 3) => {
  let millisToSleep = Math.round(parseFloat(minutes) * 1000 * 60)
  if (isNaN(millisToSleep)) {
    millisToSleep = Math.max(0, new Date(minutes) - new Date())
  }
  console.log(millisToSleep)
  return millisToSleep
}

const getPlayerData = async  (player) => {
    let res;
    try {
        //res = await $.getJSON(`${api}/players/details?name=${player}`)
        res = await fetch(`${api}/players/details?name=${player}`)
        .then(async (res) => {
          if(res.ok){
            console.log("Splinterlands API called getPlayerData" + res.status)
            return res.json()
          } else {
            if(res.status === 429 || res.status === 502) {
              const millisToSleep = getMillisToSleep(retryMins)
              
              toast.warning('API rate limit reach, will try again after ' + retryMins + ' minutes', {
                position: "top-center",
                autoClose: millisToSleep,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
                await sleep(millisToSleep)
              return getPlayerData(player)
            }
          }
        })
        return res;
    } catch (error) {
      console.log(error);
    }    
}

export const getPlayerBalance = async (player) => {
    let res 
    try {
        res = await fetch(`${api}/players/balances?username=${player}`)
        .then(async (res) => {
          if(res.ok){
            console.log("Splinterlands API called getPlayerBalance" + res.status)
            return res.json()
          } else {
            if(res.status === 429 || res.status === 502) {
              const millisToSleep = getMillisToSleep(retryMins)
              
              toast.warning('API rate limit reach, will try again after ' + retryMins + ' minutes', {
                position: "top-center",
                autoClose: millisToSleep,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
                await sleep(millisToSleep)
              return getPlayerBalance(player)
            }
          }
        })
        return res
    } catch (error) {
      console.log(error);
    }
}

export const getPlayerBattleHistoryWild = async (player) => {
  let res 
  try {
      res = await fetch(`${api}/battle/history?player=${player}&format=wild`)
      .then(async (res) => {
        if(res.ok){
          console.log("Splinterlands API called getPlayerBattleHistoryWild" + res.status)
          return res.json()
        } else {
          if(res.status === 429 || res.status === 502) {
            const millisToSleep = getMillisToSleep(retryMins)
            
            toast.warning('API rate limit reach, will try again after ' + retryMins + ' minutes', {
              position: "top-center",
              autoClose: millisToSleep,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
              });
            await sleep(millisToSleep)
            return getPlayerBattleHistoryWild(player)
          }
        }
      })
      return res;
  } catch (error) {
    console.log(error);
  }
}

export const getPlayerBattleHistoryModern = async (player) => {
  let res 
  try {
      res = await fetch(`${api}/battle/history?player=${player}&format=modern`)
      .then(async (res) => {
        if(res.ok){
          console.log("Splinterlands API called getPlayerBattleHistoryModern" + res.status)
          return res.json()
        } else {
          if(res.status === 429 || res.status === 502) {
            const millisToSleep = getMillisToSleep(retryMins)
            
            toast.warning('API rate limit reach, will try again after ' + retryMins + ' minutes', {
              position: "top-center",
              autoClose: millisToSleep,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
              });
              await sleep(millisToSleep)
            return getPlayerBattleHistoryModern(player)
          }
        }
      })
      return res;
  } catch (error) {
    console.log(error);
  }
}

//old
export const getCurrentQuest = async (player) => {
  let res 
  try {
      res = await fetch(`${api}/players/quests?username=${player}`)
      .then(async (res) => {
        if(res.ok){
          console.log("Splinterlands API called getCurrentQuest" + res.status)
          return res.json()
        } else {
          if(res.status === 429 || res.status === 502) {
            const millisToSleep = getMillisToSleep(retryMins)
            
            toast.warning('API rate limit reach, will try again after ' + retryMins + ' minutes', {
              position: "top-center",
              autoClose: millisToSleep,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
              });
              await sleep(millisToSleep)
            return getCurrentQuest(player)
          }
        }
      })
      return res;
  } catch (error) {
    console.log(error);
  }
}

//new
export const getCurrentRewards = async (player) => {
  let res 
  try {
      res = await fetch(`${api}/players/current_rewards?username=${player}`)
      .then(async (res) => {
        if(res.ok){
          console.log("Splinterlands API called getCurrentRewards" + res.status)
          return res.json()
        } else {
          if(res.status === 429 || res.status === 502) {
            const millisToSleep = getMillisToSleep(retryMins)
            
            toast.warning('API rate limit reach, will try again after ' + retryMins + ' minutes', {
              position: "top-center",
              autoClose: millisToSleep,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
              });
              await sleep(millisToSleep)
            return getCurrentRewards(player)
          }
        }
      })
  
      return res;
  } catch (error) {
    console.log(error);
  }
}

export const getDecTransactions = async (player, offset = 0) => {
  let res 
  try {
      res = await fetch(`${api}/players/balance_history?token_type=DEC&offset=${offset}&limit=10000&username=${player}`)
      .then(async (res) => {
        if(res.ok){
          console.log("Splinterlands API called getDecTransactions" + res.status)
          return res.json()
        } else {
          if(res.status === 429 || res.status === 502) {
            const millisToSleep = getMillisToSleep(retryMins)
            
            toast.warning('API rate limit reach, will try again after ' + retryMins + ' minutes', {
              position: "top-center",
              autoClose: millisToSleep,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
              });
              await sleep(millisToSleep)
            return getDecTransactions(player)
          }
        }
      })
      
      return res;
  } catch (error) {
    console.log(error);
  }
}

export const getUnclaimedBalanceHistory = async (player, offset = 0) => {
  let res 
  try {
      res = await fetch(`${api}/players/unclaimed_balance_history?token_type=SPS&offset=${offset}&limit=10000&username=${player}`)
      .then(async (res) => {
        if(res.ok){
          console.log("Splinterlands API called getUnclaimedBalanceHistory" + res.status)
          return res.json()
        } else {
          if(res.status === 429 || res.status === 502) {
            const millisToSleep = getMillisToSleep(retryMins)
            
            toast.warning('API rate limit reach, will try again after ' + retryMins + ' minutes', {
              position: "top-center",
              autoClose: millisToSleep,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
              });
              await sleep(millisToSleep)
            return getUnclaimedBalanceHistory(player)
          }
        }
      })
      
      return res;
  } catch (error) {
    console.log(error);
  }
}

export const getUnclaimedBalance = async (player) => {
  let res 
  try {
      res = await fetch(`${api}/players/unclaimed_balances?token_type=SPS&username=${player}`)
      .then(async (res) => {
        if(res.ok){
          console.log("Splinterlands API called getUnclaimedBalance" + res.status)
          return res.json()
        } else {
          if(res.status === 429 || res.status === 502) {
            const millisToSleep = getMillisToSleep(retryMins)
            
            toast.warning('API rate limit reach, will try again after ' + retryMins + ' minutes', {
              position: "top-center",
              autoClose: millisToSleep,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
              });
              await sleep(millisToSleep)
            return getUnclaimedBalance(player)
          }
        }
      })
      
      return res;
  } catch (error) {
    console.log(error);
  }
}

export const getCards = async (player) => {
  let res 
  try {
      res = await fetch(`${api}/cards/collection/${player}`)
      .then(async (res) => {
        if(res.ok){
          console.log("Splinterlands API called getCards" + res.status)
          return res.json()
        } else {
          if(res.status === 429 || res.status === 502) {
            const millisToSleep = getMillisToSleep(retryMins)
            
            toast.warning('API rate limit reach, will try again after ' + retryMins + ' minutes', {
              position: "top-center",
              autoClose: millisToSleep,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
              });
              await sleep(millisToSleep)
            return getCards(player)
          }
        }
      })
      return res;
  } catch (error) {
    console.log(error);
  }
}

export default getPlayerData