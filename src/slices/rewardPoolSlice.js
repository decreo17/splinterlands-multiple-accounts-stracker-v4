import {createSlice} from '@reduxjs/toolkit';

const initialState = {wildBronze: 0,wildSilver: 0,wildGold: 0,wildDia: 0,wildChamp: 0, 
    modernBronze: 0, modernSilver: 0, modernGold: 0, modernDia: 0, modernChamp: 0 };

const RewardPoolSlice = createSlice({
    name            : 'rewardPools',
    initialState    : initialState,
    reducers       : {
        setWildBronze(state, action){
            state.wildBronze = action.payload
        },
        setModernBronze(state, action){
            state.modernBronze = action.payload
        },
        setWildSilver(state, action){
            state.wildSilver = action.payload
        },
        setModernSilver(state, action){
            state.modernSilver = action.payload
        },
        setWildGold(state, action){
            state.wildGold = action.payload
        },
        setModernGold(state, action){
            state.modernGold = action.payload
        },
        setWildDia(state, action){
            state.wildDia = action.payload
        },
        setModernDia(state, action){
            state.modernDia = action.payload
        },
        setWildChamp(state, action){
            state.wildChamp = action.payload
        },
        setModernChamp(state, action){
            state.modernChamp = action.payload
        }
    } 
});

export const { setWildBronze, setModernBronze, setWildSilver, setModernSilver, setWildGold, 
    setModernGold, setWildDia, setModernDia, setWildChamp, setModernChamp } = RewardPoolSlice.actions

export default RewardPoolSlice;