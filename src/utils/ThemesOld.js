//import 'w3-css/w3.css'
//import './custom.css'

const Themes = () => {
    if(document.getElementById("json-table")){
      var main = document.getElementById("json-table");
      main.classList.toggle("darkMode")
    }
  
    if(document.getElementById("json-table2")){
      var main2 = document.getElementById("json-table2");
      main2.classList.toggle("darkMode")
    }
  
    if(document.getElementById("card-lookup")){
      var card = document.getElementById("card-lookup");
      card.classList.toggle("darkMode")
    }
  
    if(document.getElementById("quest-table")){
      var quest = document.getElementById("quest-table");
      quest.classList.toggle("darkMode")
    }
    
    if(document.getElementById("root")) {
        var body = document.getElementById("root");
        body.classList.toggle("w3-black");
    }
    
    if(document.getElementById("my-sidebar")){
        var sideBar = document.getElementById("my-sidebar");
        sideBar.classList.toggle("w3-dark-grey");
    }
    
    if(document.getElementById("themes-settings")){
        var button = document.getElementById("themes-settings");
        button.classList.toggle("w3-black");
    }

    if(document.getElementById("top-container")){
        var topContainer = document.getElementById("top-container");
        topContainer.classList.toggle("w3-black");
        topContainer.classList.toggle("w3-dark-grey");
    }

    if(document.getElementById("tr-accounts")){
        var trAccounts = document.getElementById("tr-accounts");
        trAccounts.classList.toggle("w3-black");
        trAccounts.classList.toggle("w3-dark-grey");
    }

    if(document.getElementById("tr-accounts2")){
        var trAccounts2 = document.getElementById("tr-accounts2");
        trAccounts2.classList.toggle("w3-black");
        trAccounts2.classList.toggle("w3-dark-grey");
    }
  
    var buttonText = document.getElementById("themes-settings-button");
    if (buttonText.value === "Light Mode") {
      buttonText.value = "Dark Mode";
      localStorage.setItem("themes", "Light Mode")
    } else {
      buttonText.value = "Light Mode";
      localStorage.setItem("themes", "Dark Mode")
    }
  
    if(document.getElementById("cards-form")) {
      var cardForm = document.getElementById("cards-form");
      cardForm.classList.toggle("w3-black");
      cardForm.classList.toggle("w3-dark-grey");
  
      var trPnl = document.getElementById("trPnl");
      trPnl.classList.toggle("w3-black");
      trPnl.classList.toggle("w3-dark-grey");
  
      var lastMarketPriceUpdate = document.getElementById("last-market-price-update");
      lastMarketPriceUpdate.classList.toggle("w3-black");
  
      var cardsPnl = document.getElementById("cards-pnl");
      cardsPnl.classList.toggle("w3-black");
  
      var income = document.getElementById("income-table");
      income.classList.toggle("darkMode")
  
      var pnl = document.getElementById("pnl-table");
      pnl.classList.toggle("darkMode")
    }
}

export default Themes

