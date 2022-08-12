import 'w3-css/w3.css';
import Loading from '../Loading/Loading';
import { useSelector } from 'react-redux';


const Header = ({dashboard: Dashboard}) => {
    const loading = useSelector(state => state.loading)
    return (
        <header className="w3-container" style={{paddingTop:'22px'}}>
            <Dashboard/>
           {loading.loading && <Loading/>} 
        </header>
    )
}

export default Header;