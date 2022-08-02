import { configureStore } from '@reduxjs/toolkit';
import SeasonSlice from '../slices/seasonSlice';
import RewardPoolSlice from '../slices/rewardPoolSlice';
import LoadingSlice from '../slices/loadingSlice';
import DashboardSlice from '../slices/dashboardSlice';
import AccountSlice from '../slices/account-slice';

const store = configureStore({
    reducer : {
        season  : SeasonSlice.reducer,
        rewardPools : RewardPoolSlice.reducer,
        loading : LoadingSlice.reducer,
        dashboard : DashboardSlice.reducer,
        accounts : AccountSlice.reducer
    }
});

export default store;