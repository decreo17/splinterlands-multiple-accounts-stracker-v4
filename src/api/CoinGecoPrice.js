import $ from 'jquery';
//for toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const retryMins = 1

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const getMillisToSleep = (minutes = 3) => {
  let millisToSleep = Math.round(parseFloat(minutes) * 1000)
  if (isNaN(millisToSleep)) {
    millisToSleep = Math.max(0, new Date(minutes) - new Date())
  }
  return millisToSleep
}

const CoinGecoPriceApi = async(coinID) => {
    let res 
    try {
        res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`)
        .then(async (res) => {
            if(res.ok){
              console.log("Splinterlands API called CoinGecoPriceApi" + res.status)
              return res.json()
            } else {
              if(res.status === 429 || res.status === 502) {
                const millisToSleep = getMillisToSleep(retryMins)
                await sleep(millisToSleep)
                return CoinGecoPriceApi(coinID)
              }
            }
          })
        return res;
    } catch (error) {
        console.log(error);
    }
}

export default CoinGecoPriceApi