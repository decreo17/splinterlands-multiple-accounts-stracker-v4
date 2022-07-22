import React from 'react'
import { func, string } from 'prop-types';

const Toggle = ({ theme, toggleTheme }) => {
    //const isLight = theme === 'light';
    return (
        <div className="w3-padding" id="themes-settings">
            <input type="button" id="themes-settings-button" value={theme.toUpperCase() + " MODE"} 
                    className="w3-button w3-round-large" onClick={toggleTheme} />
        </div>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;