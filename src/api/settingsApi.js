import $ from 'jquery';
import splinterlandsApi from './splinterlandsApi';
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

const api = splinterlandsApi

const getSplinterlandsSettings = async() => {
    let res 
    try {
      console.log("Splinterlands API called getSplinterlandsSettings")
        res = await fetch(`${api}/settings`)
        .then(async (res) => {
          if(res.ok){
            console.log("Splinterlands API called getSplinterlandsSettings" + res.status)
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
              return getSplinterlandsSettings()
            }
          }
        })
        return res
    } catch (error) {
      console.log(error);
    }
}

const settingsApi = getSplinterlandsSettings()

export default settingsApi


