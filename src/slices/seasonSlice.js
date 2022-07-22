import {createSlice} from '@reduxjs/toolkit';

const initialState = {seasonName: "", days: 0, hours: 0, minutes: 0, seconds: 0 };

const SeasonSlice = createSlice({
    name            : 'season',
    initialState    : initialState,
    reducers       : {
        setSeasonName(state, action){
            state.seasonName = action.payload
        },
        setDays(state, action){
            state.days = action.payload
        },
        setHours(state, action){
            state.hours = action.payload
        },
        setMinutes(state, action){
            state.minutes = action.payload
        },
        setSeconds(state, action){
            state.seconds = action.payload
        }
    } 
});

export const { setDays, setHours, setMinutes, setSeconds, setSeasonName } = SeasonSlice.actions

export default SeasonSlice;