import splinterlandsApi from "./splinterlandsApi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cardsDetailsJson from "../json/cardsDetails.json";

const api = splinterlandsApi
//const cardsDetailsJson = require('../json/cardsDetails.json')

export const getCardDetails = (cardId) => {
    var cardInfo = []
    cardInfo = (cardsDetailsJson.filter(c => c.id == cardId));
    return cardInfo[0]
}

const getCardsDetailsFromApi = async  () => {
    let res;
    try {
        res = await fetch(`${api}/cards/get_details`);
        console.log("Splinterlands API called getCardsDetailsFromApi")
        return res;
    } catch (error) {
      console.log(error);
    }    
}

export default getCardsDetailsFromApi

