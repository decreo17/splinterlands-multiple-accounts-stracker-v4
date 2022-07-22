import {createSlice} from '@reduxjs/toolkit';

const initialState = {totalAccounts: 0, decPrice: 0, spsPrice: 0, totalChaos: 0, totalCredits: 0, totalDec: 0, totalSps: 0, totalStake: 0,
    totalEarned: 0, totalRent: 0, netIncome: 0 };

const DashboardSlice = createSlice({
    name            : 'dashboard',
    initialState    : initialState,
    reducers       : {
        reset(state){
            state.totalAccounts = 0
            state.decPrice = 0
            state.spsPrice = 0
            state.totalChaos = 0
            state.totalCredits = 0
            state.totalDec = 0
            state.totalSps = 0
            state.totalStake = 0
            state.totalEarned = 0
            state.totalRent = 0
            state.netIncome = 0
        },
        resetRent(state){
            state.totalEarned = 0
            state.totalRent = 0
            state.netIncome = 0
        },
        resetDashboardExceptTotalAccounts(state){
            state.decPrice = 0
            state.spsPrice = 0
            state.totalChaos = 0
            state.totalCredits = 0
            state.totalDec = 0
            state.totalSps = 0
            state.totalStake = 0
        },
        addAccount(state, action){
            state.totalAccounts = action.payload
        },
        setDecPrice(state, action){
            state.decPrice = action.payload
        },
        setSpsPrice(state, action){
            state.spsPrice = action.payload
        },
        addChaos(state, action){
            state.totalChaos = action.payload
        },
        addCredits(state, action){
            state.totalCredits = action.payload
        },
        addDec(state, action){
            state.totalDec = action.payload
        },
        addSps(state, action){
            state.totalSps = action.payload
        },
        addStake(state, action){
            state.totalStake = action.payload
        },
        addEarned(state, action){
            state.totalEarned = action.payload
        },
        addRent(state, action){
            state.totalRent = action.payload
        },
        addNetIncome(state, action){
            state.netIncome = action.payload
        }
    } 
});

export const { reset, resetRent, resetDashboardExceptTotalAccounts, addAccount, setDecPrice,
    setSpsPrice, addChaos, addCredits, addDec, addSps, addStake, addEarned, addRent, addNetIncome } = DashboardSlice.actions

export default DashboardSlice;