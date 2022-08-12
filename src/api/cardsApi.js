import splinterlandsApi from "./splinterlandsApi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cardsDetailsJson from "../json/cardsDetails.json";

const api = splinterlandsApi
//const cardsDetailsJson = require('../json/cardsDetails.json')

const retryMins = 2

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

export const getCardDetails = (cardId) => {
    var cardInfo = []
    cardInfo = (cardsDetailsJson.filter(c => c.id == cardId));
    return cardInfo[0]
}

const getCardsDetailsFromApi = async  () => {
    let res;
    try {
        res = await fetch(`${api}/cards/get_details`)
        .then(async (res) => {
            if(res.ok){
              console.log("Splinterlands API called getCardsDetailsFromApi" + res.status)
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
                return getCardsDetailsFromApi()
              }
            }
          })
        return res;
    } catch (error) {
      console.log(error);
    }    
}

export default getCardsDetailsFromApi

