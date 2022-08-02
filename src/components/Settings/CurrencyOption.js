import 'w3-css/w3.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from "react";

const currencies = ["usd","php","aed","ars","aud","bch","bdt","bhd","bit","bmd","bnb",
  "brl","btc","cad","chf","clp","cny","czk","dkk","dot","eos","eth","eur","gbp","hkd"
  ,"huf","idr","ils","inr","jpy","krw","kwd","lin","lkr","ltc","mmk","mxn","myr","ngn",
  "nok","nzd","pkr","pln","rub","sar","sat","sek","sgd","thb","try","twd","uah","vef",
  "vnd","xag","xau","xdr","xlm","xrp","yfi","zar"];

const currencyObjects = currencies.map((currency, i) => ({id:i, value:currency, text:currency.toLocaleUpperCase()}));

const currencyOptions = currencyObjects.map((currency) => (
    <option key={currency.id} value={currency.value}>{currency.text}</option>
    ))

const onchangeHandler = () => {
    let currency = document.getElementById("currency").value;
    window.localStorage.setItem("currency", currency);
}

const CurrencyOption = () => {
   
    useEffect(() => {
        const localCurrency = window.localStorage.getItem("currency");
        localCurrency ? document.getElementById("currency").value = localCurrency : document.getElementById("currency").value = "USD" && 
        window.localStorage.setItem("currency", 'usd');
    },[])

    return (
        <section>
            <div className="w3-padding w3-text-black">
                <FontAwesomeIcon icon={faDollar} />
                <label className="w3-padding"></label>
                <select id="currency" onChange={onchangeHandler}>
                    {currencyOptions}
                </select>
            </div>
        </section>
    )
}

export default CurrencyOption;


