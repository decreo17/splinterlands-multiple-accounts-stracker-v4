import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const CardDetailstSlice = createSlice({
    name            : 'cardDetails',
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

export default CardDetailstSlice;