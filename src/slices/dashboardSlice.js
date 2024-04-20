import {createSlice} from '@reduxjs/toolkit';

const initialState = {totalAccounts: 0, decPrice: 0, spsPrice: 0, totalGlint: 0, totalCredits: 0, totalDec: 0, totalSps: 0, totalStake: 0,
    totalEarned: 0, totalRent: 0, netIncome: 0, totalSpsRewards: 0 };

const DashboardSlice = createSlice({
    name            : 'dashboard',
    initialState    : initialState,
    reducers       : {
        reset(state){
            state.totalAccounts = 0
            state.decPrice = 0
            state.spsPrice = 0
            state.totalGlint = 0
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
            state.totalGlint = 0
            state.totalCredits = 0
            state.totalDec = 0
            state.totalSps = 0
            state.totalStake = 0
        },
        setAccount(state, action){
            state.totalAccounts = action.payload
        },
        setDecPrice(state, action){
            state.decPrice = action.payload
        },
        setSpsPrice(state, action){
            state.spsPrice = action.payload
        },
        setGlint(state, action){
            state.totalGlint = action.payload
        },
        setCredits(state, action){
            state.totalCredits = action.payload
        },
        setDec(state, action){
            state.totalDec = action.payload
        },
        setSps(state, action){
            state.totalSps = action.payload
        },
        setStake(state, action){
            state.totalStake = action.payload
        },
        setEarned(state, action){
            state.totalEarned = action.payload
        },
        setRent(state, action){
            state.totalRent = action.payload
        },
        setNetIncome(state, action){
            state.netIncome = action.payload
        },
        setTotalSpsRewards(state, action){
            state.totalSpsRewards = action.payload
        }
    } 
});

export const { reset, resetRent, resetDashboardExceptTotalAccounts, setAccount: addAccount, setDecPrice,
    setSpsPrice, setGlint: addGlint, setCredits: addCredits, setDec: addDec, setSps: addSps, setStake: addStake, setEarned: addEarned, setRent: addRent, setNetIncome: addNetIncome } = DashboardSlice.actions

export default DashboardSlice;