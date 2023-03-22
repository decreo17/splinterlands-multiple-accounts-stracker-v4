
const calculateECR = (capture_rate, last_reward_time) => {
   /** old
    return Math.min((isNaN(parseInt(capture_rate)) ? 10000 : 
    capture_rate) + (Date.now() - new Date(last_reward_time)) / 3000 * 0.0868, 10000)
     */
    const MS_IN_ONE_HOUR = 1000 * 60 * 60;
    const MAX_ENERGY = 50;
    const captureRateParsed = parseFloat(capture_rate);
    const initialEnergy = isNaN(captureRateParsed) ? MAX_ENERGY : captureRateParsed;
    const timeSinceLastRewardMs = Date.now() - new Date(last_reward_time).getTime();
    const regeneratedEnergy = timeSinceLastRewardMs / MS_IN_ONE_HOUR * 1;
    const newEnergy = initialEnergy + regeneratedEnergy;
    // can't regenerate more energy than max amount
    const limitedNewEnergy = Math.min(newEnergy, MAX_ENERGY);
    return limitedNewEnergy;
}

export default  calculateECR