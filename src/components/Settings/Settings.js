import React, { Component } from 'react';
import './Settings.css'
import CurrencyOption from '../CurrencyOption';
import Themes from '../../utils/Themes';
import 'bootstrap/dist/css/bootstrap.min.css';
import AutoLoadBox from '../../utils/AutoLoadBox';

class Settings extends Component {
    render() {
      return (
        <div className="w3-modal" style={{display:"none"}} id="settings-holder">
            <div className="w3-round w3-modal-content w3-animate-zoom w3-card-4">
                <header className="w3-container w3-round w3-green">
                    <span onClick={() => document.getElementById('settings-holder').style.display="none"} 
                    className="w3-button w3-round w3-display-topright">&times;</span>
                    <h2>Settings</h2>
                </header>
                
                <CurrencyOption />
                
                <div className="w3-padding" id="themes-settings">
                    <input type="button" id="themes-settings-button" value="Light Mode" 
                    className="w3-button w3-round-large w3-dark-grey" onClick={Themes} />
                </div>

                <div className="w3-padding" id="load-settings">
                    <label className="switch">
                        <input id="autoLoad-accounts" type="checkbox" value="off" onClick={AutoLoadBox} />
                        <span className="slider round"></span>
                    </label>
                    <span id="auto-load-text" className="w3-text-black">Auto Load Accounts</span>
                </div>

                <footer className="w3-container w3-round w3-green">
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
