import {createSlice} from '@reduxjs/toolkit';


const initialState = {alltransactions : [], netIncome: []};

const DecTransactionsSlice = createSlice({
    name            : 'decTransactions',
    initialState    : initialState,
    reducers        : {
        addAccount(state, action){
            state.alltransactions.push(action.payload);
        },
        deleteAccount(state, action){
            let filtered = state.filter(a => a.username !== action.payload)
            return filtered
        },
        setAccounts(state, action){
            state.alltransactions = action.payload;
        },
        setNetIncome(state, action) {
            state.netIncome = action.payload
        },
        addNetIncome(state, action){
            state.netIncome.push(action.payload);
        },
        reset: () => initialState
    }
});

export default DecTransactionsSlice;