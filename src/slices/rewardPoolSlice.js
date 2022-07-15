import {createSlice} from '@reduxjs/toolkit';

const initialState = {wild: 0, modern: 0 };

const RewardPoolSlice = createSlice({
    name            : 'rewardPools',
    initialState    : initialState,
    reducers       : {
        setWild(state, action){
            state.wild = action.payload
        },
        setModern(state, action){
            state.modern = action.payload
        }
    } 
});

export const { setWild, setModern } = RewardPoolSlice.actions

export default RewardPoolSlice;