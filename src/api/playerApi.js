import splinterlandsApi from "./splinterlandsApi";
import $ from 'jquery';

const api = splinterlandsApi

const getPlayerData = async  (player) => {
    let res;
    try {
        res = await $.getJSON(`${api}/players/details?name=${player}`);
        console.log("Splinterlands API called getPlayerData")
        return res;
    } catch (error) {
      console.log(error);
    }    
}

export const getPlayerBalance = async (player) => {
    let res 
    try {
        res = await $.getJSON(`${api}/players/balances?username=${player}`);
        console.log("Splinterlands API called getPlayerBalance")
        return res;
    } catch (error) {
      console.log(error);
    }
}

export const getPlayerBattleHistoryWild = async (player) => {
  let res 
  try {
      res = await $.getJSON(`${api}/battle/history?player=${player}&format=wild`);
      console.log("Splinterlands API called getPlayerBattleHistoryWild")
      return res;
  } catch (error) {
    console.log(error);
  }
}

export const getPlayerBattleHistoryModern = async (player) => {
  let res 
  try {
      res = await $.getJSON(`${api}/battle/history?player=${player}&format=modern`);
      console.log("Splinterlands API called getPlayerBattleHistoryModern")
      return res;
  } catch (error) {
    console.log(error);
  }
}

export const getCurrentQuest = async (player) => {
  let res 
  try {
      res = await $.getJSON(`${api}/players/quests?username=${player}`);
      console.log("Splinterlands API called getCurrentQuest")
      return res;
  } catch (error) {
    console.log(error);
  }
}


export default getPlayerData