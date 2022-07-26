import splinterlandsApi from "./splinterlandsApi";
import $ from 'jquery';

const api = splinterlandsApi

const getPlayerData = async  (player) => {
    let res;
    try {
        res = await $.getJSON(`${api}/players/details?name=${player}`);
        return res;
    } catch (error) {
      console.log(error);
    }    
}

export default getPlayerData