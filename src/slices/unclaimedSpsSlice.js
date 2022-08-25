import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const UnclaimedSpsSlice = createSlice({
    name            : 'unclaimedSps',
    initialState    : initialState,
    reducers        : {
        addAccount(state, action){
            state.push(action.payload);
        },
        setAccounts(state, action){
            return action.payload;
        },
        reset: () => initialState
    }
});

export default UnclaimedSpsSlice;