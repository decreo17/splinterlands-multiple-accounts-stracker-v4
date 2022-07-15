import { configureStore } from '@reduxjs/toolkit';
import SeasonSlice from '../slices/seasonSlice';
import RewardPoolSlice from '../slices/rewardPoolSlice';

const store = configureStore({
    reducer : {
        season  : SeasonSlice.reducer,
        rewardPools : RewardPoolSlice.reducer
    }
});

export default store;