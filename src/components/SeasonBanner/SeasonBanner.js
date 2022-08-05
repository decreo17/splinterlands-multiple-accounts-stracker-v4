import 'w3-css/w3.css';
import './SeasonBanner.css'
import settingsApi from '../../api/settingsApi';
import { useSelector, useDispatch } from 'react-redux'
import { setDays, setHours, setMinutes, setSeconds, setSeasonName } from '../../slices/seasonSlice';
import React, { useEffect } from "react";
import RewardPools from '../rewardPools/rewardPools';
import LoadingSlice from '../../slices/loadingSlice';
import SettingsSlice from '../../slices/settingsSlice';

const SeasonBanner = () => {
    const days = useSelector((state) => state.season.days)
    const hours = useSelector((state) => state.season.hours)
    const minutes = useSelector((state) => state.season.minutes)
    const seconds = useSelector((state) => state.season.seconds)
    const seasonName = useSelector((state) => state.season.seasonName)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(LoadingSlice.actions.isLoading(true))
        const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
        settingsApi.then(data => {
            dispatch(SettingsSlice.actions.setSplinterlandsSettings(data))
            let birthday = data.season.ends,
                countDown = new Date(birthday).getTime()
            let x = setInterval(() => {
                let now = new Date().getTime(),
                distance = countDown - now;

                dispatch(setSeasonName(data.season.name + " END IN : "))
                dispatch(setDays(Math.floor(distance / (day))))
                dispatch(setHours(Math.floor((distance % (day)) / (hour))))
                dispatch(setMinutes(Math.floor((distance % (hour)) / (minute))))
                dispatch(setSeconds(Math.floor((distance % (minute)) / second)))
                
            //do something later when date is reached
            if (distance < 0) {
            setInterval(function() {
                window.location.reload();
            }, 30000)
            
            clearInterval(x);
            }
            }, 0);
            dispatch(LoadingSlice.actions.isLoading(false))
        }, []);
    })

    return (
        <div className="w3-panel w3-topbar w3-bottombar w3-border-gray w3-pale-gray">
            <div className="h-100">
                <div style={{textAlign: "center"}}>
                    <span id="name_season"></span> {seasonName}
                    <span id="days"></span> {days} Days
                    <span id="hours"></span> {hours} Hours
                    <span id="minutes"></span> {minutes} Minutes
                    <span id="seconds"></span> {seconds} Seconds
                    {/*reward pool here*/}
                    <RewardPools />
                    <br/>
                    <span className="w3-text-grey">For support and appreciation for this project you may donate Cards, 
                    DEC or SPS to @dadee or @decreo ingame or via hive blockchain</span>
                </div>
            </div>
        </div>
    )
}

export default SeasonBanner;

