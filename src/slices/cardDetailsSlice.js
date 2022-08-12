import {createSlice} from '@reduxjs/toolkit';

const initialState = {allCards : [], playerCards : []};

const CardDetailstSlice = createSlice({
    name            : 'cardDetails',
    initialState    : initialState,
    reducers        : {
        addAccount(state, action){
            state.allCards.push(action.payload);
        },
        setAccounts(state, action){
            state.allCards = action.payload;
        },
        setPlayerCards(state, action){
            state.playerCards = action.payload
        },
        reset: () => initialState
    }
});

export default CardDetailstSlice;