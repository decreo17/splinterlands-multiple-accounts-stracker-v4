import $ from 'jquery';
//for toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const retryMins = 2

const sleep = async (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const getMillisToSleep = (minutes = 3) => {
  let millisToSleep = Math.round(parseFloat(minutes) * 1000)
  if (isNaN(millisToSleep)) {
    millisToSleep = Math.max(0, new Date(minutes) - new Date())
  }
  return millisToSleep
}

const getSpsRewardsPool = async() => {
  let res 
  try {
      res = await fetch('https://api2.splinterlands.com/players/unclaimed_balances?username=$REWARD_POOLS&token_type=SPS&token_type=SPS&offset=0&limit=1000')
      .then(async (res) => {
        if(res.ok){
          console.log("Splinterlands API called getRewardsPool" + res.status)
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
            return getSpsRewardsPool()
          }
        }
      })
      return res
  } catch (error) {
    console.log(error);
  }
}

const getRewardsPool = async() => {
    let res 
    try {
        res = await fetch('https://steemmonsters.com/players/dec')
        .then(async (res) => {
          if(res.ok){
            console.log("Splinterlands API called getRewardsPool" + res.status)
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
              return getRewardsPool()
            }
          }
        })
        return res
    } catch (error) {
      console.log(error);
    }
}

const rewardsApi = getSpsRewardsPool()

export default rewardsApi