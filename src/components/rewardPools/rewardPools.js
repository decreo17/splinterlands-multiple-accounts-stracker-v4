import './rewardPools.css'
import rewardsApi from '../../api/rewardsApi'
import { setWildBronze, setModernBronze, setWildSilver, setModernSilver, setWildGold, 
    setModernGold, setWildDia, setModernDia, setWildChamp, setModernChamp } from '../../slices/rewardPoolSlice'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from "react";

const RewardPools = () => {
    const wild = useSelector((state) => state.rewardPools.wildBronze)
    const wild_1 = useSelector((state) => state.rewardPools.wildSilver)
    const wild_2 = useSelector((state) => state.rewardPools.wildGold)
    const wild_3 = useSelector((state) => state.rewardPools.wildDia)
    const wild_4 = useSelector((state) => state.rewardPools.wildChamp)
    const modern = useSelector((state) => state.rewardPools.modernBronze)
    const modern_1 = useSelector((state) => state.rewardPools.modernSilver)
    const modern_2 = useSelector((state) => state.rewardPools.modernGold)
    const modern_3 = useSelector((state) => state.rewardPools.modernDia)
    const modern_4 = useSelector((state) => state.rewardPools.modernChamp)
    const dispatch = useDispatch()

    useEffect(() => {
        
        rewardsApi.then((data) => { 
            data['unclaimed_balances'].forEach(rewards => {
                if (rewards.type === 'wild') dispatch(setWildBronze(new Intl.NumberFormat().format(rewards.balance)))
                else if (rewards.type === 'wild_1') dispatch(setWildSilver(new Intl.NumberFormat().format(rewards.balance)))
                else if (rewards.type === 'wild_2') dispatch(setWildGold(new Intl.NumberFormat().format(rewards.balance)))
                else if (rewards.type === 'wild_3') dispatch(setWildDia(new Intl.NumberFormat().format(rewards.balance)))
                else if (rewards.type === 'wild_4') dispatch(setWildChamp(new Intl.NumberFormat().format(rewards.balance)))
                else if (rewards.type === 'modern') dispatch(setModernBronze(new Intl.NumberFormat().format(rewards.balance)))     
                else if (rewards.type === 'modern_1') dispatch(setModernSilver(new Intl.NumberFormat().format(rewards.balance)))    
                else if (rewards.type === 'modern_2') dispatch(setModernGold(new Intl.NumberFormat().format(rewards.balance)))    
                else if (rewards.type === 'modern_3') dispatch(setModernDia(new Intl.NumberFormat().format(rewards.balance)))   
                else if (rewards.type === 'modern_4') dispatch(setModernChamp(new Intl.NumberFormat().format(rewards.balance)))              
            });

            /* dec rewards pools
            var wild_dec_rewards = data.dec.reward_pool;
            var wild_rewards = new Intl.NumberFormat().format(wild_dec_rewards);
            dispatch(setWild(wild_rewards))

            var modern_dec_rewards = data.dec.modern_reward_pool;
            var modern_rewards = new Intl.NumberFormat().format(modern_dec_rewards);
            dispatch(setModern(modern_rewards))*/
        })
        // eslint-disable-next-line
    },[]);

    return (
        <>  
            <br />
            <span id="reward_pool">Wild Rewards:</span> <span className='text-info'>Bronze {wild}</span> <span>Silver: {wild_1}</span> 
            <span className='text-info'> Gold: {wild_2}</span> <span>Dia: {wild_3}</span> <span className='text-info'>Champ {wild_4} </span>
            <br />
            <span id="reward_pool_modern"> Modern Rewards:</span> <span className='text-info'> Bronze {modern}</span> <span>Silver: {modern_1}</span> 
            <span className='text-info'> Gold: {modern_2}</span> <span>Dia: {modern_3}</span> <span className='text-info'>Champ {modern_4}</span>
        </>
    )
}

export default RewardPools