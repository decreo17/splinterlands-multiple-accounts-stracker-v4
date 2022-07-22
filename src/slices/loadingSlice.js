import {createSlice} from '@reduxjs/toolkit';

const initialState = {loading: false };

const LoadingSlice = createSlice({
    name            : 'loading',
    initialState    : initialState,
    reducers       : {
        isLoading(state, action){
            state.loading = action.payload
        }
    } 
});

export const { isLoading: setLoading } = LoadingSlice.actions

export default LoadingSlice;