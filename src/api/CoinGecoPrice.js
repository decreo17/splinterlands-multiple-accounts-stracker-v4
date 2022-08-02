import $ from 'jquery';

const CoinGecoPriceApi = async(coinID) => {
    let res 
    try {
        res = await $.getJSON(`https://api.coingecko.com/api/v3/coins/${coinID}`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export default CoinGecoPriceApi