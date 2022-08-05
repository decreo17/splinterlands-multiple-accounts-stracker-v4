import {createSlice} from '@reduxjs/toolkit';
/**
 * not yet in use
 */
const initialState = {theme: '', splinterlands_settings: []};

const SettingsSlice = createSlice({
    name            : 'settings',
    initialState    : initialState,
    reducers       : {
        setTheme(state, action){
            state.theme = action.payload
        },
        setSplinterlandsSettings(state, action){
            state.splinterlands_settings = action.payload
        }
    } 
});

export default SettingsSlice;