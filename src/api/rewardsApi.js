import $ from 'jquery';

const getRewardsPool = async() => {
    let res 
    try {
        res = await $.getJSON('https://steemmonsters.com/players/dec')
        console.log("Splinterlands API called getRewardsPool")
        return res
    } catch (error) {
      console.log(error);
    }
}

const rewardsApi = getRewardsPool()

export default rewardsApi