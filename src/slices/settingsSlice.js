import {createSlice} from '@reduxjs/toolkit';
/**
 * not yet in use
 */
const initialState = {theme: ''};

const SettingsSlice = createSlice({
    name            : 'settings',
    initialState    : initialState,
    reducers       : {
        setTheme(state, action){
            state.theme = action.payload
        }
    } 
});

export default SettingsSlice;