import 'w3-css/w3.css';
import AutoLoadSettings from './AutoLoadSettings';
import ClearMainRows from './ClearMainRows'

const AutoLoadBox = () => {
    var box = document.getElementById("auto-load-accounts")
    if (box.value === "off") {
      box.value = "on";
      box.checked = true;
      localStorage.setItem("autoLoadAccounts", "on")
      AutoLoadSettings()
    } else {
      box.value = "off";
      box.checked = false
      localStorage.setItem("autoLoadAccounts", "off")
      ClearMainRows();
    }
}

export default AutoLoadBox