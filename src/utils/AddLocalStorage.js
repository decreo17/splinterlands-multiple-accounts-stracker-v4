//import LoadingSlice from '../slices/loadingSlice';
//import { useDispatch } from 'react-redux';
import getPlayerData from '../api/playerApi';

const AddLocalStorage = async () => {
    var usernameInput = document.getElementById("uname");
    //console.log(usernameInput.value);
    //create an array from the input
    var usernames = usernameInput.value.toString().split(",");
    //console.log(usernames);
    //loop thru the input to enter the account
    for (let i = 0; i < usernames.length; i++) {
        await getPlayerData(usernames[i]).then((data) => {
            //console.log(!(data.name === undefined))
            if (!(data.name === undefined)) {
                //add row
                //createTable(usernames[i]);
                let oldData = [] 
                let local = localStorage.getItem("accounts");
                if ( local == null ) {
                    oldData.push(usernames[i]);
                    oldData = oldData.filter(function (el) { return el != null; });
                    localStorage.setItem("accounts", oldData)
                } else {
                    if(local.toString().split(",").indexOf(usernames[i]) >= 0) {
                    //addMessageToToaster(usernames[i] + " was already on the list")
                    } else {
                    oldData.push(localStorage.getItem("accounts"));
                    oldData.push(usernames[i]);
                    oldData = oldData.filter(function (el) { return el != null; });
                    localStorage.setItem("accounts", oldData);
                    //createTable(usernames[i]);
                    }
                }
            } else {
                //return error message to user
                alert(usernames[i] + " is not a valid username");
            }
        })
    }
}

export default AddLocalStorage