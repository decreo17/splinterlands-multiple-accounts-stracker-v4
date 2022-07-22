import { configureStore } from '@reduxjs/toolkit';
import SeasonSlice from '../slices/seasonSlice';
import RewardPoolSlice from '../slices/rewardPoolSlice';
import LoadingSlice from '../slices/loadingSlice';
import DashboardSlice from '../slices/dashboardSlice';

const store = configureStore({
    reducer : {
        season  : SeasonSlice.reducer,
        rewardPools : RewardPoolSlice.reducer,
        loading : LoadingSlice.reducer,
        dashboard : DashboardSlice.reducer
    }
});

export default store;