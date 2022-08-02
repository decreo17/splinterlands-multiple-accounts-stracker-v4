

export const deleteAccountFromLocalStorage = (username) => {

    let oldData = []; 
    oldData.push(localStorage.getItem("accounts"));
    oldData = oldData.toString().split(",")
    let unsernameIndex = oldData.indexOf(username);
    oldData.splice(unsernameIndex,1);
    oldData = oldData.filter(function (el) { return el != null; });
    localStorage.setItem("accounts", oldData);
    
}