
const calculateECR = (capture_rate, last_reward_time) => {
    return Math.min((isNaN(parseInt(capture_rate)) ? 10000 : 
    capture_rate) + (Date.now() - new Date(last_reward_time)) / 3000 * 0.0868, 10000)
}

export default calculateECR