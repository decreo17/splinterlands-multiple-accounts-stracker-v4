import { configureStore } from '@reduxjs/toolkit';
import SeasonSlice from '../slices/seasonSlice';
import RewardPoolSlice from '../slices/rewardPoolSlice';
import LoadingSlice from '../slices/loadingSlice';
import DashboardSlice from '../slices/dashboardSlice';
import AccountSlice from '../slices/account-slice';
import SettingsSlice from '../slices/settingsSlice';
import QuestSlice from '../slices/quest-slice';

const store = configureStore({
    reducer : {
        season      : SeasonSlice.reducer,
        rewardPools : RewardPoolSlice.reducer,
        loading     : LoadingSlice.reducer,
        dashboard   : DashboardSlice.reducer,
        accounts    : AccountSlice.reducer,
        settings    : SettingsSlice.reducer,
        quest       : QuestSlice.reducer
    }
});

export default store;