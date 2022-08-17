import './UpdateMarketPrice.css'
import Loading from '../Loading/Loading'
import { useState } from 'react'
import { getCardsMarketForSaleGrouped } from '../../api/cardsApi'
import { useDispatch } from 'react-redux'
import SettingsSlice from '../../slices/settingsSlice'
//for toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const updateMarketPriceLocal = async () => {
    var dateTime = ''
    await getCardsMarketForSaleGrouped()
    .then((data) => {
        data = JSON.stringify(data);
        var today = new Date();
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        dateTime = `${date} ${time}`;

        window.localStorage.setItem("marketPrice", data);
        window.localStorage.setItem("lastMarketPriceUpdate", dateTime);        
    })
    .catch(err => {
        console.error(err);
        toast.error('There was an error while getting the market price', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });
        return null;
    });
    return dateTime
}


const UpdateMarketPrice = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const updateMarketPrice = () => {
        (async () => {
            setLoading(true)
            await updateMarketPriceLocal()
            .then(data => {
                dispatch(SettingsSlice.actions.setLastMarketPriceUpdate(data))
            })
            toast.success("Market Price Updated!", {
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

    return (
        <>
        <button id='update-market-price' className="btn-sm btn-success m-1" onClick={()=> {
            updateMarketPrice()
        }}>UPDATE MARKET PRICE</button>
        {loading && <Loading/>}
    </>
    )

}

export default UpdateMarketPrice