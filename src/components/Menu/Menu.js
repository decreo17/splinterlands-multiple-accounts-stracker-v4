import 'w3-css/w3.css';
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons'
import W3Oopen from '../../utils/W3Open';

const Menu = () => {
    return (
    <>  
      <div id="top-container" className="w3-bar w3-top w3-dark-grey w3-large" style={{zIndex: 4}}>
          <button className="w3-bar-item w3-button w3-hover-none w3-hover-text-light-grey" 
              onClick={W3Oopen}><i><FontAwesomeIcon icon={faBars} /></i>  Menu</button>
          <div>
              <button onClick = {() => document.getElementById('settings-holder').style.display='block'} 
                className="w3-bar-item w3-button w3-padding"><i><FontAwesomeIcon icon={faCog} /></i>  Settings</button>
          </div>
          <span id="smat" className="w3-hide-small w3-bar-item w3-right">Splinterlands Multiple Account Tracker</span>
      </div>  
    </>
    );
}

export default Menu;