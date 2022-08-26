import './LoadQuest.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSlice from '../../slices/loadingSlice';
import { getQuestDetails } from './UpdateQuests';
import QuestSlice from '../../slices/quest-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

const LoadQuest = () => {
    const dispatch = useDispatch()
    const settings = useSelector((state) => state.settings.splinterlands_settings)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(LoadingSlice.actions.isLoading(true))
    }, [])
    
    const loadQuestFromAccountsInLocalStorage = async () => {
        dispatch(QuestSlice.actions.reset())
        
        let usernames = [];
        let local = localStorage.getItem("accounts");
        if (local == null || !local) {      
            toast.error("There are no valid accounts to load", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });
        } else {
            usernames.push(localStorage.getItem("accounts"));
            usernames = usernames.toString().split(",");
            (async () => {
                setLoading(true)
                for (let user of usernames) {
                    try {
                        await getQuestDetails(user, settings)
                        .then(data => {
                            dispatch(LoadingSlice.actions.isLoading(true))
                            dispatch(QuestSlice.actions.addAccount(data))
                        })
                } catch (e) {
                    console.log("There was an error while processing " + user + "\n" + e)
                    toast.error("There was an error while processing " + user + " | " + e, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                        });
                }
            }
            toast.success("Accounts Loaded!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
            setLoading(false)
            })();
        }
        
    }

    return (
        <div className='col-lg-2 col-md-3 col-sm-6'>
            <button id='load-quest' className="btn btn-sm btn-success m-1" onClick={()=> {
                loadQuestFromAccountsInLocalStorage()
            }}>LOAD/REFRESH QUEST</button>
            {loading && <Loading/>}
        </div>                   
    )

}

export default LoadQuest
