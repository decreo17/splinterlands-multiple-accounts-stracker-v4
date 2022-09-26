import 'w3-css/w3.css';
import './SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faDashboard, faUser, faDollar, faPencilSquare, faGlobe } from '@fortawesome/free-solid-svg-icons'
import W3Close from '../../utils/W3Close';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const url = "https://decreo17.github.io/"

export const SideBar = () => {
    document.addEventListener('click', (event) => {
        if(!event.target.closest('#top-container') && !event.target.closest('#my-sidebar')){
            W3Close();
        };
    });
    return (
        <div className="w3-sidebar w3-bar-block w3-card w3-animate-left" style={{display:'none'}} id="my-sidebar"><br />
            <hr />
            <div className="w3-container">
                <h5>Dashboard</h5>
            </div>
            <div className="w3-bar-block">
                <button className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-hide-small w3-hide-medium w3-dark-grey w3-hover-black"
                    onClick={W3Close} title="close menu"><i><FontAwesomeIcon icon={faRemove} /></i>  Close Menu</button>
                <Link to='/splinterlands-multiple-accounts-stracker-v4/' className="w3-bar-item w3-button w3-padding w3-blue"><i><FontAwesomeIcon icon={faDashboard} /></i>  Main Dashboard</Link>
                {/*<a href={url} className="w3-bar-item w3-button w3-padding w3-blue">
                    <i><FontAwesomeIcon icon={faUser} /></i>  Accounts</a>
                <a href={url} className="w3-bar-item w3-button w3-padding w3-blue">
                    <i><FontAwesomeIcon icon={faDollar} /></i>  Cards PnL</a>
                <a href={url} className="w3-bar-item w3-button w3-padding w3-blue">
                    <i><FontAwesomeIcon icon={faPencilSquare} /></i>  Updates</a>*/}
                {/*<Link to='net-income' className="w3-bar-item w3-button w3-padding w3-blue">
                    <i><FontAwesomeIcon icon={faGlobe} /></i>  Net Income</Link>*/}
                <a href="https://decreo17.github.io/" className="w3-bar-item w3-button w3-padding w3-blue">
                    <i><FontAwesomeIcon icon={faGlobe} /></i>  Old Tracker</a>
            </div>
        </div>
    );
}