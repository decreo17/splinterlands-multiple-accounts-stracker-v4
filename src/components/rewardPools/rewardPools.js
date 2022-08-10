import './rewardPools.css'
import rewardsApi from '../../api/rewardsApi'
import { setWild, setModern } from '../../slices/rewardPoolSlice'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from "react";

const RewardPools = () => {
    const wild = useSelector((state) => state.rewardPools.wild)
    const modern = useSelector((state) => state.rewardPools.modern)
    const dispatch = useDispatch()

    useEffect(() => {
        
        rewardsApi.then((data) => { 
            var wild_dec_rewards = data.dec.reward_pool;
            var wild_rewards = new Intl.NumberFormat().format(wild_dec_rewards);
            dispatch(setWild(wild_rewards))

            var modern_dec_rewards = data.dec.modern_reward_pool;
            var modern_rewards = new Intl.NumberFormat().format(modern_dec_rewards);
            dispatch(setModern(modern_rewards))
        })
        // eslint-disable-next-line
    },[]);

    return (
        <>  
            <br />
            <span id="reward_pool">Wild Rewards: {wild} </span>
            ||
            <span id="reward_pool_modern"> Modern Rewards: {modern}</span>
        </>
    )
}

export default RewardPools