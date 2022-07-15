import React, { Component } from 'react';
import './Settings.css'
import CurrencyOption from './CurrencyOption'
//import Themes from '../../utils/ThemesOld';
import 'bootstrap/dist/css/bootstrap.min.css';
import AutoLoadBox from '../../utils/AutoLoadBox';
import Themes from '../../themes/Themes';

class Settings extends Component {
    render() {

        document.addEventListener('click', (event) => {
            if(!event.target.closest('#top-container') && !event.target.closest('#settings-content')) {
                document.getElementById('settings-holder').style.display="none"
            }
        });
    
    return (
        <div className="w3-modal" style={{display:"none"}} id="settings-holder">
            <div id='settings-content' className="w3-round w3-modal-content w3-animate-zoom w3-card-4">
                <header className="w3-container w3-round">
                    <span onClick={() => document.getElementById('settings-holder').style.display="none"} 
                    className="w3-button w3-round w3-display-topright">&times;</span>
                    <h2>Settings</h2>
                </header>
                
                <CurrencyOption />
                <Themes />
                <div className="w3-padding" id="load-settings">
                    <label className="switch">
                        <input id="autoLoad-accounts" type="checkbox" value="off" onClick={AutoLoadBox} />
                        <span className="slider round"></span>
                    </label>
                    <span id="auto-load-text" className="w3-text-black">Auto Load Accounts</span>
                </div>

                <footer className="w3-container w3-round">
                    <p>For donations please send it to: <i className="w3-red">Dadee</i> or <i className="w3-red">Decreo</i> 
                    in-game or via hive</p>
                    <div>
                        <button className="w3-button w3-right" 
                        onClick = {() => document.getElementById('settings-holder').style.display='none'}>Close</button>
                    </div>
                </footer>
            </div>
        </div>
        
      )
    }
  }
  
  export default Settings
