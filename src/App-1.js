import './App.css';
import 'w3-css/w3.css';

const currencies = ["usd","php","aed","ars","aud","bch","bdt","bhd","bit","bmd","bnb",
  "brl","btc","cad","chf","clp","cny","czk","dkk","dot","eos","eth","eur","gbp","hkd"
  ,"huf","idr","ils","inr","jpy","krw","kwd","lin","lkr","ltc","mmk","mxn","myr","ngn",
  "nok","nzd","pkr","pln","rub","sar","sat","sek","sgd","thb","try","twd","uah","vef",
  "vnd","xag","xau","xdr","xlm","xrp","yfi","zar"];

const currencyObjects = currencies.map((currency, i) => ({id:i, value:currency, text:currency.toLocaleUpperCase()}));

function Settings(props) {
  return (
    <section>
      <h2>Settings</h2>
      <div className="w3-padding w3-text-black">
        <label className="fa fa-dollar fa-fw w3-padding"></label>
        <select id="currency">
          {props.currencies.map((currency) => (
          <option key={currency.id} value={currency.value}>{currency.text}</option>
        ))}</select>
      </div>
    </section>
  )
}

function Menu() {
  return (
    <div id="topContainer" className={"w3-bar w3-top w3-dark-grey w3-large"}>
      <Settings currencies={currencyObjects} />
    </div>
  );
}

function Footer() {
  return (
    <>
      <footer className={"w3-container w3-padding-16 w3-dark-grey"}>
        <h5>
            Developed by Decreo<br />
            For support and appreciation for this project you may 
            donate Cards, DEC or SPS to @dadee or @decreo ingame or via hive blockchain<br />
            For questions and support, look for decreo | decreo17.github.io#2564 in Splinterlands discord.<br />
            <a href="https://m.me/DadeeGaming17" target="_blank">m.me/DadeeGaming17</a><br />
            <a href="https://decreo17.github.io/Splinterlands-Multiple-Account-Tracker/privacyPolicy.html" target="_blank">
              Privacy Policy</a>
        </h5>
        <small>Disclaimer: This website is developed by a student and is not officially related to Splinterlands or Steam Monsters Inc.
          Images used were property of splinterlands/Steem Monsters Inc.
        </small>
      </ footer>
    </>
  );
}

function App() {
  return (
    <>
      <Menu />
      <p>Menu</p>
      <p>Sidebar</p>
      <p>Main</p>
      <Footer />
    </>
  );
}

export default App;
